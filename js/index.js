
//Importing all modules
import { Modules } from './lib/Modules.js';

import { Utils } from './lib/Utils.js';
const utilsInit = new Tests()
Modules.Utils = Utils

import { Tests } from './lib/Tests.js';
const testsInit = new Tests()
Modules.Tests = Tests

import { Table } from './lib/Table.js';
const tableInit = new Table(Modules)
Modules.Table = Table



// Launching app
import { EventHandlers } from './lib/EventHandlers.js';
const eventHandlersInit = new EventHandlers(Modules)

EventHandlers.load()
