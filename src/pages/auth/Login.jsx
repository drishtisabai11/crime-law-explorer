import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser(formData);

      login(data);

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-92px)] bg-[var(--paper)]">
      <section className="mx-auto grid min-h-[calc(100vh-92px)] max-w-7xl lg:grid-cols-[1.05fr_0.95fr]">
        {/* Editorial panel */}
        <div className="flex flex-col justify-between border-b border-[var(--line)] px-6 py-16 sm:px-10 lg:border-b-0 lg:border-r lg:px-16 lg:py-20">
          <div>
            <p className="eyebrow mb-6">Member Access</p>

            <h1 className="font-display max-w-xl text-5xl leading-[0.98] tracking-[-0.035em] text-[var(--ink)] sm:text-6xl">
              Return to the
              <span className="block text-[var(--burgundy)]">
                archive.
              </span>
            </h1>

            <p className="mt-8 max-w-lg text-base leading-7 text-[var(--muted)] sm:text-lg">
              Sign in to continue exploring criminal cases, legal principles,
              evidence and judicial decisions.
            </p>
          </div>

          <div className="mt-16 border-t border-[var(--line)] pt-6">
            <p className="text-sm leading-6 text-[var(--taupe)]">
              Your account keeps your place across the Crime & Law Explorer
              platform.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="flex items-center px-6 py-16 sm:px-10 lg:px-16">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <p className="eyebrow mb-3">Sign In</p>

              <h2 className="font-display text-3xl tracking-[-0.02em] text-[var(--ink)] sm:text-4xl">
                Welcome back.
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error message */}
              {error && (
                <div className="border border-[var(--burgundy)] bg-[var(--burgundy)]/5 px-4 py-3 text-sm text-[var(--burgundy)]">
                  {error}
                </div>
              )}

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[var(--ink)]"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    strokeWidth={1.5}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--taupe)]"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-[var(--line)] bg-white py-3.5 pl-11 pr-4 text-sm text-[var(--ink)] outline-none transition placeholder:text-[var(--taupe)] focus:border-[var(--burgundy)]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-[var(--ink)]"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={17}
                    strokeWidth={1.5}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--taupe)]"
                  />

                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full border border-[var(--line)] bg-white py-3.5 pl-11 pr-4 text-sm text-[var(--ink)] outline-none transition placeholder:text-[var(--taupe)] focus:border-[var(--burgundy)]"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 bg-[var(--burgundy)] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[var(--burgundy-dark)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}

                {!loading && (
                  <ArrowRight
                    size={16}
                    strokeWidth={1.7}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>
            </form>

            <div className="mt-8 border-t border-[var(--line)] pt-6">
              <p className="text-sm text-[var(--muted)]">
                New to the archive?{" "}
                <Link
                  to="/register"
                  className="font-medium text-[var(--burgundy)] transition hover:text-[var(--burgundy-dark)]"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;