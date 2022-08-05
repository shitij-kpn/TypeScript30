const addItems = <HTMLFormElement>document.querySelector(".add-items");
const itemsList = <HTMLUListElement>document.querySelector(".plates");
const items: Item[] = JSON.parse(<string>localStorage.getItem("items")) || [];

function addItem(e: SubmitEvent) {
  e.preventDefault();
  const text = this.querySelector("[name=item]").value;
  const item = {
    text,
    done: false,
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
}

function populateList(plates: Item[] = [], platesList: HTMLUListElement) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
	  	<li>
			<input type="checkbox" data-index=${i} id=item${i} ${
        plate.done ? "checked" : ""
      }/>
			<label for="item${i}">${plate.text}</label>
		</li>`;
    })
    .join("");
}

function toggleDone(e: InputEvent) {
  if (!(e.target as HTMLElement).matches("input")) return;
  const el = e.target as HTMLInputElement;
  const index = parseInt(el.dataset.index as string);
  items[index].done = !items[index].done;
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
populateList(items, itemsList);

type Item = {
  text: string;
  done: boolean;
};
