import { describe, expect, it } from "vitest";
import { buildLobbyViewModel, sortParticipants } from "@/features/rooms/lobby";
import type { RoomLobbyRecord } from "@/features/rooms/types";

const baseLobby: RoomLobbyRecord = {
  room: {
    id: "room-1",
    code: "ROOM42",
    name: "Friday Night Karaoke",
    status: "lobby",
    hostParticipantId: "participant-1",
  },
  participants: [
    {
      id: "participant-2",
      roomId: "room-1",
      displayName: "Sam",
      isHost: false,
      joinedAt: "2026-05-16T00:05:00.000Z",
    },
    {
      id: "participant-1",
      roomId: "room-1",
      displayName: "Alex",
      isHost: true,
      joinedAt: "2026-05-16T00:00:00.000Z",
    },
  ],
  queuedSongCount: 0,
};

describe("sortParticipants", () => {
  it("places the host first, then keeps guests in join order", () => {
    const sorted = sortParticipants(baseLobby.participants);

    expect(sorted.map((participant) => participant.displayName)).toEqual(["Alex", "Sam"]);
  });
});

describe("buildLobbyViewModel", () => {
  it("marks the current participant and exposes guest counts", () => {
    const viewModel = buildLobbyViewModel(baseLobby, "participant-2");

    expect(viewModel.participants[1]).toMatchObject({
      displayName: "Sam",
      isCurrentParticipant: true,
    });
    expect(viewModel.guestCount).toBe(1);
    expect(viewModel.isHostOnly).toBe(false);
  });

  it("detects the host-only lobby state", () => {
    const viewModel = buildLobbyViewModel({
      ...baseLobby,
      participants: [baseLobby.participants[1]],
    });

    expect(viewModel.participantCount).toBe(1);
    expect(viewModel.guestCount).toBe(0);
    expect(viewModel.isHostOnly).toBe(true);
  });
});
