// Lista de valores para alternar no URL
const animeIds = [38000, 40748, 39535, 5114, 41467, 11061, 37521, 21, 54898, 44511, 30276, 31181, 20583, 54112, 37105, 49596, 12115, 34572, 22199, 199, 431, 164, 2890, 32281];

const animeDataArray = [];

// Função para realizar o fetch com um determinado ID de anime
function fetchAnimeData(animeId) {
  const url = `https://api.jikan.moe/v4/anime/${animeId}/full`;

  fetch(url)
    .then(response => response.json())
    .then(animeData => {
      const genres = animeData.data.genres.map(genre => genre.name);
      const titles = animeData.data.titles[0];
      const imageUrl = animeData.data.images.webp.image_url;
      const popularity = animeData.data.popularity;
      const trailer = animeData.data.trailer.url;
      const synopsis = animeData.data.synopsis;

      const animeObject = {
        title: titles.title,
        genres: genres,
        imageUrl: imageUrl,
        popularity: popularity,
        trailer: trailer,
        synopsis: synopsis
      };

      animeDataArray.push(animeObject);
    })
    .catch(error => console.log(error));
}

// Iterando sobre os IDs de anime e chamando a função fetchAnimeData para cada um
animeIds.forEach(animeId => {
  fetchAnimeData(animeId);
});

console.log(animeDataArray)
