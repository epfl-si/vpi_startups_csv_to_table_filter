
import { Utils } from './Utils.js';
const utils = new Utils();

import { Table } from './Table.js';
const table = new Table(Utils);

import { eventHandlers } from './EventHandlers.js';
eventHandlers(table, Utils)
// const tototo = new Table();
