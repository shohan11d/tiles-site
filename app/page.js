import Work from "@/components/WorkWith";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-neutral-950 text-white">
      {/* Hero Banner */}
      <section className="relative flex flex-col items-center justify-center px-6 py-24 text-center sm:py-32 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Discover Your <br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Perfect Aesthetic
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-neutral-400 sm:text-xl">
            Explore a curated gallery of high-quality tiles for your next project. 
            From minimalist modern to timeless classics, find the inspiration you need.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/tiles"
              className="rounded-full bg-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-indigo-500/20 transition-all hover:bg-indigo-700 hover:shadow-indigo-500/40 active:scale-95"
            >
              Browse Now
            </Link>
            <Link
              href="/about"
              className="text-sm font-semibold leading-6 text-white transition-colors hover:text-indigo-400"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <Work /> 
        {/* Decorative elements (subtle) */}
        <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-20 blur-[120px] bg-indigo-600 rounded-full"></div>
      </section>
    </div>
  );
}
