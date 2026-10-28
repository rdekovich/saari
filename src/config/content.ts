export const introduction = {
  eyebrow: "jacob saari, chef",
  headline: ["fish, fire", "& company."],
  description:
    "seafood and cooking over an open fire. i’m a detroit-based chef who likes bringing people together around the table.",
  action: "private chef & pop-ups",
  instagramAction: "see what i’m cooking",
};
export const biography = {
  title: "hi, i’m jacob.",
  paragraphs: [
    "i’m based in detroit and lead the kitchen at casa pernoi in birmingham.",
    "i started out at five guys and have been cooking in restaurants ever since.",
    "friends call me jake, or deens — from saari and sardines. seafood and open-fire cooking are what i keep coming back to.",
  ],
  kitchensLabel: "a few kitchens i’ve been part of",
  kitchens: [
    {
      name: "casa pernoi",
      href: "https://casapernoi.com/",
    },
    {
      name: "bastion",
      href: "https://www.bastionnashville.com/",
      distinction: {
        mark: "michelin-star",
        label: "one Michelin star",
        source:
          "https://guide.michelin.com/us/en/tennessee/nashville_2790527/restaurant/bastion-1214985",
      },
    },
    {
      name: "blackberry farms",
      href: "https://blackberryfarm.com/",
      distinction: {
        mark: "relais-chateaux",
        label: "Relais & Châteaux member",
        source: "https://www.relaischateaux.com/us/hotel/blackberry-farm/",
      },
    },
    {
      name: "chapman house",
    },
  ],
};
export const table = {
  title: "at your table, or ours.",
  description: "private cooking, pop-ups, and good reasons to get together.",
  action: "get in touch",
};
export const offerings = [
  {
    number: "01",
    illustration: "open-fire",
    title: "private chef",
    subtitle: "dinners & special occasions",
    description:
      "a dinner at home, a special occasion, or something you have in mind. i’ll plan and cook a menu around your table, tastes, and dietary needs.",
  },
  {
    number: "02",
    illustration: "guest-dinner",
    title: "pop-ups & collaborations",
    subtitle: "guest kitchens & shared menus",
    description:
      "a guest menu, a pop-up, or a dinner with another chef. i’m always interested in cooking with new people and in new places.",
  },
] as const;
export const contact = {
  eyebrow: "private chef & pop-ups",
  title: "get in touch.",
};
