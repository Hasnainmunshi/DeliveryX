import { connectDB } from "@/lib/db";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    console.log("DB Connected");

    const body = await req.json();
    let { name, email, mobile, role } = body;
    const { password } = body;

    name = name?.trim();
    email = email?.trim().toLowerCase();
    mobile = mobile?.trim();

    if (!name || !email || !password || !mobile) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email format",
        },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    if (mobile.length < 11) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid mobile number",
        },
        { status: 400 },
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      mobile,
      role: "user",
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          mobile: newUser.mobile,
          role: newUser.role,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: `Internal Server Error`,
      },
      { status: 500 },
    );
  }
}
