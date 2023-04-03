import Validate from "./validateInput.js";

export default class ConvertBinary {
  constructor(value) {
    this.value = value;
  }

  converter() {
    const amountNumb = this.value.length - 1;

    let expo = 0;
    let result = 0;

    for (let i = amountNumb; i >= 0; i--) {
      let calc = /* prettier-ignore */ (this.value[i] * 2**expo++) + result;
      result = calc;
    }

    const validate = new Validate();
    return validate.resultValidate(result);
  }

  init() {
    if (this.value) this.converter();
    return this;
  }
}
