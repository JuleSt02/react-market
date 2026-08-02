//database failures and unexpected situations

"use client";

interface SaucesErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function SaucesError({ error, reset }: SaucesErrorProps) {
  return (
    <main className="p-6 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>

      <p className="mt-4">We could not load the sauces.</p>

      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded bg-black px-4 py-2 text-white"
      >
        Try again
      </button>
    </main>
  );
}
