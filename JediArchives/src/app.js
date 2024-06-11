let currentPage = 1;
const url = "https://swapi.dev/api/";
let peopleUrl = `${url}people/?page=`;
let shipsUrl = `${url}starships/?page=`;

// selecting elements
const peopleBtn = document.querySelector("#peopleBtn");
const shipsBtn = document.querySelector("#shipsBtn");
const loader = document.querySelector("#loader");
const resultDiv = document.querySelector("#result");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

let peopleFromApi;
let shipsFromApi;

loader.style.display = "none";

// functions
function getPeople() {
  loader.style.display = "block";
  // get people func
  return fetch(`${peopleUrl}${currentPage}`)
    .then((res) => res.json())
    .then((people) => {
      peopleFromApi = people.results; // store the people in a variable
    })
    .catch((error) => {
      console.log("ERROR", error);
    });
}

function getShips() {
  loader.style.display = "block";
  return fetch(`${shipsUrl}${currentPage}`)
    .then((res) => res.json())
    .then((ships) => {
      shipsFromApi = ships.results;
    })
    .catch((error) => {
      console.log("ERROR", error);
    });
}

function showPeople(event) {
  getPeople()
    .then(() => {
      let tableRows = "";
      console.log(peopleFromApi);
      peopleFromApi.forEach((person) => {
        tableRows += `
      <tr>
      <td>${person.name}</td>
      <td>${person.height}</td>
      <td>${person.mass}</td>
      <td>${person.gender}</td>
      <td>${person.birth_year}</td>
      <td>${person.films.length}</td>
      </tr>
      `;
      });
      resultDiv.innerHTML = "";
      resultDiv.innerHTML = `
    <table class="table-css">
    <tr>
    <th>Name</th>
    <th>Height</th>
    <th>Mass</th>
    <th>Gender</th>
    <th>Birth Year</th>
    <th>Appearances</th>
    </tr>
    ${tableRows}  
    </table>
    `;
      loader.style.display = "none";
    })
    .catch((error) => {
      console.log("ERROR", error);
      loader.style.display = "none";
    });
  nextBtn.style.display = "block";
  prevBtn.style.display = "block";
}

function showShips(event) {
  getShips().then(() => {
    let tableRows = "";
    console.log(shipsFromApi);

    shipsFromApi.forEach((ship) => {
      tableRows += `
      <tr>
      <td>${ship.name}</td>
      <td>${ship.model}</td>
      <td>${ship.manufacturer}</td>
      <td>${ship.cost_in_credits}</td>
      <td>${ship.cargo_capacity}</td>
      <td>${ship.starship_class}</td>
      </tr>
      `;
    });

    resultDiv.innerHTML = "";
    resultDiv.innerHTML = `
      <table class="table-css">
      <tr>
      <th>Name</th>
      <th>Model</th>
      <th>Manufacturer</th>
      <th>Cost</th>
      <th>People Capacity</th>
      <th>Class</th>
      </tr>
      ${tableRows}  
      </table>
      `;
    loader.style.display = "none";
  });
  nextBtn.style.display = "block";
  prevBtn.style.display = "block";
}

peopleBtn.addEventListener("click", showPeople);
shipsBtn.addEventListener("click", showShips);
nextBtn.addEventListener("click", () => {
  currentPage++;
  showPeople();
});
prevBtn.addEventListener("click", () => {
  currentPage--;
  showPeople();
});
