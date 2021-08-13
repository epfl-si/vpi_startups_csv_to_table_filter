// import { toto } from './Table.js';
window.onload = async function(){
  let totoBtn = document.getElementById('totoBtn');

  let copyTableBtn = document.getElementById('copyTableBtn');
  copyTableBtn.addEventListener('click', copyToClipboard);

  // Cherrypicked from https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
  let dropArea = document.getElementById('drop-area')
  let fileElem = document.getElementById('fileElem')

  ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
    // fileElem.addEventListener(eventName, preventDefaults, false)
  })

  function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
  }


  // fileElem.onchange = hello("toto")
  fileElem.addEventListener('change', getFiles)
  // fileElem.addEventListener('change', handleFiles(fileElem.files))
  // copyTableBtn.addEventListener('click', tutu)
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
    console.log("toto handle file");
    console.log(typeof files);
    ([...files]).forEach(uploadFile)
  }

  let convertedFile = "";
  async function uploadFile(file) {
    console.log(file);
    fileString = await file.text()
    console.log(fileString);
    var convertedFile = await buildTable(fileString)
  }

  // Cherrypicked from https://github.com/yasharma/CsvToTable
  function buildTable(csvFile) {
    var activeColumns = [0,1,2,15,17];
    var prefix = `<!-- wp:epfl/table-filter {"largeDisplay":true,"tableHeaderOptions":"header,sort"} -->\n<!-- wp:table {"className":"is-style-stripes"} -->\n<figure class="wp-block-table is-style-stripes">\n`;
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
    console.log(fileElem.files);
    handleFiles(fileElem.files)
  }

  async function copyToClipboard(){
    let fileElem = document.getElementById('fileElem')
    ([...files]).forEach(uploadFile)
    let fileString = await file.text()

    navigator.clipboard.writeText(convertedFile).then(function() {
      /* presse-papiers modifié avec succès */
      console.log("Oui");
    }, function() {
      console.log("Non");
      /* échec de l’écriture dans le presse-papiers */
    });
  }

}


function hello(tata){
  // console.log("hello");
  console.log(tata);
}
function tutu(){
  // console.log("hello");
  console.log("tata");
}



let btnFileElem = document.getElementById('btnFileElem')
// btnFileElem.addEventListener('click', tutu);
