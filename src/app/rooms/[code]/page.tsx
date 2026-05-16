import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { buildLobbyViewModel } from "@/features/rooms/lobby";
import { getRoomRepository } from "@/features/rooms/repository";
import { parseRoomSession, ROOM_SESSION_COOKIE } from "@/features/rooms/session";
import { getRoomLobby } from "@/features/rooms/service";

type RoomPageProps = {
  params: Promise<{
    code: string;
  }>;
  searchParams: Promise<{
    participant?: string;
  }>;
};

export default async function RoomPage({ params, searchParams }: RoomPageProps) {
  const { code } = await params;
  const { participant } = await searchParams;
  const repository = getRoomRepository();
  const lobby = await getRoomLobby(code, repository);

  if (!lobby) {
    notFound();
  }

  const cookieStore = await cookies();
  const session = parseRoomSession(cookieStore.get(ROOM_SESSION_COOKIE)?.value);
  const currentParticipantId =
    participant ??
    (session?.roomCode === lobby.room.code ? session.participantId : null);
  const viewModel = buildLobbyViewModel(lobby, currentParticipantId);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-10 sm:px-10 lg:px-12">
      <section className="rounded-[2rem] border border-[var(--panel-border)] bg-[var(--panel)] p-8 shadow-[0_20px_80px_rgba(89,59,130,0.14)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent-strong)]">
              Room Lobby
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.04em]">
              {viewModel.room.name}
            </h1>
            <p className="mt-3 text-base text-[var(--muted)]">
              Room code <span className="font-bold text-[var(--foreground)]">{viewModel.room.code}</span>
              {" · "}
              Status <span className="font-bold capitalize text-[var(--foreground)]">{viewModel.room.status}</span>
            </p>
          </div>

          <div className="rounded-3xl border border-[rgba(255,255,255,0.7)] bg-white/80 px-5 py-4 text-sm text-[var(--muted)]">
            <p className="font-semibold text-[var(--foreground)]">
              {viewModel.participants.length} singers in the room
            </p>
            <p className="mt-1">Share the room code so your next guest can jump in.</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <section className="rounded-[1.75rem] border border-[rgba(255,255,255,0.7)] bg-white/75 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Participants</h2>
              <p className="text-sm text-[var(--muted)]">Host appears first</p>
            </div>

            <ul className="mt-5 space-y-3">
              {viewModel.participants.map((participant) => (
                <li
                  key={participant.id}
                  className="flex items-center justify-between rounded-3xl border border-[var(--panel-border)] bg-white px-4 py-4"
                >
                  <div>
                    <p className="font-semibold text-[var(--foreground)]">
                      {participant.displayName}
                      {participant.isCurrentParticipant ? " (You)" : ""}
                    </p>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      {participant.isHost ? "Host" : "Guest"}
                    </p>
                  </div>

                  {participant.isHost ? (
                    <span className="rounded-full bg-[rgba(255,122,89,0.14)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
                      Host
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[1.75rem] border border-[#1b1432] bg-[#1b1432] p-6 text-white">
            <h2 className="text-xl font-bold">Queue</h2>

            {viewModel.hasQueuedSongs ? (
              <p className="mt-4 text-base leading-7 text-[#f3eefe]">
                {viewModel.queuedSongCount} song{viewModel.queuedSongCount === 1 ? "" : "s"} already waiting in the queue.
              </p>
            ) : (
              <div className="mt-4 rounded-3xl border border-white/15 bg-white/8 p-5">
                <p className="font-semibold">No songs queued yet</p>
                <p className="mt-2 text-sm leading-6 text-[#f3eefe]">
                  Invite a few friends in first. The room is ready for the catalog in Phase C.
                </p>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
