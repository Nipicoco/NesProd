import { NextResponse } from 'next/server'

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'
const CLIENT_ID = 'd5ede0331c074666af0302645f08f98e'
const CLIENT_SECRET = 'a80c01c827de4bee955296b1198ded52'
const REFRESH_TOKEN = 'AQCgbMPA21hmfKGCJlOooPW-KDAS80PudUmYuzHD1gTWtFy6pM1GlYsu4dUbrUbadTreXOvJxGxoTyFv7Si2sgb-D-BfK_9gWGPpkFghn7WtVRqPUlQuJipNWOnSdMstiYc'

let accessToken: string | null = null
let tokenExpirationTime: number | null = null

async function refreshAccessToken() {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  })

  const data = await response.json()
  accessToken = data.access_token
  tokenExpirationTime = Date.now() + data.expires_in * 1000 // Convert to milliseconds
}

export async function getAccessToken() {
  if (!accessToken || !tokenExpirationTime || Date.now() > tokenExpirationTime) {
    await refreshAccessToken()
  }
  return accessToken
}

// Set up a timer to refresh the token every hour
setInterval(refreshAccessToken, 3600000) // 3600000 ms = 1 hour