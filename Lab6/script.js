const allInputs = document.querySelectorAll("input");
const textInputs = [...allInputs].filter((el) => el.type !== "submit");

const allFormData = [
  ...textInputs,
  document.querySelector("select"),
  document.querySelector("textarea"),
];

document.getElementById("main-form").addEventListener("submit", (e) => {
  e.preventDefault();
  let errorArray = [];
  let data = {};
  allFormData.forEach((elem) => {
    let required = elem.dataset.required,
      minLength = elem.dataset.minlen || 0,
      currentInput = elem.name;
    if (
      (required === "true" && elem.value === "") ||
      elem.value.length < minLength
    ) {
      errorArray.push(currentInput);
    } else {
      data[currentInput] = elem.value;
    }
  });
  if (errorArray.length) {
    alert("Błąd w: " + errorArray);
    errorArray.forEach((err) => {
      document.getElementById(`${err}-err`).innerHTML = `Brak podanego ${err}`;
    });
    return;
  }
  alert(JSON.stringify(data));
});
