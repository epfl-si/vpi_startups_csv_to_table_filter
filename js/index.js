
import { Utils } from './Utils.js';

import { Tests } from './Tests.js';
const testsInit = new Tests();

import { Table } from './Table.js';
const tableInit = new Table(Utils, Tests)

import { eventHandlers } from './EventHandlers.js';
eventHandlers(Table, Utils)

let testTableBtn = document.getElementById('testBtn');
testTableBtn.addEventListener('click', function() {
  console.log(testsInit.test);
  console.log(Tests.test);

});
