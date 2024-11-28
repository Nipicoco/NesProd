export interface FeaturedProject {
    id: number;
    spotifyId: string;
    title: string;
    artist: string;
    description: string;
    coverImage: string;
    spotifyUrl: string;
    releaseDate: string;
    achievements: string[];
    awards: {
      platinum: number;
      gold: number;
      diamond?: number;
    }
    stats: {
      totalPlays: string;
      monthlyListeners: string;
      chartPosition?: number;
      popularity: number;
      markets: number;
      topCountries: Array<{ name: string; streams: string }>;
      features: {
        danceability: number;
        energy: number;
        valence: number;
        tempo: number;
        acousticness: number;
        instrumentalness: number;
        liveness: number;
        speechiness: number;
      }
      streams: {
        total: string;
        monthly: string;
        peak: string;
      }
    }
  }

export interface Release {
  id: number;
  title: string;
  artist: string;
  coverImage: string;
  releaseDate: string;
  stats: {
    popularity: number;
    markets: number;
    features: {
      [key: string]: number;
    };
  };
  awards: {
    platinum: number;
    gold: number;
    diamond?: number;
  };
} 