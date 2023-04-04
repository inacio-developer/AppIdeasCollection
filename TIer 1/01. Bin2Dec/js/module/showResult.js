export default class ShowResult {
  constructor(value) {
    this.value = value;
  }

  displayResult() {
    const textResult = document.querySelector(".result");

    textResult.classList.add("toRevel");

    textResult.innerText = this.value;
  }

  init() {
    if (this.value) this.displayResult();
  }
}
