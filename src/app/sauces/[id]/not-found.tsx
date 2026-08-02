import Link from "next/link";

export default function SauceNotFound() {
  return (
    <main className="p-6 text-center">
      <h1 className="text-3xl font-bold">Sauce not found</h1>

      <p className="mt-4">The sauce you are looking for does not exist.</p>

      <Link href="/sauces" className="mt-6 inline-block underline">
        Return to sauces
      </Link>
    </main>
  );
}
