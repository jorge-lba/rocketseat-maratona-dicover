# Modo Escuro

Como o objetivo da maratona é criar um projeto voltado para o publico mais iniciante, busquei a forma mais simples que consegui para adicionar o modo escuro.

---
## Variáveis CSS
De inicio vamos ter que separar todas as cores do nosso **CSS** em variáveis assim como o Mayk fez com algumas cores na aula 2.

Segue um exemplo de como separei minhas variáveis:

```css
:root {
  --font-color-base: #363F5F;
  --green: #49AA26;
  --light-green: #3DD705;
  --expense-color: #E92929;
  --light-color-base: #FFF;
  --table-color-base: #FFF;
  --background-color-header: #2D4A22;
  --background-color: #F0F2F5;
}
```

Agora vamos criar uma [At-Rule](https://developer.mozilla.org/pt-BR/docs/Web/CSS/At-rule), assim como foi feito também na aula 2.

```css
@media (prefers-color-scheme: dark) {
  :root {
    --font-color-base: #F0F2F5;
    --green: #49aa26;
    --light-green: #555;
    --expense-color: #E92929;
    --light-color-base: #1f1b24;
    --table-color-base: #121212;
    --background-color-header: #121212;
    --background-color:#1f1b24;
  }
}
```

Essa **At-Rule** vai verificar o tema que o usuário está usando, caso seja `dark` ele vai alterar para as cores que foram adicionadas nas variáveis.

Para mais informações de como é identificado o tema do usuário veja o link a seguir: [prefers-color-scheme](https://developer.mozilla.org/pt-BR/docs/Web/CSS/@media/prefers-color-scheme)

---
## Variável do Tema

Agora que temos nossas variáveis CSS preparadas, vamos criar o código **javascript** que vai ser responsável por alternar entre os temas **dark** e **light**.

Abaixo do objeto `Modal` criado pelo Mayk, vamos adicionar o seguinte código:

```js
let COLOR_THEME = window
  .matchMedia("(prefers-color-scheme: light)")
  .matches
  ? 'light'
  : 'dark'
```

Vamos entender melhor o que essa variável está fazendo. Assim que iniciamos nossa pagina ele vai buscar na nossa janela se o estamos usando o modo **light**, caso seja verdadeiro ele retorna o valor `true` e se for falso retorna `false`.

Estamos usando nessa variável o [operador ternário](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Operador_Condicional), ele funciona semelhante ao `if` e `else`.

Ele recebe a condição (que no nosso caso é se o usuário está ou não usando o modo light), caso essa condição seja verdadeira ela retorna o primeiro valor após `?` e caso seja falsa retorna o segundo valor após os `:`.

Depois de resolvida essa operação nossa variável vai saber se o usuário está usando o modo **dark** ou **light**.

---
## Função para troca de tema

Agora vamos adicionar a função responsável por alternar entre os temas.

```js
function switchTheme() {
  const currentTheme = COLOR_THEME

  COLOR_THEME = currentTheme === 'light'
    ? 'dark'
    : 'light'

  const rules = window.document.styleSheets[0].cssRules
 
  for (i = 0; i < rules.length; i++) {
    media = rules[i].media

    if (media == undefined) {
      continue
    }

    let item = media
      .mediaText
      .replace(
        "(prefers-color-scheme: " + COLOR_THEME + ")", 
        "(prefers-color-scheme: " + currentTheme + ")"
      )

    media.mediaText = item
  }
```

Essa função é um pouco mais longa, então vamos entender por partes.

No inicio criamos uma variável `currentTheme`, assim que for chamada a função ela vai guardar o tema que está sendo usado.

```js
const currentTheme = COLOR_THEME
```

Após isso vamos adicionar qual tema sera colocado em nossa variável `COLOR_THEME`, para isso iremos usar novamente o operador ternário novamente. Vamos verificar se o tema atual é **light**, caso seja a variável `COLOR_THEME` vai receber **dark**, caso o contrário ela recebe **light**.

```js
COLOR_THEME = currentTheme === 'light'
    ? 'dark'
    : 'light'
```

O próximo passo é criar a variável `rules` para receber todas as regras de CSS que temos em nosso projeto.

```js
const rules = window.document.styleSheets[0].cssRules
```

O próximo passo é percorrer todas as `rules` e pegar as que contem o parâmetro `media`, para isso vamos usar um `for`.

```js
for (i = 0; i < rules.length; i++) {
  let media = rules[i].media

  if (media == undefined) {
    continue
  }

  let item = media
    .mediaText
    .replace(
      "(prefers-color-scheme: " + COLOR_THEME + ")", 
      "(prefers-color-scheme: " + currentTheme + ")"
    )

  media.mediaText = item
}
```
Cada rule será adicionada na variável `media`, e após isso vai ser verificado se elea é `undefined`, caso seja seguimos para o próximo ciclo do `for` usando o `continue`.

Caso a `media` seja um valor válido,  vamos para o próximo passo, que vai pegar o nosso `prefers-color-scheme` e alterar do tema que o usuário estava usando para o novo tema e adicionar na variável `item`.

Depois disso adicionamos essa alteração na nossa regra **CSS** com o mando `media.mediaText = item`

Para podermos alterar a cor do nosso **SVG** total, vamos abrir o nosso arquivo [total.svg](./assets/total.svg) e copia-lo no lugar da nossa imagem total.svg e adicionar um classe **svg**.
Nosso card total vai ficar assim:

```html
<div class="card total">
  <h3>
    <span>Total</span>
    <svg class="svg" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path  d="M16 1.33333V30.6667" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path  d="M22.6667 6.66667H12.6667C11.429 6.66667 10.242 7.15834 9.36684 8.03351C8.49167 8.90868 8 10.0957 8 11.3333C8 12.571 8.49167 13.758 9.36684 14.6332C10.242 15.5083 11.429 16 12.6667 16H19.3333C20.571 16 21.758 16.4917 22.6332 17.3668C23.5083 18.242 24 19.429 24 20.6667C24 21.9043 23.5083 23.0913 22.6332 23.9665C21.758 24.8417 20.571 25.3333 19.3333 25.3333H8" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </h3>
  <p>R$ 3.000,00</p>
</div>
```

Agora podemos adicionar um **CSS** para alterar a cor do nosso **SVG**.

```css
.svg {
  stroke: var(--light-color-base);
}
```

Pronto, agora que temos toda a nossa lógica **javascript** e o nosso **svg** preparados precisamos chamar nossa função `switchTheme` em nosso **HTML**.

---
## Botão para troca de Temas
Para chamar nossa função e alterar o tema, vamos criar um botão em nosso **HTML**.

Eu adicionei dentro no nosso `header` uma div contento nosso link e logo:

```html
<div class="header">
  <a class="color-mode button" onclick="switchTheme()">Alternar Tema</a>
  <img class="logo" src="./assets/logo.svg" alt="Logo Dev Finances">
</div>
```
Dentro dele coloquei duas classes para usarmos no nosso arquivo CSS e a chamada `onclick` para executar a nossa função.

---
## CSS do botão
Para fazer o estilo do nosso botão usei o seguinte CSS:

```css
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

.header{
  display: inline-block;

  position: relative;
  width: min( 90vw, 800px );
}

.logo {
  margin-top: 4rem;
}
```
---
## O Projeto

Para implementar as alterações e adições que foram feitas, você pode acessar o meu [index.html](./index.html), [styles.css](./styles.css) e [index.js](./index.js).

**obs.:** O meu código javascript está em um arquivo separado do HTML, mas você pode fazer as alterações que fiz diretamente dentro da tag `<script></script>` que foi criada pelo Mayk. 

# Refatoração

Umas das boas práticas da programação é a refatoração, em uma explicação bem simplória a refatoração é o ato de você rever seu código e fazer melhorias nele mantendo a mesma funcionalidade.

Revisitando meu código da função `switchTheme`, que ficou da seguinte forma:

```js
function switchTheme() {
  const currentTheme = COLOR_THEME

  COLOR_THEME = currentTheme === 'light'
    ? 'dark'
    : 'light'

  const cssRules = window.document.styleSheets[0].cssRules
 
  for (const rule of cssRules) {
    let media = rule.media
    
    if (media) {
      media.mediaText = media
      .mediaText
      .replace(
        "(prefers-color-scheme: " + currentTheme + ")", 
        "(prefers-color-scheme: " + COLOR_THEME + ")"
      )
    }
  }
}
```

Vi a possibilidade de reduzir algumas linhas, modificar o nome de uma variável para ficar mais clara o que ela representa e adicionar um `for of` que tem basicamente o mesmo funcionamento do `for`, mas é mais pratico para percorrer objetos.

Ao rodar o projeto no meu celular, percebi que ele só mudava de tema a partir do segundo clique.

Como meu celular já iniciava no modo dark o nosso replace não funcionava na primeira execução, para resolver isso alterai algumas coisa no nosso **javascript**.

Primeira mente removi a variável `COLOR_THEME`, ela não vai ser mais necessária para nossa nova lógica. 

Agora vamos adicionar uma nova função que vai verificar qual o tema está marcado no nosso `@media` que representa o nosso modo `dark` no CSS e retornar o valor atual e o que queremos adicionar como novo.

```js
const invertTheme = (mediaText) => mediaText.indexOf('dark') > -1
  ? ['dark', 'light']
  : ['light', 'dark']
```

Vamos ver nossa nova função `switchTheme`.

```js
function switchTheme() {  
  const cssRules = window.document.styleSheets[0].cssRules
 
  for (const rule of cssRules) {
    let media = rule.media
    
    if (media) {
      const [currentTheme, nextTheme] = invertTheme(media.mediaText)

      media.mediaText = media
      .mediaText
      .replace(
        "(prefers-color-scheme: " + currentTheme + ")", 
        "(prefers-color-scheme: " + nextTheme + ")",
      )
    }
  }
}
```

Ela continua parecida com a anterior, mas removemos algumas variáveis que eram criadas logo no inicio e adicionei nossa nova função `invertTheme` dentro do `for of`.

```js
const [currentTheme, nextTheme] = invertTheme(media.mediaText)
```
Caso você ainda não esteja familiarizado com essa forma de criar variáveis, ela se chama [desestruturação](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Atribuicao_via_desestruturacao). O que acontece é que quando recebemos nossa array da função `invertTheme` ele extrai os valores e colocas dentro das variáveis `currentTheme` e `nextTheme`.

Depois disso nossa função continua igual a anterior, fazendo o replace(substituir) do testo da nossa **At-Rule** do tema.