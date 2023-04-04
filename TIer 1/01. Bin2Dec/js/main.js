import Validate from "./module/validateInput.js";
import Entry from "./module/entry.js";

const validate = new Validate();
validate.init();

const entry = new Entry();
entry.addEvent();
