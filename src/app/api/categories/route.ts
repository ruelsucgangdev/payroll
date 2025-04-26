import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const data = await request.json();

  if (!data.code || !data.name) {
    return new NextResponse("Missing required fields", { status: 400 });
  }

  const category = await prisma.category.upsert({
    where: { id: data.id },
    update: {
      code: data.code,
      name: data.name,
      description: data.description,
    },
    create: {
      id: data.id,
      code: data.code,
      name: data.name,
      description: data.description,
    },
  });

  return NextResponse.json(category);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new NextResponse("Missing ID", { status: 400 });
  }

  await prisma.category.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
