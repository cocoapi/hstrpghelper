function loadScript() {
  const input = loadScripts
  if(input.files.length !== 0){
      const scenario = input.files[0]
      console.log(scenario)
      var reader = new FileReader();
      reader.onload = onReaderLoad
      reader.readAsText(event.target.files[0])
  }
}

function onReaderLoad(event){
  console.log(event.target.result)
  var obj = JSON.parse(event.target.result)
  window.scenario = obj
  sceneTitle.innerText = window.scenario.scene.title
  sceneScript.innerText = window.scenario.scene.body
  var sel = obj.scene.selection
  selectionList.innerHTML = ""
  sel.forEach(e => {
      var selButton = document.createElement('div')
      selButton.classList.add('selection')
      selButton.innerText = e.body
      selButton.dataset.value = e.value
      selectionList.append(selButton)
  })
}

function addSelection(){
  const selEditor = document.createElement('div');
  selEditor.classList.add('row')
  const selType = document.createElement('select');
  selType.innerHTML = `
  <option value="text" selected>텍스트</option>
  `
  const text = document.createElement('input');
  text.type = text;
  text.placeholder = "텍스트 입력"
  const sceneInput = document.createElement('input');
  sceneInput.type = 'number';
  sceneInput.placeholder = "타겟 씬 번호";
  selEditor.append(selType, text, sceneInput);
  document.querySelector('.selection-add-wrapper').append(selEditor);
}