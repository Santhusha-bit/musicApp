const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search');
const results = document.getElementById('results');
const audioPlayer = document.getElementById('audio-player');

searchButton.addEventListener("click", () => {
  const query = searchInput.value;

  if (query) {
    search(query);
  }
});

searchInput.addEventListener("keydown", () => {
  const query = searchInput.value;

  if (query) {
    search(query);
  }
});

function search(query) {
  fetch(
    `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${query}`
  )
    .then((response) => response.json())
    .then((data) => {
      results.innerHTML = "";
      data.data.forEach((song) => {
        const songDiv = document.createElement("div");
        songDiv.className = "song";

        const image = document.createElement("img");
        image.src = song.album.cover_big;
        songDiv.appendChild(image);

        const title = document.createElement("h2");
        title.innerText = song.title;
        songDiv.appendChild(title);

        const artist = document.createElement("h3");
        artist.innerText = song.artist.name;
        songDiv.appendChild(artist);

        songDiv.addEventListener("click", () => {
          audioPlayer.src = song.preview;
          audioPlayer.play();
        });

        results.appendChild(songDiv);
      });
    });
}
