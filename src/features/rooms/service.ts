import { generateRoomCode, normalizeRoomCode } from "@/features/rooms/code";
import type { RoomLobbyRecord } from "@/features/rooms/types";
import type { RoomRepository } from "@/features/rooms/repository";

export class RoomServiceError extends Error {}

const MAX_ROOM_CODE_ATTEMPTS = 5;

export async function createRoom(
  input: {
    hostDisplayName: string;
    roomName?: string;
  },
  repository: RoomRepository,
  createCode: () => string = () => generateRoomCode(),
) {
  const hostDisplayName = input.hostDisplayName.trim();
  const roomName = input.roomName?.trim() || `${hostDisplayName}'s Karaoke Room`;

  if (!hostDisplayName) {
    throw new RoomServiceError("Enter a host name to create a room.");
  }

  for (let attempt = 0; attempt < MAX_ROOM_CODE_ATTEMPTS; attempt += 1) {
    const code = createCode();
    const isAvailable = await repository.isRoomCodeAvailable(code);

    if (isAvailable) {
      const created = await repository.createRoom({
        code,
        name: roomName,
        hostDisplayName,
      });

      return {
        room: created.room,
        participant: created.host,
      };
    }
  }

  throw new RoomServiceError("Unable to generate a unique room code. Try again.");
}

export async function joinRoom(
  input: {
    roomCode: string;
    displayName: string;
  },
  repository: RoomRepository,
) {
  const roomCode = normalizeRoomCode(input.roomCode);
  const displayName = input.displayName.trim();

  if (!roomCode) {
    throw new RoomServiceError("Enter a room code to join.");
  }

  if (!displayName) {
    throw new RoomServiceError("Enter a display name to join the room.");
  }

  const room = await repository.findRoomByCode(roomCode);

  if (!room) {
    throw new RoomServiceError("We couldn't find a room with that code.");
  }

  const participant = await repository.createParticipant({
    roomId: room.id,
    displayName,
  });

  return { room, participant };
}

export async function getRoomLobby(
  roomCode: string,
  repository: RoomRepository,
): Promise<RoomLobbyRecord | null> {
  return repository.getRoomLobby(normalizeRoomCode(roomCode));
}
