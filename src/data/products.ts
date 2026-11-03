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

export const BRAND_LOGO_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBnlm9ZKWhZACfgP9OjINfJszpWQuYi6D81St2wljxcbcq1d0PELGVOa6Md3fbh_odRoS2CH-kmlKBHdZvdaXVmibG4w_iyE3duszGzjWtmJ7iFEfWxvq6r1VxT4aI5dodmHwUw_O5BTR2cxPvMJ3lbItJcFx1mWmnDOMSizNzaKvl-a-n2QVzh3zWmTLmK985HjhLWwI3BxflmkOzgNFNLAKQmyMDHWBGs2I_Am3dcjm_rqQlAtdyL";

export const ROTATOR_PRODUCTS: Product[] = [
  {
    id: "01",
    title: "PhD Progress Edition Tee",
    priceUSD: 48.0,
    priceINR: 599,
    priceDisplayUSD: "$48.00",
    priceDisplayINR: "₹ 599",
    colorway: "PITCH BLACK • EDITION 01",
    edition: "EDITION 01",
    category: "PhD Series",
    image: "/images/products/tee_progress.png",
    description:
      "The flagship viral Traitist graphic. Realistic trajectory curves juxtaposing theoretical deadlines against cosmic delays. High-density screenprint on custom pre-shrunk 240 GSM combed cotton.",
    gsm: "240 GSM",
    fabric: "100% Bio-Washed Combed Cotton",
    blendMode: "normal",
  },
  {
    id: "02",
    title: "PhD Scholar Thoughts Tee",
    priceUSD: 48.0,
    priceINR: 599,
    priceDisplayUSD: "$48.00",
    priceDisplayINR: "₹ 599",
    colorway: "CREAM CORE • REFINED FIT",
    edition: "EDITION 02",
    category: "PhD Series",
    image: "/images/products/tee_scholar_thoughts.png",
    description:
      "Overthinking, literature reviews, and late-night thesis spirals mapped as an intellectual mind-map illustration on premium bio-washed cotton.",
    gsm: "240 GSM",
    fabric: "100% Bio-Washed Combed Cotton",
    blendMode: "normal",
  },
  {
    id: "03",
    title: "PhD Journey Milestone Tee",
    priceUSD: 98.0,
    priceINR: 599,
    priceDisplayUSD: "$98.00",
    priceDisplayINR: "₹ 599",
    colorway: "OAT MELANGE • 480 GSM",
    edition: "EDITION 03",
    category: "PhD Series",
    image: "/images/products/tee_milestone.png",
    description:
      "Ascending the steep, brutalist staircase of dissertation chapters, proposal reviews, and final defense milestones. Pre-shrunk relaxed streetwear cut.",
    gsm: "240 GSM",
    fabric: "100% Super-Combed Cotton",
    blendMode: "normal",
  },
  {
    id: "04",
    title: "PhD Pie Chart Reality Tee",
    priceUSD: 84.0,
    priceINR: 599,
    priceDisplayUSD: "$84.00",
    priceDisplayINR: "₹ 599",
    colorway: "BURGUNDY DROP 03 • MESH",
    edition: "EDITION 04",
    category: "PhD Series",
    image: "/images/products/tee_pie_chart.png",
    description:
      "A clinical breakdown of expected groundbreaking discovery versus debugging script errors and crying over reviewer comments.",
    gsm: "240 GSM",
    fabric: "100% Bio-Washed Combed Cotton",
    blendMode: "normal",
  },
  {
    id: "05",
    title: "Blood Sweat Tears Coffee Tee",
    priceUSD: 64.0,
    priceINR: 599,
    priceDisplayUSD: "$64.00",
    priceDisplayINR: "₹ 599",
    colorway: "OLIVE DROP 02 • RAW HEM",
    edition: "EDITION 05",
    category: "PhD Series",
    image: "/images/products/tee_coffee.png",
    description:
      "The definitive survival triangle: coffee intake, cortisol levels, and stubborn persistence. Screenprinted in heavy-density pigment on pitch-black jersey.",
    gsm: "240 GSM",
    fabric: "100% Combed Compact Cotton",
    blendMode: "normal",
  },
  {
    id: "06",
    title: "Stages of a PhD Thesis Tee",
    priceUSD: 128.0,
    priceINR: 599,
    priceDisplayUSD: "$128.00",
    priceDisplayINR: "₹ 599",
    colorway: "WASHED BLACK • DROP 04",
    edition: "EDITION 06",
    category: "PhD Series",
    image: "/images/products/tee_thesis_stages.png",
    description:
      "A comic panel progression documenting the psychological devolution from Year 1 ambitious optimism to Year 5 submission catharsis.",
    gsm: "240 GSM",
    fabric: "100% Bio-Wash Pure Cotton",
    blendMode: "normal",
  },
  {
    id: "07",
    title: "PhD Manuscript Tee",
    priceUSD: 48.0,
    priceINR: 599,
    priceDisplayUSD: "$48.00",
    priceDisplayINR: "₹ 599",
    colorway: "OBSIDIAN CORE • HEAVYWEIGHT",
    edition: "CORE HEAVYWEIGHT",
    category: "Heavyweight",
    image: "/images/products/tee_scholar_thoughts.png",
    description:
      "Draft #27. Re-drafted, re-annotated, and approved by the department head. High-density puff print detailing on chest and back.",
    gsm: "240 GSM",
    fabric: "100% Bio-Washed Combed Cotton",
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
    edition: "EDITION 01",
    badge: "NEW",
    category: "PhD Series",
    image: "/images/products/tee_progress.png",
    description:
      "The quintessential existential academic graphic tee. Boxy relaxed drape, reinforced ribbed neckband, and 240 GSM heavy combed jersey.",
    gsm: "240 GSM",
    fabric: "100% Pure Bio-Washed Cotton",
    blendMode: "normal",
    scale: 1.15,
  },
  {
    id: "cat-02",
    title: "PhD Scholar Thoughts Tee",
    priceUSD: 48,
    priceINR: 599,
    priceDisplayUSD: "$48.00",
    priceDisplayINR: "₹ 599",
    colorway: "DEEP OBSIDIAN",
    edition: "EDITION 02",
    badge: "NEW",
    category: "PhD Series",
    image: "/images/products/tee_scholar_thoughts.png",
    description:
      "Illustrative mind-map of imposter syndrome, literature indexing, and caffeine dependency. Designed for late-night laboratory shifts.",
    gsm: "240 GSM",
    fabric: "100% Super-Combed Cotton",
    blendMode: "normal",
    scale: 1.15,
  },
  {
    id: "cat-03",
    title: "PhD Journey Milestone Tee",
    priceUSD: 48,
    priceINR: 599,
    priceDisplayUSD: "$48.00",
    priceDisplayINR: "₹ 599",
    colorway: "RAW CHARCOAL",
    edition: "EDITION 03",
    category: "PhD Series",
    image: "/images/products/tee_milestone.png",
    description:
      "A stark architectural staircase representing academic progression through trial by fire. Custom drop-shoulder streetwear fit.",
    gsm: "240 GSM",
    fabric: "100% Bio-Washed Combed Cotton",
    blendMode: "normal",
    scale: 1.15,
  },
  {
    id: "cat-04",
    title: "PhD Pie Chart Reality Tee",
    priceUSD: 48,
    priceINR: 599,
    priceDisplayUSD: "$48.00",
    priceDisplayINR: "₹ 599",
    colorway: "OBSIDIAN BLACK",
    edition: "EDITION 04",
    category: "PhD Series",
    image: "/images/products/tee_pie_chart.png",
    description:
      "High-contrast color-coded reality breakdown chart. Because honesty is the ultimate streetwear statement.",
    gsm: "240 GSM",
    fabric: "100% Pure Combed Cotton",
    blendMode: "normal",
    scale: 1.15,
  },
  {
    id: "cat-05",
    title: "Blood Sweat Tears Coffee Tee",
    priceUSD: 48,
    priceINR: 599,
    priceDisplayUSD: "$48.00",
    priceDisplayINR: "₹ 599",
    colorway: "VINTAGE WASH",
    edition: "EDITION 05",
    category: "PhD Series",
    image: "/images/products/tee_coffee.png",
    description:
      "Heavyweight graphic print paying homage to the Holy Trinity of research and coding sprints: coffee, sweat, and persistence.",
    gsm: "240 GSM",
    fabric: "100% Bio-Washed Combed Cotton",
    blendMode: "normal",
    scale: 1.15,
  },
  {
    id: "cat-06",
    title: "Stages of a PhD Thesis Tee",
    priceUSD: 48,
    priceINR: 599,
    priceDisplayUSD: "$48.00",
    priceDisplayINR: "₹ 599",
    colorway: "PITCH BLACK",
    edition: "EDITION 06",
    category: "PhD Series",
    image: "/images/products/tee_thesis_stages.png",
    description:
      "Narrative comic panels screenprinted with archival inks that never crack or wash out over fifty laundry cycles.",
    gsm: "240 GSM",
    fabric: "100% Heavy Combed Cotton",
    blendMode: "normal",
    scale: 1.15,
  },
  {
    id: "cat-07",
    title: "Defense Day Survival Tee",
    priceUSD: 60,
    priceINR: 799,
    priceDisplayUSD: "$60.00",
    priceDisplayINR: "₹ 799",
    colorway: "SECRET DROP",
    edition: "SECRET DROP",
    badge: "DROPS SOON",
    isSecretDrop: true,
    category: "Archive / Drops",
    image: "/images/products/tee_progress.png",
    description:
      "Limited edition 150-unit run dedicated to the final committee interrogation. Sign up for early 24h drop access.",
    gsm: "280 GSM",
    fabric: "280 GSM Heavy French Terry",
    blendMode: "normal",
    scale: 1.15,
  },
  {
    id: "cat-08",
    title: "PhD Manuscript Tee",
    priceUSD: 48,
    priceINR: 599,
    priceDisplayUSD: "$48.00",
    priceDisplayINR: "₹ 599",
    colorway: "OBSIDIAN CORE",
    edition: "CORE HEAVYWEIGHT",
    category: "Heavyweight",
    image: "/images/products/tee_scholar_thoughts.png",
    description:
      "Draft #27. Re-drafted, re-annotated, and approved by the department head. High-density puff print detailing on chest and back.",
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
    subtitle: "BOMBER, BOXY TEE, JEAN",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB3T-95yrd4mT4dELBwi7uiniiJwXwJsmgRKG-tXhksuNBt81KSQRyBJuyb1HkUADvesxwWEz-PslnC0DUlI2aRCu00nWtq8vSbWEvgNvX2XIQBgSC8Cpc3d1qnuW-QlWHVCXVwris5dG9yhEs-Zhhl0vNaOSZeAN66d825bPgTfdcID8wgPEwgB62FNK4mUUg8sKp_A8-Jr7AlwUXo1TN-jh3vWVoPX1vPMgAl2r8",
    grayscale: true,
  },
  {
    id: "look-02",
    title: "LOOK 02",
    subtitle: "GAME JERSEY 03, SWEAT SHORT",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDmtyQvp2oATU5AdUlFl09Gu_2hAbfySVIPgCBMqgA_kptmKhqy4ZxreFwCiM3fi72zwpUCHsq_uUH0OnHUlQAH_CK4Ib6cUQAX6hlwJJ_rFja1Tn8I3IA6CdU29SRMt_oo8ddvOsZ4F3oc8Xg9gM7kim6NfQRyEbpm720qm-d6xoeqEJogdbeYcnZhOoS_RI5IU9QYuDm14kZEw3rcp_G_6OocAwkySKHncbGPXnI",
  },
  {
    id: "look-03",
    title: "LOOK 03",
    subtitle: "HEAVYWEIGHT HOOD 03",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDiy8zgxo8QLhqcpF9fz0YNpr04T5ZHq0Q7-4z5iJtDPP91Ai_QP7Fx9UFMlSHuLxZMcehz2CmJZIeczjpVNyPobweNZliJfNDwNI2h_w99Ud5yaPeYWfxfW54fzLKsD620MejBDDVCzdCk9NOmiY2ZhtRDZKrkVPeUaKsS_Jtg3GtF-cIK3LHJkTeTkViVSdH5XwZBzwFNahT-anOxNGI2p_hVazbnMZ_8bJRluJI",
  },
  {
    id: "look-04",
    title: "LOOK 04",
    subtitle: "HOOD SAND, JEAN",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAl38FrHmXYJjO6qXGkgg5gpBfqpk3m1rfS5P2GjU-2Zyh6xoJDt--UQyCkyErm8f_mmRQCFBSwAitrbgEMZxk_euK7xq9kFvPo07NV-Su_Uep-X02cksDmmo4QEEovKZwjmSEdABbovhMezbAYJ2BNo8JNsytNY3wccbTnf0uNLHaIsIO8ulFuszyGDjzXc__wWdynTQdFQKSL_cKAKCMaRsuSHDXeAELUpEp_2s4",
    grayscale: true,
  },
  {
    id: "look-05",
    title: "DETAIL",
    subtitle: "480 GSM LOOPBACK",
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
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCibvHcHeCvlNUpxw8bK_ZsuLyTHehEb1IQxw4rWpQdKsf1uZlrMrSMPdgMeUkHm2etz6wBuxOcQJAe-wX9E5lOzjarDz0GqFyfpHzLt77LKUHCyezoD_eP8TZNwQPg9TUADjywgWnyPWjjEhCLYS61ZOGbWZSCblS_yAeyOIVaAVyaHU1-13lExdj9nT3moJZn-Xr-ywF-ozHnjgmfE4DS2X-apkMi3xbcrmaxjkU";
