import { z } from "zod";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthContext } from "src/auth/hooks";
import { DEAFULT_USER } from "src/config-global"; // For routing
import { Icon } from "@iconify/react"; // Import Iconify
import { useState } from "react";

import { paths } from "src/routes/paths"; // Import useState

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(24, "Password must be at most 24 characters long"),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const { login } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: DEAFULT_USER.email || "",
      password: DEAFULT_USER.password || "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Login</h2>
          <div className="relative">
            <button
              type="button"
              onClick={() => reset()}
              className="p-2 text-gray-600 hover:text-gray-800"
              aria-label="Reset form"
            >
              <Icon icon="mdi:refresh" width={24} height={24} />
              {isDirty && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-3 h-3 bg-red-500 text-white text-xs font-semibold rounded-full">
                  !
                </span>
              )}
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
              <input
                id="email"
                type="email"
                {...register("email")}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="you@example.com"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
            </label>

            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <Icon
                    icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
                    width={24}
                    height={24}
                    className="text-gray-500"
                  />
                </button>
              </div>
            </label>

            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
        </form>

        <div className="mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link
            to={paths.auth.register}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
