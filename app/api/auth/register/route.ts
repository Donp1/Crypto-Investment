import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Full name too short").max(50, "Full name too long"),
  username: z
    .string()
    .min(3, "Username too short")
    .max(30, "Username too long"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Phone number too short"),
  country: z.string().min(2, "Country required"),
  currency: z.string().min(2, "Currency required"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .regex(/(?=.*\d)/, "Password must contain at least one number")
    .regex(
      /(?=.*[!@#$%^&*])/,
      "Password must contain at least one special character"
    ),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, username, email, phone, country, currency, password } =
      result.data;

    // Check for existing email
    const emailExists = await prisma.user.findUnique({ where: { email } });
    if (emailExists) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 }
      );
    }

    // Check for existing username
    const usernameExists = await prisma.user.findUnique({
      where: { username },
    });
    if (usernameExists) {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with new fields
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        phone,
        country,
        currency,
        password: hashedPassword,
      },
    });

    const token = signToken({ id: user.id, email: user.email });

    return NextResponse.json(
      {
        message: "User registered successfully",
        token,
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          phone: user.phone,
          country: user.country,
          currency: user.currency,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
