# Dev.Finance$

Projeto para administração financeira pessoal, desenvolvido durante a **Maratona Discover** pelo **Mayke Brito** da **Rocket Seat**.

## Modo Escuro

Como o objetivo da maratona é criar um projeto voltado para o publico mais iniciante, busquei a forma mais simples que consegui para adicionar o modo escuro.

---
### Variáveis CSS
De inicio vamos ter que separar todas as cores do nosso **CSS** em variáveis assim como o Mayke fazes com algumas cores na aula 2.

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
### Variável do Tema

Agora que temos nossas variáveis CSS preparadas, vamos criar o código **javascript** que vai ser responsável por alternar entre os temas **dark** e **light**.

Abaixo do objeto `Modal` criado pelo Mayke, vamos adicionar o seguinte código:

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
### Função para troca de tema

Agora vamos adicionar a função responsável por alternar entre os temas.

```js
function switchTheme() {
  const currentTheme = COLOR_THEME

  COLOR_THEME = currentTheme === 'light'
    ? 'dark'
    : 'light'

  const rules = window.document.styleSheets[0].cssRules

  document.querySelector('#img-total').src = `./assets/total-${COLOR_THEME}.svg`
 
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

Agora que temos qual o tema que sera utilizado, podemos alterar o nosso **SVG** do total.
Como não podemos alter a cor dele no **CSS** criei um novo em preto, você pode encontrar o `total-light.svg` e o `total-dark.svg` nas pastas [assets](./assets)

```js
document.querySelector('#img-total').src = `./assets/total-${COLOR_THEME}.svg`
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

Pronto, agora que temos toda a nossa lógica **javascript** precisamos chamar ela em nosso **HTML**.

---
### Botão para troca de Temas
Para chamar nossa função e alterar o tema, vamos criar um botão em nosso **HTML**.

Eu adicionei dentro no nosso `header` abaixo da logo o nosso link:

```html
<a class="color-mode button" onclick="switchTheme()">Alternar Tema</a>
```
Dentro dele coloquei duas classes para usarmos no nosso arquivo CSS e a chamada `onclick` para executar a nossa função.

---
### CSS do botão
Para fazer o estilo do nosso botão usei o seguinte CSS:

```css
.color-mode.button {
  position: absolute;
  right: -5px;
  top: 5px;

  color: var(--green);

  padding: 2px 6px;

  border: 1px solid var(--green);
  border-radius: 0.25rem;
}

.color-mode.button:hover {
  color: var(--light-green);
  border: 1px solid var(--light-green);
}
```
---
### O Projeto

Para implementar as alterações e adições que foram feitas, você pode acessar o meu [index.html](), [styles.css]() e [index.js]().

**obs.:** O meu código javascript está em um arquivo separado do HTML, mas você pode fazer as alterações que fiz diretamente dentro da tag `<script></script>` que foi criada pelo Mayke. 

