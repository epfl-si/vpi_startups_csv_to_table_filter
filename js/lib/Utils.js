export class Utils{
  //Cherrypicked from: https://stackoverflow.com/a/18197341/13715020
  static download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  static async copyToClipboard(tagID){
    const el = document.getElementById(tagID)
    const selection = window.getSelection()
    selection.removeAllRanges()
    const range = document.createRange()
    range.selectNodeContents(el)
    window.getSelection().addRange(range)
    document.execCommand('copy')
  }
}
