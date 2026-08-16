import { apiRequest } from "../api/client";
import TopAlbums from "../TopAlbums";
import TopArtists from "../TopArtists";
import QuiltGallery from "../QuiltGallery";

export default function ProfilePage() {
  async function connectLastfm() {
    const data = await apiRequest("/lastfm/login");
    window.location.href = data.login_url;
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "28px" }}>
        <h1 style={{ margin: 0 }}>Your Profile</h1>
        <button onClick={connectLastfm}>Connect Last.fm</button>
      </div>
      <TopAlbums />
      <TopArtists />
      <QuiltGallery />
    </div>
  );
}