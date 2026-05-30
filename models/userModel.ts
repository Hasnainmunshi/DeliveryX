import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  password?: string;
  mobile?: string;
  role: "user" | "deliveryBoy" | "admin";
  provider?: "credentials" | "google";
}
type SafeUser = Omit<IUser, "password"> & {
  password?: string;
  __v?: number;
};

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },
    image: {
      type: String,
    },
    password: {
      type: String,
      required: false,
      minlength: 6,
    },
    mobile: {
      type: String,
      required: false,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "deliveryBoy", "admin"],
      default: "user",
    },
    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },
  },
  { timestamps: true },
);

userSchema.set("toJSON", {
  transform: (_doc, ret: SafeUser) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
