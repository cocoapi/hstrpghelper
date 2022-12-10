window.scenarioData = {}

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
  const selEditor = makeSelecionEditor('', '', '');
  document.querySelector('.selection-add-wrapper').append(selEditor);
}

function selectionSave(target){
  console.log(target.parentElement)
  const selEditor = target.parentElement;
  const type = selEditor.querySelector('select[name=event-type]')
  const text = selEditor.querySelector('input.selection-text')
  const sceneNum = selEditor.querySelector('input.scene-num-input')
  if(sceneNum.value == '0'){
    alert('씬 번호가 필요합니다.');
    sceneNum.style.borderColor = '#ff0000';
    sceneNum.focus();
    return;
  }
  const editBtn = document.createElement('div')
  editBtn.classList.add('btn')
  editBtn.innerText = '수정'
  const removeBtn = document.createElement('div');
  removeBtn.classList.add('btn');
  removeBtn.innerText = '제거';
  removeBtn.onclick = () => {selectionRemove(removeBtn, true)};
  selEditor.innerHTML = `
    <div class="selection-text" style="width: 300px;"> ${text.value} </div>
    <div class="selection-type"> (${type.value}) </div>
    <div> 타겟 씬: # </div>
    <div class="scene-num" style="width: 20px;"> ${sceneNum.value} </div>
  `
  selEditor.append(editBtn, removeBtn);
}

function selectionRemove(target, check = false){
  if(check && !confirm('정말 삭제하시겠습니까?')){
    return;  
  }
  target.parentElement.remove();
}

function makeSelecionEditor(setType = '텍스트', setText = '', setSceneNum = ''){
  if(typeof setType !== 'string' || typeof setText !== 'string' || typeof setSceneNum != 'string'){
    return;
  }
  const selEditor = document.createElement('div');
  selEditor.classList.add('row', 'selection-item');
  const selType = document.createElement('select');
  selType.innerHTML = `
  <option value="텍스트"${setType === '텍스트' ? ' selected': ''}>텍스트</option>
  `
  selType.name = 'event-type';
  selType.ariaLabel = 'event-type';
  const text = document.createElement('input');
  text.type = 'text';
  text.placeholder = "텍스트 입력"
  text.style.width = '300px'
  text.classList.add('selection-text');
  text.value = setText;
  const sceneInput = document.createElement('input');
  sceneInput.type = 'number';
  sceneInput.placeholder = "타겟 씬 번호";
  sceneInput.value = setSceneNum;
  sceneInput.classList.add('scene-num-input')

  const saveBtn = document.createElement('div');
  saveBtn.innerText = '저장'
  saveBtn.classList.add('btn', 'save');
  saveBtn.onclick = () => {selectionSave(saveBtn)};
  const removeBtn = document.createElement('div');
  removeBtn.classList.add('btn', 'remove');
  removeBtn.innerText = '제거';
  removeBtn.onclick = () => {selectionRemove(removeBtn)};
  selEditor.append(selType, text, sceneInput, saveBtn, removeBtn);
  return selEditor;
}