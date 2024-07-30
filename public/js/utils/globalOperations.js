import { PORT } from '../../../src/utils/port.js';

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

const getTheme = () => {
  let ws = new WebSocket(`ws://localhost:${PORT}/store`);
  ws.onopen = () => {
    ws.send(JSON.stringify({ type: 'get', location: 'theme' }));
  }

  ws.onmessage = (e) => {
    let classList = document.documentElement.classList
    classList.forEach(className => {
      if (className.startsWith('theme-')) {
        classList.remove(className)
      }
    })
    classList.add(`theme-${e.data}`);
  };

}

export { getTheme, updatePage };

