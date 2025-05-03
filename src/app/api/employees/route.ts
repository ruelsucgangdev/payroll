// GET all employees, POST create a new one
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const employees = await prisma.employee.findMany();
  return NextResponse.json(employees);
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Record<string, any>;
  const { employeeNo, dateOfBirth, dateHired, ...rest } = body;

  const created = await prisma.employee.create({
    data: {
      employeeNumber: employeeNo,
      // parse date-only strings into full DateTime
      dateOfBirth: new Date(dateOfBirth),
      dateHired: new Date(dateHired),
      // spread the rest: lastName, firstName, gender, age, contactNumber, address, sss, tin, pagibig, philhealth, status
      ...rest,
    },
  });

  return NextResponse.json(created);
}
