export type GalleryPhoto = {
  id: string;
  label: string;
  alt: string;
  width: number;
  height: number;
  dish?: string;
  place?: string;
  date?: string;
  note?: string;
};

export const gallery = {
  title: "from the kitchen.",
  description: "ingredients, fire, and the work in between.",
  instruction: "turn a photo over for the notes.",
  placeholderDish: "[dish name]",
  placeholderNote: "[a few words from jake about the dish.]",
};

export const galleryPhotos: readonly GalleryPhoto[] = [
  {
    id: "tomatoes",
    label: "tomatoes",
    alt: "A close view of blistered red tomatoes with charred skins and green herbs.",
    width: 3024,
    height: 4032,
    dish: "barbecued tomatoes",
    note: "i seared the tomatoes over hot coals for color, then raised them above the fire to smoke for four to five hours, until tender and full of wood-fire flavor.",
    place: "walland, tn",
    date: "june 2023",
  },
  {
    id: "fish-course",
    label: "fish",
    alt: "Crisp-skinned Eagle Creek trout with saffron beurre blanc and chive oil on a white plate.",
    width: 2855,
    height: 2913,
    dish: "eagle creek trout",
    note: "local trout from eagle creek, with a succotash of corn, tomato and peas. i finished it with saffron beurre blanc and chive oil.",
    place: "birmingham, mi",
    date: "april 2026",
  },
  {
    id: "open-fire",
    label: "over the coals",
    alt: "A hand using tongs over a grate, glowing coals and an open wood fire.",
    width: 4284,
    height: 5712,
    dish: "dry-aged wagyu strip",
    note: "a bone-in wagyu new york strip, cooked over an open flame at camp. served with charred zucchini and salsa verde.",
    place: "port austin, mi",
    date: "september 2026",
  },
  {
    id: "pasta",
    label: "by hand",
    alt: "Rows of handmade braised lamb empanadas with individually crimped edges.",
    width: 3024,
    height: 4032,
    dish: "braised lamb empanadas",
    note: "we filled these by hand with braised lamb, a mirepoix of carrot, celery and onion, and spanish seasonings.",
    place: "utica, mi",
    date: "october 2024",
  },
  {
    id: "plated-course",
    label: "at the pass",
    alt: "Salmon belly crudo with melon, avocado purée and puffed wild rice in a white bowl.",
    width: 2803,
    height: 2839,
    dish: "salmon belly crudo",
    note: "i cured the salmon belly with nori and served it with melon balls compressed in sumac lemonade, dots of avocado purée, puffed wild rice and verjus.",
    place: "birmingham, mi",
    date: "august 2025",
  },
  {
    id: "plating",
    label: "finishing touches",
    alt: "Hands finishing roasted delicata squash with seeds and herbs over a piquillo pepper coulis.",
    width: 2649,
    height: 2649,
    dish: "roasted delicata squash",
    note: "roasted delicata squash, glazed with pomegranate molasses and set over a piquillo pepper coulis. i finished it with seeds and herbs for a little crunch.",
    place: "birmingham, mi",
    date: "january 2026",
  },
];
