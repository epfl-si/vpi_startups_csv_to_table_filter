export function eventHandlers (table) {
  let copyTableBtn = document.getElementById('copyTableBtn');
  copyTableBtn.addEventListener('click', function() {
    copyToClipboard('rawCode')
  });


  // Cherrypicked from https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
  let dropArea = document.getElementById('drop-area')
  let fileElem = document.getElementById('fileElem')

  ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
  })

  function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
  }


  fileElem.addEventListener('change', getFiles)
  dropArea.classList.remove('highlight')
  document.addEventListener("drag", function(event) {
  }, false);
  dropArea.addEventListener('dragenter', function( event ) {
    dropArea.classList.add('highlight')
  }, false)
  dropArea.addEventListener('dragover', function( event ) {
    dropArea.classList.add('highlight')
  }, false)
  dropArea.addEventListener('dragleave', function( event ) {
    dropArea.classList.remove('highlight')
  }, false)
  dropArea.addEventListener('dragend', function( event ) {
    dropArea.classList.remove('highlight')
  }, false)
  dropArea.addEventListener('dragexit', function( event ) {
    dropArea.classList.remove('highlight')
  }, false)
  dropArea.addEventListener('drop', function( event ) {
    dropArea.classList.remove('highlight')
    let dt = event.dataTransfer
    let files = dt.files
    handleFiles(files)
  }, false)


  function handleFiles(files){
    ([...files]).forEach(uploadFile)
  }

  async function uploadFile(file) {
    table.csvText = await file.text()
    await buildTable(table.csvText)
  }

  // Cherrypicked from https://github.com/yasharma/CsvToTable
  function buildTable(csvFileString) {
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
    table.convertedText = strTable
    document.getElementById('preview').innerHTML = strTable;
    document.getElementById('rawCode').textContent = strTable;
    // download("wp-strTable.txt", strTable)
    return strTable

    function isNotEmpty(row) {
      return row !== "";
    }
  }



  //Cherrypicked from: https://stackoverflow.com/a/18197341/13715020
  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  function getFiles(){
    let fileElem = document.getElementById('fileElem')
    handleFiles(fileElem.files)
  }

  async function copyToClipboard(tagID){
    const el = document.getElementById(tagID)
    const selection = window.getSelection()
    selection.removeAllRanges()
    const range = document.createRange()
    range.selectNodeContents(el)
    window.getSelection().addRange(range)
    document.execCommand('copy')
  }
}
