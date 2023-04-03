import ConvertBinary from "./convertBinary.js";

export default class Validate {
  constructor() {
    this.input = document.querySelector("[data-input]");
    this.feedback = document.querySelector(".msg-feedback");
  }

  resultValidate(value) {
    const textResult = document.querySelector(".result");

    textResult.classList.add("toRevel");

    if (this.input.value === "" && textResult.classList.contains("toRevel")) {
      textResult.classList.remove("toRevel");
      textResult.innerText = "☝ Enter a valid binary number...";
    } else textResult.innerText = value;
  }

  feedbackValue() {
    const value = this.input.value;
    const deniedNumb = /[^01]/g;
    const matches = value.match(deniedNumb);

    let feedback = this.feedback;

    if (value !== "") {
      if (!matches) {
        const checkout = feedback.classList.contains("msg-erro");

        if (checkout) feedback.classList.remove("msg-erro");

        feedback.style.display = "flex";
        feedback.innerText = "successfully generated decimal";
        feedback.classList.add("msg-validate");

        const convertBinary = new ConvertBinary(value);

        return convertBinary.init();
      }

      if (matches) {
        feedback.classList.add("msg-erro");
        feedback.style.display = "flex";

        if (matches.length < 10) {
          feedback.innerText = `the characters: ${matches.toString()} are not allowed. Only 0 or 1`;
        } else {
          feedback.innerText = `Only 0 or 1`;
        }
      }
    } else {
      feedback.style.display = "none";
    }

    if (!matches) this.resultValidate();
  }

  addEvent() {
    this.input.addEventListener("keyup", () => this.feedbackValue());
  }

  init() {
    if (this.input) this.addEvent();
    return this;
  }
}
