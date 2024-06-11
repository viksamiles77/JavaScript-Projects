// <=== selecting elements ===>
const html = {
  carTable: document.querySelector("#car-table"),
  carTypeInput: document.querySelector("#select-car-type"),
  carBrandInput: document.querySelector("#select-car-brand"),
  carModelInput: document.querySelector("#car-model-input"),
  carDoorInput: document.querySelector("#number-of-car-doors"),
  carGasTypeInput: document.querySelector("#select-gas-type"),
  carColorInput: document.querySelector("#select-color"),
  conditionNew: document.querySelector("#condition-new"),
  conditionUsed: document.querySelector("#condition-used"),
  horsepowerRangeInput: document.querySelector("#horsepower-range-input"),
  resetFilterBtn: document.querySelector("#reset-filter-btn"),
  applyFilterBtn: document.querySelector("#apply-filter-btn"),
};

let CarsFromJSON;

const jsonURL =
  "https://raw.githubusercontent.com/viksamiles77/Cars_JSON/main/cars.json";

// <=== Functions ===>
// init function
function getCars() {
  return fetch(jsonURL)
    .then((res) => res.json())
    .then((cars) => {
      CarsFromJSON = cars; // store the fetched cars in the variable
      return cars; // return the cars for further processing if needed
    })
    .catch((error) => {
      console.log("ERROR", error);
    });
}

// function that show the table
function showTable(cars) {
  // clearing content, th stays
  while (html.carTable.rows.length > 1) {
    html.carTable.deleteRow(1);
  }

  if (cars.length === 0) {
    // displaying a text if no data is found
    const row = html.carTable.insertRow(-1);
    const cell = row.insertCell(0);
    cell.colSpan = 8;
    cell.textContent = "No data found";
  } else {
    // creating rows if there is data
    cars.forEach((car) => {
      const row = html.carTable.insertRow(-1); // adding rows to the end
      row.innerHTML = createTable(car);
    });
  }
}

// function that creates the table
function createTable(car) {
  return `
  <tr>
    <td>${car.type}</td>
    <td>${car.brand}</td>
    <td>${car.model}</td>
    <td>${car.doors}</td>
    <td>${car.gasType}</td>
    <td>${car.color}</td>
    <td>${car.isNew ? "New" : "Used"}</td>
    <td>${car.horsepower}</td>
  </tr>`;
}

// <=== Events ===>
// apply filter button
html.applyFilterBtn.addEventListener("click", () => {
  // clearing content, th stays
  while (html.carTable.rows.length > 1) {
    html.carTable.deleteRow(1);
  }

  // get the values from inputs
  const carTypeValue = html.carTypeInput.value;
  const carBrandValue = html.carBrandInput.value;
  const carModelValue = html.carModelInput.value.toLowerCase();
  const carDoorValue =
    html.carDoorInput.value.trim() !== ""
      ? parseInt(html.carDoorInput.value)
      : "";
  const carGasTypeValue = html.carGasTypeInput.value;
  const carColorValue = html.carColorInput.value;
  const conditionNewChecked = html.conditionNew.checked;
  const conditionUsedChecked = html.conditionUsed.checked;
  const horsepowerRangeInputValue = html.horsepowerRangeInput.value;

  // filter cars and filters working together
  const filteredCars = CarsFromJSON.filter((car) => {
    return (
      (carTypeValue === "" ||
        car.type.toLowerCase() === carTypeValue.toLowerCase()) &&
      (carBrandValue === "" ||
        car.brand.toLowerCase() === carBrandValue.toLowerCase()) &&
      (carModelValue === "" ||
        car.model.toLowerCase().includes(carModelValue)) &&
      (carDoorValue === "" || car.doors == carDoorValue) &&
      (carGasTypeValue === "" ||
        car.gasType.toLowerCase() === carGasTypeValue.toLowerCase()) &&
      (carColorValue === "" ||
        car.color.toLowerCase() === carColorValue.toLowerCase()) &&
      ((!conditionNewChecked && !conditionUsedChecked) ||
        (conditionNewChecked && car.isNew) ||
        (conditionUsedChecked && !car.isNew)) &&
      (horsepowerRangeInputValue === "" ||
        parseInt(car.horsepower) <= parseInt(horsepowerRangeInputValue))
    );
  });

  // reset filter button
  html.resetFilterBtn.addEventListener("click", () => {
    html.carTypeInput.value = "";
    html.carBrandInput.value = "";
    html.carModelInput.value = "";
    html.carDoorInput.value = "";
    html.carGasTypeInput.value = "";
    html.carColorInput.value = "";
    html.conditionNew.checked = false;
    html.conditionUsed.checked = false;
    html.horsepowerRangeInput.value = "";

    showTable(CarsFromJSON);
  });

  // creating the table with filtered cars
  showTable(filteredCars);
});

// init
getCars().then((cars) => {
  showTable(cars);
});
