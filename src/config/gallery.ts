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
  },
  {
    id: "fish-course",
    label: "fish",
    alt: "A crisp-skinned fish fillet with golden sauce and green accents on a white plate.",
    width: 2855,
    height: 2913,
  },
  {
    id: "open-fire",
    label: "over the coals",
    alt: "A hand using tongs over a grate, glowing coals and an open wood fire.",
    width: 4284,
    height: 5712,
  },
  {
    id: "pasta",
    label: "by hand",
    alt: "Neat rows of handmade crescent pasta with individually crimped edges.",
    width: 3024,
    height: 4032,
  },
  {
    id: "plated-course",
    label: "at the pass",
    alt: "A neatly arranged pink dish with green accents and crisp garnishes in a white bowl.",
    width: 2803,
    height: 2839,
  },
  {
    id: "plating",
    label: "finishing touches",
    alt: "Hands finishing a dish with a fish spatula, chopped herbs and bright green oil.",
    width: 2649,
    height: 2649,
  },
];
