fetch('https://api.jikan.moe/v4/anime/38000/pictures')
  .then(response => response.json())
  .then(animeImagens => {

    // Obtendo os dados dos 3 primeiros animes da lista
    const animes = animeImagens["data"];

    // Extraindo informações de cada anime
    animes.forEach(anime => {
      const title = anime.title;
      const imageUrl = anime.webp.large_image_url;

      // Criando elementos HTML para exibir as informações
      const animeElement = document.createElement('div');
      const titleElement = document.createElement('h2');
      const imageElement = document.createElement('img');

      // Definindo as informações do anime
      titleElement.textContent = title;
      imageElement.src = imageUrl;

      // Adicionando os elementos ao DOM
      animeElement.appendChild(titleElement);
      animeElement.appendChild(imageElement);
      document.body.appendChild(animeElement);
    });
  })
  .catch(error => console.log(error));
