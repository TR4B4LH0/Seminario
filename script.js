const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sCPF = document.querySelector('#m-cpf')
const sData_nasc = document.querySelector('#m-data_nasc')
const sEmail = document.querySelector('#m-email')
const sSenha = document.querySelector('#m-senha')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
      sNome.value = itens[index].nome
      sCPF.value = itens[index].cpf
      sData_nasc.value = itens[index].data_de_nascimento
      sEmail.value = itens[index].email
      sSenha = itens[index].senha
      id = index
  } else {
      sNome.value = ''
      sCPF = ''
      sData_nasc = ''
      sEmail = ''
      sSenha = ''
  }
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.cpf}</td>
    <td>${item.data_de_nascimento}</td>
    <td>${item.email}</td>
    <td>${item.senha}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sCPF.value == '' || sData_nasc.value == '' || sEmail.value == '' || sSenha.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].sNome.value
    itens[id].sCPF.value 
    itens[id].sData_nasc.value
    itens[id].sEmail.value
    sSenha[id].sSenha.value

  } else {
      itens.push({'nome': sNome.value, 'CPF': sCPF.value, 'data_de_nascimento': sData_nasc.value,  'email': sEmail.value, 'senha': sSenha})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
