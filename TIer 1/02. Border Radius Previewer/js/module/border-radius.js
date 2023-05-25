export default class BorderRadius {
  constructor() {
    this.sideCheck = document.querySelectorAll('.check');
    this.area = document.querySelector('.border-radius-configs');
    this.square = document.querySelectorAll('.square');
    this.border = document.querySelector('.border-radius-edit');
    this.copy = document.querySelector('.copy');
    this.reset = document.querySelector('.reset');

    this.movements = {
      initialX: 0,
      initialY: 0,
      current: 0,
      top: { endX: 0, endY: 0 },
      left: { endX: 0, endY: 0 },
      right: { endX: 0, endY: 0 },
      bottom: { endX: 0, endY: 0 },
    };

    this.borderRadius = {
      X: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      },

      Y: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      },
    };
  }

  // Event handling methods
  copied() {
    const msg = document.querySelector('.confirm-copy');

    navigator.clipboard.writeText(this.border.innerText);

    msg.style.display = 'flex';

    setTimeout(() => (msg.style.display = 'none'), 4000);
  }

  resetConfigs() {
    this.resetSquared();
    this.resetPos();
    this.resetBorder();
    this.borderEdit();
  }

  loadPage() {
    this.keys = Object.keys(this.borderRadius.Y);
    this.chose();
    this.loadConfigs();
    this.borderEdit();
    this.squarePosition();
  }

  axis(option, index) {
    option.preventDefault();
    this.activeSide(index);
    this.checkSide(option);
    this.settingsSide();
  }

  end() {
    document.removeEventListener('mousemove', this.current);

    if (this.movements['upEnd' + this.XorY])
      this.movements[this.side]['end' + this.XorY] =
        this.movements['upEnd' + this.XorY];

    if (this.element) this.ElementColor(false);

    this.storageConfigs();
  }

  current(move) {
    this.elementIsSide(move);
    this.checkCondition();
    this.moveElement();
  }

  begin(move) {
    move.preventDefault();

    this.drive(move);
    this.isSide(move);

    this.elementSide();

    this.ElementColor(true);

    document.addEventListener('mousemove', this.current);
  }

  addEvents() {
    this.sideCheck.forEach((check, index) =>
      check.addEventListener('click', (click) => this.axis(click, index)),
    );

    this.square.forEach((square) => {
      square.addEventListener('mousedown', this.begin);
    });

    document.addEventListener('mouseup', this.end);

    this.copy.addEventListener('click', this.copied);
    this.reset.addEventListener('click', this.resetConfigs);

    window.addEventListener('load', this.loadPage);
  }

  // DOM manipulation methods

  resetBorder() {
    const borderKeys = Object.keys(this.borderRadius[this.XorY]);
    borderKeys.forEach((key) => {
      this.side = key;

      this.borderRadius[this.XorY][key] = 0;
      this['border' + this.XorY]();

      this.storageClear();
    });
  }

  resetSquared() {
    this.square.forEach((square) => (square.style[square.dataset.line] = '0%'));
  }

  ElementColor(boolean) {
    let isTrue = boolean;

    if (isTrue) {
      this.element.classList.add('pressed');
      this.element.classList.remove('effect');
    } else {
      this.element.classList.add('effect');
      this.element.classList.remove('pressed');
    }
  }

  borderEdit() {
    const configs = document
      .querySelector('.ajusts')
      .innerText.replace(/[{}]/g, '');

    this.border.style = `${configs}`;
  }

  YorXIs() {
    if (this.side) {
      if (this.XorY === 'Y') this.borderY();
      if (this.XorY === 'X') this.borderX();
    }
  }

  checkCondition() {
    this.chose();
    this.YorXIs();
    this.borderEdit();
  }

  borderX() {
    const hStyle = document.querySelector(`.${this.side}-x`);
    hStyle.innerText = ` ${this.borderRadius.X[this.side]}%`;
  }

  borderY() {
    const yStyle = document.querySelector(`.${this.side}-y`);
    yStyle.innerText = ` ${this.borderRadius.Y[this.side]}%`;
  }

  activeSide(index) {
    const options = document.querySelectorAll('ul li');

    options.forEach((option) => option.classList.remove('active'));

    options[index].classList.add('active');
  }

  checkSide(click) {
    this.sideCheck.forEach((check) => check.classList.remove('active-check'));

    if (!click.currentTarget.classList.contains('active-check')) {
      click.currentTarget.classList.add('active-check');
    }

    this.checkCondition();
  }

  settingsSide() {
    this.square.forEach((square) => {
      square.style[square.dataset.line] =
        this.borderRadius[this.XorY][square.dataset.line] + '%';
    });
  }

  positionElement() {
    this.element.style[this.side] =
      this.borderRadius[this.XorY][this.side] + '%';
  }

  moveElement() {
    this.movements['upEnd' + this.XorY] =
      +this.movements[this.side]['end' + this.XorY] + this.movements.current;

    this.borderRadius[this.XorY][this.side] = this.percentage(
      this.movements['upEnd' + this.XorY],
    );

    this.positionElement();
  }

  elementSide() {
    this.element = document.querySelector(`[data-line="${this.side}"]`);
  }

  // border-radius initial settings

  squarePosition() {
    this.keys.forEach((key, i) => {
      this.movements[key].endY = +localStorage['move-' + key + 'Y'] || 0;
      this.movements[key].endX = +localStorage['move-' + key + 'X'] || 0;

      if (this.XorY === 'Y')
        this.square[i].style[key] =
          this.percentage(this.movements[key].endY) + '%';

      if (this.XorY === 'X')
        this.square[i].style[key] =
          this.percentage(this.movements[key].endX) + '%';
    });
  }

  changeStorage() {
    this.keys.forEach((key) => {
      this.side = key;

      this.borderRadius.Y[key] = localStorage[key + 'Y'] || 0;
      this.borderRadius.X[key] = localStorage[key + 'X'] || 0;

      this.borderY();
      this.borderX();
    });
  }

  // page load

  loadConfigs() {
    this.changeStorage();
    this.borderEdit();
  }

  // border radius memory

  storagePosition() {
    this.keys.forEach((key) => {
      localStorage['move-' + key + 'Y'] = this.movements[key].endY;
      localStorage['move-' + key + 'X'] = this.movements[key].endX;
    });
  }

  storageBorder() {
    this.keys.forEach((key) => {
      localStorage[key + 'Y'] = this.borderRadius.Y[key];
      localStorage[key + 'X'] = this.borderRadius.X[key];
    });
  }

  storageConfigs() {
    this.storageBorder();
    this.storagePosition();
  }

  // Auxiliary methods
  storageClear() {
    localStorage.removeItem(this.side + this.XorY);
    localStorage.removeItem('move-' + this.side + this.XorY);
  }

  resetPos() {
    this.keys.forEach((key) => (this.movements[key]['end' + this.XorY] = 0));
  }

  elementIsSide(move) {
    switch (this.side) {
      case 'bottom':
        this.movements.current = (this.movements.initialY - move.clientY) * 2;
        break;

      case 'left':
        this.movements.current = move.clientX - this.movements.initialX;
        break;

      case 'right':
        this.movements.current = this.movements.initialX - move.clientX;
        break;

      case 'top':
        this.movements.current = (move.clientY - this.movements.initialY) * 2;
        break;
    }
  }

  percentage(value) {
    const calc = (value / this.area.offsetWidth) * 100;

    if (calc > 100) return 100;
    else if (calc < 0) return 0;
    else return Math.round(calc);
  }

  chose() {
    this.XorY = [...this.sideCheck].filter((element) =>
      element.classList.contains('active-check'),
    )[0].dataset.value;
  }

  isSide({ target }) {
    this.side = target.dataset.line;
  }

  drive(move) {
    this.movements.initialX = move.clientX;
    this.movements.initialY = move.clientY;
  }

  //Startup and configuration methods

  bind() {
    this.begin = this.begin.bind(this);
    this.end = this.end.bind(this);
    this.current = this.current.bind(this);
    this.copied = this.copied.bind(this);
    this.loadPage = this.loadPage.bind(this);
    this.resetConfigs = this.resetConfigs.bind(this);
  }

  init() {
    if (
      this.sideCheck &&
      this.area &&
      this.square &&
      this.border &&
      this.copy
    ) {
      this.bind();
      this.addEvents();
    }
  }
}
