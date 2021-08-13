export function eventHandlers (Table, Utils) {
  let copyTableBtn = document.getElementById('copyTableBtn');
  copyTableBtn.addEventListener('click', function() {
    Utils.copyToClipboard('rawCode')
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
    Table.csvText = await file.text()
    await Table.buildTable(Table.csvText)
  }







  function getFiles(){
    let fileElem = document.getElementById('fileElem')
    handleFiles(fileElem.files)
  }


}
