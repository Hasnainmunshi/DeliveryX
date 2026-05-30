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
} from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  // validate
  const validate = () => {
    const newErrors = { email: "", password: "" };
    if (!form.email.includes("@")) newErrors.email = "Valid email Required";
    if (form.password.length < 6) newErrors.password = "Min 6 characters";
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };
  const isDisabled = loading || !form.email.trim() || !form.password.trim();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError("");

    try {
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.error) {
        setServerError("Invalid email or password");
        return;
      }
      router.push("/");
    } catch {
      setServerError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
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
  ] as const;
  return (
    <div className="flex flex-col justify-center items-center min-h-screen  px-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl p-12 space-y-5 shadow-xl"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-green-700">Welcome Back</h1>
          <p className="flex justify-center items-center text-sm text-gray-500 ">
            Login to DeliverX <Leaf className="w-5 h-5 text-green-400" />{" "}
          </p>
        </div>
        {serverError && (
          <p className="text-sm text-red-500 text-center">{serverError}</p>
        )}
        <form onSubmit={handleLogin} className="space-y-3">
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
            disabled={isDisabled}
            className={`w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl shadow-lg transition-colors font-semibold text-base ${loading || !form.email.trim() || !form.password.trim() ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {" "}
                Login <ArrowRight className=" w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>
        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 border-b border-gray-200"> </div>
          <p>or</p>
          <div className="flex-1 border-b border-gray-200"></div>
        </div>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
        >
          <FcGoogle className="w-5 h-5" />
          continue with google
        </button>
        <div className="flex justify-center items-center gap-0.5">
          <p className="text-center text-sm text-gray-500">
            Want to create an account ?
          </p>
          <Link
            href="/register"
            className="text-green-600 text-sm font-semibold hover:underline"
          >
            Register
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
