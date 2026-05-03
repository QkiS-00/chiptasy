function search() {
    const query = document.getElementById('searchInput').value.toLowerCase();
  
    if (!query) {
        loadTracks(tracks);
        return;
    }

    const filtered = tracks.filter(track =>
        track.title.toLowerCase().includes(query) ||
        track.artist.toLowerCase().includes(query)
    );

    loadTracks(filtered);
}