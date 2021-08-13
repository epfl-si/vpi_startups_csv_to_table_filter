import { Modules } from './Modules.js';

import { Utils } from './Utils.js';
Modules.Utils = Utils

import { Tests } from './Tests.js';
Modules.Tests = Tests

import { Table } from './Table.js';
const tableInit = new Table(Modules)
Modules.Table = Table

import { EventHandlers } from './EventHandlers.js';
const eventHandlersInit = new EventHandlers(Modules)

EventHandlers.load()

let testTableBtn = document.getElementById('testBtn');
testTableBtn.addEventListener('click', function() {
  console.log(testsInit.test);
  console.log(Tests.test);

});
