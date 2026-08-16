import hashlib
import httpx
from app.core.config import settings

LASTFM_AUTH_URL = "https://www.last.fm/api/auth"
LASTFM_API_BASE = "https://ws.audioscrobbler.com/2.0/"

def get_lastfm_login_url() -> str:
    return f"{LASTFM_AUTH_URL}/?api_key={settings.lastfm_api_key}&cb={settings.lastfm_callback_url}"

def _sign_params(params: dict) -> str:
    sorted_items = sorted(params.items())
    sig_string = "".join(f"{k}{v}" for k, v in sorted_items)
    sig_string += settings.lastfm_shared_secret
    return hashlib.md5(sig_string.encode("utf-8")).hexdigest()

async def get_session_key(token: str) -> dict:
    params = {
        "method": "auth.getSession",
        "api_key": settings.lastfm_api_key,
        "token": token,
    }
    params["api_sig"] = _sign_params(params)
    params["format"] = "json"

    async with httpx.AsyncClient() as client:
        response = await client.get(LASTFM_API_BASE, params=params)
        response.raise_for_status()
        return response.json()

async def get_top_albums(username: str, period: str = "overall", limit: int = 9) -> dict:
    params = {
        "method": "user.getTopAlbums",
        "user": username,
        "api_key": settings.lastfm_api_key,
        "period": period,
        "limit": limit,
        "format": "json",
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(LASTFM_API_BASE, params=params)
        response.raise_for_status()
        return response.json()

async def get_top_tracks(username: str, period: str = "overall", limit: int = 9) -> dict:
    params = {
        "method": "user.getTopTracks",
        "user": username,
        "api_key": settings.lastfm_api_key,
        "period": period,
        "limit": limit,
        "format": "json",
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(LASTFM_API_BASE, params=params)
        response.raise_for_status()
        return response.json()

async def get_track_album_art(artist: str, track: str) -> str | None:
    params = {
        "method": "track.getInfo",
        "api_key": settings.lastfm_api_key,
        "artist": artist,
        "track": track,
        "format": "json",
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(LASTFM_API_BASE, params=params)
        if response.status_code != 200:
            return None
        data = response.json()
        images = data.get("track", {}).get("album", {}).get("image", [])
        url = next((img["#text"] for img in images if img["size"] == "extralarge"), None)
        # Last.fm's placeholder has this hash in the URL — skip it if found
        if url and "2a96cbd8b46e442fc41c2b86b821562f" in url:
            return None
        return url

async def get_top_artists(username: str, period: str = "overall", limit: int = 9) -> dict:
    params = {
        "method": "user.getTopArtists",
        "user": username,
        "api_key": settings.lastfm_api_key,
        "period": period,
        "limit": limit,
        "format": "json",
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(LASTFM_API_BASE, params=params)
        response.raise_for_status()
        return response.json()