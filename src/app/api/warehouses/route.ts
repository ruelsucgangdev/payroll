import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const warehouses = await prisma.warehouse.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(warehouses);
}

export async function POST(request: Request) {
  const data = await request.json();

  if (!data.code || !data.name) {
    return new NextResponse("Missing required fields", { status: 400 });
  }

  const warehouse = await prisma.warehouse.upsert({
    where: { id: data.id },
    update: {
      code: data.code,
      name: data.name,
      location: data.location,
      capacity: data.capacity,
      manager: data.manager,
      remarks: data.remarks,
      status: data.status,
    },
    create: {
      id: data.id,
      code: data.code,
      name: data.name,
      location: data.location,
      capacity: data.capacity,
      manager: data.manager,
      remarks: data.remarks,
      status: data.status,
    },
  });

  return NextResponse.json(warehouse);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new NextResponse("Missing ID", { status: 400 });
  }

  await prisma.warehouse.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
