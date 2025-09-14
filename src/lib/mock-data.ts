export type RecyclingCenter = {
  id: number;
  name: string;
  wasteTypes: string[];
  position: { lat: number; lng: number };
  address: string;
};

export const mockRecyclingCenters: RecyclingCenter[] = [
  {
    id: 1,
    name: 'Mumbai Recycling Co.',
    wasteTypes: ['plastic', 'paper', 'glass'],
    position: { lat: 19.0760, lng: 72.8777 },
    address: '123 Marine Drive, Mumbai, MH',
  },
  {
    id: 2,
    name: 'Eco Warriors Mumbai',
    wasteTypes: ['electronics', 'batteries'],
    position: { lat: 19.08, lng: 72.88 },
    address: '456 Juhu Beach Rd, Mumbai, MH',
  },
  {
    id: 3,
    name: 'Bandra Recyclers',
    wasteTypes: ['paper', 'metal'],
    position: { lat: 19.05, lng: 72.83 },
    address: '789 Linking Road, Mumbai, MH',
  },
  {
    id: 4,
    name: 'City Compost Hub',
    wasteTypes: ['organic'],
    position: { lat: 19.1, lng: 72.85 },
    address: '101 Powai Lake Rd, Mumbai, MH',
  },
];

export type ForumPost = {
  id: string;
  author: {
    name: string;
    avatarUrl: string;
    avatarHint: string;
  };
  title: string;
  content: string;
  timestamp: string;
  replies: number;
  imageUrl?: string;
  imageHint?: string;
};

export const mockForumPosts: ForumPost[] = [
  {
    id: 'post-1',
    author: {
      name: 'Jane Doe',
      avatarUrl: 'https://picsum.photos/seed/avatar1/100/100',
      avatarHint: 'person smiling'
    },
    title: 'My Journey to a Zero-Waste Kitchen!',
    content:
      "I've finally managed to reduce my kitchen waste by 90%! It started with simple swaps like using cloth towels instead of paper ones and bringing my own containers for groceries. My biggest challenge was finding a good composting solution for my apartment. I ended up with a small worm bin under my sink, and it's been fantastic. The worms are quiet, don't smell, and produce amazing fertilizer for my houseplants. Anyone else have tips for small-space composting?",
    timestamp: '2 days ago',
    replies: 15,
    imageUrl: 'https://picsum.photos/seed/compost1/400/250',
    imageHint: 'compost bin'
  },
  {
    id: 'post-2',
    author: {
      name: 'John Smith',
      avatarUrl: 'https://picsum.photos/seed/avatar2/100/100',
      avatarHint: 'woman outdoors'
    },
    title: 'DIY Project: Turning Plastic Bottles into a Vertical Garden',
    content:
      "Hey everyone, just wanted to share my weekend project! I collected a bunch of 2-liter plastic bottles and turned them into a vertical garden on my balcony. It was surprisingly easy and now I have fresh herbs growing right outside my door. It's a great way to upcycle and add some green to your space. I've attached some photos of the process. Let me know if you want a step-by-step guide!",
    timestamp: '5 days ago',
    replies: 8,
    imageUrl: 'https://picsum.photos/seed/plastic2/400/250',
    imageHint: 'reusable bags'
  },
  {
    id: 'post-3',
    author: {
      name: 'EcoWarrior22',
      avatarUrl: 'https://picsum.photos/seed/avatar3/100/100',
      avatarHint: 'man portrait'
    },
    title: 'Local Recycling Center Question - Do they take soft plastics?',
    content:
      "Does anyone know if the GreenValley Recycling center on Main St. accepts soft plastics like grocery bags and plastic wrap? Their website is a bit unclear. I've been collecting them hoping to recycle them properly but don't want to make a trip for nothing. Thanks in advance!",
    timestamp: '1 week ago',
    replies: 4,
  },
];
