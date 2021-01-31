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
<div class="modal-overlay modal-wallets active">
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
**obs.: estamos com a `class` `active` adicionada em nosso modal para ele ficar visível, depois de pronto vamos remover essa classe**

[![](./assets/wallet_modal_html_form.svg)](./assets/wallet_modal_html_form.svg)

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

[![](./assets/wallet_modal_html_table.svg)](./assets/wallet_modal_html_table.svg)

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
[![](./assets/wallet_modal_css_modal.svg)](./assets/wallet_modal_css_modal.svg)

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

[![](./assets/wallet_modal_css_form.svg)](./assets/wallet_modal_css_form.svg)

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
[![](./assets/wallet_modal_complete.svg)](./assets/wallet_modal_complete.svg)