import { NextResponse } from "next/server";
import { getRoomRepository } from "@/features/rooms/repository";
import { ROOM_SESSION_COOKIE, serializeRoomSession } from "@/features/rooms/session";
import { joinRoom } from "@/features/rooms/service";

export async function POST(request: Request) {
  const formData = await request.formData();
  const repository = getRoomRepository();
  const roomCode = String(formData.get("roomCode") ?? "");
  const displayName = String(formData.get("displayName") ?? "");

  try {
    const joined = await joinRoom(
      {
        roomCode,
        displayName,
      },
      repository,
    );
    const destination = new URL(`/rooms/${joined.room.code}`, request.url);
    destination.searchParams.set("participant", joined.participant.id);

    const response = NextResponse.redirect(destination, {
      status: 303,
    });

    response.cookies.set(
      ROOM_SESSION_COOKIE,
      serializeRoomSession({
        participantId: joined.participant.id,
        roomCode: joined.room.code,
      }),
      {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      },
    );

    return response;
  } catch (error) {
    const destination = new URL("/", request.url);
    destination.searchParams.set(
      "joinError",
      error instanceof Error ? error.message : "Unknown error",
    );
    destination.searchParams.set("roomCode", roomCode);
    destination.searchParams.set("displayName", displayName);

    return NextResponse.redirect(destination, {
      status: 303,
    });
  }
}
