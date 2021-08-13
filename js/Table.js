export class Table {

  // static csvText = ""
  // static convertedText = ""

  constructor(Modules) {
    Table.csvText = "";
    Table.convertedText = "";
    Table.Utils = Modules.Utils;
    Table.Tests = Modules.Tests;
  }

  // Cherrypicked from https://github.com/yasharma/CsvToTable
  static buildTable(csvFileString) {
    Table.Tests.test = "ChangedValue"
    Table.Utils.test = "toto"
    Table.csvText = "tototata"
    var activeColumns = [0,1,2,15,17];
    var prefix = `<!-- wp:epfl/table-filter {"largeDisplay":true,"tableHeaderOptions":"header,sort"} -->\n<!-- wp:table {"className":"is-style-stripes"} -->\n<figure class="wp-block-table is-style-stripes">\n`;
    var suffix = `</figure>\n<!-- /wp:table -->\n<!-- /wp:epfl/table-filter -->`
    var allRows = csvFileString.split(/\r?\n|\r/).filter(isNotEmpty);
    var strTable = prefix;
    strTable += '<Table>';
    for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
      if (singleRow === 0) {
        strTable += '<thead>';
        strTable += '<tr>';
      } else {

        strTable += '<tr>';
      }
      var rowCells = allRows[singleRow].split(',');
      for(var rowCell = 0; rowCell < rowCells.length; rowCell++){
        if(activeColumns.includes(rowCell)){
          if(singleRow === 0){
            strTable += '<th>';
            strTable += rowCells[rowCell];
            strTable += '</th>';
          } else {
            strTable += '<td>';
            strTable += rowCells[rowCell];
            strTable += '</td>';
          }
        }
      }
      if (singleRow === 0) {
        strTable += '</tr>';
        strTable += '</thead>';
        strTable += '<tbody>';
      } else {
        strTable += '</tr>';
      }
    }
    strTable += '</tbody>';
    strTable += '</Table>';
    strTable += suffix;
    Table.convertedText = strTable
    document.getElementById('preview').innerHTML = strTable;
    document.getElementById('rawCode').textContent = strTable;
    // Table.Utils.download("wp-strTable.txt", strTable)
    return strTable

    function isNotEmpty(row) {
      return row !== "";
    }
  }
}
