import Headerlogin from "../../Components/HeaderLogin";
import { LoginForm } from "@/Components/login-form";

const Title = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-green-700 mb-2">Bienvenidos a</h1>
      <span className="text-3xl font-medium text-yellow-500">Little Lemon</span>
    </div>
  );
};

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <Headerlogin />
      <div className="max-w-md mx-auto space-y-8 mt-8">
        <Title />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
