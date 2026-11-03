export interface Product {
  id: string;
  title: string;
  priceUSD: number;
  priceINR: number;
  priceDisplayUSD: string;
  priceDisplayINR: string;
  colorway: string;
  edition?: string;
  badge?: string;
  category: string;
  image: string;
  description: string;
  gsm: string;
  fabric: string;
  isSecretDrop?: boolean;
  blendMode?: 'normal' | 'multiply';
  scale?: number;
}

export interface LookItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  grayscale?: boolean;
}

export interface CommunityFit {
  handle: string;
  image: string;
  likes: string;
}

export const BRAND_LOGO_URL = "/images/brand_logo_transparent.png";
export const BRAND_LOGO_SVG = "/images/traitist_logo.svg";
export const BRAND_LOGO_RAW_URL = "/assets/aistudio/Blend_b48afb1a.png";

export const ROTATOR_PRODUCTS: Product[] = [
  {
    id: "01",
    title: "PhD Progress Tee",
    priceUSD: 48.0,
    priceINR: 599,
    priceDisplayUSD: "$48.00",
    priceDisplayINR: "₹ 599",
    colorway: "PITCH BLACK • EDITION 01",
    edition: "EDITION 01 • EXPECTATION VS REALITY",
    badge: "FLAGSHIP",
    category: "PhD Series",
    image: "/images/products/tee_progress.png",
    description:
      "The flagship viral Traitist graphic: Expectation vs Reality curve. 'I would have started writing my thesis in kindergarten if I knew Ph.D was like this!!!!' High-density screenprint on custom pre-shrunk 240 GSM combed cotton.",
    gsm: "240 GSM",
    fabric: "100% Bio-Washed Combed Cotton",
    blendMode: "normal",
  },
  {
    id: "02",
    title: "PhD Scholar Thoughts (Femme)",
    priceUSD: 48.0,
    priceINR: 599,
    priceDisplayUSD: "$48.00",
    priceDisplayINR: "₹ 599",
    colorway: "DEEP OBSIDIAN • EDITION 02",
    edition: "EDITION 02 • FEMME",
    badge: "BESTSELLER",
    category: "PhD Series",
    image: "/images/products/tee_scholar_thoughts_femme.png",
    description:
      "'Everyday thoughts of a Ph.D Scholar: So, When I will be finishing my Ph.D??? There is a lot of work which is pending!! When I will be publishing my manuscript?? How about my future??' 240 GSM heavy combed jersey.",
    gsm: "240 GSM",
    fabric: "100% Bio-Washed Combed Cotton",
    blendMode: "normal",
  },
  {
    id: "03",
    title: "PhD Scholar Thoughts (Color Core)",
    priceUSD: 48.0,
    priceINR: 599,
    priceDisplayUSD: "$48.00",
    priceDisplayINR: "₹ 599",
    colorway: "VINTAGE BLACK • EDITION 02",
    edition: "EDITION 02 • CORE",
    badge: "NEW",
    category: "PhD Series",
    image: "/images/products/tee_scholar_thoughts_core.png",
    description:
      "Color edition featuring red blood cells, DNA helix, molecular diagrams, desk lamp, and towering stacks of doctoral manuscripts. Vibrant direct-to-garment print.",
    gsm: "240 GSM",
    fabric: "100% Bio-Washed Combed Cotton",
    blendMode: "normal",
  },
  {
    id: "04",
    title: "PhD Milestone Nightmare Tee",
    priceUSD: 48.0,
    priceINR: 599,
    priceDisplayUSD: "$48.00",
    priceDisplayINR: "₹ 599",
    colorway: "RAW CHARCOAL • EDITION 03",
    edition: "EDITION 03 • MOUNTAIN",
    category: "PhD Series",
    image: "/images/products/tee_milestone.png",
    description:
      "'In an adventurous journey called Doctor of Philosophy (Ph.D.) Where every milestone feels like a NIGHTMARE!!!!' Climbing the rocky steps of Experiments Failed, Deadlines, Synopsis, Thesis, Viva Mock, and Final Award.",
    gsm: "240 GSM",
    fabric: "100% Super-Combed Cotton",
    blendMode: "normal",
  },
  {
    id: "05",
    title: "PhD Reality Pie Chart Tee",
    priceUSD: 48.0,
    priceINR: 599,
    priceDisplayUSD: "$48.00",
    priceDisplayINR: "₹ 599",
    colorway: "PITCH BLACK • EDITION 04",
    edition: "EDITION 04 • CHART",
    category: "PhD Series",
    image: "/images/products/tee_pie_chart.png",
    description:
      "'What the world thinks we are: Student vs What we actually are: Graphic designer, Reviewer, Author, Analyst, Project Manager, Technician, Statistician, Scientist, Philosopher, Documenter, Sales Representative.'",
    gsm: "240 GSM",
    fabric: "100% Bio-Washed Combed Cotton",
    blendMode: "normal",
  },
  {
    id: "06",
    title: "Blood Sweat Tears Coffee (Femme)",
    priceUSD: 48.0,
    priceINR: 599,
    priceDisplayUSD: "$48.00",
    priceDisplayINR: "₹ 599",
    colorway: "DEEP OBSIDIAN • EDITION 05",
    edition: "EDITION 05 • FEMME",
    category: "PhD Series",
    image: "/images/products/tee_coffee_femme.png",
    description:
      "'MY THESIS IS BEING WRITTEN IN..... Blood, Tears, Sweat, Coffee: oh, boy you need me...' 4-panel comic strip art documenting the thesis survival grind.",
    gsm: "240 GSM",
    fabric: "100% Combed Compact Cotton",
    blendMode: "normal",
  },
  {
    id: "07",
    title: "Blood Sweat Tears Coffee (Classic)",
    priceUSD: 48.0,
    priceINR: 599,
    priceDisplayUSD: "$48.00",
    priceDisplayINR: "₹ 599",
    colorway: "WASHED BLACK • EDITION 05",
    edition: "EDITION 05 • CLASSIC",
    category: "PhD Series",
    image: "/images/products/tee_coffee_classic.png",
    description:
      "The classic 4-stage thesis grind: late nights, desperate revisions, bandaged fingers, stacks of papers, and coffee savior.",
    gsm: "240 GSM",
    fabric: "100% Pure Combed Cotton",
    blendMode: "normal",
  },
  {
    id: "08",
    title: "Under Review After Death Tee",
    priceUSD: 48.0,
    priceINR: 599,
    priceDisplayUSD: "$48.00",
    priceDisplayINR: "₹ 599",
    colorway: "DARK SLATE • EDITION 06",
    edition: "EDITION 06 • PEER REVIEW",
    badge: "VIRAL",
    category: "PhD Series",
    image: "/images/products/tee_under_review.png",
    description:
      "'Me and My lab colleague discussing after death: What happened to that paper you was trying to publish?? Ahhhhhh, it is still under review.....' Skeleton researcher conversation artwork.",
    gsm: "240 GSM",
    fabric: "100% Heavy Combed Cotton",
    blendMode: "normal",
  },
];

export const CATALOG_PRODUCTS: Product[] = [
  {
    id: "cat-01",
    title: "PhD Progress Tee",
    priceUSD: 48,
    priceINR: 599,
    priceDisplayUSD: "$48.00",
    priceDisplayINR: "₹ 599",
    colorway: "PITCH BLACK",
    edition: "EDITION 01 • EXPECTATION VS REALITY",
    badge: "FLAGSHIP",
    category: "PhD Series",
    image: "/images/products/tee_progress.png",
    description:
      "The quintessential existential academic graphic tee. 'I would have started writing my thesis in kindergarten if I knew Ph.D was like this!!!!' Boxy relaxed drape, reinforced ribbed neckband, and 240 GSM heavy combed jersey.",
    gsm: "240 GSM",
    fabric: "100% Pure Bio-Washed Cotton",
    blendMode: "normal",
    scale: 1.15,
  },
  {
    id: "cat-02",
    title: "PhD Scholar Thoughts (Femme)",
    priceUSD: 48,
    priceINR: 599,
    priceDisplayUSD: "$48.00",
    priceDisplayINR: "₹ 599",
    colorway: "DEEP OBSIDIAN",
    edition: "EDITION 02 • FEMME",
    badge: "BESTSELLER",
    category: "PhD Series",
    image: "/images/products/tee_scholar_thoughts_femme.png",
    description:
      "Illustrative mind-map of imposter syndrome, literature reviews, and thesis deadlines. 'So, When I will be finishing my Ph.D??? When I will be publishing my manuscript?? How about my future??'",
    gsm: "240 GSM",
    fabric: "100% Super-Combed Cotton",
    blendMode: "normal",
    scale: 1.15,
  },
  {
    id: "cat-03",
    title: "PhD Scholar Thoughts (Color Core)",
    priceUSD: 48,
    priceINR: 599,
    priceDisplayUSD: "$48.00",
    priceDisplayINR: "₹ 599",
    colorway: "VINTAGE BLACK",
    edition: "EDITION 02 • CORE",
    badge: "NEW",
    category: "PhD Series",
    image: "/images/products/tee_scholar_thoughts_core.png",
    description:
      "Color edition featuring red blood cells, DNA helix, molecular diagrams, desk lamp, and towering stacks of doctoral manuscripts. Vibrant direct-to-garment print.",
    gsm: "240 GSM",
    fabric: "100% Bio-Washed Combed Cotton",
    blendMode: "normal",
    scale: 1.15,
  },
  {
    id: "cat-04",
    title: "PhD Milestone Nightmare Tee",
    priceUSD: 48,
    priceINR: 599,
    priceDisplayUSD: "$48.00",
    priceDisplayINR: "₹ 599",
    colorway: "RAW CHARCOAL",
    edition: "EDITION 03 • MOUNTAIN",
    category: "PhD Series",
    image: "/images/products/tee_milestone.png",
    description:
      "A stark architectural staircase representing academic progression through trial by fire. 'In an adventurous journey called Doctor of Philosophy (Ph.D.) Where every milestone feels like a NIGHTMARE!!!!'",
    gsm: "240 GSM",
    fabric: "100% Bio-Washed Combed Cotton",
    blendMode: "normal",
    scale: 1.15,
  },
  {
    id: "cat-05",
    title: "PhD Reality Pie Chart Tee",
    priceUSD: 48,
    priceINR: 599,
    priceDisplayUSD: "$48.00",
    priceDisplayINR: "₹ 599",
    colorway: "OBSIDIAN BLACK",
    edition: "EDITION 04 • CHART",
    category: "PhD Series",
    image: "/images/products/tee_pie_chart.png",
    description:
      "High-contrast color-coded reality breakdown chart. 'What the world thinks we are: Student vs What we actually are: Graphic designer, Reviewer, Author, Analyst, Project Manager, Technician...'",
    gsm: "240 GSM",
    fabric: "100% Pure Combed Cotton",
    blendMode: "normal",
    scale: 1.15,
  },
  {
    id: "cat-06",
    title: "Blood Sweat Tears Coffee (Femme)",
    priceUSD: 48,
    priceINR: 599,
    priceDisplayUSD: "$48.00",
    priceDisplayINR: "₹ 599",
    colorway: "DEEP OBSIDIAN",
    edition: "EDITION 05 • FEMME",
    category: "PhD Series",
    image: "/images/products/tee_coffee_femme.png",
    description:
      "Heavyweight graphic print paying homage to the Holy Trinity of research and coding sprints: coffee, sweat, and persistence. 'MY THESIS IS BEING WRITTEN IN..... Blood, Tears, Sweat, Coffee'",
    gsm: "240 GSM",
    fabric: "100% Bio-Washed Combed Cotton",
    blendMode: "normal",
    scale: 1.15,
  },
  {
    id: "cat-07",
    title: "Blood Sweat Tears Coffee (Classic)",
    priceUSD: 48,
    priceINR: 599,
    priceDisplayUSD: "$48.00",
    priceDisplayINR: "₹ 599",
    colorway: "WASHED BLACK",
    edition: "EDITION 05 • CLASSIC",
    category: "PhD Series",
    image: "/images/products/tee_coffee_classic.png",
    description:
      "The classic 4-stage thesis grind: late nights, desperate revisions, bandaged fingers, stacks of papers, and coffee savior.",
    gsm: "240 GSM",
    fabric: "100% Pure Combed Cotton",
    blendMode: "normal",
    scale: 1.15,
  },
  {
    id: "cat-08",
    title: "Under Review After Death Tee",
    priceUSD: 48,
    priceINR: 599,
    priceDisplayUSD: "$48.00",
    priceDisplayINR: "₹ 599",
    colorway: "DARK SLATE",
    edition: "EDITION 06 • PEER REVIEW",
    badge: "VIRAL",
    category: "PhD Series",
    image: "/images/products/tee_under_review.png",
    description:
      "'Me and My lab colleague discussing after death: What happened to that paper you was trying to publish?? Ahhhhhh, it is still under review.....' Archival comic panel artwork.",
    gsm: "240 GSM",
    fabric: "100% Bio-Washed Combed Cotton",
    blendMode: "normal",
    scale: 1.15,
  },
];

export const LOOKBOOK_ITEMS: LookItem[] = [
  {
    id: "look-01",
    title: "LOOK 01",
    subtitle: "PHD PROGRESS TEE, DENIM",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB3T-95yrd4mT4dELBwi7uiniiJwXwJsmgRKG-tXhksuNBt81KSQRyBJuyb1HkUADvesxwWEz-PslnC0DUlI2aRCu00nWtq8vSbWEvgNvX2XIQBgSC8Cpc3d1qnuW-QlWHVCXVwris5dG9yhEs-Zhhl0vNaOSZeAN66d825bPgTfdcID8wgPEwgB62FNK4mUUg8sKp_A8-Jr7AlwUXo1TN-jh3vWVoPX1vPMgAl2r8",
    grayscale: true,
  },
  {
    id: "look-02",
    title: "LOOK 02",
    subtitle: "SCHOLAR THOUGHTS, SWEAT SHORT",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDmtyQvp2oATU5AdUlFl09Gu_2hAbfySVIPgCBMqgA_kptmKhqy4ZxreFwCiM3fi72zwpUCHsq_uUH0OnHUlQAH_CK4Ib6cUQAX6hlwJJ_rFja1Tn8I3IA6CdU29SRMt_oo8ddvOsZ4F3oc8Xg9gM7kim6NfQRyEbpm720qm-d6xoeqEJogdbeYcnZhOoS_RI5IU9QYuDm14kZEw3rcp_G_6OocAwkySKHncbGPXnI",
  },
  {
    id: "look-03",
    title: "LOOK 03",
    subtitle: "MILESTONE NIGHTMARE TEE",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDiy8zgxo8QLhqcpF9fz0YNpr04T5ZHq0Q7-4z5iJtDPP91Ai_QP7Fx9UFMlSHuLxZMcehz2CmJZIeczjpVNyPobweNZliJfNDwNI2h_w99Ud5yaPeYWfxfW54fzLKsD620MejBDDVCzdCk9NOmiY2ZhtRDZKrkVPeUaKsS_Jtg3GtF-cIK3LHJkTeTkViVSdH5XwZBzwFNahT-anOxNGI2p_hVazbnMZ_8bJRluJI",
  },
  {
    id: "look-04",
    title: "LOOK 04",
    subtitle: "COFFEE TEE, RELAXED FIT",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAl38FrHmXYJjO6qXGkgg5gpBfqpk3m1rfS5P2GjU-2Zyh6xoJDt--UQyCkyErm8f_mmRQCFBSwAitrbgEMZxk_euK7xq9kFvPo07NV-Su_Uep-X02cksDmmo4QEEovKZwjmSEdABbovhMezbAYJ2BNo8JNsytNY3wccbTnf0uNLHaIsIO8ulFuszyGDjzXc__wWdynTQdFQKSL_cKAKCMaRsuSHDXeAELUpEp_2s4",
    grayscale: true,
  },
  {
    id: "look-05",
    title: "DETAIL",
    subtitle: "240 GSM BIO-WASH",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBvp6V7n6HvdWnZHjbpXsu9swx2QAnuguw1rRilxWitFv2EU9YZbmaHBhsgpzHId6Zoc7F9EnC0cXfJ0gzhlX6RNA-HPzn_ZeVxStjgQh-TB9SdnzV2zrO2UbBKYZ__HeXxUjyhQi5n--baGgsTs65pII_tue-uJrJIADOxPoUVyyBkNUmwNeCwaiOQSTLk0jAChj9ZmBWyPHdeUf-_5o3x-f8sEv9iT_I6p1AFtBk",
  },
];

export const COMMUNITY_FITS: CommunityFit[] = [
  {
    handle: "@mason.fits",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAcx60QrZrzJGrdQ9GPjQwN5nxA3zCL5e3CQSAe6Qgzkg9ZED9CsbVr6C2vrsnryMudjWRQ3eXLM0sm2yp2PJnRN0erf9lus-1nQcxiLlVDK2T2eG3h28Fk4D4CcdJHNBsk8HGQLjNIIk0NHH3nRa_C792Y4A-8MVs5YTmJ_AInQwx0hWGI6ebfp3QcDMi_hDHUfUQsSGm5IxY0J6I5YxmD7EfgZptk2b_5W1bvBfM",
    likes: "1.4k",
  },
  {
    handle: "@j1_ward",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD-u-lKwlG12fyJhjeaIo0Q77TZ4HRleGrkms3dMQTtbAGkuO2OoEkxH7u3j6ePqAYUQfu7DjPlV8I-qNhFkmq5rn3cIyOkcOazw6IXKJc9B0rMBlkwWlCSKqyBW9uD9xQ8dsA7iLaFhIEFAlcuN0sNVUF1wYWjVbRSacucrjPceqvoCcKthkH5p9PqthrjSeqXCOxPt9g2C-6PTGv8Bgj1UqhHd5YLx3GAlky5uJQ",
    likes: "2.1k",
  },
  {
    handle: "@marci.sk8",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBnrGQfZK8bA6oLfEzfJHt9nOSB4zQA22YfDLOBixYuDJBsDpc1vFV22x85JAmfVU06J_m3gKJ2ds9juw-5xOEM0Gus73_nTPi6kluoDKFdre1awcrVXt-RYHFu0LHoJiJvWOmly8IWGjYMJsjVHcUGT82JfpJcdSjoH_cU_96eZ6EZ6_OnpWMWDQYNh1J2YlfH585t5RUoPqHGwvLO5YsTvhnMHRKSwETtpcKSM0k",
    likes: "940",
  },
  {
    handle: "@leo.sf_cn",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC1_AD6whE64uaY_hBv-fH-9gWiX48Uib97z5uNKOd7GFdPMmT4-ilEuaAxXwu_ydKDqsWqOODQIxXcNsnyixTRo3_wrbUAbxNT27Ji02vn6x-FTHwH67-CdPaKFPxGYaVBhwD2IDDWgjXKmMKJaZJnK3Dr80OPz6crun8I2kwbwl29humeK5ldpcmzNJTS4D-VDduAkQTQ5x_1GmbTLavjkUDAhuD486G2iVjGNcU",
    likes: "3.2k",
  },
];

export const CAMPAIGN_BACKDROP =
  "/assets/aistudio/Laughing_PhD_Scholars_on_Campus_Steps_b35666dc.png";
