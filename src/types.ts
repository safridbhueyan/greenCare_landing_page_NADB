export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  category: 'indoor' | 'outdoor' | 'succulent' | 'herbs' | 'tropical';
  difficulty: 'Beginner' | 'Intermediate' | 'Expert';
  light: string;
  water: string;
  humidity: string;
  petSafe: boolean;
  image: string;
  description: string;
  careTips: string[];
  soilMix: string;
  propagation: string;
}

export interface DiseaseSample {
  id: string;
  name: string;
  plantName: string;
  image: string;
  confidence: number;
  symptoms: string[];
  causes: string[];
  treatment: string[];
  immediateAction: string;
  homeCare: string[];
  prevention: string[];
  recoveryTimeline: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  avatar: string;
  status: 'Available' | 'Busy';
  bio: string;
  consultationFee: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorAvatar: string;
  plantType: string;
  timeAgo: string;
  title: string;
  content: string;
  image: string;
  likes: number;
  comments: number;
  tag: 'Progress' | 'Recovery' | 'Tip' | 'Q&A';
  isLiked?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  category?: string;
  actionPills?: string[];
}

/** Persisted subscription state (stored in localStorage under 'gc_sub') */
export interface SubscriptionState {
  isSubscribed: boolean;
  /** Normalized mobile number (8801XXXXXXXXX) */
  mobile: string | null;
}
