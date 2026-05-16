import type { RoomSession } from "@/features/rooms/types";

export const ROOM_SESSION_COOKIE = "karaoke_room_session";

export function serializeRoomSession(session: RoomSession) {
  return Buffer.from(JSON.stringify(session), "utf8").toString("base64url");
}

export function parseRoomSession(cookieValue?: string | null) {
  if (!cookieValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(cookieValue, "base64url").toString("utf8"),
    ) as Partial<RoomSession>;

    if (
      typeof parsed.participantId !== "string" ||
      typeof parsed.roomCode !== "string"
    ) {
      return null;
    }

    return parsed as RoomSession;
  } catch {
    return null;
  }
}
