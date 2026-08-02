"use client";

interface GlobalErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function GlobalError({
  error: _error,
  reset,
}: GlobalErrorProps) {
  return (
    <html lang="en">
      <body>
        <main className="p-6 text-center">
          <h1 className="text-3xl font-bold">An error occured</h1>

          <p className="mt-4">The application could not be loaded correctly.</p>

          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded bg-black px-4 py-2 text-white"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
