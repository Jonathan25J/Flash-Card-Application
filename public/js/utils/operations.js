
const updatePage = () => {
  const htmlElements = document.querySelectorAll('*')
  htmlElements.forEach(element => {
    if (element.requestUpdate) {
      element.requestUpdate();
    }

    if (element.manualUpdate) {
      element.manualUpdate();
    }
  })
}

export { updatePage };
