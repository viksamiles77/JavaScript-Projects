// selecting elements
const imgWrap = document.querySelector("#img-wrapper");
const generateBtn = document.querySelector("#generate-btn");
const viewMenuBtn = document.querySelector("#menu-btn");
const beerNameText = document.querySelector("#beer-name");
const beerDescriptionText = document.querySelector("#beer-description");
const randomBeerUrl = "https://api.punkapi.com/v2/beers/random";

// functions
async function fetchBeer() {
  // fetch the beers
  const response = await fetch(`${randomBeerUrl}`);
  const data = await response.json();
  return data;
}

async function showRandomBeer() {
  const beerData = await fetchBeer();
  if (beerData[0].image_url === null) {
    const imgUrl = "./img/opt-rxgjj.webp";
    const imgElement = document.createElement("img");
    const beerName = beerData[0].name;
    const beerDescription = beerData[0].description;
    imgElement.src = imgUrl;
    imgElement.alt = "We don't have a photo of this beer :(";
    imgWrap.innerHTML = ""; // clear previous
    imgWrap.appendChild(imgElement);
    beerNameText.innerText = beerName;
    beerDescriptionText.innerText = beerDescription;
  } else {
    const imgUrl = beerData[0].image_url;
    const imgElement = document.createElement("img");
    const beerName = beerData[0].name;
    const beerDescription = beerData[0].description;
    imgElement.src = imgUrl;
    imgElement.alt = "We don't have a photo of this beer :(";
    imgWrap.innerHTML = ""; // clear previous
    imgWrap.appendChild(imgElement);
    beerNameText.innerText = beerName;
    beerDescriptionText.innerText = beerDescription;
  }
}

function displayRandomBeer() {
  try {
    showRandomBeer();
  } catch (error) {
    console.log(error);
  }

  //   debugger;
}

// init
displayRandomBeer();

// event listeners
generateBtn.addEventListener("click", displayRandomBeer);
viewMenuBtn.addEventListener("click", () => {
  window.location.href = "menu.html";
});
