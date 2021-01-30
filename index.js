const Modal = {
  toggle(){
    document.querySelector('.modal-overlay').classList.toggle('active')
  }
}

const Storage = {
  get(){
    return JSON.parse(localStorage.getItem('dev.finances:transactions')) || []
  },

  set(transactions){
    localStorage.setItem(
      'dev.finances:transactions', 
      JSON.stringify(transactions)  
    )
  }
}

const Transaction = {
  all:Storage.get(),

  add(transaction){
    this.all.push(transaction)
    App.reload()
  },

  remove(index){
    this.all.splice(index, 1)
    App.reload()
  },

  incomes(transactions = this.all){
    return transactions.reduce((total, {amount}) => 
      amount > 0 ? amount + total: total
    , 0)
  },

  expenses(transactions = this.all){
    return transactions.reduce((total, {amount}) => 
      amount < 0 ? amount + total: total
    , 0)
  },

  total(transactions = this.all){
    return transactions.reduce((total, {amount}) => amount + total, 0)
  }
}

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index){
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
    tr.dataset.index = index

    DOM.transactionsContainer.appendChild(tr)
  },

  innerHTMLTransaction(transaction, index) {
    const { description, amount, date } = transaction

    const CSSClass = amount > 0 ? 'income' : 'expense'

    const newAmount = Utils.formatCurrency(amount)

    const html = `
    <td class="description">${description}</td>
    <td class="${CSSClass}">${newAmount}</td>
    <td call="date">${date}</td>
    <td>
      <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
    </td>
    `
    return html
  },

  updateBalance() {
    document
      .getElementById('incomeDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.incomes())

    document
      .getElementById('expenseDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.expenses())

    document
      .getElementById('totalDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.total())
  },

  clearTransactions(){
    this.transactionsContainer.innerHTML = ''
  }
}

const Utils = {
  formatAmount(value){
    value = Number(value)*100
    return Math.round(value)
  },

  formatDate(date){
    const [ year, month, day ] = date.split('-')
    return `${day}/${month}/${year}`
  },

  formatCurrency(value){
    const signal = Number(value) < 0 ? '-' : ''

    value = String(value).replace(/\D/g, '')

    value = Number(value) / 100

    value = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    return signal + value
  }
}

const Form = {
  description:document.querySelector('input#description'),
  amount:document.querySelector('input#amount'),
  date:document.querySelector('input#date'),

  getValues(){
    return {
      description: this.description.value.replace(/ +/g, ' ').trim(),
      amount: this.amount.value,
      date: this.date.value
    }
  },

  validadeFields(){
    const { description, amount, date } = this.getValues()
    if( description.trim() === '' 
      || amount.trim() === '' 
      || date.trim() === ''
    ){
      throw new Error('Por favor, preencha todos os campos.')
    } 
  },

  formatValues(){
    let { description, amount, date } = this.getValues()
    amount = Utils.formatAmount(amount)
    date = Utils.formatDate(date)

    return {
      description, 
      amount, 
      date 
    }
  },

  saveTransaction(transaction){
    Transaction.add(transaction)
  },

  clearFields(){
    this.description.value = '',
    this.amount.value = '',
    this.date.value = ''
  },

  submit(event){
    event.preventDefault()

    try {
      this.validadeFields()
      const transaction = this.formatValues()

      this.saveTransaction(transaction)

      this.clearFields()

      Modal.toggle()
    } catch (error) {
      alert(error.message)
    }

  }
}
const App = {
  init() {
    Transaction.all.forEach(DOM.addTransaction)

    DOM.updateBalance()

    Storage.set(Transaction.all)
  },

  reload(){
    DOM.clearTransactions()
    this.init()
  }
}

App.init()

const invertTheme = (mediaText) => mediaText.indexOf('dark') > -1
  ? ['dark', 'light']
  : ['light', 'dark']

function switchTheme() {  
  const cssRules = window.document.styleSheets[0].cssRules
 
  for (const rule of cssRules) {
    let media = rule.media
    
    if (media) {
      const [currentTheme, nextTheme] = invertTheme(media.mediaText)

      media.mediaText = media
      .mediaText
      .replace(
        "(prefers-color-scheme: " + currentTheme + ")", 
        "(prefers-color-scheme: " + nextTheme + ")",
      )
    }
  }
}
