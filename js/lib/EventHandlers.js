export class EventHandlers {

  constructor(Modules){
    EventHandlers.Modules = Modules
  }

  static load(){

    let testTableBtn = document.getElementById('testBtn');
    testTableBtn.addEventListener('click', function() {
      console.log(EventHandlers.Modules.Tests.test);
      console.log(EventHandlers.Modules.Table.csvText);
    });


    let copyTableBtn = document.getElementById('copyTableBtn');
    copyTableBtn.addEventListener('click', async function() {
      await EventHandlers.Modules.Utils.copyToClipboard('rawCode')
    });

    // Cherrypicked from https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
    let dropArea = document.getElementById('drop-area')

    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, preventDefaults, false)
    })

    function preventDefaults (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    let fileElem = document.getElementById('fileElem')
    fileElem.addEventListener('change', function(event) {
      handleFiles(fileElem.files)
    })
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
      ([...files]).forEach(async (file) => {
        EventHandlers.Modules.Table.buildTable(await file.text())
      })
    }
  }
}
