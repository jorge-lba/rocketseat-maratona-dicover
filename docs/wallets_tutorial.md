# Carteiras / Contas

Neste tutorial vou mostrar como adicionar múltiplas carteiras no nosso projeto da **Maratona Discover**.
Para essa implementação vou tentar manter o código com o mesmo nível de conhecimento que tivemos acesso durante a maratona.

## Objetivo

Dar a possibilidade de criar mais de uma carteira para o controle financeiro, para mais de uma pessoa poder usar o mesmo navegador para cadastrar suas finanças.

## Modal

Iremos cria nosso modal que sera responsável por criar e apresentar as carteiras cadastradas.

### HTML

Vamos dar inicio a nossa implementação com nosso HTML, vamos criar um novo modal para fazer a adição das carteiras:

```html
<div class="modal-overlay modal-wallets active">
  <div class="modal modal-wallets">
    <div class="form-wallets">
      <h2>Carteiras</h2>
      <form
        id="form-wallets"
        action=""
        onsubmit="WalletForm.submit(event)"
      >
        <input
          type="text"
          name="wallet-name"
          id="wallet-name"
          placeholder="Nome da Carteira"
        />
        <button>Adicionar</button>
      </form>
    </div>
    <hr />
  </div>
</div>
```

**obs.: estamos com a `class` `active` adicionada em nosso modal para ele ficar visível, depois de pronto vamos remover essa classe**

[![](./assets/wallet_modal_html_form.svg)](https://github.com/jorge-lba/rocketseat-maratona-dicover/raw/refactoring/docs/assets/wallet_modal_html_form.svg)

Até agora esse modal é bem simples, semelhante com o que foi criado para o cadastros de transações, porem com apenas um campo de input.
Também foi utilizada a tag html [\<hr\>](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/hr) que cria uma linha de divisão onde foi colocada.

Agora vamos adicionar uma tabela que vai receber nas carteiras cadastradas abaixo da nossa tag **\<hr\>**.

```html
<div id="wallets">
  <table id="wallets-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Total</th>
        <th class="remove-wallet"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td onclick="Wallet.select(1)" class="name button">Dev 1</td>
        <td onclick="Wallet.select(1)" class="income button">
          R$ 3.000,00
        </td>
        <td>
          <img
            class="button"
            onclick="Wallet.remove(1)"
            src="./assets/minus.svg"
            alt="Remover carteira"
          />
        </td>
      </tr>

      <tr></tr>
      <tr>
        <td onclick="Wallet.select(1)" class="name button">Dev 1</td>
        <td onclick="Wallet.select(1)" class="income button">
          R$ 3.000,00
        </td>
        <td>
          <img
            class="button"
            onclick="Wallet.remove(1)"
            src="./assets/minus.svg"
            alt="Remover carteira"
          />
        </td>
      </tr>

      <tr></tr>
    </tbody>
  </table>
</div>
```

Seu modal vai ficar parecido com isso:

[![](./assets/wallet_modal_html_table.svg)](https://github.com/jorge-lba/rocketseat-maratona-dicover/raw/refactoring/docs/assets/wallet_modal_html_table.svg)

Nossa tabela não está muito bonita agora mais está correta ^^

### CSS

Bom, vamos melhor a aparência de nosso modal agora. Vamos adicionar alguns CSS's.

Primeiro o CSS que vai fazer algumas alterações no nosso modal.

```css
.modal-wallets {
  width: 100%;
}

.modal-wallets hr {
  margin-top: 20px;
  border: 2px solid var(--font-color-base);
  opacity: 0.4;
}

.modal.modal-wallets {
  width: min(90vw, 800px);
}
```

[![](./assets/wallet_modal_css_modal.svg)](https://raw.githubusercontent.com/jorge-lba/rocketseat-maratona-dicover/7ac827e4034964309f86e97a948edcf5b744b784/docs/assets/wallet_modal_css_modal.svg)

São mudanças bem pequenas ^^

Agora vamos alterar um pouco o CSS do nosso forms:

```css
#form-wallets {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-wallets input {
  border: none;
  border-radius: 0.2rem;

  padding: 0.8rem;

  width: 65%;
  height: 50px;
}

.form-wallets button {
  width: 30%;
}
```

Ira ficar semelhante a esse:

[![](./assets/wallet_modal_css_form.svg)](https://raw.githubusercontent.com/jorge-lba/rocketseat-maratona-dicover/7ac827e4034964309f86e97a948edcf5b744b784/docs/assets/wallet_modal_css_form.svg)

Essa mudança deu para reparar melhor, nosso input ficou mais alto e o botão está menor e ao lado do input.

Finalmente vamos mexer nessa tabela, vamos adicionar o seguinte CSS:

```css
#wallets {
  display: flex;
  width: 100%;

  overflow-x: auto;
}

#wallets-table {
  width: 100%;
  border-spacing: 0 0.5rem;
  color: #969cb3;

  white-space: nowrap;
}

#wallets-table .remove-wallet {
  width: 50px;
}
```

[![](./assets/wallet_modal_complete.svg)](https://raw.githubusercontent.com/jorge-lba/rocketseat-maratona-dicover/7ac827e4034964309f86e97a948edcf5b744b784/docs/assets/wallet_modal_complete.svg)

Nosso modal está finalizado, precisamos remover a class `active` de nosso modal para ele sair da nossa tela.

## Botão para selecionar carteira

Vamos dar inicio a criação do nosso botão, o html usado vai ser o seguinte:

```html
<div class="header">
  <a class="color-mode button" onclick="switchTheme()"
    >Alternar Tema</a
  >
  <img class="logo" src="./assets/logo.svg" alt="Logo Dev Finances" />
  <div id="wallet-selected">
    <span>Carteira :</span>
    <a
      href="#"
      class="button wallet"
      id="wallet-selected-name"
      onclick="Modal.toggle('modal-wallets')"
      >Nome</a
    >
  </div>
</div>
```

Dentro do nosso `header` adicionei uma div com a classe `header`, dentro dele temos o botão para alternar o tema (caso não tenha adicionado o modo dark, você pode implementar no [Tutorial Modo Escuro](./dark_mode_tutorial.md)), a logo, o `span` e o nosso botão para alterar a conta.

**obs.: No meu CSS fiz algumas alterações que não passarei nesse tutorial, ficara como desafio para você ajustar e fazer as coisas se encaixarem com o seu layout**

Vamos adicionar nosso CSS:

```css
.header {
  display: inline-block;

  position: relative;
  width: min(90vw, 800px);
}

#wallet-selected {
  width: min(90vw, 800px);

  display: flex;
  justify-content: left;
  align-items: center;

  text-align: left;
}

#wallet-selected span {
  color: #fff;
  margin-right: 5px;
  font-weight: 200;
}

#wallet-selected a {
  font-weight: 700;
  color: #fff;

  font-size: 16px;

  padding: 0 10px;

  border: 1px solid #fff;
  border-radius: 0.2rem;

  transition: 0.2s;
}

#wallet-selected a:hover {
  color: var(--light-green);
  border: 1px solid var(--light-green);

  transition: 0.2s;
}
```

Nosso botão vai se parecer com esse:

[![](./assets/wallet_select_button.svg)](https://raw.githubusercontent.com/jorge-lba/rocketseat-maratona-dicover/refactoring/docs/assets/wallet_select_button.svg)

## Javascript

Vamos dar inicio ao nosso código para criar nossas carteiras.

Para iniciar vamos fazer uma mudança no `Storage` criado pelo Mayk, que sera a seguinte:

```js
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
```

O que estamos mudando é o nome de como nosso `localStorage` vai salvar nossas carteira, como não estamos mais salvando apenas transações, teremos nossas carteiras e dentro delas teremos as transações, mais abaixo vou explicar melhor.

Vamos criar o nosso objeto que vai controlar a nossa carteira

```js
const Wallet = {
  all: Storage.get(),
  selected: Storage.get()[0] || Modal.toggle('modal-wallets'),
  index: 0,

  update() {
    Wallet.all[Wallet.index] = Wallet.selected
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
}
```

Vamos entender cada um de nossos elementos aqui, nossa `Wallet` é bem parecida com as `Transactions` que tinha-mos em nosso código.

- all -> Recebe o conteúdo que temos salvo em nosso `localStorage`.
- selected -> Recebe a nossa primeira carteira cadastrada e casos não tenha nenhuma ele abre o modal de cadastro.
- index -> Recebe o índice em que a carteira se encontra.
- update -> Faz a atualização dos dados de uma carteira.
- add -> Vai adicionar uma carteira no local storage e no nosso objeto `Wallet`.
- remove -> Remove uma carteira.
- selected -> Selecionar uma carteira e atualiza no objeto `Wallet`.

Vamos precisar fazer algumas alterações no nosso objeto `Transaction` agora.

```js
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
```

**Obs.: En vez de colocar `Transaction.all.transactions` dentro das funções, passei para o parâmetro da função ele como padrão. Então quando a função é chamada sem ser colocado nenhum valor de parâmetro, ela usa o `Transaction.all.transactions`.**

A primeira mudança doi no `all`, agora ele recebe a carteira selecionada `Wallet.selected`, e em vez de usarmos `Transaction.all` estamos usando `Transaction.all.transactions` em nossas funções.

Agora vamos adicionar algumas coisas na nossa `DOM`, adicione dentro da DOM os seguintes códigos.

Para pegar a tabla que está no modal que criamos antes:

```js
walletsContainer: document.querySelector('#wallets-table tbody'),
```

Para adicionar o nosso HTML da carteira na nossa tabela:

```js
addWallet(wallet, index) {
  const tr = document.createElement('tr')

  tr.innerHTML = DOM.innerHTMLWallet(wallet, index)
  tr.dataset.index = index

  DOM.walletsContainer.appendChild(tr)
},
```

Para gerar o HTML da nossa carteira que será colocado na tabela:

```js
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
```

E para finalizar vamos adicionar a função que limpa a nossa tabela:

```js
clearWallets() {
  DOM.walletsContainer.innerHTML = ''
},
```

Vamos criar agora um objeto semelhante os `Form` usado para as transações, para pegar nosso form dentro do modal de carteiras:

```js
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
```

Para finalizar vamos adicionar algumas funções que criamos anteriormente no objeto `App`:

```js
const App = {
  init() {
    Transaction.all.transactions?.forEach(DOM.addTransaction)
    Wallet.all.forEach(DOM.addWallet)

    DOM.updateBalance()

    document.querySelector('#wallet-selected-name').innerHTML =
      Transaction.all?.name || 'Crie um Carteira'
  },

  reload() {
    DOM.clearTransactions()
    DOM.clearWallets()
    this.init()
  },
}
```

Você pode notar que aqui também mudamos de `Transaction.all` para `Transaction.all.transactions` e também adicionamos no link em que fica o nome da carteira selecionada, uma condição para que caso não tenha uma carteira ainda vai ser apresentada a message `Crie uma Carteira`.

Finalizamos por aqui a nossa funcionalidade para múltiplas carteiras, esse tutorial é um pouco extenso e pode ser difícil de ser implementado, busque entender bem o que está acontecendo e comparar com o que você ja criou antes.

Se você entender o que estou fazendo, vai conseguir resolver os bugs caso venha acontecer.
