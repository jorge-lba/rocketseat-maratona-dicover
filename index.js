const Modal = {
  toggle(value) {
    document
      .querySelector(`.modal-overlay.${value}`)
      .classList.toggle('active')
  },
}

const Storage = {
  get() {
    return (
      JSON.parse(localStorage.getItem(`dev.finances:wallets`)) || []
    )
  },

  set(wallets) {
    localStorage.setItem(
      `dev.finances:wallets`,
      JSON.stringify(wallets)
    )
  },
}

const Wallet = {
  all: Storage.get(),
  selected: Storage.get()[0] || Modal.toggle('modal-wallets'),
  index: 0,

  update() {
    Wallet.all[Wallet.index] = Wallet.selected
    Storage.set(Wallet.all)
  },

  add(wallet) {
    if (!wallet.transactions) wallet.transactions = []
    Wallet.all.push(wallet)
    Storage.set(Wallet.all)
  },

  remove(index) {
    Wallet.all.splice(index, 1)
    App.reload()
  },

  select(index) {
    Modal.toggle('modal-wallets')

    Wallet.selected = Wallet.all[index]
    Transaction.all = Wallet.selected
    Wallet.index = index

    App.reload()
  },

  export() {
    const wallet = JSON.stringify(Wallet.selected)
    Utils.downloadFile(
      wallet,
      `wallet-${Wallet.selected?.name}.json`,
      'application/json'
    )
    return
  },

  extract() {
    const transactions = Transaction.all.transactions
    const incomes = Transaction.incomes()
    const expenses = Transaction.expenses()
    const total = Transaction.total()

    const currentDate = new Date()
    const date = currentDate.toLocaleDateString('pt-br')
    const time = currentDate.toLocaleTimeString('pt-br')

    let text = `Extrato - Data: ${`${date} - ${time}\n`}`
    text += transactions.reduce(
      (txt, transaction) =>
        (txt += `\n${transaction.date} - ${
          transaction.description
        }       ${Utils.formatCurrency(transaction.amount)}`),
      ''
    )
    text += `\n\nEntradas:        ${Utils.formatCurrency(incomes)}`
    text += `\nSaídas:          ${Utils.formatCurrency(expenses)}`
    text += `\nTotal:           ${Utils.formatCurrency(total)}`

    Utils.downloadFile(text, 'extrato.txt', 'application/text')
  },
}

const Transaction = {
  all: Wallet.selected || [],

  add(transaction) {
    Transaction.all.transactions.push(transaction)
    App.reload()
  },

  remove(index) {
    Transaction.all.transactions.splice(index, 1)
    App.reload()
  },

  incomes(transactions = Transaction.all.transactions) {
    return transactions?.reduce(
      (total, { amount }) => (amount > 0 ? amount + total : total),
      0
    )
  },

  expenses(transactions = Transaction.all.transactions) {
    return transactions?.reduce(
      (total, { amount }) => (amount < 0 ? amount + total : total),
      0
    )
  },

  total(transactions = Transaction.all.transactions) {
    return transactions?.reduce(
      (total, { amount }) => amount + total,
      0
    )
  },
}

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),
  walletsContainer: document.querySelector('#wallets-table tbody'),

  addWallet(wallet, index) {
    const tr = document.createElement('tr')

    tr.innerHTML = DOM.innerHTMLWallet(wallet, index)
    tr.dataset.index = index

    DOM.walletsContainer.appendChild(tr)
  },

  innerHTMLWallet(wallet, index) {
    const { name, transactions } = wallet

    const amount = transactions?.reduce(
      (current, next) => current + next.amount,
      0
    )

    const CSSClass = amount > 0 ? 'income' : 'expense'

    const newAmount = Utils.formatCurrency(amount)

    const html = `
    <td onclick="Wallet.select(${index})" class="name button">${name}</td>
    <td onclick="Wallet.select(${index})" class="${CSSClass} button">${newAmount}</td>
    <td>
      <img class="button" onclick="Wallet.remove(${index})" src="./assets/minus.svg" alt="Remover carteira">
    </td>
    `
    return html
  },

  addTransaction(transaction, index) {
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
      <img class="" onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
    </td>
    `
    return html
  },

  updateBalance() {
    document.getElementById(
      'incomeDisplay'
    ).innerHTML = Utils.formatCurrency(Transaction.incomes())

    document.getElementById(
      'expenseDisplay'
    ).innerHTML = Utils.formatCurrency(Transaction.expenses())

    document.getElementById(
      'totalDisplay'
    ).innerHTML = Utils.formatCurrency(Transaction.total())
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = ''
  },

  clearWallets() {
    DOM.walletsContainer.innerHTML = ''
  },
}

const Utils = {
  formatAmount(value) {
    value = Number(value) * 100
    return Math.round(value)
  },

  formatDate(date) {
    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year}`
  },

  formatCurrency(value) {
    const signal = Number(value) < 0 ? '-' : ''

    value = String(value).replace(/\D/g, '')

    value = Number(value) / 100

    value = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })

    return signal + value
  },

  downloadFile(data, name, type) {
    const blob = new Blob([data], {
      type: type,
    })
    const link = window.document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = `${name.trim().replace(/ +/g, '-')}`
    link.click()
    window.URL.revokeObjectURL(link.href)
    return
  },
}

const WalletForm = {
  name: document.querySelector('input#wallet-name'),

  getValues() {
    return { name: WalletForm.name.value }
  },

  validadeFields() {
    const { name } = WalletForm.getValues()
    if (name === '') {
      throw new Error('Por favor, preencha todos os campos.')
    }
  },

  formatValues() {
    let { name } = WalletForm.getValues()
    return {
      name: name.replace(/ +/g, ' ').trim(),
    }
  },

  saveWallet(wallet) {
    Wallet.add(wallet)
  },

  clearFields() {
    WalletForm.name.value = ''
  },

  submit(event) {
    event.preventDefault()
    try {
      WalletForm.validadeFields()
      const wallet = WalletForm.formatValues()
      WalletForm.saveWallet(wallet)

      WalletForm.clearFields()

      DOM.clearWallets()

      Wallet.all.forEach(DOM.addWallet)
    } catch (error) {
      alert(error.message)
    }
  },
}

const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  getValues() {
    return {
      description: Form.description.value.replace(/ +/g, ' ').trim(),
      amount: Form.amount.value,
      date: Form.date.value,
    }
  },

  validadeFields() {
    const { description, amount, date } = Form.getValues()
    if (
      description.trim() === '' ||
      amount.trim() === '' ||
      date.trim() === ''
    ) {
      throw new Error('Por favor, preencha todos os campos.')
    }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues()
    amount = Utils.formatAmount(amount)
    date = Utils.formatDate(date)

    return {
      description,
      amount,
      date,
    }
  },

  saveTransaction(transaction) {
    Transaction.add(transaction)
  },

  clearFields() {
    ;(Form.description.value = ''),
      (Form.amount.value = ''),
      (Form.date.value = '')
  },

  submit(event) {
    event.preventDefault()

    try {
      Form.validadeFields()
      const transaction = Form.formatValues()

      Form.saveTransaction(transaction)

      Form.clearFields()

      Modal.toggle('transaction')
    } catch (error) {
      alert(error.message)
    }
  },
}

const App = {
  init() {
    Transaction.all.transactions?.forEach(DOM.addTransaction)
    Wallet.all.forEach(DOM.addWallet)

    DOM.updateBalance()
    // Wallet.update()

    document.querySelector('#wallet-selected-name').innerHTML =
      Transaction.all?.name || 'Crie um Carteira'
  },

  reload() {
    DOM.clearTransactions()
    DOM.clearWallets()
    Wallet.update()
    this.init()
  },
}

App.init()

const invertTheme = (mediaText) =>
  mediaText.indexOf('dark') > -1
    ? ['dark', 'light']
    : ['light', 'dark']

function switchTheme() {
  const cssRules = window.document.styleSheets[0].cssRules

  for (const rule of cssRules) {
    let media = rule.media

    if (media) {
      const [currentTheme, nextTheme] = invertTheme(media.mediaText)

      media.mediaText = media.mediaText.replace(
        '(prefers-color-scheme: ' + currentTheme + ')',
        '(prefers-color-scheme: ' + nextTheme + ')'
      )
    }
  }
}
