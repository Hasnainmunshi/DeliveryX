"use client";
import axios from "axios";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Leaf,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

type propType = {
  previousStep: (s: number) => void;
  onSuccess?: () => void;
};

function RegisterForm({ previousStep, onSuccess }: propType) {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [serverError, setServerError] = useState("");

  // validate
  const validate = () => {
    const newErrors = { name: "", email: "", password: "", mobile: "" };
    if (!form.name.trim()) newErrors.name = "Name is Required";
    if (!form.email.includes("@")) newErrors.email = "Valid email Required";
    if (form.password.length < 6) newErrors.password = "Min 6 characters";
    if (form.mobile.length < 11)
      newErrors.mobile = "Valid mobile number required";
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError("");
    try {
      const result = await axios.post("/api/auth/register", form);
      console.log("data", result.data);
      onSuccess?.();
    } catch (err: any) {
      setServerError(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      icon: User,
      key: "name",
      type: "text",
      placeholder: "Your name",
      autoComplete: "off",
    },
    {
      icon: Mail,
      key: "email",
      type: "email",
      placeholder: "Your email",
      autoComplete: "off",
    },
    {
      icon: Lock,
      key: "password",
      type: "password",
      placeholder: "Your password",
      autoComplete: "new-password",
    },
    {
      icon: Phone,
      key: "mobile",
      type: "tel",
      placeholder: "Your mobile",
      autoComplete: "off",
    },
  ] as const;
  return (
    <div className="flex flex-col justify-center items-center min-h-screen  px-8">
      <div
        className="flex absolute top-6 left-6 items-center  gap-1 text-green-700 hover:text-green-800 transition-colors cursor-pointer"
        onClick={() => previousStep(1)}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back</span>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl p-12 space-y-5 shadow-xl"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-green-700">Create Account</h1>
          <p className="flex justify-center items-center text-sm text-gray-500 ">
            Join DeliverX today <Leaf className="w-5 h-5 text-green-400" />{" "}
          </p>
        </div>
        {serverError && (
          <p className="text-sm text-red-500 text-center">{serverError}</p>
        )}
        <form onSubmit={handleRegister} className="space-y-3">
          {fields.map(
            ({ icon: Icon, key, type, placeholder, autoComplete }) => (
              <div key={key}>
                <div className="relative">
                  <Icon className="absolute left-3.5 top-1/2  -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    autoComplete={autoComplete}
                    type={key === "password" && showPass ? "text" : type}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                    className={`w-full pl-10 pr-10 py-3 text-sm  border rounded-xl outline-none transition focus:ring-2 focus:ring-green-100 ${errors[key] ? "border-red-400 focus:border-e-red-400" : "border-gray-200 focus:border-green-400"}`}
                  />
                  {key === "password" && (
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3.5 top-1/2  -translate-y-1/2 text-gray-400"
                    >
                      {showPass ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
                {errors[key] && (
                  <p
                    className="text-sm text-red-500 mt-1 pl-1
                "
                  >
                    {errors[key]}
                  </p>
                )}
              </div>
            ),
          )}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={
              loading ||
              !form.name.trim() ||
              !form.email.trim() ||
              !form.password.trim() ||
              !form.mobile.trim()
            }
            className={`w-full inline-flex items-center justify-center gap-2  py-3 rounded-2xl shadow-lg transition-colors font-semibold text-base ${
              loading ||
              !form.name.trim() ||
              !form.email.trim() ||
              !form.password.trim() ||
              !form.mobile.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "text-white bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {" "}
                Register <ArrowRight className=" w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>
        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 border-b border-gray-200"> </div>
          <p>or</p>
          <div className="flex-1 border-b border-gray-200"></div>
        </div>
        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
          <FcGoogle className="w-5 h-5" onClick={() => signIn("google")} />
          continue with google
        </button>
        <div className="flex justify-center items-center gap-0.5">
          <p className="text-center text-sm text-gray-500">
            Already have an account ?
          </p>
          <Link
            href="/login"
            className="text-green-600 text-sm font-semibold hover:underline"
          >
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default RegisterForm;
