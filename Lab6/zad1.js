const inputs = [...document.form1].filter(el => el.type !== "submit");
const submitButton = document.form1.submit_button;

document.form1.addEventListener('submit', (e) => {
    e.preventDefault();

    let data = {};
    let errors = [];

    inputs.forEach(el => {
        let required = el.dataset.required;
        let minLength = parseInt(el.dataset.minlen) || 0;
        if ((required === "true" && el.value === "") || el.value.length < minLength) {
            errors.push(el.name);
        }
        else data[el.name] = el.value;
    })
    if (errors.length) {
        alert("Bledy w: " + errors);
        return;
    }
    alert(JSON.stringify(data))

})
