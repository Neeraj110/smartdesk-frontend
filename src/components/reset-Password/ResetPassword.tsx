import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useResetPasswordMutation } from "@/redux/user/userApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Zod schema
const resetPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

function ResetPassword() {
  const navigate = useNavigate();
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (values: ResetPasswordFormData) => {
    try {
      await resetPassword(values).unwrap();
      toast.success("Password reset successfully");
      navigate("/login");
      form.reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
      <div className="w-full max-w-md bg-white/30 dark:bg-slate-800/40 backdrop-blur-md shadow-xl rounded-xl p-8 sm:p-10 border border-white/20 dark:border-slate-700">
        <h2 className="text-3xl font-bold text-center mb-6 text-slate-800 dark:text-white">
          Reset Your Password
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 dark:text-slate-200">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="bg-white/70 dark:bg-slate-700/50 backdrop-blur-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 dark:text-slate-200">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      className="bg-white/70 dark:bg-slate-700/50 backdrop-blur-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm mt-1" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors duration-300"
            >
              {isLoading ? "Processing..." : "Reset Password"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
