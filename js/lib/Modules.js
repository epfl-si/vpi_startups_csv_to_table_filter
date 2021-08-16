export class Modules {
  constructor(
    Utils,
    Tests,
    Table
  ) {
    Modules.Utils = new Utils();
    Modules.Tests = new Tests("toto");
    Modules.Table = new Table(Modules.Utils, Modules.Tests);
  }
}
