window.addEventListener("load", getCountry);
const loaderDiv = document.getElementById("loader");
const region = document.querySelectorAll(".region");
const dropList = document.querySelector(".drop");
const moon = document.querySelector(".moon");
const toggle = document.querySelector(".toggle");
const dropD = document.querySelector(".dropdown");
const country = document.querySelector(".second");

/* ---------------loader------------------ */
function showloader() {
  loaderDiv.classList.add("show");
}

function hideloader() {
  loaderDiv.classList.remove("show");
}

/* ---------------get-country------------------ */

function getCountry() {
  showloader();
  // fetch(`https://restcountries.com/v2/all`)
  fetch("data.json")
    .then((data) => {
      return data.json();
    })
    
    .then((result) => {
      hideloader();
      country.innerHTML = "";
      for (let i = 0; i < result.length; i++) {
        country.innerHTML += `
           
         <div class="countries" onclick="getDetails('${result[i].name}')">
            <div class="country-img">
              <img src=${result[i].flag} />
            </div>
            <div class="country-info">
              <h1 class="countryName">${result[i].name}</h1>
              <p><strong>Population: </strong>${result[i].population}</p>
              <p class="region1"><strong>Region: </strong>${result[i].region}</p>
              <p><strong>Capital: </strong>${result[i].capital}</p>
            </div>
          </div>`;
      }

      console.log(result);
    })
    .catch((error) => console.log(error));
}
getCountry();

const getDetails = cName =>{
  localStorage.setItem("cName", cName);
  location.href="./country.html";
}
// const getDetails= cName=>{
//   location.href="./country.html"; 
//   document.getElementById("cName").innerHTML = name;
//   console.log(name);
//   console.log("myname");
// }
  
/* ---------------drop-list------------------ */

function droplist() {
  if (dropList.style.display === "block") {
    dropList.style.display = "none";
  } else {
    dropList.style.display = "block";
  }
}

/* ---------------theme-change------------------ */

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  moon.classList.toggle("fas");
});

/* ---------------filter-country------------------ */

function fCountry(regionElement) {
  const selectedRegion = regionElement.textContent; 

  showloader();
 
  fetch("data.json")
    .then((data) => {
      return data.json();
    })
    .then((result) => {
      hideloader();
      country.innerHTML = "";
      const filteredCountries = result.filter(country => country.region === selectedRegion);
      for (let i = 0; i < filteredCountries.length; i++) {
        country.innerHTML += `
          <div class="countries" onclick="getDetails('${filteredCountries[i].name}')">
            <div class="country-img">
              <img src="${filteredCountries[i].flag}" />
            </div>
            <div class="country-info">
              <h1 class="countryName">${filteredCountries[i].name}</h1>
              <p><strong>Population: </strong>${filteredCountries[i].population}</p>
              <p class="region1"><strong>Region: </strong>${filteredCountries[i].region}</p>
              <p><strong>Capital: </strong>${filteredCountries[i].capital}</p>
            </div>
          </div>`;
      }
      if(filteredCountries==0){
        country.innerHTML += `
        <h1 class="notFound">NOT FOUND</h1>
        `
      }
    })
    .catch((error) => console.log(error));
}

/* ---------------search-country------------------ */
const searchInput = document.querySelector(".search");
searchInput.addEventListener("input", handleSearch);
function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase(); 

  // showloader();
 
  fetch("data.json")
    .then((data) => {
      return data.json();
    })
    .then((result) => {
      // hideloader();
      country.innerHTML = "";

      const filteredCountries = result.filter(country =>
        country.name.toLowerCase().includes(searchTerm)
      );

      for (let i = 0; i < filteredCountries.length; i++) {
        country.innerHTML += `
          <div class="countries" onclick="getDetails('${filteredCountries[i].name}')">
            <div class="country-img">
              <img src="${filteredCountries[i].flag}" />
            </div>
            <div class="country-info">
              <h1 class="countryName">${filteredCountries[i].name}</h1>
              <p><strong>Population: </strong>${filteredCountries[i].population}</p>
              <p class="region1"><strong>Region: </strong>${filteredCountries[i].region}</p>
              <p><strong>Capital: </strong>${filteredCountries[i].capital}</p>
            </div>
          </div>`;
      }
      if(filteredCountries==0){
        country.innerHTML += `
        <h1  class="notFound">NOT FOUND</h1>
        `
      }
    })
    .catch((error) => console.log(error));
}


