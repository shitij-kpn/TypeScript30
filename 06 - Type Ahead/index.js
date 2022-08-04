var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const endpoint = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
// let variables
let results;
//handle input
const search = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");
search.value = "";
function numberWithCommas(x) {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
search.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredValues = results
        .filter((el) => {
        const filterString = el.city.toLowerCase() + "," + el.state.toLowerCase();
        return filterString.includes(searchValue.toLowerCase());
    })
        .map((el) => {
        const regex = new RegExp(searchValue, "gi");
        const city = el.city.replace(regex, `<span class="hl">${searchValue}</span>`);
        const state = el.state.replace(regex, `<span class="hl">${searchValue}</span>`);
        return `<li><span class="name">${city}</span>, ${state}<span class="population">${numberWithCommas(el.population)}</span></li>`;
    })
        .join("");
    suggestions.innerHTML = filteredValues;
});
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(endpoint);
        const data = yield res.json();
        results = data.map((el) => {
            return { city: el.city, state: el.state, population: el.population };
        });
    });
}
fetchData();
