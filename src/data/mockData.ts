import type { Plant, DiseaseSample, Doctor, CommunityPost } from '../types';

export const DISEASE_SAMPLES: DiseaseSample[] = [
  {
    id: 'leaf-spot',
    name: 'Cercospora Leaf Spot',
    plantName: 'Monstera Deliciosa',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800',
    confidence: 96,
    symptoms: [
      'Small yellow halos around brown necrotic spots on leaf blade',
      'Premature leaf drop starting from lower leaves',
      'Target-like concentric rings on mature foliage'
    ],
    causes: [
      'Excessive overhead watering leaving foliage damp for >4 hours',
      'Poor air circulation around indoor plant clusters',
      'Fungal spore contamination from contaminated potting soil'
    ],
    treatment: [
      'Isolate plant immediately to protect adjacent foliage',
      'Prune severely infected leaves (>40% damage) with sterilized shears',
      'Apply organic copper fungicide spray once every 7-10 days'
    ],
    immediateAction: 'Wipe down healthy leaves with diluted neem oil solution and increase ambient airflow with a gentle fan.',
    homeCare: [
      'Water only at soil level, avoiding leaf surfaces',
      'Allow top 2 inches of soil to dry completely between waterings',
      'Clean pruning shears with 70% isopropyl alcohol after every cut'
    ],
    prevention: [
      'Maintain relative humidity at 50-60% without direct fogging',
      'Use porous terracotta pots with drainage holes',
      'Inspect underside of leaves weekly'
    ],
    recoveryTimeline: '2-3 weeks for spore containment; new healthy growth expected within 30 days.'
  },
  {
    id: 'yellowing-overwater',
    name: 'Chlorosis & Root Stress',
    plantName: 'Golden Pothos',
    image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=800',
    confidence: 92,
    symptoms: [
      'Widespread yellowing starting from oldest stems',
      'Soft, mushy stem bases near soil line',
      'Soil remains damp for over 12 days'
    ],
    causes: [
      'Lack of container drainage or saucer holding stagnant runoff',
      'Compacted heavy potting mix restricting root respiration'
    ],
    treatment: [
      'Unpot plant and inspect roots for brown mushy decay',
      'Trim damaged roots with sterile scissors',
      'Repot in fresh perlite-rich coarse potting mix'
    ],
    immediateAction: 'Cease watering immediately. Move plant to bright indirect light to speed up evapotranspiration.',
    homeCare: [
      'Use moisture meter before adding water',
      'Discard excess saucer water within 15 minutes of watering'
    ],
    prevention: [
      'Mix 30% coarse perlite or orchid bark into potting soil'
    ],
    recoveryTimeline: '7-14 days for stem turgidity restoration.'
  },
  {
    id: 'rose-rust',
    name: 'Puccinia Rose Rust',
    plantName: 'Garden Rose Bush',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800',
    confidence: 98,
    symptoms: [
      'Bright orange-yellow powdery pustules on leaf undersides',
      'Twisted stem growth and distorted flower buds'
    ],
    causes: [
      'Cool damp spring moisture combined with dense canopy foliage'
    ],
    treatment: [
      'Remove affected leaves into sealed plastic bags',
      'Apply sulfur or bio-fungicide early morning'
    ],
    immediateAction: 'Rake fallen leaves around plant base to prevent spore wintering.',
    homeCare: ['Water early in morning only.'],
    prevention: ['Prune central canopy for cross ventilation.'],
    recoveryTimeline: '14-21 days following organic sulfur treatment.'
  }
];

export const PLANTS_LIBRARY: Plant[] = [
  {
    id: 'snake-plant',
    name: 'Snake Plant',
    scientificName: 'Sansevieria trifasciata',
    category: 'succulent',
    difficulty: 'Beginner',
    light: 'Low to Bright Indirect',
    water: 'Every 2-3 weeks',
    humidity: 'Low (30-40%)',
    petSafe: false,
    image: '/snake-plant.jpg',
    description: 'Extremely resilient architectural succulent known for air purifying capabilities. Thrives on neglect and tolerates low lighting.',
    careTips: [
      'Allow soil to dry out completely between waterings',
      'Use a well-draining succulent soil mix',
      'Rotate pot monthly for balanced vertical growth'
    ],
    soilMix: '60% cactus soil mix, 30% perlite, 10% coarse sand',
    propagation: 'Leaf cuttings in water or soil division during repotting'
  },
  {
    id: 'monstera-deliciosa',
    name: 'Monstera Deliciosa',
    scientificName: 'Monstera deliciosa',
    category: 'tropical',
    difficulty: 'Beginner',
    light: 'Bright Indirect Light',
    water: 'Every 1-2 weeks',
    humidity: 'Medium to High (60%+)',
    petSafe: false,
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800',
    description: 'Iconic Swiss Cheese plant featuring natural leaf fenestrations. Adds dramatic jungle vibe to any living room space.',
    careTips: [
      'Provide a moss pole or wooden trellis for climbing aerial roots',
      'Wipe large leaves monthly with damp microfiber cloth',
      'Protect from direct harsh midday sunlight'
    ],
    soilMix: '40% potting mix, 30% orchid bark, 20% perlite, 10% worm castings',
    propagation: 'Stem node cutting in clean water until roots reach 3 inches'
  },
  {
    id: 'peace-lily',
    name: 'Peace Lily',
    scientificName: 'Spathiphyllum wallisii',
    category: 'indoor',
    difficulty: 'Beginner',
    light: 'Medium to Low Light',
    water: 'Weekly (Dramatically droops when thirsty)',
    humidity: 'High (50-70%)',
    petSafe: false,
    image: '/peace-lily.jpg',
    description: 'Elegant shade-loving indoor favorite producing white floral spathes. Excellent natural communicator that tells you when it needs water.',
    careTips: [
      'Use filtered room-temperature water to prevent leaf tip burn',
      'Keep away from cold window drafts in winter'
    ],
    soilMix: '50% indoor peat soil, 30% perlite, 20% compost',
    propagation: 'Root division during springtime repotting'
  },
  {
    id: 'tulsi-holy-basil',
    name: 'Tulsi (Holy Basil)',
    scientificName: 'Ocimum tenuiflorum',
    category: 'herbs',
    difficulty: 'Intermediate',
    light: 'Full Sun (6+ hours)',
    water: 'Keep consistently moist',
    humidity: 'Moderate (40-60%)',
    petSafe: true,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=800',
    description: 'Revered medicinal herb with aromatic leaves. Known for boosting immunity and producing soothing herbal teas.',
    careTips: [
      'Pinch top stem tips regularly to encourage bushy branching',
      'Ensure minimum 6 hours direct morning sunlight'
    ],
    soilMix: '60% organic garden soil, 30% compost, 10% sand',
    propagation: 'Seed sowing or stem cuttings in moist soil'
  },
  {
    id: 'ficus-elastica',
    name: 'Rubber Tree (Ficus)',
    scientificName: 'Ficus elastica',
    category: 'indoor',
    difficulty: 'Intermediate',
    light: 'Bright Indirect',
    water: 'Every 1-2 weeks',
    humidity: 'Moderate',
    petSafe: false,
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=800',
    description: 'Glossy dark burgundy foliage that grows into a striking indoor tree statement piece.',
    careTips: ['Keep away from sudden temperature shifts', 'Dust foliage regularly'],
    soilMix: 'Peat moss, perlite, and pine bark',
    propagation: 'Air layering or stem cutting with root hormone'
  },
  {
    id: 'calathea-orbifolia',
    name: 'Calathea Orbifolia',
    scientificName: 'Calathea orbifolia',
    category: 'tropical',
    difficulty: 'Expert',
    light: 'Filtered Medium Light',
    water: 'Keep moist with rain/distilled water',
    humidity: 'High (65%+)',
    petSafe: true,
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800',
    description: 'Breathtaking silver-striped foliage that folds up at night like hands in prayer.',
    careTips: ['Never use tap water with chlorine', 'Group with humidifier'],
    soilMix: 'Coarse tropical mix with sphagnum moss',
    propagation: 'Root division only'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-tasneem',
    name: 'ড. তাসনীম আহমেদ',
    title: 'Ph.D. উদ্ভিদ রোগবিজ্ঞান',
    specialty: 'ছত্রাকজনিত রোগ ও মূলের সংক্রমণ',
    experienceYears: 12,
    rating: 4.98,
    reviewsCount: 342,
    avatar: '/doctor-tasneem.jpg',
    status: 'Available',
    bio: 'বাংলাদেশ কৃষি বিশ্ববিদ্যালয়ের সাবেক সিনিয়র গবেষক। ধান, পাট ও শাকসবজির ছত্রাকজনিত রোগ নির্ণয় ও জৈব জীবাণুনাশক ব্যবহারে বিশেষজ্ঞ।',
    consultationFee: '৳ ৩০০ / সেশন'
  },
  {
    id: 'dr-mahbub',
    name: 'ড. মাহবুব হোসেন',
    title: 'M.Sc. কৃষিবিজ্ঞান ও মৃত্তিকা বিজ্ঞান',
    specialty: 'মাটির অণুজীব ও সার ব্যবস্থাপনা',
    experienceYears: 15,
    rating: 4.95,
    reviewsCount: 218,
    avatar: '/doctor-mahbub.jpg',
    status: 'Available',
    bio: 'বাংলাদেশ ধান গবেষণা ইনস্টিটিউটে ১৫ বছরের অভিজ্ঞতাসম্পন্ন কৃষিবিদ। মাটির N-P-K ভারসাম্য, জৈব সার ও মাইকোরাইজাল ইনোকুলেশনে দক্ষ পরামর্শক।',
    consultationFee: '৳ ৩৫০ / সেশন'
  },
  {
    id: 'sanjida-islam',
    name: 'সানজিদা ইসলাম',
    title: 'মাস্টার বোটানিক্যাল কনসালট্যান্ট',
    specialty: 'বিরল উদ্ভিদ ও শহুরে বাগান পরিকল্পনা',
    experienceYears: 9,
    rating: 4.99,
    reviewsCount: 512,
    avatar: '/doctor-sanjida.jpg',
    status: 'Available',
    bio: 'ঢাকার শহুরে ছাদ বাগান ও বারান্দা গার্ডেনিংয়ে বিশেষজ্ঞ। দেশীয় ও বিদেশি বিরল উদ্ভিদের পরিচর্যা, পোকামাকড় দমন ও মাইক্রোক্লাইমেট তৈরিতে অভিজ্ঞ।',
    consultationFee: '৳ ২৫০ / সেশন'
  }
];


export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    author: 'Aria Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    plantType: 'Monstera Alba Variegata',
    timeAgo: '2 hours ago',
    title: '🌿 Unbelievable new fenestrated leaf popped today!',
    content: 'After 6 weeks under my 40W grow light and maintaining 65% humidity, my Monstera Alba finally unfurled this masterpiece. Notice the half-moon white pattern!',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800',
    likes: 184,
    comments: 29,
    tag: 'Progress'
  },
  {
    id: 'post-2',
    author: 'Liam Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    plantType: 'Fiddle Leaf Fig',
    timeAgo: '5 hours ago',
    title: '🍃 Saved this sad FLF from root rot thanks to GreenCare AI!',
    content: '3 weeks ago all lower leaves were dropping. Followed GreenCare’s diagnostic report: pruned rotten roots, repotted into terracotta with bark mix. Look at the top bud popping now!',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=800',
    likes: 245,
    comments: 42,
    tag: 'Recovery'
  },
  {
    id: 'post-3',
    author: 'Maya Patel',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
    plantType: 'Pothos Propagation',
    timeAgo: '1 day ago',
    title: '🌱 3 golden rules I learned propagating in glass jars indoors',
    content: '1. Change water every 4 days. 2. Add a tiny drop of liquid kelp fertilizer. 3. Place near north-facing window light. Works every single time!',
    image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=800',
    likes: 310,
    comments: 54,
    tag: 'Tip'
  }
];
