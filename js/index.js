
import { Utils } from './Utils.js';

import { Tests } from './Tests.js';
const testsInit = new Tests();

import { Table } from './Table.js';
const tableInit = new Table(Utils, Tests)

import { eventHandlers } from './EventHandlers.js';
eventHandlers(Table, Utils)


// const tototo = new Table();


let testTableBtn = document.getElementById('testBtn');
testTableBtn.addEventListener('click', function() {
  // console.log(Utils.test);
  // console.log(table.csvText);
  // console.log(table.convertedText);
  console.log(testsInit.test);
  console.log(Tests.test);

});
