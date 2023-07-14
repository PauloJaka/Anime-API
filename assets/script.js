// Lista de valores para alternar no URL
const animeIds = [38000, 40748, 39535];
const animeDataArray = [];

// Função para realizar o fetch com um determinado ID de anime
function fetchAnimeData(animeId) {
  const url = `https://api.jikan.moe/v4/anime/${animeId}/full`;

  fetch(url)
    .then(response => response.json())
    .then(animeData => {
      const genres = animeData.data.genres;
      const titles = animeData.data.titles[0];
      const imageUrl = animeData.data.images.webp.image_url;
      const popularity = animeData.data.popularity;
      const trailer = animeData.data.trailer.url;
      const synopsis = animeData.data.synopsis;

      
      const allGenres = genres.map(genre => genre.name)

      const animeObject = {
        title: titles.title,
        genres: allGenres,
        imageUrl: imageUrl,
        popularity: popularity,
        trailer: trailer,
        synopsis: synopsis
      };

      // Adicionando o objeto ao array
      animeDataArray.push(animeObject);

      // Criando elementos HTML para exibir as informações
      const animeElement = document.createElement('div');
      const titleElement = document.createElement('h2');
      const imageElement = document.createElement('img');

      // Definindo as informações do anime
      titleElement.innerText = titles.title;
      titleElement.style.fontWeight = "bold"; // Adicionando estilo CSS
      titleElement.style.fontSize = "24px"; // Definindo tamanho da fonte

      imageElement.src = imageUrl;

      // Adicionando os elementos ao DOM
      animeElement.appendChild(titleElement);
      animeElement.appendChild(imageElement);
      document.body.appendChild(animeElement);
    })
    .catch(error => console.log(error));
}

// Iterando sobre os IDs de anime e chamando a função fetchAnimeData para cada um
animeIds.forEach(animeId => {
  fetchAnimeData(animeId);
});

console.log(animeDataArray)
