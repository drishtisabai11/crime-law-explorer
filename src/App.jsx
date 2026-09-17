import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Gavel,
  Menu,
  Scale,
  Search as SearchIcon,
  Shield,
  Bookmark,
  X,
} from "lucide-react";

import Cases from "./pages/cases/Cases";
import CaseDetails from "./pages/cases/CaseDetails";

import Laws from "./pages/laws/Laws";
import LawDetails from "./pages/laws/LawDetails";

import Search from "./pages/search/Search";

import Challenge from "./pages/challenge/Challenge";

import About from "./pages/about/About";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Archive from "./pages/archive/Archive";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--paper)]/95 backdrop-blur">
      <div className="mx-auto flex min-h-[72px] max-w-[1400px] items-center justify-between px-5 sm:px-6 lg:px-10">

        {/* Brand */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex shrink-0 items-center gap-3"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--ink)]">
            <Scale size={21} strokeWidth={1.4} />
          </div>

          <div>
            <div className="font-display text-[19px] leading-none sm:text-[20px]">
              Crime & Law
            </div>

            <div className="font-display text-[19px] leading-none sm:text-[20px]">
              <span className="text-[var(--burgundy)]">
                Explorer
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          <Link
            to="/"
            className="text-[13px] transition hover:text-[var(--burgundy)]"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="text-[13px] transition hover:text-[var(--burgundy)]"
          >
            About
          </Link>

          <Link
            to="/cases"
            className="text-[13px] transition hover:text-[var(--burgundy)]"
          >
            Explore Cases
          </Link>

          <Link
            to="/laws"
            className="text-[13px] transition hover:text-[var(--burgundy)]"
          >
            Explore Laws
          </Link>

          <Link
            to="/challenge"
            className="text-[13px] transition hover:text-[var(--burgundy)]"
          >
            Case Challenge
          </Link>

          <Link
            to="/search"
            aria-label="Search"
            className="transition hover:text-[var(--burgundy)]"
          >
            <SearchIcon size={20} strokeWidth={1.5} />
          </Link>

          {isAuthenticated && (
            <ProtectedRoute>
              <Link
                to="/archive"
                className="transition hover:text-[var(--burgundy)]"
              >
                My Archive
              </Link>
            </ProtectedRoute>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-5 lg:flex">
          {isAuthenticated ? (
  <>
    <span className="text-sm text-[var(--muted)]">
      {user?.name}
    </span>

    <button
      type="button"
      onClick={logout}
      className="border border-[var(--line)] px-4 py-2 text-xs uppercase tracking-[0.14em] transition hover:border-[var(--burgundy)] hover:text-[var(--burgundy)]"
    >
      Log out
    </button>
  </>
) : (
  <>
    <Link
      to="/login"
      className="text-sm transition hover:text-[var(--burgundy)]"
    >
      Login
    </Link>

    <Link
      to="/register"
      className="bg-[var(--burgundy)] px-5 py-3 text-xs uppercase tracking-[0.14em] text-white transition hover:bg-[var(--burgundy-dark)]"
    >
      Sign Up
    </Link>
  </>
)}
        </div>

        {/* Mobile / Tablet Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((current) => !current)}
          className="flex h-10 w-10 items-center justify-center border border-[var(--line)] text-[var(--ink)] transition hover:border-[var(--burgundy)] hover:text-[var(--burgundy)] lg:hidden"
          aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X size={21} strokeWidth={1.5} />
          ) : (
            <Menu size={21} strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Mobile / Tablet Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-[var(--line)] bg-[var(--paper)] lg:hidden">
          <nav className="mx-auto max-w-[1400px] px-5 py-6 sm:px-6">
            <div className="flex flex-col">

              <Link
                to="/"
                onClick={closeMobileMenu}
                className="border-b border-[var(--line)] py-4 text-sm transition hover:text-[var(--burgundy)]"
              >
                Home
              </Link>

              <Link
                to="/about"
                onClick={closeMobileMenu}
                className="border-b border-[var(--line)] py-4 text-sm transition hover:text-[var(--burgundy)]"
              >
                About
              </Link>

              <Link
                to="/cases"
                onClick={closeMobileMenu}
                className="border-b border-[var(--line)] py-4 text-sm transition hover:text-[var(--burgundy)]"
              >
                Explore Cases
              </Link>

              <Link
                to="/laws"
                onClick={closeMobileMenu}
                className="border-b border-[var(--line)] py-4 text-sm transition hover:text-[var(--burgundy)]"
              >
                Explore Laws
              </Link>

              <Link
                to="/challenge"
                onClick={closeMobileMenu}
                className="border-b border-[var(--line)] py-4 text-sm transition hover:text-[var(--burgundy)]"
              >
                Case Challenge
              </Link>

              <Link
                to="/search"
                onClick={closeMobileMenu}
                className="border-b border-[var(--line)] py-4 text-sm transition hover:text-[var(--burgundy)]"
              >
                Search
              </Link>

              {isAuthenticated && (
                <ProtectedRoute>
                  <Link
                    to="/archive"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-3 text-sm"
                  >
                    <Bookmark size={16} strokeWidth={1.5} />
                    My Archive
                  </Link>
                </ProtectedRoute>
              )};

              <div className="flex flex-col gap-3 pt-5 sm:flex-row">
                {isAuthenticated ? (
  <>
    <div className="border-t border-[var(--line)] pt-4">
      <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
        Signed in as
      </p>

      <p className="mt-2 text-sm text-[var(--ink)]">
        {user?.name}
      </p>
    </div>

    <button
      type="button"
      onClick={() => {
        logout();
        setMobileMenuOpen(false);
      }}
      className="mt-3 w-full border border-[var(--line)] px-4 py-3 text-left text-xs uppercase tracking-[0.14em] transition hover:border-[var(--burgundy)] hover:text-[var(--burgundy)]"
    >
      Log out
    </button>
  </>
) : (
  <>
    <Link
      to="/login"
      onClick={() => setMobileMenuOpen(false)}
      className="py-3 text-sm"
    >
      Login
    </Link>

    <Link
      to="/register"
      onClick={() => setMobileMenuOpen(false)}
      className="bg-[var(--burgundy)] px-5 py-3 text-center text-xs uppercase tracking-[0.14em] text-white"
    >
      Sign Up
    </Link>
  </>
)}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--charcoal)] px-6 py-14 text-[var(--paper)] lg:px-10">
      <div className="mx-auto max-w-[1400px]">

        <div className="grid gap-10 md:grid-cols-4">

          <div className="md:col-span-2">
            <div className="mb-5 font-display text-3xl">
              Crime & Law
              <span className="text-[#b97879]">
                {" "}Explorer
              </span>
            </div>

            <p className="max-w-md text-sm leading-7 text-[#c5beb4]">
              Explore criminal cases, understand the law behind them,
              and discover the stories, evidence and legal decisions
              that shaped each case.
            </p>
          </div>

          <div>
  <p className="mb-6 text-xs uppercase tracking-[0.22em] text-[var(--taupe)]">
    Explore
  </p>

  <div className="space-y-3 text-sm">
    <Link
      to="/cases"
      className="block font-normal leading-6 transition hover:text-white"
    >
      Cases
    </Link>

    <Link
      to="/laws"
      className="block font-normal leading-6 transition hover:text-white"
    >
      Laws
    </Link>

    <Link
      to="/challenge"
      className="block font-normal leading-6 transition hover:text-white"
    >
      Case Challenge
    </Link>
  </div>
</div>

          <div>
  <p className="mb-6 text-xs uppercase tracking-[0.22em] text-[var(--taupe)]">
    Platform
  </p>

  <div className="space-y-3 text-sm">
    <Link
      to="/about"
      className="block font-normal leading-6 transition hover:text-white"
    >
      About & Methodology
    </Link>

    <Link
      to="/login"
      className="block font-normal leading-6 transition hover:text-white"
    >
      Login
    </Link>

    <Link
      to="/register"
      className="block font-normal leading-6 transition hover:text-white"
    >
      Create Account
    </Link>

    <Link
      to="/search"
      className="block font-normal leading-6 transition hover:text-white"
    >
      Search
    </Link>
  </div>
</div>

        </div>

        <div className="my-10 h-px bg-[#514c47]" />

        <div className="flex flex-col justify-between gap-3 text-xs text-[#918a81] sm:flex-row">
          <span>© 2026 Crime & Law Explorer</span>
          <span>Research. Context. Understanding.</span>
        </div>

      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-[var(--paper)]">

      <Navbar />

      <main>

        {/* Hero */}
        <section className="relative overflow-hidden bg-[var(--charcoal)] text-[var(--paper)]">

          <div className="mx-auto grid min-h-[650px] max-w-[1400px] lg:grid-cols-[1.05fr_.95fr]">

            <div className="flex flex-col justify-center px-6 py-20 lg:px-12">

              <div className="eyebrow mb-7 text-[#b9aea1]">
                An investigative legal archive
              </div>

              <h1 className="max-w-[700px] font-display text-5xl leading-[1.03] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
                Real Cases.
                <br />
                Real Laws.
                <br />
                <span className="text-[#b97879]">
                  Deeper Understanding.
                </span>
              </h1>

              <p className="mt-8 max-w-[560px] text-sm leading-7 text-[#c7c0b6] sm:text-base">
                Explore criminal cases, understand the law behind them,
                follow the evidence, and discover how each case moved
                through the justice system.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">

                <Link
                  to="/cases"
                  className="group flex items-center gap-3 bg-[var(--burgundy)] px-6 py-3.5 text-sm text-white transition hover:bg-[var(--burgundy-dark)]"
                >
                  Explore Cases

                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/laws"
                  className="border border-[#716b64] px-6 py-3.5 text-sm transition hover:border-[#b9aea1]"
                >
                  Explore the Law
                </Link>

              </div>

            </div>

            {/* Hero image */}
            <div className="relative min-h-[420px] overflow-hidden border-l border-[#3e3a36]">

              <div
                className="absolute inset-0 bg-cover bg-center opacity-80"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=85')",
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[var(--charcoal)] via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 max-w-[340px] border-l-2 border-[#b97879] pl-5">

                <div className="eyebrow mb-2 text-[#c7bdb0]">
                  Explore the archive
                </div>

                <p className="font-display text-2xl leading-tight">
                  Every case has a story. Every story has a legal record.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* Explore sections */}
        <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">

          <div className="grid gap-px border border-[var(--line)] bg-[var(--line)] md:grid-cols-3">

            <Link
              to="/cases"
              className="group bg-[var(--paper)] p-8 transition hover:bg-[var(--cream)]"
            >
              <Scale
                size={25}
                strokeWidth={1.3}
                className="mb-8 text-[var(--burgundy)]"
              />

              <div className="eyebrow mb-3 text-[var(--muted)]">
                01 / Cases
              </div>

              <h2 className="font-display text-3xl">
                Explore Cases
              </h2>

              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                Browse documented cases, timelines, evidence,
                proceedings and outcomes.
              </p>

              <ArrowRight
                size={18}
                className="mt-7 transition-transform group-hover:translate-x-2"
              />
            </Link>

            <Link
              to="/laws"
              className="group bg-[var(--paper)] p-8 transition hover:bg-[var(--cream)]"
            >
              <BookOpen
                size={25}
                strokeWidth={1.3}
                className="mb-8 text-[var(--burgundy)]"
              />

              <div className="eyebrow mb-3 text-[var(--muted)]">
                02 / Law
              </div>

              <h2 className="font-display text-3xl">
                Explore Laws
              </h2>

              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                Understand legal provisions and discover the
                cases connected to them.
              </p>

              <ArrowRight
                size={18}
                className="mt-7 transition-transform group-hover:translate-x-2"
              />
            </Link>

            <Link
              to="/challenge"
              className="group bg-[var(--paper)] p-8 transition hover:bg-[var(--cream)]"
            >
              <Shield
                size={25}
                strokeWidth={1.3}
                className="mb-8 text-[var(--burgundy)]"
              />

              <div className="eyebrow mb-3 text-[var(--muted)]">
                03 / Challenge
              </div>

              <h2 className="font-display text-3xl">
                Test the Case
              </h2>

              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                Examine evidence, follow the facts and test
                your understanding of a case.
              </p>

              <ArrowRight
                size={18}
                className="mt-7 transition-transform group-hover:translate-x-2"
              />
            </Link>

          </div>

        </section>

        {/* Statement */}
        <section className="border-y border-[var(--line)] bg-[var(--cream)]">

          <div className="mx-auto max-w-[1100px] px-6 py-24 text-center lg:px-10">

            <div className="eyebrow mb-7 text-[var(--burgundy)]">
              Why Crime & Law Explorer
            </div>

            <p className="font-display text-4xl leading-tight tracking-[-0.02em] sm:text-5xl">
              Justice isn't only about the verdict.
              <br />
              <span className="text-[var(--burgundy)]">
                It's about understanding the process.
              </span>
            </p>

          </div>

        </section>

      </main>

      <Footer />

    </div>
  );
}

function Placeholder({ title }) {
  return (
    <div className="min-h-screen bg-[var(--paper)]">

      <Navbar />

      <main className="mx-auto flex min-h-[70vh] max-w-[1400px] items-center px-6 lg:px-10">

        <div>
          <div className="eyebrow mb-5 text-[var(--burgundy)]">
            Coming in the next build stage
          </div>

          <h1 className="font-display text-6xl">
            {title}
          </h1>
        </div>

      </main>

      <Footer />

    </div>
  );
}

function App() {
  const location = useLocation();
  const path = location.pathname;

  if (path.startsWith("/cases/")) {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Navbar />
      <CaseDetails />
      <Footer />
    </div>
  );
}
  
  if (path === "/cases") {
    return (
      <div className="min-h-screen bg-[var(--paper)]">
        <Navbar />
        <Cases />
        <Footer />
      </div>
    );
  }

  if (path.startsWith("/laws/")) {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Navbar />
      <LawDetails />
      <Footer />
    </div>
  );
}

if (path === "/laws") {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Navbar />
      <Laws />
      <Footer />
    </div>
  );
}

  if (path === "/challenge") {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Navbar />
      <Challenge />
      <Footer />
    </div>
  );
}

  if (path === "/search") {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Navbar />
      <Search />
      <Footer />
    </div>
  );
}

if (path === "/about") {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Navbar />
      <About />
      <Footer />
    </div>
  );
}

  if (path === "/login") {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Navbar />
      <Login />
      <Footer />
    </div>
  );
}

if (path === "/register") {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Navbar />
      <Register />
      <Footer />
    </div>
  );
}

if (path === "/archive") {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[var(--paper)]">
        <Navbar />
        <Archive />
        <Footer />
      </div>
    </ProtectedRoute>
  );
}

  return <Home />;
}

export default App;