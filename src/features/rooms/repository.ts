import { randomUUID } from "node:crypto";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import type {
  ParticipantRecord,
  RoomLobbyRecord,
  RoomRecord,
} from "@/features/rooms/types";

export type CreateRoomRecordInput = {
  code: string;
  name: string;
  hostDisplayName: string;
};

export type CreateParticipantInput = {
  roomId: string;
  displayName: string;
  isHost?: boolean;
};

export type RoomRepository = {
  isRoomCodeAvailable(code: string): Promise<boolean>;
  createRoom(input: CreateRoomRecordInput): Promise<{
    room: RoomRecord;
    host: ParticipantRecord;
  }>;
  findRoomByCode(code: string): Promise<RoomRecord | null>;
  createParticipant(input: CreateParticipantInput): Promise<ParticipantRecord>;
  getRoomLobby(code: string): Promise<RoomLobbyRecord | null>;
};

type MemoryState = {
  rooms: RoomRecord[];
  participants: ParticipantRecord[];
  queueCounts: Map<string, number>;
};

declare global {
  var __karaokeMemoryState__: MemoryState | undefined;
}

const memoryState =
  globalThis.__karaokeMemoryState__ ??
  (globalThis.__karaokeMemoryState__ = {
    rooms: [],
    participants: [],
    queueCounts: new Map(),
  });

function mapRoom(row: {
  id: string;
  code: string;
  name: string;
  status: RoomRecord["status"];
  host_participant_id: string | null;
}): RoomRecord {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    status: row.status,
    hostParticipantId: row.host_participant_id,
  };
}

function mapParticipant(row: {
  id: string;
  room_id: string;
  display_name: string;
  is_host: boolean;
  joined_at: string;
}): ParticipantRecord {
  return {
    id: row.id,
    roomId: row.room_id,
    displayName: row.display_name,
    isHost: row.is_host,
    joinedAt: row.joined_at,
  };
}

function createMemoryRoomRepository(): RoomRepository {
  return {
    async isRoomCodeAvailable(code) {
      return !memoryState.rooms.some((room) => room.code === code);
    },
    async createRoom(input) {
      const room: RoomRecord = {
        id: randomUUID(),
        code: input.code,
        name: input.name,
        status: "lobby",
        hostParticipantId: null,
      };
      const host: ParticipantRecord = {
        id: randomUUID(),
        roomId: room.id,
        displayName: input.hostDisplayName,
        isHost: true,
        joinedAt: new Date().toISOString(),
      };

      room.hostParticipantId = host.id;

      memoryState.rooms.push(room);
      memoryState.participants.push(host);
      memoryState.queueCounts.set(room.id, 0);

      return { room, host };
    },
    async findRoomByCode(code) {
      return memoryState.rooms.find((room) => room.code === code) ?? null;
    },
    async createParticipant(input) {
      const participant: ParticipantRecord = {
        id: randomUUID(),
        roomId: input.roomId,
        displayName: input.displayName,
        isHost: input.isHost ?? false,
        joinedAt: new Date().toISOString(),
      };

      memoryState.participants.push(participant);

      return participant;
    },
    async getRoomLobby(code) {
      const room = memoryState.rooms.find((entry) => entry.code === code);

      if (!room) {
        return null;
      }

      return {
        room,
        participants: memoryState.participants.filter(
          (participant) => participant.roomId === room.id,
        ),
        queuedSongCount: memoryState.queueCounts.get(room.id) ?? 0,
      };
    },
  };
}

function createSupabaseRoomRepository(): RoomRepository {
  const supabase = createAdminSupabaseClient();

  return {
    async isRoomCodeAvailable(code) {
      const { data, error } = await supabase
        .from("rooms")
        .select("id")
        .eq("code", code)
        .maybeSingle();

      if (error) {
        throw new Error(`Unable to check room code availability: ${error.message}`);
      }

      return !data;
    },
    async createRoom(input) {
      const { data: roomRow, error: roomError } = await supabase
        .from("rooms")
        .insert({
          code: input.code,
          name: input.name,
          status: "lobby",
        })
        .select("id, code, name, status, host_participant_id")
        .single();

      if (roomError) {
        throw new Error(`Unable to create room: ${roomError.message}`);
      }

      const { data: hostRow, error: hostError } = await supabase
        .from("participants")
        .insert({
          room_id: roomRow.id,
          display_name: input.hostDisplayName,
          is_host: true,
        })
        .select("id, room_id, display_name, is_host, joined_at")
        .single();

      if (hostError) {
        throw new Error(`Unable to create host participant: ${hostError.message}`);
      }

      const { error: updateError } = await supabase
        .from("rooms")
        .update({
          host_participant_id: hostRow.id,
        })
        .eq("id", roomRow.id);

      if (updateError) {
        throw new Error(`Unable to assign room host: ${updateError.message}`);
      }

      return {
        room: {
          ...mapRoom(roomRow),
          hostParticipantId: hostRow.id,
        },
        host: mapParticipant(hostRow),
      };
    },
    async findRoomByCode(code) {
      const { data, error } = await supabase
        .from("rooms")
        .select("id, code, name, status, host_participant_id")
        .eq("code", code)
        .maybeSingle();

      if (error) {
        throw new Error(`Unable to load room: ${error.message}`);
      }

      return data ? mapRoom(data) : null;
    },
    async createParticipant(input) {
      const { data, error } = await supabase
        .from("participants")
        .insert({
          room_id: input.roomId,
          display_name: input.displayName,
          is_host: input.isHost ?? false,
        })
        .select("id, room_id, display_name, is_host, joined_at")
        .single();

      if (error) {
        throw new Error(`Unable to create participant: ${error.message}`);
      }

      return mapParticipant(data);
    },
    async getRoomLobby(code) {
      const room = await this.findRoomByCode(code);

      if (!room) {
        return null;
      }

      const { data: participants, error: participantError } = await supabase
        .from("participants")
        .select("id, room_id, display_name, is_host, joined_at")
        .eq("room_id", room.id)
        .order("joined_at", { ascending: true });

      if (participantError) {
        throw new Error(`Unable to load room participants: ${participantError.message}`);
      }

      const { count, error: queueError } = await supabase
        .from("queue_items")
        .select("id", { count: "exact", head: true })
        .eq("room_id", room.id)
        .eq("status", "queued");

      if (queueError) {
        throw new Error(`Unable to load room queue: ${queueError.message}`);
      }

      return {
        room,
        participants: participants.map(mapParticipant),
        queuedSongCount: count ?? 0,
      };
    },
  };
}

export function getRoomRepository() {
  if (process.env.KARAOKE_USE_MEMORY_REPO === "1") {
    return createMemoryRoomRepository();
  }

  return createSupabaseRoomRepository();
}
