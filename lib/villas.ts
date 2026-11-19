import { images, type ImageKey } from "./images";

export type IconName =
  | "drop"
  | "wine"
  | "sun"
  | "chef"
  | "panorama"
  | "yoga"
  | "bath"
  | "audio"
  | "fire"
  | "waves"
  | "pool"
  | "concierge"
  | "shower"
  | "croissant"
  | "wifi"
  | "speaker"
  | "sparkles"
  | "fridge"
  | "bed"
  | "plug"
  | "package"
  | "bike";

export type FilterKey = "1-2" | "3plus" | "sea" | "chef";

export const FILTERS: { key: FilterKey | "all"; label: string }[] = [
  { key: "all", label: "All Villas" },
  { key: "1-2", label: "1–2 Bedrooms" },
  { key: "3plus", label: "3+ Bedrooms" },
  { key: "sea", label: "Panoramic Sea View" },
  { key: "chef", label: "Private Chef Suite" },
];

export type Villa = {
  slug: string;
  number: string;
  name: string;
  price: number;
  image: string;
  imageAlt: string;
  summaryImage?: string;
  zone: string;
  setting: string;
  badge: string;
  blurb: string;
  beds: number;
  bedsNote: string;
  baths: string;
  bathsNote: string;
  maxGuests: number;
  area: number;
  inclusions: { icon: IconName; text: string }[];
  filters: FilterKey[];
  detail?: VillaDetail;
};

export type VillaDetail = {
  breadcrumb: string;
  reference: string;
  locality: string;
  gallery: { src: string; alt: string; caption: string }[];
  specs: { label: string; value: string; note: string }[];
  concept: string[];
  experiences: { icon: IconName; title: string; text: string }[];
  suites: {
    image: string;
    alt: string;
    pavilion: string;
    aspect: string;
    title: string;
    text: string;
    tags: string[];
  }[];
  amenities: { icon: IconName; title: string; text: string }[];
  location: { title: string; text: string; distance: string; extra: string; coordinates: string; image: string };
  rating: { score: string; reviews: number };
};

export const villas: Villa[] = [
  {
    slug: "villa-serein",
    number: "01",
    name: "Villa Serein",
    price: 680,
    image: images.sereinCatalog,
    imageAlt:
      "Villa Serein in the Balearic Islands: raw earth-tinted concrete, olive wood frames and a volcanic stone plunge pool among wild rosemary and silver olive trees.",
    summaryImage: images.sereinSummary,
    zone: "East Wing",
    setting: "Quiet Valley Overlook",
    badge: "Plunge Pool · 280 m²",
    blurb:
      "A serene valley sanctuary nestled inside an ancient drystone amphitheater. Floor-to-ceiling glass pocket doors dissolve the boundary between the bedroom suite and the wild thyme terraces.",
    beds: 2,
    bedsNote: "En-suite Master",
    baths: "2.0",
    bathsNote: "Rain + Soaking",
    maxGuests: 4,
    area: 280,
    inclusions: [
      { icon: "drop", text: "Heated volcanic stone plunge pool overlooking Son Borràs" },
      { icon: "wine", text: "Private organic sommelier tasting upon arrival" },
      { icon: "sun", text: "East-facing solar sunrise alignment & private terrace" },
    ],
    filters: ["1-2"],
    detail: {
      breadcrumb: "Cala d'Oliva · Cliffside Sanctuary",
      reference: "Estate Ref. 04",
      locality: "Cala d'Oliva Cliffs",
      gallery: [
        {
          src: images.sereinLiving,
          alt: "Sunlit living room opening through glass pocket doors to a private infinity plunge pool above the Balearic sea.",
          caption: "Living Atelier · Infinity Horizon",
        },
        {
          src: images.sereinBath,
          alt: "Honed limestone soaking bathtub set flush within a minimalist, sun-drenched bathroom.",
          caption: "Honed Bath Vault",
        },
        {
          src: images.sereinBedroom,
          alt: "Master suite draped in unbleached washed linen with a low platform bed of solid white oak.",
          caption: "Pavilion Master Suite",
        },
        {
          src: images.sereinTerrace,
          alt: "Twilight terrace with stone candle lanterns and a low daybed overlooking the dark sea.",
          caption: "Twilight Perch",
        },
        {
          src: images.sereinCourtyard,
          alt: "Olive tree courtyard encircled by hand-cut dry stone walls and raked pea gravel.",
          caption: "Olive Courtyard",
        },
      ],
      specs: [
        { label: "Capacity", value: "4 Guests", note: "Adult sanctuary policy" },
        { label: "Suites", value: "2 Master Beds", note: "Dual private pavilions" },
        { label: "Bathrooms", value: "2.5 Limestone", note: "Indoor & open-sky rain" },
        { label: "Footprint", value: "280 m²", note: "Indoor-outdoor terrain" },
      ],
      concept: [
        "A sanctuary carved directly from raw Cala d'Oliva limestone and reclaimed Andalusian oak, Villa Serein recedes gracefully into the cliffside topography. Conceived by Studio Terre, the dual-pavilion structure dissolves interior distinctions, drawing the cobalt horizons of the Balearic Sea into every unhurried transition.",
        "Hand-burnished hydraulic plaster walls retain the crisp morning shade, while deep overhangs and louvered cedar screens modulate the Mediterranean noon. Evenings converge around the sunken hearth and the silent infinity pool, heated sustainably via geothermal loops.",
      ],
      experiences: [
        {
          icon: "pool",
          title: "Geothermal Plunge Pool",
          text: "Maintained consistently at 28°C, offering unencumbered sea vistas from dawn through starlight.",
        },
        {
          icon: "concierge",
          title: "Dedicated Butler",
          text: "Quiet, intuitive residence support, unhurried unpacking, and daily botanical aperitivo service.",
        },
        {
          icon: "shower",
          title: "Open-Sky Rain Showers",
          text: "Dual private open-air bathing atriums surrounded by wild lavender, rosemary, and honeysuckle.",
        },
        {
          icon: "croissant",
          title: "Bespoke Morning Atelier",
          text: "Artisanal sourdoughs, estate-pressed olive oil, mountain honey, and seasonal figs served poolside.",
        },
      ],
      suites: [
        {
          image: images.eastPavilion,
          alt: "East Pavilion master bedroom with a custom timber king bed, woven rush matting and morning sun through timber shutters.",
          pavilion: "East Pavilion · 75 m²",
          aspect: "Sunrise Aspect",
          title: "Master Suite One",
          text: "Positioned toward the morning horizon. A monolithic limestone soaking tub, a walk-through dressing chamber, and an isolated reading terrace shaded by maritime pines.",
          tags: ["Emperor King Bed", "Stone Soaking Tub", "Writing Desk"],
        },
        {
          image: images.westPavilion,
          alt: "West Pavilion suite with a low platform bed, lime-washed walls and a private patio garden of potted olive trees.",
          pavilion: "West Pavilion · 65 m²",
          aspect: "Sunset Aspect",
          title: "Master Suite Two",
          text: "Frames the dramatic cliffline at dusk. An independent courtyard entrance, an open-air rainwater shower enclave, and a curated monograph library.",
          tags: ["Custom King Bed", "Open-Sky Rain Atrium", "Private Courtyard"],
        },
      ],
      amenities: [
        { icon: "wifi", title: "Fiber Connectivity", text: "Dedicated 1 Gbps symmetrical mesh coverage across the grounds" },
        { icon: "speaker", title: "Spatial Audio", text: "Integrated acoustic nodes throughout the interior and terrace" },
        { icon: "sparkles", title: "Botanical Apothecary", text: "Custom santal and black tea formulations in ceramic vessels" },
        { icon: "fridge", title: "Chef's Pantry", text: "Sommelier-temperature wine cellar and induction kitchen" },
        { icon: "bed", title: "Daily Turndown Ritual", text: "Evening chamomile infusion, organic pillow mist, and cedar scenting" },
        { icon: "plug", title: "EV Fast Charging", text: "Complimentary 22 kW charging station within the private courtyard" },
      ],
      location: {
        title: "Poised above Cala d'Oliva",
        text: "Villa Serein commands an isolated promontory along the pristine southwest coastline of Mallorca, 40 minutes from Palma Airport via estate limousine. Accessible solely via a private security gatehouse and crushed limestone lane.",
        distance: "4.2 km to S'Arracó Village",
        extra: "Private Tender Anchorage",
        coordinates: `39°34'12" N · 2°22'48" E`,
        image: images.coveMap,
      },
      rating: { score: "4.98", reviews: 24 },
    },
  },
  {
    slug: "the-olive-grove-estate",
    number: "02",
    name: "The Olive Grove Estate",
    price: 1150,
    image: images.oliveGrove,
    imageAlt:
      "The Olive Grove Estate on a Mediterranean cliff: pale rammed-earth walls, cantilevered teak terraces and ancient olive trees framing the sea.",
    zone: "West Ridge",
    setting: "Clifftop Promontory",
    badge: "Chef Suite · 420 m²",
    blurb:
      "Perched on the highest sea-facing promontory. Crafted from pale rammed earth and weathered teak, with a dual-level terrace floating over century-old olive trees and maritime cliffs.",
    beds: 3,
    bedsNote: "Master Suites",
    baths: "3.5",
    bathsNote: "With Steam Room",
    maxGuests: 6,
    area: 420,
    inclusions: [
      { icon: "chef", text: "Dedicated prep kitchen with personal estate chef option" },
      { icon: "panorama", text: "180° clifftop infinity deck and outdoor fireplace" },
      { icon: "yoga", text: "Private shaded cedar yoga pavilion in the groves" },
    ],
    filters: ["3plus", "sea", "chef"],
  },
  {
    slug: "the-hideaway-pavilion",
    number: "03",
    name: "The Hideaway Pavilion",
    price: 490,
    image: images.hideaway,
    imageAlt:
      "The Hideaway Pavilion in a bamboo and pine glade: a limestone water basin, slatted cedar screens and linen drapes.",
    zone: "Lower Terrace",
    setting: "Bamboo Glade",
    badge: "160 m²",
    blurb:
      "Conceived for solo writers and couples seeking deep solitude. Shaded beneath stone pines and wild cane, with an open-air indoor stone bath.",
    beds: 1,
    bedsNote: "Garden Suite",
    baths: "1.0",
    bathsNote: "Sunken Stone Bath",
    maxGuests: 2,
    area: 160,
    inclusions: [
      { icon: "bath", text: "Monolithic hand-carved sunken stone bath" },
      { icon: "audio", text: "Acoustic garden soundscapes & analog audio library" },
    ],
    filters: ["1-2"],
  },
  {
    slug: "villa-solstice",
    number: "04",
    name: "Villa Solstice",
    price: 1600,
    image: images.solstice,
    imageAlt:
      "Villa Solstice with brutalist stone arches, an infinity pool meeting the Mediterranean horizon and warm timber details.",
    zone: "Private Track",
    setting: "High Coastal Plateau",
    badge: "550 m²",
    blurb:
      "Our grandest architectural expression. Four stone pavilions arranged around a central reflecting courtyard, with uninterrupted 360-degree sunset ocean panoramas.",
    beds: 4,
    bedsNote: "Stone Pavilions",
    baths: "4.0",
    bathsNote: "One Per Pavilion",
    maxGuests: 8,
    area: 550,
    inclusions: [
      { icon: "fire", text: "Dual artisan open hearths & subterranean cellar" },
      { icon: "waves", text: "Direct private cliff-path access to the cove" },
    ],
    filters: ["3plus", "sea"],
  },
];

export const defaultVilla = villas[0];

export function getVilla(slug: string | undefined): Villa | undefined {
  return villas.find((v) => v.slug === slug);
}

export type { ImageKey };