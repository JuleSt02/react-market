import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
      <span className="mb-4 text-6xl">🌶️</span>

      <h1 className="mb-6 text-5xl font-bold">Welcome to Fiery Sauces</h1>

      <p className="mb-10 max-w-2xl text-lg text-gray-600">
        Discover handcrafted hot sauces from around the world or create your own
        listings and share your hottest creations.
      </p>

      <Link
        href="/sauces"
        className="rounded-lg bg-red-600 px-8 py-3 font-semibold text-white transition hover:bg-red-700"
      >
        Browse Sauces
      </Link>
    </main>
  );
}
