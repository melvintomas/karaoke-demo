import type {
  ParticipantRecord,
  RoomLobbyRecord,
} from "@/features/rooms/types";

export function sortParticipants(participants: ParticipantRecord[]) {
  return [...participants].sort((left, right) => {
    if (left.isHost !== right.isHost) {
      return left.isHost ? -1 : 1;
    }

    return left.joinedAt.localeCompare(right.joinedAt);
  });
}

export function buildLobbyViewModel(
  lobby: RoomLobbyRecord,
  currentParticipantId?: string | null,
) {
  const participants = sortParticipants(lobby.participants).map((participant) => ({
    ...participant,
    isCurrentParticipant: participant.id === currentParticipantId,
  }));

  return {
    room: lobby.room,
    participants,
    participantCount: participants.length,
    guestCount: participants.filter((participant) => !participant.isHost).length,
    isHostOnly: participants.length === 1,
    queuedSongCount: lobby.queuedSongCount,
    hasQueuedSongs: lobby.queuedSongCount > 0,
  };
}
