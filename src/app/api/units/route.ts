import { PrismaClient } from "@/generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const units = await prisma.unit.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(units);
}

export async function POST(request: Request) {
  const data = await request.json();

  if (!data.name || !data.abbreviation) {
    return new NextResponse("Missing required fields", { status: 400 });
  }

  const unit = await prisma.unit.upsert({
    where: { id: data.id },
    update: {
      name: data.name,
      abbreviation: data.abbreviation,
    },
    create: {
      id: data.id,
      name: data.name,
      abbreviation: data.abbreviation,
    },
  });

  return NextResponse.json(unit);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new NextResponse("Missing ID", { status: 400 });
  }

  await prisma.unit.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
