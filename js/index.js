
import { Utils } from './Utils.js';
const utils = new Utils();
console.log(Utils.test);

import { Tests } from './Tests.js';
const testsObj = new Tests();

import { Table } from './Table.js';
const table = new Table(Utils, testsObj);

import { eventHandlers } from './EventHandlers.js';
eventHandlers(table, Utils)


// const tototo = new Table();


let testTableBtn = document.getElementById('testBtn');
testTableBtn.addEventListener('click', function() {
  // console.log(Utils.test);
  // console.log(table.csvText);
  // console.log(table.convertedText);
  console.log(testsObj.test);
  console.log(Tests.test);

});
