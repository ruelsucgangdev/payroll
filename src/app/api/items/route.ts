import { PrismaClient } from "@/generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { productName: "asc" },
  });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const data = await request.json();

  if (
    !data.id ||
    !data.sku ||
    !data.productCode ||
    !data.productName ||
    !data.categoryId
  ) {
    return new NextResponse("Missing required fields", { status: 400 });
  }

  const product = await prisma.product.upsert({
    where: { id: data.id },
    update: {
      sku: data.sku,
      productCode: data.productCode,
      productName: data.productName,
      categoryId: data.categoryId,
      description: data.description,
    },
    create: {
      id: data.id,
      sku: data.sku,
      productCode: data.productCode,
      productName: data.productName,
      categoryId: data.categoryId,
      description: data.description,
    },
  });

  return NextResponse.json(product);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new NextResponse("Missing ID", { status: 400 });
  }

  await prisma.product.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
