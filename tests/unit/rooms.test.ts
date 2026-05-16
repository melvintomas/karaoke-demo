import { describe, expect, it, vi } from "vitest";
import { generateRoomCode, normalizeRoomCode } from "@/features/rooms/code";
import { createRoom, RoomServiceError } from "@/features/rooms/service";
import type { RoomRepository } from "@/features/rooms/repository";

describe("room helpers", () => {
  it("normalizes room codes for lookups", () => {
    expect(normalizeRoomCode(" ab12cd ")).toBe("AB12CD");
  });

  it("generates uppercase room codes", () => {
    const sequence = [0, 1, 2, 3, 4, 5];
    let index = 0;

    const code = generateRoomCode(6, () => sequence[index++] ?? 0);

    expect(code).toBe("ABCDEF");
  });
});

describe("createRoom", () => {
  it("creates a host room after retrying a colliding code", async () => {
    const repository: RoomRepository = {
      isRoomCodeAvailable: vi
        .fn()
        .mockResolvedValueOnce(false)
        .mockResolvedValueOnce(true),
      createRoom: vi.fn().mockResolvedValue({
        room: {
          id: "room-1",
          code: "ROOM42",
          name: "Taylor's Karaoke Room",
          status: "lobby",
          hostParticipantId: "participant-1",
        },
        host: {
          id: "participant-1",
          roomId: "room-1",
          displayName: "Taylor",
          isHost: true,
          joinedAt: "2026-05-16T00:00:00.000Z",
        },
      }),
      findRoomByCode: vi.fn(),
      createParticipant: vi.fn(),
      getRoomLobby: vi.fn(),
    };

    const result = await createRoom(
      { hostDisplayName: "Taylor" },
      repository,
      vi.fn().mockReturnValueOnce("DUPE01").mockReturnValueOnce("ROOM42"),
    );

    expect(repository.isRoomCodeAvailable).toHaveBeenCalledTimes(2);
    expect(repository.createRoom).toHaveBeenCalledWith({
      code: "ROOM42",
      hostDisplayName: "Taylor",
      name: "Taylor's Karaoke Room",
    });
    expect(result.room.code).toBe("ROOM42");
    expect(result.participant.isHost).toBe(true);
  });

  it("rejects a blank host name", async () => {
    const repository = {
      isRoomCodeAvailable: vi.fn(),
      createRoom: vi.fn(),
      findRoomByCode: vi.fn(),
      createParticipant: vi.fn(),
      getRoomLobby: vi.fn(),
    } satisfies RoomRepository;

    await expect(createRoom({ hostDisplayName: "   " }, repository)).rejects.toThrow(
      RoomServiceError,
    );
  });
});
