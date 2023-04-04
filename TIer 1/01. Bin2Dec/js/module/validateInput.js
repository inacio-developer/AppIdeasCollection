import ConvertBinary from "./convertBinary.js";
import Entry from "./entry.js";

export default class Validate {
  constructor() {
    this.input = document.querySelector("[data-input]");
    this.feedback = document.querySelector(".msg-feedback");
    this.result = document.querySelector(".result");
  }

  validate() {
    const checkout = this.feedback.classList.contains("msg-erro");

    if (checkout) this.feedback.classList.remove("msg-erro");

    this.feedback.style.display = "flex";
    this.feedback.innerText = "successfully generated decimal";
    this.feedback.classList.add("msg-validate");

    const convertBinary = new ConvertBinary(this.input.value);

    convertBinary.init();
  }

  erro(match) {
    this.feedback.classList.add("msg-erro");
    this.feedback.style.display = "flex";

    if (match.length < 10) {
      this.feedback.innerText = `the characters: ${match.toString()} are not allowed. Only 0 or 1`;
    } else {
      this.feedback.innerText = `Only 0 or 1`;
    }
  }
  feedbackValue() {
    const value = this.input.value;
    const deniedNumb = /[^01]/g;
    const matches = value.match(deniedNumb);
    const entry = new Entry();

    if (value !== "") {
      entry.display("flex");

      if (!matches) this.validate();
      if (matches) this.erro(matches);
    } else {
      this.feedback.style.display = "none";

      entry.display("none");

      this.result.classList.remove("toRevel");
      this.result.innerText = "☝ Enter a valid binary number...";
    }
  }

  addEvent() {
    this.input.addEventListener("keyup", () => this.feedbackValue());
  }

  init() {
    if (this.input) this.addEvent();
    return this;
  }
}
