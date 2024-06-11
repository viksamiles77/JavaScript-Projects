// selecting elements
const searchBeer = document.querySelector("#beer-search");
const selectPagination = document.querySelector("#select-pagination");
const resultContainer = document.querySelector("#result");
const checkboxAbv = document.querySelector("#checkbox-abv");
const checkboxEbc = document.querySelector("#checkbox-ebc");
const checkboxIbu = document.querySelector("#checkbox-ibu");
const backToGenBtn = document.querySelector("#back-to-generator-btn");
const nextPageBtn = document.querySelector("#next-button");
const previousPageBtn = document.querySelector("#previous-button");
let currentPage = 1;
let perPage = parseInt(selectPagination.value);

// functions
async function getBeers() {
  try {
    const searchValue = searchBeer.value.trim();
    // const paginationValue = selectPagination.value;
    let apiUrl = `https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=${perPage}`;

    if (searchValue) {
      apiUrl += `&beer_name=${searchValue}`;
    }

    if (checkboxAbv.checked) {
      apiUrl += `&abv_gt=6`;
    }

    if (checkboxEbc.checked) {
      apiUrl += `&ebc_gt=50`;
    }

    if (checkboxIbu.checked) {
      apiUrl += `&ibu_gt=40`;
    }

    const response = await fetch(apiUrl);
    const beers = await response.json();

    if (beers.length === 0) {
      resultContainer.innerHTML = `<p class="no-beers-found">No beers found.</p>`;
    } else {
      return beers;
    }
  } catch (error) {
    console.log(error);
  }
}

function createTable(beers) {
  let table = `
        <table class="beer-table">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>First Brewed</th>
            <th><div class="tooltip"><span class="tooltip-text">Potential of Hydrogen</span>PH</div></th>
            <th><div class="tooltip"><span class="tooltip-text">Alcohol by Volume</span>ABV</div></th>
            <th><div class="tooltip"><span class="tooltip-text">Measuring the color of a beer</span>EBC</div></th>
            <th><div class="tooltip"><span class="tooltip-text">International Bitterness Units</span>IBU</div></th>
          </tr>
      `;

  beers.forEach((beer) => {
    table += `
          <tr>
            <td>${beer.id}</td>
            <td><div class="tooltip"><span class="tooltip-text">${
              beer.food_pairing
            }</span>${beer.name}</td>
            <td>${beer.first_brewed}</td>
            <td>${beer.ph !== null ? beer.ph : 0}</td>
            <td>${beer.abv !== null ? beer.abv : 0}</td>
            <td>${beer.ebc !== null ? beer.ebc : 0}</td>
            <td>${beer.ibu !== null ? beer.ibu : 0}</td>
          </tr>
        `;
  });
  table += `</table>`;

  return table;
}

function updatePaginationButtons() {
  const totalBeers = 325;
  const maxPages = Math.ceil(totalBeers / perPage);

  if (currentPage >= maxPages) {
    nextPageBtn.style.display = "none";
  } else {
    nextPageBtn.style.display = "block";
  }

  if (currentPage <= 1) {
    previousPageBtn.style.opacity = "0";
    previousPageBtn.style.pointerEvents = "none";
  } else {
    previousPageBtn.style.opacity = "1";
    previousPageBtn.style.pointerEvents = "auto";
  }
}

async function showBeers() {
  const beers = await getBeers();
  const table = createTable(beers);
  resultContainer.innerHTML = table;
  updatePaginationButtons();
}

// event listeners
searchBeer.addEventListener("input", () => {
  currentPage = 1;
  showBeers();
});

backToGenBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

nextPageBtn.addEventListener("click", () => {
  currentPage++;
  showBeers();
  updatePaginationButtons();
});

previousPageBtn.addEventListener("click", () => {
  currentPage--;
  showBeers();
  updatePaginationButtons();
});

checkboxAbv.addEventListener("change", () => {
  showBeers();
});

checkboxEbc.addEventListener("change", () => {
  showBeers();
});

checkboxIbu.addEventListener("change", () => {
  showBeers();
});

selectPagination.addEventListener("change", () => {
  perPage = parseInt(selectPagination.value);
  currentPage = 1;
  showBeers();
});

// init
showBeers();
