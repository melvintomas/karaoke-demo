import { NextResponse } from "next/server";
import { getRoomRepository } from "@/features/rooms/repository";
import { ROOM_SESSION_COOKIE, serializeRoomSession } from "@/features/rooms/session";
import { createRoom } from "@/features/rooms/service";

export async function POST(request: Request) {
  const formData = await request.formData();
  const repository = getRoomRepository();

  try {
    const created = await createRoom(
      {
        hostDisplayName: String(formData.get("hostDisplayName") ?? ""),
        roomName: String(formData.get("roomName") ?? ""),
      },
      repository,
    );
    const destination = new URL(`/rooms/${created.room.code}`, request.url);
    destination.searchParams.set("participant", created.participant.id);

    const response = NextResponse.redirect(destination, {
      status: 303,
    });

    response.cookies.set(
      ROOM_SESSION_COOKIE,
      serializeRoomSession({
        participantId: created.participant.id,
        roomCode: created.room.code,
      }),
      {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      },
    );

    return response;
  } catch (error) {
    const message =
      error instanceof Error ? encodeURIComponent(error.message) : "Unknown error";
    return NextResponse.redirect(new URL(`/?createError=${message}`, request.url), {
      status: 303,
    });
  }
}
