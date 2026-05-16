export type LyricLine = {
  startMs: number;
  endMs: number;
  text: string;
};

export function serializeLyricLines(lines: LyricLine[]) {
  return JSON.stringify(
    [...lines]
      .sort((left, right) => left.startMs - right.startMs)
      .map((line) => ({
        startMs: line.startMs,
        endMs: line.endMs,
        text: line.text.trim(),
      })),
  );
}

export function deserializeLyricLines(payload: string) {
  const parsed = JSON.parse(payload) as LyricLine[];

  return parsed.map((line) => ({
    startMs: line.startMs,
    endMs: line.endMs,
    text: line.text,
  }));
}
