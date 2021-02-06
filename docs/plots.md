# Múltiplas Parcelas

Neste tutorial vamos adicionar uma funcionalidade para criar transações com intervalos de um mês.

## HTML

Para implementar essa funcionalidade, vamos ter que alterar um pouco nosso modal de transações, abaixo segue a alteração que deve ser adicionada a ele:

```html
<div class="input-group plots">
  <label class="sr-only" for="description">Parcelas</label>
  <input
    onclick="Form.plotsInputState()"
    type="checkbox"
    id="checkbox-plots"
    name="checkbox-plots"
    value="active-plots"
  />
  <input
    autocomplete="off"
    disabled
    type="number"
    id="plots"
    min="1"
    name="plots"
    placeholder="Ativar Parcelas"
  />
</div>
```

Nosso modal vai ficar semelhante a este:

![](./assets/modal_form.svg)

Adicionamos a ele mais um campo para entrada de números e uma checkbox.

## CSS

Vamos adicionar nosso CSS para melhorar a apresentação dos novos inputs que colocamos.

```CSS
.input-group.plots #checkbox-plots {
  height: 2.2rem;
  width: 3rem;
  margin-right: 0.6rem;
  background: #252327;
}

.input-group.plots {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

Agora nossos inputs vão ficar mais apresentáveis:

![](./assets/modal_form_css.svg)

## Javascript

Vamos codar nossa solução agora.

Primeiramente vamos adicionar algumas funções novas no nosso `Utils`.

```js
currentDate() {
    return new Date()
  },

setMonthToDate(date, value) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  const currentMonth = new Date(year, month, 1)

  const nextMonth = new Date(currentMonth.setMonth(month + value))
  const lastDayInNextMonth = new Date(
    nextMonth.getFullYear(),
    nextMonth.getMonth() + 1,
    0
  ).getDate()

  return lastDayInNextMonth < day
    ? new Date(
        nextMonth.getFullYear(),
        nextMonth.getMonth(),
        lastDayInNextMonth
      )
    : new Date(nextMonth.getFullYear(), nextMonth.getMonth(), day)
},
```

A função `currentDate` vai ser responsável por retornar a nossa data atual.

Já a função `setMonthToDate` vai adicionar meses na data que ela recebe, vamos entender o que está acontecendo nela.

- Recebe por parâmetro uma data (do tipo retornado do `new Date`) e uma valor que é o numero de meses a serem adicionados.
- Depois disso vamos vamos pegar o ano, mês e dia da data que recebemos.
- O `currentMonth` vai ser um ponto de referencia do mês da data que foi passada, ele vai retornar o mesmo ano e mês só que o dia vai ser 1.
- Já o `nextMonth` vai conter o próximo mês, ele pega a data de `currentMonth` e soma o mês que temos na variável `month` mais o valor passado na chamada da função, para fazer essa adição usamos o [`.setMonth](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth).
- A variável `lastDayInNextMonth` vai conter o total de dias que temos no mês.
- Por ultimo nosso retorno, ele testa se o ultimo dia do mês é menor do que o dia contido em `day`, caso seja verdadeiro ele retorna a data com o ultimo dias do mês, caso seja falso ele retorna a data com o dia selecionado pelo usuário.

_obs.: Fazemos este teste para caso o usuário selecione o dia 31, os meses que não tiverem esse dias preencham com o ultimo dia do mês_

Continuando no nosso `Utils` fiz uma alteração na forma que formato a data:

```js
formatDate(date) {
    return new Date(date).toLocaleDateString(DOM.language)
},
```

_obs: Essa alteração pode gerar erros em seu código, então pode ser necessário que você revise algumas partes._

Proxímo passo vai ser pegar a linguagem do nosso navegados, para isso vamos adicionar essa linha na nossa `DOM`:

```js
language: navigator.language,
```

Bom vamos para o nosso `Form` agora, nele vamos adicionar algumas coisa. Primeiramente os itens que vão pegar os nosso dois novos campos:

```js
plots: document.querySelector('input#plots'),
checkbox: document.getElementById('checkbox-plots'),
```

Agora precisamos falar para nossa função `getValues` pegar também os valores do nosso input do numero de parcelas.

```js
getValues() {
  return {
    description: Form.description.value.replace(/ +/g, ' ').trim(),
    amount: Form.amount.value,
    date: Form.date.value,
    plots: Form.plots.value || 1,
  }
},
```

Também teremos que atualizar as funções `formatValues` e `clearFields`.

```js
formatValues() {
  let { description, amount, date, plots } = Form.getValues()
  amount = Utils.formatAmount(amount)

  return {
    description,
    amount,
    date,
    plots,
  }
},

clearFields() {
  Form.description.value = '',
    Form.amount.value = '',
    Form.date.value = '',
    Form.plots.value = '',
    Form.checkbox.checked = false
},
```

Vamos fazer agora a lógica que vai fazer o cadastro de varias transações, para isso modifiquei a função `saveTransaction`:

```js
saveTransaction(transaction) {
  try {
    const date = new Date(transaction.date + 'T11:00:01')

    for (let i = 0; i < transaction.plots; i++) {
      const newDate = Utils.formatDate(
        Utils.setMonthToDate(date, i)
      )
      Transaction.add({ ...transaction, date: newDate })
    }
  } catch (error) {
    console.log(error)
  }
},
```

Vamos para um passo a passo:

- `date` cria uma nova data com a data recebida na transação mais um horário ( Utilizei esse horário para manter um padrão e tentar não deixar o GMT influenciar no dia ).
- Entramos em um `for` que vai se repetir até que cheguemos no numero de parcelas passado pelo usuário.
- O `newDate` vai receber e formatar a data adicionando meses nela.
- Transaction.add salva a nossa transação.

E para finalizar vamos adicionar a função `plotsInputState`, ela vai alterar o modo e o placeholder do nosso input do numero de parcelas. Essa função já está sendo chamada no `onclick` na nossa checkbox em nosso html.

```js
plotsInputState() {
  if (Form.checkbox.checked) {
    Form.plots.removeAttribute('disabled')
    Form.plots.placeholder = 'Adicione o numero de parcelas'
  } else {
    Form.plots.setAttribute('disabled', 'disabled')
    Form.plots.placeholder = 'Ativar parcelas'
  }
},
```

Com isso finalizamos nosso funcionalidade!!
