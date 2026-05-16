export type RoomRecord = {
  id: string;
  code: string;
  name: string;
  status: "lobby" | "playing" | "paused" | "ended";
  hostParticipantId: string | null;
};

export type ParticipantRecord = {
  id: string;
  roomId: string;
  displayName: string;
  isHost: boolean;
  joinedAt: string;
};

export type RoomLobbyRecord = {
  room: RoomRecord;
  participants: ParticipantRecord[];
  queuedSongCount: number;
};

export type RoomSession = {
  participantId: string;
  roomCode: string;
};
