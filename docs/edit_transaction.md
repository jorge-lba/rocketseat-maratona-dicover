# Modal

```js
  title: document.querySelector('#modal-title'),
  editable: document.querySelector('#form'),
```

# Transaction

```js
  editableIndex: '',

  update(index, transaction) {
    Transaction.all.transactions[index] = transaction
    App.reload()
  },
```

# DOM

innerHTMLTransaction

```html
<td>
  <a class="edit" onclick="DOM.editTransaction(${index})"></a>
</td>
```

```js
  editTransaction(index) {
    const transaction = Transaction.all.transactions[index]
    transaction.date = transaction.date.split('/').reverse().join('-')

    Transaction.editableIndex = index

    Modal.title.innerText = 'Editar Transação'
    Modal.editable.setAttribute('data-editable', 'true')
    Form.setValues(transaction)
    Form.plotsDisabled()

    Modal.toggle('transaction')
  },
```

# From

```js
  setValues({ description, amount, date, plots }) {
    Form.description.value = description
    Form.amount.value = amount / 100
    Form.date.value = date.split('/').reverse().join('-')
    Form.plots.value = plots
  },

  cancel(value) {
    Modal.toggle(value)
    Form.clearFields()
  },

  plotsDisabled() {
    Form.plots.setAttribute('disabled', 'disabled')
    Form.checkbox.setAttribute('disabled', 'disabled')
  },

  plotsEnabled() {
    Form.checkbox.removeAttribute('disabled')
  },

    updateTransaction(index, transaction) {
    transaction.date = Utils.formatDate(
      new Date(transaction.date + 'T11:00:01')
    )

    Transaction.update(index, { ...transaction })
  },

  clearFields() {
    Form.description.value = ''
    Form.amount.value = ''
    Form.date.value = ''
    Form.plots.value = ''
    Form.checkbox.checked = false

    Modal.editable.setAttribute('data-editable', 'false')
    Modal.title.innerText = 'Nova Transação'
  },

  //add no submit
  submit(){
    Modal.editable.attributes['data-editable'].value === 'true'
      ? Form.updateTransaction(
          Transaction.editableIndex,
          transaction
        )
      : Form.saveTransaction(transaction)
  }
```

# CSS

```css
a.edit {
  display: inline-block;

  width: 56px;
  height: 56px;

  background-color: var(--edit-color);
  -webkit-mask: url(./assets/edit.svg) no-repeat 50% 50%;
  mask: url(./assets/edit.svg) no-repeat 50% 50%;
}

a.edit:hover {
  filter: brightness(200%) saturate(40);
}

a.remove {
  display: inline-block;

  width: 56px;
  height: 56px;

  background-color: var(--trash-color);
  -webkit-mask: url(./assets/remove.svg) no-repeat 50% 50%;
  mask: url(./assets/remove.svg) no-repeat 50% 50%;
  mask-position: center;
}

a.remove:hover {
  filter: saturate(700) contrast(150%);
}

table tbody td {
  background: var(--table-color-base);
  padding: 1rem 2rem;
}

table tbody td:nth-child(4),
table tbody td:nth-child(5) {
  width: 56px;
  margin: 0;
  padding: 0;
}
```

# HTML

```html
<div id="form" data-editable="false">
  <h2 id="modal-title">Nova Transação</h2>
  <a
    href="#"
    class="button cancel"
    onclick="Form.cancel('transaction')"
    >Cancelar</a
  >
</div>
```
