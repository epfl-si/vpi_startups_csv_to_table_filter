window.onload = async function(){
  let dropArea = document.getElementById('drop-area')
  ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
  })

  function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
  }

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
}

function handleFiles(files){
  console.log("toto handle file");
  console.log(typeof files);
  ([...files]).forEach(uploadFile)
}

async function uploadFile(file) {
  console.log(file);
  fileString = await file.text()
  console.log(fileString);
  var toto = await buildTable(fileString)
}

// Cherrypick from https://github.com/yasharma/CsvToTable
function buildTable(csvFile) {
  var activeColumns = [0,1,2,15,17];
  var prefix = `<!-- wp:epfl/table-filter -->\n<!-- wp:table {"className":"is-style-stripes"} -->\n<figure class="wp-block-table is-style-stripes">\n`;
  var suffix = `</figure>\n<!-- /wp:table -->\n<!-- /wp:epfl/table-filter -->`
    var allRows = csvFile.split(/\r?\n|\r/).filter(isNotEmpty);
        var table = prefix;
        table += '<table>';
        for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
            if (singleRow === 0) {
                table += '<thead>';
                table += '<tr>';
            } else {
                table += '<tr>';
            }
            var rowCells = allRows[singleRow].split(',');
            for(var rowCell = 0; rowCell < rowCells.length; rowCell++){
              if(activeColumns.includes(rowCell)){
                if(singleRow === 0){
                  table += '<th>';
                  table += rowCells[rowCell];
                  table += '</th>';
                } else {
                  table += '<td>';
                  table += rowCells[rowCell];
                  table += '</td>';
                }
              }
            }
            if (singleRow === 0) {
                table += '</tr>';
                table += '</thead>';
                table += '<tbody>';
            } else {
                table += '</tr>';
            }
        }
        table += '</tbody>';
        table += '</table>';
        table += suffix;
        document.body.innerHTML += table;
        download("wp-table.txt", table)
  return table
}

function isNotEmpty(row) {
    return row !== "";
}

//cherrypick from: https://stackoverflow.com/a/18197341/13715020
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
