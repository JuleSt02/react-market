import { getSauceById } from "@/data/sauces/get-sauce-by-id";
import Link from "next/link";
import type { Sauce } from "@prisma/client";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface SauceDetailsPageProps {
    params: Promise <{
        id:string;
    }>;
}

export async function generateMetadata({
  params,
}: SauceDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const sauce = await getSauceById(id);

  if (!sauce) {
    notFound();
  }

  return {
    title: `${sauce.title} - $${sauce.price.toString()}`,
    description: sauce.description,
  };
}




export default async  function SauceDetailPage ({
    params,
}: SauceDetailsPageProps) {
    const {id} = await params;

    const sauce = await  getSauceById(id)

    if (!sauce) {
        notFound();
    }


    return(
        <main>
            <Link href ="/sauces"> Back to sauces</Link>
            <article>
      
      <div  className="w-full max-w-xs overflow-hidden rounded-lg bg-red-400 shadow-lg">
       <div className="px-6 py-6 text-white">
          <span className="block text-sm opacity-75">
            {sauce.originCountry}
          </span>

          <h2 className="mt-1 text-xl font-semibold">
            {sauce.title}
          </h2>

          <p className="mt-3 text-sm">
            {sauce.description}
          </p>

          <p className="mt-3">
            Heat: {sauce.heatLevel}
          </p>
               
            <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-orange-500">
            ${sauce.price.toString()}
            </span>
        </div>
        </div>
         </article>
        </main>
    )
}