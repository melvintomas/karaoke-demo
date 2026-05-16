import { describe, expect, it } from "vitest";
import {
  deserializeLyricLines,
  serializeLyricLines,
  type LyricLine,
} from "@/features/songs/lyrics";

describe("lyric serialization", () => {
  it("sorts lines by start time before serializing", () => {
    const lines: LyricLine[] = [
      { startMs: 5000, endMs: 8000, text: "second line" },
      { startMs: 0, endMs: 3000, text: "first line" },
    ];

    const serialized = serializeLyricLines(lines);

    expect(serialized).toContain('"first line"');
    expect(serialized.indexOf("first line")).toBeLessThan(
      serialized.indexOf("second line"),
    );
  });

  it("round-trips serialized lyrics", () => {
    const payload = serializeLyricLines([
      { startMs: 0, endMs: 2000, text: "hello" },
      { startMs: 2500, endMs: 4500, text: "world" },
    ]);

    expect(deserializeLyricLines(payload)).toEqual([
      { startMs: 0, endMs: 2000, text: "hello" },
      { startMs: 2500, endMs: 4500, text: "world" },
    ]);
  });
});
