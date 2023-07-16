const animeIds = [38000, 40748, 39535, 5114, 41467, 11061, 37521, 21, 54898, 44511, 30276, 31181, 20583, 54112, 37105, 49596, 12115, 34572, 22199, 199, 431, 164, 2890, 32281];

const animeDataArray = [];

async function fetchAnimeData(animeId) {
  const url = `https://api.jikan.moe/v4/anime/${animeId}/full`;

  try {
    const response = await fetch(url);
    const animeData = await response.json();

    const genres = animeData.data.genres.map(genre => genre.name);
    const titles = animeData.data.titles[0];
    const imageUrl = animeData.data.images.webp.small_image_url;
    const popularity = animeData.data.popularity;
    const trailer = animeData.data.trailer.url;
    const synopsis = animeData.data.synopsis;
    const largeImageUrl = animeData.data.images.webp.large_image_url;
    
    const firstSentence = synopsis.split('.')[0].slice(0, -1);


    const animeObject = {
      title: titles.title,
      genres: genres,
      imageUrl: imageUrl,
      popularity: popularity,
      trailer: trailer,
      synopsis: firstSentence,
      sectionImages : largeImageUrl
    };

    return animeObject;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function fetchAwaitAnimeData() {
  const fetchPromises = animeIds.map(animeId => fetchAnimeData(animeId));

  try {
    const animeData = await Promise.all(fetchPromises);
    animeDataArray.push(...animeData);

    console.log("Dados dos animes foram carregados!");

  } catch (error) {
    console.log(error);
  }
}

console.log(animeDataArray)

let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

const createDiv = (className) => {
  const div = document.createElement('div');
  div.classList.add(className);
  return div;
};

const createBoxDiv = (imageUrl) => {
  const div = createDiv('box');
  div.style.backgroundImage = `url(${imageUrl})`;
  div.style.backgroundRepeat = 'no-repeat';
  return div;
};

const createBoxDivAnimeSection = (imageUrl) => {
  const div = createDiv('box');
  div.style.background = `url(${imageUrl})`;
  div.style.backgroundRepeat = 'no-repeat';
  return div;
};

const createH3element = (title) => {
  const h3 = document.createElement('h3');
  h3.textContent = title;
  return h3;
};

const createP = (synopsis) => {
  const p = document.createElement('p');
  p.textContent = synopsis
  return p;
};

const createA = () => {
  const a = document.createElement('a');
  a.classList.add('btn');
  a.textContent = 'Download';
  return a;
};

let sectionAnimes = 0;
let slidesSectionAnimes = 5;

const sectionSlides = () => {
  const wrapper = document.querySelector('.swiper-wrapper');
  const slideDiv = createDiv('swiper-slide');
  const boxDiv = createBoxDiv(animeDataArray[sectionAnimes].sectionImages);
  const contentDiv = createDiv('content');
  const h3Element = createH3element(animeDataArray[sectionAnimes].title);
  const pElement = createP(animeDataArray[sectionAnimes].synopsis);
  const aElement = createA();
  
  wrapper.appendChild(slideDiv);
  slideDiv.appendChild(boxDiv);
  boxDiv.appendChild(contentDiv);
  contentDiv.appendChild(h3Element);
  contentDiv.appendChild(pElement);
  contentDiv.appendChild(aElement);

};

document.addEventListener('DOMContentLoaded', async () => {
  await fetchAwaitAnimeData(); 
  for (let i = 0; i < 5; i++) {
    sectionSlides();
    sectionAnimes++;
  }
});

const animesSectionSlides = () => {
  const swiperWrapper = document.querySelector('.swiper.anime-slider .swiper-wrapper');
  const slideDiv = createDiv('swiper-slide');
  const boxDiv = createBoxDivAnimeSection(animeDataArray[slidesSectionAnimes].sectionImages);
  const contentDiv = createDiv('content');
  const h3Element = createH3element(animeDataArray[slidesSectionAnimes].title);
  const pElement = createP(animeDataArray[slidesSectionAnimes].synopsis);
  const aElement = createA();

  swiperWrapper.appendChild(slideDiv);
  slideDiv.appendChild(boxDiv);
  boxDiv.appendChild(contentDiv);
  contentDiv.appendChild(h3Element);
  contentDiv.appendChild(pElement);
  contentDiv.appendChild(aElement);
}


document.addEventListener('DOMContentLoaded', () => {
  fetchAwaitAnimeData()
    .then(() => {
      for (let i = 0; i < 10; i++) {
        animesSectionSlides();
        slidesSectionAnimes++;
      }
    })
    .catch(error => console.log(error));
});



var swiper = new Swiper(".home-slider", {
  loop:false,
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    stopOnLastSlide: false,
  },
});

const updateSwiper = () => {
  const windowWidth = window.innerWidth;

  let slidesPerView = getSlidesPerView(windowWidth);

  swiper.params.slidesPerView = slidesPerView;
  swiper.update();
};

const getSlidesPerView = (windowWidth) => {
  if (windowWidth >= 992) {
    return 3;
  } else if (windowWidth >= 768) {
    return 2;
  } else {
    return 1;
  }
};

var swiper = new Swiper(".anime-slider", {
  slidesPerView: getSlidesPerView(window.innerWidth),
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 4500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: false
});

window.addEventListener('resize', updateSwiper);
updateSwiper();



