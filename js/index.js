import { Modules } from './Modules.js';

import { Utils } from './Utils.js';
Modules.Utils = Utils

import { Tests } from './Tests.js';
Modules.Tests = Tests

import { Table } from './Table.js';
const tableInit = new Table(Modules)
Modules.Table = Table

import { eventHandlers } from './EventHandlers.js';
eventHandlers(Modules)



let testTableBtn = document.getElementById('testBtn');
testTableBtn.addEventListener('click', function() {
  console.log(testsInit.test);
  console.log(Tests.test);

});
