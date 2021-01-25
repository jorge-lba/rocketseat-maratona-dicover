const Modal = {
  open(){
    document
      .querySelector('.modal-overlay')
      .classList
      .add('active')
  },
  close(){
    document
      .querySelector('.modal-overlay')
      .classList
      .remove('active')
  }
}

let COLOR_THEME = window
  .matchMedia("(prefers-color-scheme: light)")
  .matches
  ? 'light'
  : 'dark'

function switchTheme() {
  const currentTheme = COLOR_THEME

  COLOR_THEME = currentTheme === 'light'
    ? 'dark'
    : 'light'

  const rules = window.document.styleSheets[0].cssRules

  document.querySelector('#img-total').src = `./assets/total-${COLOR_THEME}.svg`
 
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
}
