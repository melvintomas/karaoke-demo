import { randomInt } from "node:crypto";

const ROOM_CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function normalizeRoomCode(value: string) {
  return value.trim().toUpperCase();
}

export function generateRoomCode(
  length = 6,
  nextIndex: (max: number) => number = randomInt,
) {
  let code = "";

  for (let index = 0; index < length; index += 1) {
    code += ROOM_CODE_ALPHABET[nextIndex(ROOM_CODE_ALPHABET.length)];
  }

  return code;
}
