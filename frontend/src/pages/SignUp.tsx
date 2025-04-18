import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { isSigningUp, signUp } = useAuthStore();

  const validateForm = () => {
    const { name, email, password } = formData;
    if (!name) {
      toast.error("name is required");
      return false;
    }
    if (!email) {
      toast.error("email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("invalid email format");
      return false;
    }
    if (!password) {
      toast.error("password is required");
      return false;
    }
    if (password.length < 6) {
      toast.error("password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const success = await signUp(formData);
      if (success) {
        navigate("/");
      }
    }
  };

  return (
    <section className="h-screen bg-base-200">
      <div className="px-6 mx-auto h-[calc(100vh-65px)] flex flex-col items-center justify-center">
        <div className="mb-10">
          <h1 className="text-xl md:text-3xl font-extrabold leading-tight tracking-tight text-base-content">Create an account</h1>
        </div>
        <div className="w-full bg-base-100 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="username" className="text-[15px] font-bold text-base-content block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="username"
                  className="input input-bordered w-full"
                  placeholder="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="email" className="text-[15px] font-bold text-base-content block mb-2">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="input input-bordered w-full"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="password" className="text-[15px] font-bold text-base-content block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
              <button disabled={isSigningUp} type="submit" className="btn btn-primary w-full">
                {isSigningUp ? <LoaderCircle className="animate-spin" /> : "Create an account"}
              </button>
              <p className="text-sm font-light text-base-content/70">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-primary hover:underline">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
