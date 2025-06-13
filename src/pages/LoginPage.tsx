import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/Login";

function LoginPage() {
  return (
    <div>
      <AuthLayout
        formSide="left"
        form={<LoginForm />}
        title="Welcome Back"
        subtitle="Sign in to your SmartDesk account"
        description="Boost your productivity with AI-powered tools. Manage tasks, take intelligent notes, and achieve more with SmartDesk."
      />
    </div>
  );
}

export default LoginPage;
