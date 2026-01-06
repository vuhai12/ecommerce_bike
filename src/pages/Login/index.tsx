import MainLayout from "../../layouts/MainLayout";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const [isVisibility, setIsVisibility] = useState(false);
  const handleTogglePassword = () => {
    setIsVisibility(!isVisibility);
  };

  const loginSchema = z.object({
    email: z.string().min(1, "Please enter email").email("Email is invalid"),
    password: z.string().min(6, "Password must be at least 6 character"),
  });
  type LoginFormData = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async () => {};
  return (
    <MainLayout>
      <div className="rounded-[20px] w-full sm:w-[500px] mx-auto my-[30px] overflow-hidden">
        <h3 className="text-[30px] text-black  text-center py-[10px] font-semibold">
          Login
        </h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-[20px] flex flex-col gap-[20px] text-[16px]"
        >
          <div className="flex flex-col gap-[10px]">
            <label>Email </label>
            <input
              {...register("email")}
              placeholder="email"
              className="py-[10px] px-[20px] border-gray-400 border-[1px] rounded-[10px]"
            />
            {errors.email && (
              <div className="mt-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 border border-red-200">
                {errors.email.message}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-[10px]">
            <label>Password</label>
            <div className="flex">
              <input
                {...register("password")}
                type={isVisibility ? "text" : "password"}
                placeholder="Password"
                className=" py-[10px] flex-1 w-full px-[20px] border-gray-400 border-[1px] rounded-tl-[10px] rounded-bl-[10px]"
              />
              <div
                className="w-[50px] h-[50px] bg-gray-400 flex items-center justify-center"
                onClick={handleTogglePassword}
              >
                {isVisibility ? (
                  <Eye className="w-5 h-5 text-white" />
                ) : (
                  <EyeOff className="w-5 h-5 text-white" />
                )}
              </div>
            </div>
            {errors.password && (
              <div className="mt-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 border border-red-200">
                {errors.password.message}
              </div>
            )}
          </div>
          <p className="text-right text-[12px] ">
            Forgot your{" "}
            <span className="text-[#14c9c9] font-semibold">Password ?</span>
          </p>
          <button className="py-[10px] bg-[#14c9c9] rounded-[10px] text-white font-semibold">
            Submit
          </button>
          <div className="flex justify-center relative items-center">
            <div className="w-[35px] z-[99] h-[35px] rounded-[50%] text-[12px] bg-gray-300 flex items-center justify-center">
              OR
            </div>
            <div className="w-full h-[1px] bg-gray-300 absolute top-1/2 -translate-y-1/2"></div>
          </div>
          <button className="py-[10px] border-[1px] text-[#14c9c9] border-[#14c9c9]  rounded-[10px] ">
            Login with Google
          </button>
          <p className="text-center text-[12px]">
            Did you have an account yet?{" "}
            <span className="text-[#14c9c9] font-semibold">
              <Link to="/register"> Register Now</Link>
            </span>
          </p>
        </form>
      </div>
    </MainLayout>
  );
};

export default Login;
