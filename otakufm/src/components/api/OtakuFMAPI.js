export async function fetchPlaylistData(playlistID) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0ad348cbb2mshec2d565148ebeebp1c2248jsnbf91e0f22f41',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };
    
    const response = await fetch(`https://spotify23.p.rapidapi.com/playlist_tracks/?id=${playlistID}&offset=0&limit=100`, options)
    const playlistData = await response.json()
    return playlistData
        
}