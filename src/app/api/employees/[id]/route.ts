import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // 1) await the params promise to get the id
  const { id } = await params;

  // 2) parse the incoming JSON
  const body = (await request.json()) as Record<string, any>;

  // 3) pull out and rename your UI field → Prisma field,
  //    strip off any stray properties
  const {
    employeeNo,
    employeeNumber,
    dateOfBirth,
    dateHired,
    id: _omit, // in case the client sent it
    ...rest // now contains only updatable fields
  } = body;

  const empNum = employeeNo ?? employeeNumber;
  if (!empNum) {
    return NextResponse.json(
      { error: "Missing employeeNo/employeeNumber" },
      { status: 400 }
    );
  }

  // 4) **Rebuild your `data` object** (you must do this)
  const data = {
    employeeNumber: empNum,
    dateOfBirth: new Date(dateOfBirth),
    dateHired: new Date(dateHired),
    ...rest, // lastName, firstName, gender, age, contactNumber, address, sss, tin, pagibig, philhealth, status
  };

  // 5) finally call Prisma with that `data`
  const updated = await prisma.employee.update({
    where: { id },
    data,
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.employee.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
