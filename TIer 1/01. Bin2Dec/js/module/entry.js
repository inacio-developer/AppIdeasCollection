import Validate from "./validateInput.js";

export default class Entry {
  constructor() {
    this.input = document.querySelector("[data-input]");
    this.pasted = document.querySelector("[data-copy]");
    this.clean = document.querySelector("[data-clean]");

    this.validate = new Validate();
  }

  paste() {
    const notification = document.querySelector(".notification");

    navigator.clipboard.readText().then((copy) => {
      notification.style.display = "block";

      if (copy.match(/[^01]/g)) {
        notification.classList.remove("paste-okay");

        notification.classList.add("paste-invalid");
        notification.innerHTML = `the content: <span class="content-paste">${copy.slice(
          0,
          20
        )}...</span> of your clipboard is invalid`;
      } else {
        notification.classList.remove("paste-invalid");

        notification.classList.add("paste-okay");
        notification.innerHTML = "Pasted!";

        this.input.value = copy;

        this.validate.feedbackValue();
      }

      setTimeout(() => {
        notification.style.display = "none";
      }, 4000);
    });
  }

  delete() {
    this.input.value = "";

    this.validate.feedbackValue();
  }

  addEvent() {
    this.pasted.addEventListener("click", () => this.paste());
    this.clean.addEventListener("click", () => this.delete());
  }

  display(defined) {
    this.clean.style.display = defined;

    if (defined === "flex") this.addEvent();
    else this;
  }
}
