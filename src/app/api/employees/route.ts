import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const employees = await prisma.employee.findMany({
    orderBy: { lastName: "asc" },
  });

  return NextResponse.json(employees);
}

export async function POST(request: Request) {
  const body = await request.json();

  const {
    employeeNo,
    lastName,
    firstName,
    middleName,
    gender,
    dateOfBirth,
    age,
    contactNumber,
    address,
    dateHired,
    sss,
    tin,
    pagibig,
    philhealth,
    isSSSMember,
    isPhilhealthMember,
    isPagibigMember,
    status,
    position,
    department,
  } = body;

  const created = await prisma.employee.create({
    data: {
      employeeNumber: employeeNo,
      lastName,
      firstName,
      middleName,
      gender,
      dateOfBirth: new Date(dateOfBirth),
      age,
      contactNumber,
      address,
      dateHired: new Date(dateHired),
      sss,
      tin,
      pagibig,
      philhealth,
      isSSSMember,
      isPhilhealthMember,
      isPagibigMember,
      status,
      position,
      department,
    },
  });

  return NextResponse.json(created, { status: 201 });
}
