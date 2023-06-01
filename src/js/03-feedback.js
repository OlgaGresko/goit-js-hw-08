const throttle = require("lodash.throttle");

let formEl = document.querySelector('.feedback-form');
let emailEl = formEl.querySelector('input[name="email"]');
let messageEl = formEl.querySelector('textarea[name="message"]');
let feedback = {};

if (localStorage.getItem("feedback-form-state")) {
    try {
        let feedbackJSON = localStorage.getItem("feedback-form-state");
    feedback = JSON.parse(feedbackJSON);
    emailEl.value = feedback.email;
    messageEl.value = feedback.message;
      } catch (error) {
        console.error("Error!")
      }
}

function getFeedback() {
    feedback.email = emailEl.value;
    feedback.message = messageEl.value;
    let feedbackJSON = JSON.stringify(feedback);
    localStorage.setItem("feedback-form-state", feedbackJSON);
}

function onSubmitBtn(event) {
    event.preventDefault();
    console.log(feedback);
    formEl.reset();
    localStorage.removeItem("feedback-form-state");
}

formEl.addEventListener('input', throttle(getFeedback, 500));
formEl.addEventListener('submit', onSubmitBtn);


