import Link from "next/link";

import type { Sauce } from "@prisma/client";

interface SauceCardProps {
  sauce: Sauce;
}

export default function SauceCard(props: SauceCardProps) {
  return (
    <article>
      <div className="w-full max-w-xs overflow-hidden rounded-lg bg-red-600 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
        <div className="px-6 py-6 text-white">
          <span className="block text-sm opacity-80">
            {props.sauce.originCountry}
          </span>

          <h2 className="mt-2 text-xl font-semibold">{props.sauce.title}</h2>

          <p className="mt-3 text-sm leading-6 opacity-95">
            {props.sauce.description}
          </p>

          <p className="mt-4 font-medium">Heat: {props.sauce.heatLevel}</p>

          <div className="mt-6 flex items-center justify-between">
            <Link
              href={`/sauces/${props.sauce.id}`}
              className="text-sm font-medium transition hover:underline"
            >
              View sauce
            </Link>

            <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-red-600">
              {props.sauce.price.toString()}€
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
