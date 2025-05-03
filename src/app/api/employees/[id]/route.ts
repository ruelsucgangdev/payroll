import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = (await request.json()) as Record<string, any>;
  const { employeeNo, dateOfBirth, dateHired, ...rest } = body;

  const updated = await prisma.employee.update({
    where: { id: params.id },
    data: {
      employeeNumber: employeeNo,
      dateOfBirth: new Date(dateOfBirth),
      dateHired: new Date(dateHired),
      ...rest,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.employee.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
