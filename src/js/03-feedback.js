const throttle = require("lodash.throttle");
const KEY = "feedback-form-state";
let formEl = document.querySelector('.feedback-form');
let feedback = {};

window.addEventListener('load', onLoad);

function onLoad () {
    try {
        const data = localStorage.getItem(KEY);
        if (!data) return;
        feedback = JSON.parse(data);
        Object.entries(feedback).forEach(([key, val]) => {
            formEl.elements[key].value = val;
        })
    } catch (error) {
        console.error(error.message);
      }
}

function getFeedback({target}) {
    feedback[target.name] = target.value.trim();
    let feedbackJSON = JSON.stringify(feedback);
    localStorage.setItem(KEY, feedbackJSON);
}

function onSubmitBtn(event) {
    event.preventDefault();
    console.log(feedback);
    feedback = {};
    event.target.reset();
    localStorage.removeItem(KEY);
}

formEl.addEventListener('input', throttle(getFeedback, 500));
formEl.addEventListener('submit', onSubmitBtn);


