import { PrismaClient } from "@/generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const conversions = await prisma.conversionMatrix.findMany({
    orderBy: { qty: "asc" },
  });
  return NextResponse.json(conversions);
}

export async function POST(request: Request) {
  const data = await request.json();

  if (!data.productId || !data.fromUomId || !data.toUomId || !data.qty) {
    return new NextResponse("Missing required fields", { status: 400 });
  }

  const conversion = await prisma.conversionMatrix.create({
    data: {
      productId: data.productId,
      fromUomId: data.fromUomId,
      toUomId: data.toUomId,
      qty: parseFloat(data.qty),
    },
  });

  return NextResponse.json(conversion);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new NextResponse("Missing ID", { status: 400 });
  }

  await prisma.conversionMatrix.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
