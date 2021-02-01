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
  opacity: .4;
}

.modal.modal-wallets {
  width: min( 90vw, 800px );
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
[![](./assets/wallet_modal_complete.svg)](https://raw.githubusercontent.com/jorge-lba/rocketseat-maratona-dicover/7ac827e4034964309f86e97a948edcf5b744b784/docs/assets/wallet_modal_complete.svg)

Nosso modal está finalizado, precisamos remover a class `active` de nosso modal para ele sair da nossa tela.

## Botão para selecionar carteira

Vamos dar inicio a criação do nosso botão, o html usado vai ser o seguinte:

```html
<div class="header">
  <a class="color-mode button" onclick="switchTheme()">Alternar Tema</a>
  <img class="logo" src="./assets/logo.svg" alt="Logo Dev Finances">
  <div id="wallet-selected">
    <span >Carteira :</span>
    <a 
      href="#" 
      class="button wallet"
      id="wallet-selected-name"
      onclick="Modal.toggle('modal-wallets')"
    >Nome</a>
  </div>
</div>
```

Dentro do nosso `header` adicionei uma div com a classe `header`, dentro dele temos o botão para alternar o tema (caso não tenha adicionado o modo dark, você pode implementar no [Tutorial Modo Escuro](./dark_mode_tutorial.md)), a logo, o `span` e o nosso botão para alterar a conta. 

**obs.: No meu CSS fiz algumas alterações que não passarei nesse tutorial, ficara como desafio para você ajustar e fazer as coisas se encaixarem com o seu layout**

Vamos adicionar nosso CSS:

```css
.header{
  display: inline-block;

  position: relative;
  width: min( 90vw, 800px );
}

#wallet-selected {
  width: min( 90vw, 800px );
  
  display: flex;
  justify-content: left;
  align-items: center;

  text-align: left;
}

#wallet-selected span {
  color: #FFF;
  margin-right: 5px;
  font-weight: 200;
}

#wallet-selected a {
  font-weight: 700;
  color: #FFF;

  font-size: 16px;

  padding: 0 10px;

  border: 1px solid #FFF;
  border-radius: 0.2rem;

  transition: .2s;
}

#wallet-selected a:hover {
  color: var(--light-green);
  border: 1px solid var(--light-green);

  transition: .2s;

}
```

Nosso botão vai se parecer com esse: 
[![](./assets/wallet_select_button.svg)]()