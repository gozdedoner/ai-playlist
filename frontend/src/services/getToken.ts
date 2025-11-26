export async function getSpotifyToken() {
  try {
    const response = await fetch("http://localhost:5000/api/token");
    const data = await response.json();

    if (data.access_token) {
      return data.access_token;
    } else {
      console.error("Token alınamadı:", data);
      return null;
    }
  } catch (error) {
    console.error("Token fetch error:", error);
    return null;
  }
}
