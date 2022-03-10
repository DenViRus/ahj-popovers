import Popover from './Popover.js';
import data from './data.js';

const mainContainer = document.getElementById('mainContainer');

const popover1 = new Popover(mainContainer, data);
popover1.drawPopover();
popover1.showPopover();
