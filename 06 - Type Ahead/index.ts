type ResultType = {
  city: string;
  growth_from_2000_to_2013: string;
  latitude: number;
  longitude: number;
  population: string;
  rank: string;
  state: string;
};

const endpoint: string =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

// let variables
let results: { city: string; state: string; population: string }[];

//handle input
const search = <HTMLInputElement>document.querySelector(".search");
const suggestions = <HTMLUListElement>document.querySelector(".suggestions");
search.value = "";

function numberWithCommas(x: string): string {
  return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

search.addEventListener("input", (e: Event) => {
  const searchValue = (e.target as HTMLInputElement).value.toLowerCase();
  const filteredValues = results
    .filter((el) => {
      const filterString = el.city.toLowerCase() + "," + el.state.toLowerCase();
      return filterString.includes(searchValue.toLowerCase());
    })
    .map((el) => {
      const regex = new RegExp(searchValue, "gi");
      const city = el.city.replace(
        regex,
        `<span class="hl">${searchValue}</span>`
      );
      const state = el.state.replace(
        regex,
        `<span class="hl">${searchValue}</span>`
      );
      return `<li><span class="name">${city}</span>, ${state}<span class="population">${numberWithCommas(
        el.population
      )}</span></li>`;
    })
    .join("");
  suggestions.innerHTML = filteredValues;
});

async function fetchData() {
  const res = await fetch(endpoint);
  const data: ResultType[] = await res.json();
  results = data.map((el) => {
    return { city: el.city, state: el.state, population: el.population };
  });
}

fetchData();
