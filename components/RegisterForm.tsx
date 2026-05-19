"use client";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Leaf,
  Lock,
  Mail,
  User,
} from "lucide-react";
import React, { useState } from "react";

type propType = {
  previousStep: (s: number) => void;
  onSuccess?: () => void;
};

function RegisterForm({ previousStep, onSuccess }: propType) {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });

  const validate = () => {
    const newErrors = { name: "", email: "", password: "" };
    if (!form.name.trim()) newErrors.name = "Name is Required";
    if (!form.email.includes("@")) newErrors.email = "Valid email  Required";
    if (form.password.length < 6) newErrors.password = "Min 6 characters";
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      onSuccess?.();
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { icon: User, key: "name", type: "text", placeholder: "Your name" },
    { icon: Mail, key: "email", type: "email", placeholder: "Your email" },
    {
      icon: Lock,
      key: "password",
      type: "password",
      placeholder: "Your password",
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
        className="w-full max-w-xl p-16 space-y-5 shadow-xl"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-green-700">Create Account</h1>
          <p className="flex justify-center items-center text-sm text-gray-500 ">
            Join DeliverX today <Leaf className="w-5 h-5 text-green-400" />{" "}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          {fields.map(({ icon: Icon, key, type, placeholder }) => (
            <div key={key}>
              <div className="relative">
                <Icon className="absolute left-3.5 top-1/2  -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={key === "password" && showPass ? "text" : type}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
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
          ))}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 text-white bg-green-600 hover:bg-green-700 py-3 rounded-2xl shadow-lg transition-colors font-semibold text-base disabled:opacity-70"
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
      </motion.div>
    </div>
  );
}

export default RegisterForm;
