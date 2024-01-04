
/*This is also one page website.In this we call the rest countries API through fetch and we will show all the countries name its capital name,currencies,languages,Area,Continent,and image of country on DOM.And then we will search for a country.When we enter the first alphabet in the search bar then those countries will filter which names start from that alphabet.And when we enter complete name in the search bar the country will filter.And if the enter name of country is not match with country then Show message on DOM/Screen No matching countries found.*/

let html = "";
let allCountries = [];

const loadCountryAPI = () => {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
      allCountries = data;
      updateTable(allCountries);
    })
    .catch((error) => console.error("Error fetching data:", error));
};

const updateTable = (countries) => {
  html = `<table border=2 class="table table-hover">
              <tr>
               <th>NAME</th>
               <th>CAPITAL</th>
               <th>CURRENCIES</th>
               <th>LANGUAGES</th>
               <th>AREA</th>
               <th>CONTINENTS</th>
               <th>FLAG</th>
              </tr>`;
  countries.map((country) => {
    const currencies =
      country.currencies && typeof country.currencies === "object"
        ? Object.entries(country.currencies)
            .map(([code, currency]) => `${currency.name} (${currency.symbol})`)
            .join(", ")
        : "N/A";
        const languages = country.languages && typeof country.languages === "object" ? Object.values (country.languages).join(", "):"N/A";

    html += `<tr>
               <td>${country.name?.common}</td>
               <td>${country.capital}</td>
               <td>${currencies}</td>
               <td>${languages}</td>
               <td>${country.area}</td>
               <td>${country.continents}</td>
               <td><img src="${country.flags?.png}" width="100" height="100"/></td>
             </tr>`;
    return null; // Ensure the map function returns a value (null in this case)
  });
  html += `</table>`;
  document.getElementById("countries").innerHTML = html;
};

const searchCountries = () => {
    const searchTerm = document.getElementById("countriesInput").value.toUpperCase();
    const filteredCountries = allCountries.filter((country) => country.name?.common.toUpperCase().includes(searchTerm));
    
    if (filteredCountries.length === 0) {
      // No matching countries found
      document.getElementById("countries").innerHTML = "<h1>No matching countries found</h1>";
    } else {
      // Matching countries found, update the table
      updateTable(filteredCountries);
    }
};
document.getElementById("countriesInput").addEventListener("input", searchCountries);

// Call the function to show the result
loadCountryAPI();