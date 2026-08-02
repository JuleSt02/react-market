import "dotenv/config";

import { HeatLevel, Prisma } from "@prisma/client";

import { prisma } from "../lib/prisma";

const sauces = [
  {
    title: "Golden Mango Glow",
    description:
      "A sweet mango sauce with a gentle chili warmth and a bright citrus finish.",
    price: "6.95",
    heatLevel: HeatLevel.MILD,
    originCountry: "Spain",
    image: "/images/sauces/golden-mango-glow.jpg",
  },
  {
    title: "Smoky Paprika Kiss",
    description:
      "A mild smoked paprika sauce with roasted garlic and a subtle sweetness.",
    price: "7.25",
    heatLevel: HeatLevel.MILD,
    originCountry: "Spain",
    image: "/images/sauces/smoky-paprika-kiss.jpg",
  },
  {
    title: "Pineapple Ember",
    description: "Tropical pineapple balanced with lime and a soft chili heat.",
    price: "7.50",
    heatLevel: HeatLevel.WARM,
    originCountry: "Costa Rica",
    image: "/images/sauces/pineapple-ember.jpg",
  },
  {
    title: "Jalapeño Garden",
    description:
      "A fresh green jalapeño sauce with coriander, garlic and lime.",
    price: "6.75",
    heatLevel: HeatLevel.WARM,
    originCountry: "Mexico",
    image: "/images/sauces/jalapeno-garden.jpg",
  },
  {
    title: "Chipotle Sunset",
    description:
      "Smoky chipotle peppers blended with tomato and caramelised onion.",
    price: "8.20",
    heatLevel: HeatLevel.SPICY,
    originCountry: "Mexico",
    image: "/images/sauces/chipotle-sunset.jpg",
  },
  {
    title: "Cayenne Current",
    description:
      "A sharp cayenne sauce with vinegar, sea salt and a clean finish.",
    price: "6.90",
    heatLevel: HeatLevel.SPICY,
    originCountry: "United States",
    image: "/images/sauces/cayenne-current.jpg",
  },
  {
    title: "Red Pepper Rhythm",
    description:
      "Fermented red peppers with garlic and a balanced medium heat.",
    price: "8.50",
    heatLevel: HeatLevel.SPICY,
    originCountry: "Portugal",
    image: "/images/sauces/red-pepper-rhythm.jpg",
  },
  {
    title: "Serrano Storm",
    description:
      "Bright serrano peppers combined with green tomato, lime and herbs.",
    price: "7.80",
    heatLevel: HeatLevel.HOT,
    originCountry: "Mexico",
    image: "/images/sauces/serrano-storm.jpg",
  },
  {
    title: "Habanero Sunrise",
    description:
      "Fruity orange habanero with carrot, citrus and a lasting heat.",
    price: "8.95",
    heatLevel: HeatLevel.HOT,
    originCountry: "Belize",
    image: "/images/sauces/habanero-sunrise.jpg",
  },
  {
    title: "Garlic Fireline",
    description: "A bold garlic-forward sauce powered by red habanero peppers.",
    price: "8.40",
    heatLevel: HeatLevel.HOT,
    originCountry: "Spain",
    image: "/images/sauces/garlic-fireline.jpg",
  },
  {
    title: "Scorpion Orchard",
    description: "Trinidad scorpion heat softened slightly by apple and pear.",
    price: "10.50",
    heatLevel: HeatLevel.FIERY,
    originCountry: "Trinidad and Tobago",
    image: "/images/sauces/scorpion-orchard.jpg",
  },
  {
    title: "Black Garlic Blaze",
    description:
      "Deep black garlic flavour with habanero and smoked chili peppers.",
    price: "10.95",
    heatLevel: HeatLevel.FIERY,
    originCountry: "Japan",
    image: "/images/sauces/black-garlic-blaze.jpg",
  },
  {
    title: "Ghost Pepper Smoke",
    description:
      "Smoked ghost pepper sauce with tomato, onion and dark molasses.",
    price: "11.50",
    heatLevel: HeatLevel.FIERY,
    originCountry: "India",
    image: "/images/sauces/ghost-pepper-smoke.jpg",
  },
  {
    title: "Dragon's Breath",
    description:
      "An intense blend of ghost pepper, habanero and roasted garlic.",
    price: "12.25",
    heatLevel: HeatLevel.EXTREME,
    originCountry: "United Kingdom",
    image: "/images/sauces/dragons-breath.jpg",
  },
  {
    title: "Volcanic Nectar",
    description:
      "Sweet agave syrup collides with ghost pepper and bitter orange.",
    price: "11.95",
    heatLevel: HeatLevel.EXTREME,
    originCountry: "Mexico",
    image: "/images/sauces/volcanic-nectar.jpg",
  },
  {
    title: "Midnight Inferno",
    description:
      "A dark, smoky sauce made with chocolate habanero and ghost pepper.",
    price: "12.80",
    heatLevel: HeatLevel.EXTREME,
    originCountry: "Jamaica",
    image: "/images/sauces/midnight-inferno.jpg",
  },
  {
    title: "Reaper's Kiss",
    description:
      "Carolina Reaper heat with a deceptively sweet cherry beginning.",
    price: "13.50",
    heatLevel: HeatLevel.REAPER,
    originCountry: "United States",
    image: "/images/sauces/reapers-kiss.jpg",
  },
  {
    title: "Carolina Cataclysm",
    description:
      "A concentrated Carolina Reaper sauce designed for experienced chili fans.",
    price: "14.95",
    heatLevel: HeatLevel.REAPER,
    originCountry: "United States",
    image: "/images/sauces/carolina-cataclysm.jpg",
  },
  {
    title: "Seven Suns",
    description:
      "A brutal combination of Reaper, scorpion and seven-pot chili peppers.",
    price: "15.50",
    heatLevel: HeatLevel.REAPER,
    originCountry: "Trinidad and Tobago",
    image: "/images/sauces/seven-suns.jpg",
  },
  {
    title: "Final Warning",
    description:
      "An uncompromising Reaper sauce with garlic, vinegar and no added sweetness.",
    price: "16.00",
    heatLevel: HeatLevel.REAPER,
    originCountry: "United States",
    image: "/images/sauces/final-warning.jpg",
  },
] satisfies Omit<Prisma.SauceCreateManyInput, "sellerId">[];

async function main() {
  const seedUser = await prisma.user.upsert({
    where: {
      email: "seller@react-market.dev",
    },
    update: {},
    create: {
      email: "seller@react-market.dev",
      password: "seed-password",
    },
  });

  // Makes the script repeatable without duplicating these sauces.SW
  await prisma.sauce.deleteMany({
    where: {
      sellerId: seedUser.id,
    },
  });

  await prisma.sauce.createMany({
    data: sauces.map((sauce) => ({
      ...sauce,
      sellerId: seedUser.id,
    })),
  });
  console.log(`Seed completed: ${sauces.length} sauces created.`);
}

main()
  .catch((error: unknown) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
