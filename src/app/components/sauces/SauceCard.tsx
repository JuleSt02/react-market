import Link from "next/link";

import type { Sauce } from "@prisma/client";


interface SauceCardProps {
  sauce: Sauce
}

export default  function SauceCard (props: SauceCardProps) {
 
 

 return (
<article>
      
      <div  className="w-full max-w-xs overflow-hidden rounded-lg bg-red-400 shadow-lg">
       <div className="px-6 py-6 text-white">
          <span className="block text-sm opacity-75">
            {props.sauce.originCountry}
          </span>

          <h2 className="mt-1 text-xl font-semibold">
            {props.sauce.title}
          </h2>

          <p className="mt-3 text-sm">
            {props.sauce.description}
          </p>

          <p className="mt-3">
            Heat: {props.sauce.heatLevel}
          </p>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-sm font-medium">
              <Link href={`/sauces/${props.sauce.id}`}>
               View sauce
              </Link>
            </span>
               
            <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-orange-500">
              {props.sauce.price.toString()}€
            </span>
          </div>
        </div>
      </div>
</article>
        )


}