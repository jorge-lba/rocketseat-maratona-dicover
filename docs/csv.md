# html

```html
<a href="#" class="button extract" onclick="Wallet.csv()">
  <img src="./assets/get_app-24px.svg" alt="Gerar CSV" />
  <span>Gerar CSV</span>
</a>
```

# Javascript

```js
csv() {
  const transactions = Transaction.all.transactions
  const content =
    'Descrição, Saídas, Total\n' +
    transactions.reduce((acc, transaction) => {
      acc += `${transaction.description},"${Utils.formatCurrency(
        transaction.amount
      )}",${transaction.date}\n`
      return acc
    }, '')

  Utils.downloadFile(content, 'transactions.csv', 'application/csv')
},
```

# CSS

```css
div.menu-transactions {
  display: inline-flex;
  width: 20rem;
  padding-right: 0;
}

div.menu-transactions a {
  margin: 0 0.8rem;
}
```
