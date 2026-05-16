const milestones = [
  "Create rooms and let friends join from a shared link or code.",
  "Browse a demo song catalog and add tracks to the room queue.",
  "Open a full-screen karaoke player with synced lyric timing.",
];

const foundations = [
  "Next.js app shell, routing, and shared source structure",
  "Supabase environment parsing plus browser/server client helpers",
  "Initial SQL schema for rooms, singers, queue items, songs, and lyric lines",
];

type HomePageProps = {
  searchParams: Promise<{
    createError?: string;
    joinError?: string;
    roomCode?: string;
    displayName?: string;
  }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10 sm:px-10 lg:px-12">
      <section className="grid flex-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-[var(--panel-border)] bg-[var(--panel)] p-8 shadow-[0_20px_80px_rgba(89,59,130,0.14)] backdrop-blur md:p-10">
          <span className="inline-flex rounded-full bg-[rgba(255,122,89,0.14)] px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-strong)]">
            Phase A Foundation
          </span>
          <h1 className="mt-6 max-w-2xl text-5xl font-black tracking-[-0.04em] sm:text-6xl">
            Build the karaoke room before the first song starts.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            This starter app is wired for the MVP plan: room creation, queue management,
            and synced lyrics backed by Supabase.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {milestones.map((milestone) => (
              <article
                key={milestone}
                className="rounded-3xl border border-[rgba(255,255,255,0.65)] bg-white/70 p-5"
              >
                <p className="text-sm font-medium leading-6 text-[var(--foreground)]">
                  {milestone}
                </p>
              </article>
            ))}
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <section className="rounded-[2rem] border border-[var(--panel-border)] bg-[#1b1432] p-8 text-white shadow-[0_20px_60px_rgba(27,20,50,0.24)]">
            <p className="text-sm uppercase tracking-[0.2em] text-[#ffd9cc]">Start A Room</p>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em]">
              Create a lobby and hand the mic to your first guests.
            </h2>
            <form action="/rooms/create" method="post" className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-semibold text-[#ffd9cc]">Your display name</span>
                <input
                  required
                  name="hostDisplayName"
                  defaultValue={params.displayName}
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/60"
                  placeholder="Alex"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-[#ffd9cc]">Room name</span>
                <input
                  name="roomName"
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/60"
                  placeholder="Friday Night Karaoke"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-2xl bg-[#ff7a59] px-4 py-3 text-base font-semibold text-[#1b1432] transition hover:bg-[#ff936f]"
              >
                Create room
              </button>
            </form>

            {params.createError ? (
              <p className="mt-4 rounded-2xl border border-[#ffb7a1] bg-[#fff1ec] px-4 py-3 text-sm text-[#7a2710]">
                {params.createError}
              </p>
            ) : null}
          </section>

          <section className="rounded-[2rem] border border-[var(--panel-border)] bg-white/82 p-8 shadow-[0_18px_50px_rgba(89,59,130,0.08)]">
            <h2 className="text-xl font-bold">Join an existing room</h2>
            <form action="/rooms/join" method="post" className="mt-4 space-y-4">
              <label className="block">
                <span className="text-sm font-semibold text-[var(--foreground)]">Room code</span>
                <input
                  required
                  name="roomCode"
                  defaultValue={params.roomCode}
                  className="mt-2 w-full rounded-2xl border border-[var(--panel-border)] bg-white px-4 py-3 outline-none placeholder:text-[var(--muted)]"
                  placeholder="DEMO42"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-[var(--foreground)]">Display name</span>
                <input
                  required
                  name="displayName"
                  defaultValue={params.displayName}
                  className="mt-2 w-full rounded-2xl border border-[var(--panel-border)] bg-white px-4 py-3 outline-none placeholder:text-[var(--muted)]"
                  placeholder="Sam"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-2xl border border-[#1b1432] px-4 py-3 text-base font-semibold text-[#1b1432] transition hover:bg-[#1b1432] hover:text-white"
              >
                Join room
              </button>
            </form>

            {params.joinError ? (
              <p className="mt-4 rounded-2xl border border-[#ffb7a1] bg-[#fff1ec] px-4 py-3 text-sm text-[#7a2710]">
                {params.joinError}
              </p>
            ) : null}

            <div className="mt-8">
              <h3 className="text-lg font-bold">Included in this baseline</h3>
              <ul className="mt-4 space-y-3 pl-5 text-[var(--muted)]">
                {foundations.map((item) => (
                  <li key={item} className="list-disc leading-7">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}
