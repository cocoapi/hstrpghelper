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