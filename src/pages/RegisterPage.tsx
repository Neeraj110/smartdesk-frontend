import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/Register";

function RegisterPage() {
  return (
    <div>
      <AuthLayout
        formSide="right"
        form={<RegisterForm />}
        title="Join SmartDesk"
        subtitle="Create your account and start your productivity journey"
        description="Transform your workflow with AI-powered productivity tools. Join thousands of users who have revolutionized their daily tasks."
      />
    </div>
  );
}

export default RegisterPage;
