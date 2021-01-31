# Carteiras / Contas

Neste tutorial vou mostrar como adicionar múltiplas carteiras no nosso projeto da **Maratona Discover**. 
Para essa implementação vou tentar manter o código com o mesmo nível de conhecimento que tivemos acesso durante a maratona. 

## Objetivo

Dar a possibilidade de criar mais de uma carteira para o controle financeiro, para mais de uma pessoa poder usar o mesmo navegador cadastrar suas finanças.

## Modal

Iremos cria nosso modal que sera responsável por criar e apresentar as carteiras cadastradas.

### HTML
Vamos dar inicio a nossa implementação com nosso HTML, vamos criar um novo modal para fazer a adição das carteiras:

```html
<div class="modal-overlay modal-wallets ">
  <div class="modal modal-wallets">
    <div class="form-wallets">
      <h2>Carteiras</h2>
      <form id="form-wallets" action="" onsubmit="WalletForm.submit(event)">
        <input 
          type="text" 
          name="wallet-name" 
          id="wallet-name"
          placeholder="Nome da Carteira"
        >
        <button>Adicionar</button>
      </form>
    </div>
    <hr>
  </div>
</div>
```

O resultado deve ser algo parecido com isso (pode ter algumas diferenças no CSS):

<svg fill="none" viewBox="900 300" width="750" height="350" xmlns="http://www.w3.org/2000/svg">
<foreignObject width="100%" height="100%">
<div xmlns="http://www.w3.org/1999/xhtml">
  <style>
    :root {
      --font-color-base: #363F5F;
      --green: #49AA26;
      --light-green: #3DD705;
      --expense-color: #E92929;
      --light-color-base: #FFF;
      --table-color-base: #FFF;
      --background-color-header: #2D4A22;
      --background-color: #F0F2F5;
      --background-color-input:#FFF;
      --calendar-picker-mode: 0;
      --image-github: url(./assets/GitHub-Mark-64px.svg);
    }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      border-radius:0.1px;
    }
    html {
      font-size: 93.75%;
      width: 800px;
      height: 800px;
    }
    body {
      background: var(--background-color);
      font-family: 'Poppins', sans-serif;
      transition: 0.3s;
    }
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border-width: 0;
    }
    .container {
      width: min( 90vw, 800px );
      margin: auto;
    }
    input {
      background-color: var(--background-color-input);
      color: var(--font-color-base);
    }
    input::placeholder {
      color: var(--font-color-base);
      opacity: .6;
    }
    input::-webkit-calendar-picker-indicator {
      filter: invert(var(--calendar-picker-mode));
    }
    h2 {
      margin-top: 3.2rem;
      margin-bottom: 0.8rem;
      color:var( --font-color-base );
      font-weight: normal;
    }
    a {
      color: var(--green);
      text-decoration: none;
      cursor: pointer;
    }
    a:hover{
      color: var(--light-green);
    }
    .button.new {
      display: inline-block;
      margin-bottom: 0.8rem;
    }
    button {
      width: 100%;
      height: 50px;
      border: none;
      color: var(--light-color-base);
      background: var(--green);
      padding: 0;
      border-radius: 0.25rem;
      cursor: pointer;
    }
    .button {
      cursor: pointer;
    }
    button:hover {
      background: var(--light-green);
    }
    .button.new {
      display: inline-block;
      margin-bottom: 0.8rem;
    }
    .button.cancel {
      color: var(--expense-color);
      border: 2px var(--expense-color) solid;
      border-radius: 0.25rem;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.6;
    }
    .button.cancel:hover {
      opacity: 1;
    }
    .color-mode.button {
      position: absolute;
      right: 0px;
      top: 10px;
      color: var(--green);
      padding: 2px 6px;
      border: 1px solid var(--green);
      border-radius: 0.25rem;
    }
    .color-mode.button:hover {
      color: var(--light-green);
      border: 1px solid var(--light-green);
    }
    .modal-overlay {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      position: fixed;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
    }
    .modal-overlay.active {
      opacity: 1;
      visibility: visible;
    }
    .modal {
      background: var(--background-color);
      padding: 2.4rem;
      margin: 1.4rem;
    }
    #form {
      max-width: 500px;
    }
    #form h2 {
      margin-top: 0;
    }
    input {
      border: none;
      border-radius: 0.2rem;
      padding: 0.8rem;
      width: 100%;
    }
    .input-group {
      margin-top: 0.8rem;
    }
    .input-group .help {
      opacity: 0.4;
      color: var(--font-color-base);
    }
    .input-group.actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .input-group.actions .button,
    .input-group.actions button {
      width: 48%;
    }
  </style>

  <html>
    <body>
        <div class="modal-overlay modal-wallets ">
          <div class="modal modal-wallets">
            <div class="form-wallets">
              <h2>Carteiras</h2>
              <form id="form-wallets" action="" onsubmit="WalletForm.submit(event)">
                <input 
                  type="text" 
                  name="wallet-name" 
                  id="wallet-name"
                  placeholder="Nome da Carteira"
                >
                <button>Adicionar</button>
              </form>
            </div>
            <hr>
          </div>
        </div>
      </div>
    </body>
  </html>
</foreignObject>
</svg> 

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
        <td onclick="Wallet.select(1)" class="income button">R$ 3.000,00</td>
        <td>
          <img class="button" onclick="Wallet.remove(1)" src="./assets/minus.svg" alt="Remover carteira">
        </td>
      <tr>
      <tr>
        <td onclick="Wallet.select(1)" class="name button">Dev 1</td>
        <td onclick="Wallet.select(1)" class="income button">R$ 3.000,00</td>
        <td>
          <img class="button" onclick="Wallet.remove(1)" src="./assets/minus.svg" alt="Remover carteira">
        </td>
      <tr>
    </tbody>
  </table>
</div>
```

Seu modal vai ficar parecido com isso:

<svg fill="none" viewBox="900 300" width="750" height="500" xmlns="http://www.w3.org/2000/svg">
<foreignObject width="100%" height="100%">
<div xmlns="http://www.w3.org/1999/xhtml">
  <style>
    :root {
      --font-color-base: #363F5F;
      --green: #49AA26;
      --light-green: #3DD705;
      --expense-color: #E92929;
      --light-color-base: #FFF;
      --table-color-base: #FFF;
      --background-color-header: #2D4A22;
      --background-color: #F0F2F5;
      --background-color-input:#FFF;
      --calendar-picker-mode: 0;
      --image-github: url(./assets/GitHub-Mark-64px.svg);
    }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      border-radius:0.1px;
    }
    html {
      font-size: 93.75%;
      width: 800px;
      height: 800px;
    }
    body {
      background: var(--background-color);
      font-family: 'Poppins', sans-serif;
      transition: 0.3s;
    }
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border-width: 0;
    }
    .container {
      width: min( 90vw, 800px );
      margin: auto;
    }
    input {
      background-color: var(--background-color-input);
      color: var(--font-color-base);
    }
    input::placeholder {
      color: var(--font-color-base);
      opacity: .6;
    }
    input::-webkit-calendar-picker-indicator {
      filter: invert(var(--calendar-picker-mode));
    }
    h2 {
      margin-top: 3.2rem;
      margin-bottom: 0.8rem;
      color:var( --font-color-base );
      font-weight: normal;
    }
    a {
      color: var(--green);
      text-decoration: none;
      cursor: pointer;
    }
    a:hover{
      color: var(--light-green);
    }
    .button.new {
      display: inline-block;
      margin-bottom: 0.8rem;
    }
    button {
      width: 100%;
      height: 50px;
      border: none;
      color: var(--light-color-base);
      background: var(--green);
      padding: 0;
      border-radius: 0.25rem;
      cursor: pointer;
    }
    .button {
      cursor: pointer;
    }
    button:hover {
      background: var(--light-green);
    }
    .button.new {
      display: inline-block;
      margin-bottom: 0.8rem;
    }
    .button.cancel {
      color: var(--expense-color);
      border: 2px var(--expense-color) solid;
      border-radius: 0.25rem;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.6;
    }
    .button.cancel:hover {
      opacity: 1;
    }
    .color-mode.button {
      position: absolute;
      right: 0px;
      top: 10px;
      color: var(--green);
      padding: 2px 6px;
      border: 1px solid var(--green);
      border-radius: 0.25rem;
    }
    .color-mode.button:hover {
      color: var(--light-green);
      border: 1px solid var(--light-green);
    }
    .modal-overlay {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      position: fixed;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
    }
    .modal-overlay.active {
      opacity: 1;
      visibility: visible;
    }
    .modal {
      background: var(--background-color);
      padding: 2.4rem;
      margin: 1.4rem;
    }
    #form {
      max-width: 500px;
    }
    #form h2 {
      margin-top: 0;
    }
    input {
      border: none;
      border-radius: 0.2rem;
      padding: 0.8rem;
      width: 100%;
    }
    .input-group {
      margin-top: 0.8rem;
    }
    .input-group .help {
      opacity: 0.4;
      color: var(--font-color-base);
    }
    .input-group.actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .input-group.actions .button,
    .input-group.actions button {
      width: 48%;
    }
  </style>

  <html>
    <body>
        <div class="modal-overlay modal-wallets ">
          <div class="modal modal-wallets">
            <div class="form-wallets">
              <h2>Carteiras</h2>
              <form id="form-wallets" action="" onsubmit="WalletForm.submit(event)">
                <input 
                  type="text" 
                  name="wallet-name" 
                  id="wallet-name"
                  placeholder="Nome da Carteira"
                >
                <button>Adicionar</button>
              </form>
            </div>
            <hr>
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
                  <td onclick="Wallet.select(1)" class="income button">R$ 3.000,00</td>
                  <td>
                    <img class="button" onclick="Wallet.remove(1)" src="../assets/minus.svg" alt="Remover carteira">
                  </td>
                <tr>
                <tr>
                  <td onclick="Wallet.select(1)" class="name button">Dev 1</td>
                  <td onclick="Wallet.select(1)" class="income button">R$ 3.000,00</td>
                  <td>
                    <img class="button" onclick="Wallet.remove(1)" src="../assets/minus.svg" alt="Remover carteira">
                  </td>
                <tr>
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>
    </body>
  </html>
</foreignObject>
</svg>

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
  opacity: .4;
}

.modal.modal-wallets {
  width: min( 90vw, 800px );
}
```

<svg fill="none" viewBox="900 300" width="750" height="500" xmlns="http://www.w3.org/2000/svg">
<foreignObject width="100%" height="100%">
<div xmlns="http://www.w3.org/1999/xhtml">
  <style>
    :root {
      --font-color-base: #363F5F;
      --green: #49AA26;
      --light-green: #3DD705;
      --expense-color: #E92929;
      --light-color-base: #FFF;
      --table-color-base: #FFF;
      --background-color-header: #2D4A22;
      --background-color: #F0F2F5;
      --background-color-input:#FFF;
      --calendar-picker-mode: 0;
      --image-github: url(./assets/GitHub-Mark-64px.svg);
    }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      border-radius:0.1px;
    }
    html {
      font-size: 93.75%;
      width: 800px;
      height: 800px;
    }
    body {
      background: var(--background-color);
      font-family: 'Poppins', sans-serif;
      transition: 0.3s;
    }
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border-width: 0;
    }
    .container {
      width: min( 90vw, 800px );
      margin: auto;
    }
    input {
      background-color: var(--background-color-input);
      color: var(--font-color-base);
    }
    input::placeholder {
      color: var(--font-color-base);
      opacity: .6;
    }
    input::-webkit-calendar-picker-indicator {
      filter: invert(var(--calendar-picker-mode));
    }
    h2 {
      margin-top: 3.2rem;
      margin-bottom: 0.8rem;
      color:var( --font-color-base );
      font-weight: normal;
    }
    a {
      color: var(--green);
      text-decoration: none;
      cursor: pointer;
    }
    a:hover{
      color: var(--light-green);
    }
    .button.new {
      display: inline-block;
      margin-bottom: 0.8rem;
    }
    button {
      width: 100%;
      height: 50px;
      border: none;
      color: var(--light-color-base);
      background: var(--green);
      padding: 0;
      border-radius: 0.25rem;
      cursor: pointer;
    }
    .button {
      cursor: pointer;
    }
    button:hover {
      background: var(--light-green);
    }
    .button.new {
      display: inline-block;
      margin-bottom: 0.8rem;
    }
    .button.cancel {
      color: var(--expense-color);
      border: 2px var(--expense-color) solid;
      border-radius: 0.25rem;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.6;
    }
    .button.cancel:hover {
      opacity: 1;
    }
    .color-mode.button {
      position: absolute;
      right: 0px;
      top: 10px;
      color: var(--green);
      padding: 2px 6px;
      border: 1px solid var(--green);
      border-radius: 0.25rem;
    }
    .color-mode.button:hover {
      color: var(--light-green);
      border: 1px solid var(--light-green);
    }
    .modal-overlay {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      position: fixed;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
    }
    .modal-overlay.active {
      opacity: 1;
      visibility: visible;
    }
    .modal {
      background: var(--background-color);
      padding: 2.4rem;
      margin: 1.4rem;
    }
    #form {
      max-width: 500px;
    }
    #form h2 {
      margin-top: 0;
    }
    input {
      border: none;
      border-radius: 0.2rem;
      padding: 0.8rem;
      width: 100%;
    }
    .input-group {
      margin-top: 0.8rem;
    }
    .input-group .help {
      opacity: 0.4;
      color: var(--font-color-base);
    }
    .input-group.actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .input-group.actions .button,
    .input-group.actions button {
      width: 48%;
    }
    .modal-wallets {
      width: 100%;
    }
    .modal-wallets hr {
      margin-top: 20px;
      border: 2px solid var(--font-color-base);
      opacity: .4;
    }
    .modal.modal-wallets {
      width: min( 90vw, 800px );
    }
  </style>

  <html>
    <body>
        <div class="modal-overlay modal-wallets ">
          <div class="modal modal-wallets">
            <div class="form-wallets">
              <h2>Carteiras</h2>
              <form id="form-wallets" action="" onsubmit="WalletForm.submit(event)">
                <input 
                  type="text" 
                  name="wallet-name" 
                  id="wallet-name"
                  placeholder="Nome da Carteira"
                >
                <button>Adicionar</button>
              </form>
            </div>
            <hr>
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
                  <td onclick="Wallet.select(1)" class="income button">R$ 3.000,00</td>
                  <td>
                    <img class="button" onclick="Wallet.remove(1)" src="../assets/minus.svg" alt="Remover carteira">
                  </td>
                <tr>
                <tr>
                  <td onclick="Wallet.select(1)" class="name button">Dev 1</td>
                  <td onclick="Wallet.select(1)" class="income button">R$ 3.000,00</td>
                  <td>
                    <img class="button" onclick="Wallet.remove(1)" src="../assets/minus.svg" alt="Remover carteira">
                  </td>
                <tr>
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>
    </body>
  </html>
</foreignObject>
</svg>

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

<svg fill="none" viewBox="900 300" width="750" height="500" xmlns="http://www.w3.org/2000/svg">
<foreignObject width="100%" height="100%">
<div xmlns="http://www.w3.org/1999/xhtml">
  <style>
    :root {
      --font-color-base: #363F5F;
      --green: #49AA26;
      --light-green: #3DD705;
      --expense-color: #E92929;
      --light-color-base: #FFF;
      --table-color-base: #FFF;
      --background-color-header: #2D4A22;
      --background-color: #F0F2F5;
      --background-color-input:#FFF;
      --calendar-picker-mode: 0;
      --image-github: url(./assets/GitHub-Mark-64px.svg);
    }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      border-radius:0.1px;
    }
    html {
      font-size: 93.75%;
      width: 800px;
      height: 800px;
    }
    body {
      background: var(--background-color);
      font-family: 'Poppins', sans-serif;
      transition: 0.3s;
    }
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border-width: 0;
    }
    .container {
      width: min( 90vw, 800px );
      margin: auto;
    }
    input {
      background-color: var(--background-color-input);
      color: var(--font-color-base);
    }
    input::placeholder {
      color: var(--font-color-base);
      opacity: .6;
    }
    input::-webkit-calendar-picker-indicator {
      filter: invert(var(--calendar-picker-mode));
    }
    h2 {
      margin-top: 3.2rem;
      margin-bottom: 0.8rem;
      color:var( --font-color-base );
      font-weight: normal;
    }
    a {
      color: var(--green);
      text-decoration: none;
      cursor: pointer;
    }
    a:hover{
      color: var(--light-green);
    }
    .button.new {
      display: inline-block;
      margin-bottom: 0.8rem;
    }
    button {
      width: 100%;
      height: 50px;
      border: none;
      color: var(--light-color-base);
      background: var(--green);
      padding: 0;
      border-radius: 0.25rem;
      cursor: pointer;
    }
    .button {
      cursor: pointer;
    }
    button:hover {
      background: var(--light-green);
    }
    .button.new {
      display: inline-block;
      margin-bottom: 0.8rem;
    }
    .button.cancel {
      color: var(--expense-color);
      border: 2px var(--expense-color) solid;
      border-radius: 0.25rem;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.6;
    }
    .button.cancel:hover {
      opacity: 1;
    }
    .color-mode.button {
      position: absolute;
      right: 0px;
      top: 10px;
      color: var(--green);
      padding: 2px 6px;
      border: 1px solid var(--green);
      border-radius: 0.25rem;
    }
    .color-mode.button:hover {
      color: var(--light-green);
      border: 1px solid var(--light-green);
    }
    .modal-overlay {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      position: fixed;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
    }
    .modal-overlay.active {
      opacity: 1;
      visibility: visible;
    }
    .modal {
      background: var(--background-color);
      padding: 2.4rem;
      margin: 1.4rem;
    }
    #form {
      max-width: 500px;
    }
    #form h2 {
      margin-top: 0;
    }
    input {
      border: none;
      border-radius: 0.2rem;
      padding: 0.8rem;
      width: 100%;
    }
    .input-group {
      margin-top: 0.8rem;
    }
    .input-group .help {
      opacity: 0.4;
      color: var(--font-color-base);
    }
    .input-group.actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .input-group.actions .button,
    .input-group.actions button {
      width: 48%;
    }
    .modal-wallets {
      width: 100%;
    }
    .modal-wallets hr {
      margin-top: 20px;
      border: 2px solid var(--font-color-base);
      opacity: .4;
    }
    .modal.modal-wallets {
      width: min( 90vw, 800px );
    }
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
  </style>

  <html>
    <body>
        <div class="modal-overlay modal-wallets ">
          <div class="modal modal-wallets">
            <div class="form-wallets">
              <h2>Carteiras</h2>
              <form id="form-wallets" action="" onsubmit="WalletForm.submit(event)">
                <input 
                  type="text" 
                  name="wallet-name" 
                  id="wallet-name"
                  placeholder="Nome da Carteira"
                >
                <button>Adicionar</button>
              </form>
            </div>
            <hr>
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
                  <td onclick="Wallet.select(1)" class="income button">R$ 3.000,00</td>
                  <td>
                    <img class="button" onclick="Wallet.remove(1)" src="../assets/minus.svg" alt="Remover carteira">
                  </td>
                <tr>
                <tr>
                  <td onclick="Wallet.select(1)" class="name button">Dev 1</td>
                  <td onclick="Wallet.select(1)" class="income button">R$ 3.000,00</td>
                  <td>
                    <img class="button" onclick="Wallet.remove(1)" src="../assets/minus.svg" alt="Remover carteira">
                  </td>
                <tr>
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>
    </body>
  </html>
</foreignObject>
</svg>

Essa mudança deu para reparar melhor, nosso input ficou mais alto e o botão está menor e ao lado do input.

Finalmente vamos mexer nessa tabela, vamos adicionar o seguinte CSS:

```css
#wallets {
  display: flex;
  width: 100%;

  overflow-X: auto;
}


#wallets-table {
  width: 100%;
  border-spacing: 0 0.5rem;
  color: #969CB3;  

  white-space: nowrap;
}

#wallets-table .remove-wallet {
  width: 50px;
}
```

<svg fill="none" viewBox="900 300" width="750" height="500" xmlns="http://www.w3.org/2000/svg">
<foreignObject width="100%" height="100%">

  <div xmlns="http://www.w3.org/1999/xhtml">
    <style>
      :root {
        --font-color-base: #363F5F;
        --green: #49AA26;
        --light-green: #3DD705;
        --expense-color: #E92929;
        --light-color-base: #FFF;
        --table-color-base: #FFF;
        --background-color-header: #2D4A22;
        --background-color: #F0F2F5;
        --background-color-input:#FFF;
        --calendar-picker-mode: 0;
      }
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        border-radius:0.1px;
      }
      html {
        font-size: 93.75%;
        width: 800px;
        height: 800px;
      }
      body {
        background: var(--background-color);
        font-family: sans-serif;
        transition: 0.3s;
      }
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border-width: 0;
      }
      .container {
        width: min( 90vw, 800px );
        margin: auto;
      }
      input {
        background-color: var(--background-color-input);
        color: var(--font-color-base);
      }
      input::placeholder {
        color: var(--font-color-base);
        opacity: .6;
      }
      input::-webkit-calendar-picker-indicator {
        filter: invert(var(--calendar-picker-mode));
      }
      h2 {
        margin-top: 3.2rem;
        margin-bottom: 0.8rem;
        color:var( --font-color-base );
        font-weight: normal;
      }
      a {
        color: var(--green);
        text-decoration: none;
        cursor: pointer;
      }
      a:hover{
        color: var(--light-green);
      }
      .button.new {
        display: inline-block;
        margin-bottom: 0.8rem;
      }
      button {
        width: 100%;
        height: 50px;
        border: none;
        color: var(--light-color-base);
        background: var(--green);
        padding: 0;
        border-radius: 0.25rem;
        cursor: pointer;
      }
      .button {
        cursor: pointer;
      }
      button:hover {
        background: var(--light-green);
      }
      .button.new {
        display: inline-block;
        margin-bottom: 0.8rem;
      }
      .button.cancel {
        color: var(--expense-color);
        border: 2px var(--expense-color) solid;
        border-radius: 0.25rem;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.6;
      }
      .button.cancel:hover {
        opacity: 1;
      }
      .color-mode.button {
        position: absolute;
        right: 0px;
        top: 10px;
        color: var(--green);
        padding: 2px 6px;
        border: 1px solid var(--green);
        border-radius: 0.25rem;
      }
      .color-mode.button:hover {
        color: var(--light-green);
        border: 1px solid var(--light-green);
      }
      #transaction {
        display: block;
        width: 100%;
        overflow-X: auto;
      }
      #data-table {
        width: 100%;
        border-spacing: 0 0.5rem;
        color: #969CB3;  
        white-space: nowrap;
      }
      table thead tr th:first-child, 
      table thead tr td:first-child {
        border-radius: 0.25rem 0 0 0.25rem;
      }
      table thead tr th:last-child, 
      table thead tr td:last-child {
        border-radius: 0 0.25rem 0.25rem 0;
      }
      table thead th {
        background: var(--table-color-base);
        font-weight: normal;
        padding: 1rem 2rem;
        text-align: left;
      }
      table tbody td {
        background: var(--table-color-base);
        padding: 1rem 2rem;
      }
      table tbody tr {
        opacity: .7;
      }
      table tbody tr:hover {
        opacity: 1;
      }
      td.description {
        color: var(--font-color-base);
      }
      td.income {
        color: #12A454;
      }
      td.expense {
        color: var(--expense-color);
      }
      .modal-overlay {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        position: fixed;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
      }
      .modal-overlay.active {
        opacity: 1;
        visibility: visible;
      }
      .modal {
        background: var(--background-color);
        padding: 2.4rem;
        margin: 1.4rem;
      }
      #form {
        max-width: 500px;
      }
      #form h2 {
        margin-top: 0;
      }
      input {
        border: none;
        border-radius: 0.2rem;
        padding: 0.8rem;
        width: 100%;
      }
      .input-group {
        margin-top: 0.8rem;
      }
      .input-group .help {
        opacity: 0.4;
        color: var(--font-color-base);
      }
      .input-group.actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .input-group.actions .button,
      .input-group.actions button {
        width: 48%;
      }
      .modal-wallets {
        width: 100%;
      }
      .modal-wallets hr {
        margin-top: 20px;
        border: 2px solid var(--font-color-base);
        opacity: .4;
      }
      .modal.modal-wallets {
        width: min( 90vw, 800px );
      }
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
      #wallets {
        display: flex;
        width: 100%;
        overflow-X: auto;
      }
      #wallets-table {
        width: 100%;
        border-spacing: 0 0.5rem;
        color: #969CB3;  
        white-space: nowrap;
      }
      #wallets-table .remove-wallet {
        width: 50px;
      }
    </style>
    <html>
      <body>
        <div class="modal-overlay modal-wallets ">
          <div class="modal modal-wallets">
            <div class="form-wallets">
              <h2>Carteiras</h2>
              <form id="form-wallets" action="" onsubmit="WalletForm.submit(event)">
                <input 
                  type="text" 
                  name="wallet-name" 
                  id="wallet-name"
                  placeholder="Nome da Carteira"
                />
                <button>Adicionar</button>
              </form>
            </div>
            <hr/>
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
                    <td onclick="Wallet.select(1)" class="income button">R$ 3.000,00</td>
                    <td>
                      <img class="button" onclick="Wallet.remove(1)" src="../assets/minus.svg" alt="Remover carteira"/>
                    </td>
                  </tr>
                  <tr>
                    <td onclick="Wallet.select(1)" class="name button">Dev 1</td>
                    <td onclick="Wallet.select(1)" class="income button">R$ 3.000,00</td>
                    <td>
                      <img class="button" onclick="Wallet.remove(1)" src="../assets/minus.svg" alt="Remover carteira"/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </body>
    </html>
  </div>

</foreignObject>
</svg>

![](https://drive.google.com/file/d/10sjqucTbKDjMDsvv9jzSmTrKpP0YgDHo/view?usp=sharing)