const localStorageKey = 'to-list-gn'

function validadeIfExistNewTask() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]')
  let inputValue = document.getElementById('input-item').value
  let exists = values.find(x => x.name === inputValue)
  return !!exists
}

function newTask() {
  let input = document.getElementById('input-item')
  input.style.border = ''

  if (!input.value) {
    input.style.border = '1px solid red'
    alert('Digite o produto para inserir na sua lista')
  } else if (validadeIfExistNewTask()) {
    alert('Já existe um item assim')
  } else {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]')
    values.push({ name: input.value, checked: false }) // adiciona estado de seleção
    localStorage.setItem(localStorageKey, JSON.stringify(values))
    showValues()
  }

  input.value = ''
}

function showValues() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]')
  let list = document.getElementById('to-list')

  list.innerHTML = ''

  for (let i = 0; i < values.length; i++) {
    const icon = values[i].checked
      ? 'assets/click-selected.svg'
      : 'assets/click-Default.svg'

    list.innerHTML += `
      <li>
        <button class="click-button" data-index="${i}">
          <img src="${icon}" alt="Selecionar">
        </button>
        ${values[i].name}
        <button class="delete-button" data-index="${i}">
          <img src="assets/lixeira.svg" alt="Remover">
        </button>
      </li>`
  }

  applyClickBehavior()
  applyDeleteBehavior()
}

function applyClickBehavior() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]')
  const buttons = document.querySelectorAll('.click-button')

  buttons.forEach(button => {
    const index = button.getAttribute('data-index')

    button.addEventListener('click', function () {
      values[index].checked = !values[index].checked
      localStorage.setItem(localStorageKey, JSON.stringify(values))
      showValues()
    })
  })
}

function applyDeleteBehavior() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]')
  const deleteButtons = document.querySelectorAll('.delete-button')

  deleteButtons.forEach(button => {
    const index = button.getAttribute('data-index')

    button.addEventListener('click', function () {
      if (values[index].checked) {
        values.splice(index, 1)
        localStorage.setItem(localStorageKey, JSON.stringify(values))
        showValues()

        let footer = document.getElementById('footer')
        footer.classList.add('show')

        setTimeout(() => {
          footer.classList.remove('show')
        }, 3000)
      } else {
        alert('Você só pode remover o item se ele estiver marcado!')
      }
    })
  })
}

document.getElementById('scroll-to-top').addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

showValues()
