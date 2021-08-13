
//Importing all modules
import { Modules } from './Modules.js';

import { Utils } from './Utils.js';
const utilsInit = new Tests()
Modules.Utils = Utils

import { Tests } from './Tests.js';
const testsInit = new Tests()
Modules.Tests = Tests

import { Table } from './Table.js';
const tableInit = new Table(Modules)
Modules.Table = Table



// Launching app
import { EventHandlers } from './EventHandlers.js';
const eventHandlersInit = new EventHandlers(Modules)

EventHandlers.load()
