import SpotifyWebApi from 'spotify-web-api-node';

// Initialize Spotify API client
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
});

// Define interfaces for type safety
interface SpotifyArtist {
  name: string;
  id: string;
}

interface SpotifyMarket {
  name: string;
  streams: string;
}

interface AudioFeatures {
  danceability: number;
  energy: number;
  valence: number;
  tempo: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  speechiness: number;
}

interface SpotifyTrackResponse {
  name: string;
  artists: Array<{
    name: string;
    id: string;
  }>;
  album: {
    name: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
    }>;
    release_date: string;
  };
  external_urls: {
    spotify: string;
  };
  id: string;
  popularity: number;
  available_markets: string[];
}

// Function to extract track ID from Spotify URL
export function extractSpotifyId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    return pathParts[pathParts.length - 1];
  } catch (error) {
    console.error('Invalid Spotify URL:', error);
    return null;
  }
}

// Function to refresh access token
async function refreshAccessToken() {
  try {
    const data = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(
          process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID + ':' + process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
        ).toString('base64'),
      },
      body: 'grant_type=client_credentials',
    }).then(res => res.json());

    spotifyApi.setAccessToken(data.access_token);
    return data.access_token;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
}

// Function to get audio features
async function getAudioFeatures(trackId: string): Promise<AudioFeatures> {
  const response = await fetch(
    `https://api.spotify.com/v1/audio-features/${trackId}`,
    {
      headers: {
        Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
      },
    }
  );
  const data = await response.json();
  
  return {
    danceability: data.danceability,
    energy: data.energy,
    valence: data.valence,
    tempo: data.tempo,
    acousticness: data.acousticness,
    instrumentalness: data.instrumentalness,
    liveness: data.liveness,
    speechiness: data.speechiness,
  };
}

// Enhanced function to fetch comprehensive track details
export async function getTrackDetails(trackId: string) {
  try {
    const accessToken = await refreshAccessToken();

    const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}?market=ES`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch track data: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      title: data.name,
      artist: data.artists.map((artist: { name: string }) => artist.name).join(', '),
      album: {
        images: data.album.images,
        release_date: data.album.release_date
      },
      releaseDate: data.album.release_date,
      spotifyUrl: data.external_urls.spotify,
      stats: {
        popularity: data.popularity,
        markets: data.album.available_markets?.length || 0,
        totalPlays: "N/A",
        monthlyListeners: "N/A",
        features: {},
        topCountries: []
      }
    };
  } catch (error) {
    console.error('Error in getTrackDetails:', error);
    throw error;
  }
}