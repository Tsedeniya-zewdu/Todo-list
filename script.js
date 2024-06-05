const inputbox = document.getElementById('input-box')
const container = document.getElementById('list-container')

function addTask() {
  if (inputbox.value === '') {
    alert('please enter a task')
  } else {
    let li = document.createElement('li')

    let text = inputbox.value
    li.innerHTML = text
    container.appendChild(li)
    let radio = document.createElement('input')
    radio.type = 'checkbox'
    radio.setAttribute('id', 'rad')
    li.insertBefore(radio, li.childNodes[0])
    let span = document.createElement('span')
    span.innerHTML = '\u00d7'
    li.appendChild(span)

    savedata()
  }
  inputbox.value = ''
  savedata()
}
container.addEventListener(
  'click',
  function (e) {
    if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
      e.target.parentElement.classList.toggle('checked')
      savedata()
    } else if (e.target.tagName === 'SPAN') {
      e.target.parentElement.remove()
      savedata()
    }
  },
  false,
)
function savedata() {
  const tasks = []
  container.querySelectorAll('li').forEach((li) => {
    tasks.push({
      text: li.childNodes[1].nodeValue.trim(),
      checked: li.querySelector('input[type="checkbox"]').checked,
    })
  })
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function showTask() {
  const tasks = JSON.parse(localStorage.getItem('tasks'))
  if (tasks) {
    tasks.forEach((task) => {
      let li = document.createElement('li')
      li.innerHTML = task.text
      container.appendChild(li)

      let radio = document.createElement('input')
      radio.type = 'checkbox'
      radio.checked = task.checked
      if (task.checked) {
        li.classList.add('checked')
      }
      radio.setAttribute('id', 'rad')
      li.insertBefore(radio, li.childNodes[0])

      let span = document.createElement('span')
      span.innerHTML = '\u00d7'
      li.appendChild(span)
    })
  }
}

showTask()
