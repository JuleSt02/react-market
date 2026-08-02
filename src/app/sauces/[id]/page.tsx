import { getSauceById } from "@/data/sauces/get-sauce-by-id";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface SauceDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: SauceDetailsPageProps): Promise<Metadata> {
  const { id } = await params;

  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    notFound();
  }

  const sauce = await getSauceById(numericId);

  if (!sauce) {
    notFound();
  }

  return {
    title: `${sauce.title} - $${sauce.price.toString()} | Fiery Sauces`,
    description: sauce.description,
  };
}

export default async function SauceDetailPage({
  params,
}: SauceDetailsPageProps) {
  const { id } = await params;

  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    notFound();
  }

  const sauce = await getSauceById(numericId);

  if (!sauce) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Link
        href="/sauces"
        className="mb-8 inline-block font-medium text-red-600 hover:text-red-700"
      >
        ← Back to Sauces
      </Link>

      <article className="flex justify-center">
        <div className="w-full max-w-md overflow-hidden rounded-lg bg-red-400 shadow-lg">
          <div className="px-8 py-8 text-white">
            <span className="block text-sm opacity-80">
              {sauce.originCountry}
            </span>

            <h1 className="mt-2 text-3xl font-bold">{sauce.title}</h1>

            <p className="mt-6 leading-7">{sauce.description}</p>

            <p className="mt-6 text-lg font-medium">Heat: {sauce.heatLevel}</p>

            <div className="mt-8">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-orange-600">
                ${sauce.price.toString()}
              </span>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
