# Date

## HTML

## CSS

## JS

- Wallet

```js
Transaction.filtered = { ...Wallet.selected }
```

- Transaction

```js
filtered: { ...Wallet.selected },

dates: [],
  filterOptions: {
    year(transaction, value) {
      return (
        parseInt(transaction.date.split('/')[2]) ===
        parseInt(value.year)
      )
    },
    month(transaction, value) {
      return (
        parseInt(transaction.date.split('/')[1]) ===
        parseInt(value.month)
      )
    },
    day(transaction, value) {
      return (
        parseInt(transaction.date.split('/')[0]) ===
        parseInt(value.day)
      )
    },
    yearAndMonth(transaction, value) {
      return (
        this.month(transaction, value) &&
        this.year(transaction, value)
      )
    },
    yearAndMonthAndDay(transaction, value) {
      return (
        this.month(transaction, value) &&
        this.year(transaction, value) &&
        this.day(transaction, value)
      )
    },
  },

  sortByDate(transactions, invert) {
    return transactions.sort((a, b) => {
      a = new Date(a.date.split('/').reverse().join('-'))
      b = new Date(b.date.split('/').reverse().join('-'))

      return invert ? (a > b ? -1 : 1) : a > b ? 1 : -1
    })
  },

  getDates() {
    return Wallet.selected.transactions.reduce(
      (accumulator, transaction) => {
        if (!accumulator.includes(transaction.date))
          accumulator.push(transaction.date)

        return accumulator
      },
      []
    )
  },

  getYears() {
    return this.dates.reduce((accumulator, date) => {
      const year = date.split('/')[2]
      if (!accumulator.includes(year)) accumulator.push(year)
      return accumulator
    }, [])
  },

  getMonths() {
    return this.dates.reduce((accumulator, date) => {
      const month = date.split('/')[1]
      if (!accumulator.includes(month)) accumulator.push(month)
      return accumulator.sort()
    }, [])
  },

  getDays() {
    return this.dates.reduce((accumulator, date) => {
      const day = date.split('/')[0]
      if (!accumulator.includes(day)) accumulator.push(day)
      return accumulator.sort()
    }, [])
  },

  filter(option, value) {
    Transaction.filtered.transactions = Transaction.all.transactions.filter(
      (transaction) =>
        Transaction.filterOptions[option](transaction, value)
    )
    console.log(Transaction.all)
    App.reload()
  },

  resetFilter() {
    Transaction.filtered.transactions = Transaction.all.transactions
    console.log(Transaction.all)
    App.reload()
  },
```

- App

```js
// init
Transaction.filtered.transactions?.forEach(DOM.addTransaction)
Transaction.dates = Transaction.getDates()

//reload
Transaction.dates = Transaction.getDates()
```
