import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Loader2, Mail, Lock, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useGoogleLoginMutation, useLoginMutation } from "@/redux/user/userApi";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setUser } from "@/redux/user/userSlice";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [googleLogin, { isLoading: googleLoading }] = useGoogleLoginMutation();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      const user = await login(data).unwrap();
      dispatch(setUser(user?.data));
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login failed:", error?.data?.message || error.message);
      if (error?.status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error("An error occurred during login");
      }
    }
  };

  const handleGoogleSuccess = async (tokenResponse: { code: string }) => {
    if (!tokenResponse.code) {
      console.error("Google login failed");
      return;
    }

    try {
      const { data } = await googleLogin({
        code: tokenResponse.code,
      }).unwrap();
      dispatch(setUser(data));
      toast.success("Google login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("An error occurred during Google login");
    }
  };

  const google = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: (errorResponse) => {
      console.error("Google error:", errorResponse);
    },
    flow: "auth-code",
  });

  const onSubmit = (data: LoginFormData) => {
    if (!isLoading) {
      handleLogin(data);
    }
  };

  return (
    <div className="space-y-6 dark:text-slate-300">
      <Button
        className="w-full  h-12 flex  items-center  justify-center  bg-[#4285F4]  hover:bg-[#357AE8]  text-white  font-medium  rounded  transition-colors "
        disabled={googleLoading}
        onClick={() => google()}
      >
        <Chrome className="mr-2 w-4 h-4" />
        Continue with Google
      </Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 h-12"
                      disabled={isLoading}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-12 h-12"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-0 top-0 h-12 w-12"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center text-sm pt-2">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:transform-none disabled:hover:shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-200 dark:border-slate-700" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-slate-800 px-3 text-slate-500 dark:text-slate-400 font-medium">
            Or sign up with
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm pt-4">
        <p>
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
}
