# Gerar Extrato

Nesse tutorial vamos adicionar uma funcionalidade para gerar um extrato e fazer o download do arquivo em `txt`.

## HTML

Vamos dar inicio criando um botão para fazer o download do nosso extrato. Iremos adicionar o seguinte código no lugar do nosso botão `+ Nova Transação`:

```html
<div id="options-transactions">
  <a href="#" class="button new" onclick="Modal.toggle('transaction')">
    + Nova Transação
  </a>

  <a href="#" class="button extract" onclick="Wallet.extract()">
    <img src="./assets/get_app-24px.svg" alt="Gerar Extrato" />
    <span>Gerar extrato</span>
  </a>
</div>
```

Para conseguirmos organizar melhor nosso CSS movemos o nosso link de adicionar novas transações dentro da div `options-transactions` juntamente como nosso novo link para o download e o [ícone](../assets/get_app-24px.svg) de download.

## CSS

Vamos dar inicio ao nosso CSS, primeiramente vamos adicionar as variáveis que vamos utilizar;

```css
:root {
  --font-color-base: #363f5f;
  --svg-filter: invert(30%) sepia(79%) saturate(2476%) hue-rotate(100deg)
    brightness(118%) contrast(119%);
}
```

A nosso variável `--svg-filter` é meio diferente do que andamos vendo durante a maratona, mas vou explicar melhor mais abaixo.

Vamos adicionar o restante do nosso CSS na parte dos links.

```css
#options-transactions {
  display: flex;
  margin-bottom: 0.8rem;
  justify-content: space-between;
}

#options-transactions img {
  filter: var(--svg-filter);
}

a.button.extract {
  color: var(--font-color-base);
  display: flex;
  align-items: center;
}

a.button.extract:hover {
  filter: brightness(150%);
}
```

Tirando o `filter` o restante são itens que já vemos antes.
O `filter` é o um filtro que vai sobrepor a cor do nosso elemento, na declaração da nossa variável `--svg-filter` adicionamos alguns comandos para mexer com inversão de cor, brilho, contraste e etc. Você pode ver mais informações sobre o filter [aqui](https://developer.mozilla.org/pt-BR/docs/Web/CSS/filter-function).

## JavaScript

Agora vamos para a parte da implementação que faz a mágica acontecer.

Primeiramente vamos adicionar um código no nosso `Utils`, ele vai ser responsável pegar nosso extrato e baixar como um arquivo.

```js
downloadFile(data, name, type) {
  const blob = new Blob([data], {
    type: type,
  });
  const link = window.document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = `${name.trim().replace(/ +/g, "-")}`;
  link.click();
  window.URL.revokeObjectURL(link.href);
  return;
},
```

Vamos entender melhor nosso código, a maior novidade é o `Blob` ele é uma funcionalidade do javascript que permite que adicionemos um `array` com os dados que queremo adicionar em nosso arquivo e o tipo dele, que no nosso caso vai se `txt`.

Você pode ver mais informações do `Blob` [aqui](https://developer.mozilla.org/pt-BR/docs/Web/API/Blob).

Em seguida temos os seguintes passos:

- Criamos um elemento html `<a>`
- Adicionamos no seu href o caminho do arquivo que o `Blob` gerou
- Adicionamos o nome que nosso arquivo terá ao ser baixado
- Damos um clink no link que criamos para ele iniciar o download
- E por fim revogamos nosso link do arquivo para o navegador não ficar guardando ele.

Agora vamos criar a funcionalidade que vai gerar dono o nosso texto do extrato:

```js

extract() {
   const transactions = Transaction.all;
   const incomes = Transaction.incomes();
   const expenses = Transaction.expenses();
   const total = Transaction.total();

   const currentDate = new Date();

   const date = {
     day: currentDate.getDay(),
     month: currentDate.getMonth() + 1,
     year: currentDate.getFullYear(),
     hours: currentDate.getHours(),
     minutes: currentDate.getMinutes(),
     seconds: currentDate.getSeconds(),
   };

   let text = `Extrato - Data: ${`${date.day}/${date.month}/${date.year} - ${date.hours}:${date.minutes}:${date.seconds}\n`}`;

   text += transactions.reduce(
     (txt, transaction) =>
       (txt += `\n${transaction.date} - ${
         transaction.description
       }       ${Utils.formatCurrency(transaction.amount)}`),
     ""
   );

   text += `\n\nEntradas:        ${Utils.formatCurrency(incomes)}`;
   text += `\nSaídas:          ${Utils.formatCurrency(expenses)}`;
   text += `\nTotal:           ${Utils.formatCurrency(total)}`;

   Utils.downloadFile(text, "extrato.txt", "application/text");
 }
```

Vamos entender o que nosso código está fazendo.

Primeiro vamos pegar informações do nosso `Transaction`, em seguida vamos criar um variável que vai receber a data atual da funcionalidade `Date`.

O `Date` tem diversas funcionalidade, então para conhecer melhor ele voce pode clicar [aqui](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date).

Vamos criar uma variável date que vai receber nossa data e hora totalmente separada.

Agora vamos dar inicio ao nosso conteúdo do extrato, primeiro ele vai receber o que queremos no topo, eu coloquei estrato e a data e hora em que ele foi gerado.

Em seguida vamos utilizar o `reduce` ( ele é um recurso um pouco mais avançado, mas é semelhante o `forEach` que vimos na maratona), o que ele vai fazer é pegar o texto atual e adicionar o seguinte com a formatação que escolhemos que foi data, descrição e valor.

Para finalizar nosso texto vamos adicionar os valores de entra, saída e total.

Agora finalizamos chamando a nossa função `Utils.downloadFile`, passando a nossa variável `text`, o nome com a extensão do nosso arquivo e o tipo do arquivo.

E finalizamos, o resultado esperado quando for abrir o arquivo é algo semelhante a isso:

```txt
Extrato - Data: 2/2/2021 - 23:35:2

30/01/2021 - Test       R$ 800,00
04/02/2021 - Test       R$ 8.000,00
06/02/2021 - Aluguel       -R$ 750,00
17/02/2021 - Test       -R$ 2.000,00

Entradas:        R$ 8.800,00
Saídas:          -R$ 2.750,00
Total:           R$ 6.050,00
```

As informações vão variar conforme o que foi adicionado por você, mas a estrutura é semelhante a essa.

Podemos ver que tanto a data quanto a hora do nosso topo estão formatadas um pouco erradas, então fica o desafio de você resolver isso ^^.
