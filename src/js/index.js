const title = document.querySelector('title');
title.textContent = api.title;

document.querySelector('#btn').addEventListener('click', () => {
    document.body.style.backgroundColor = 'blue'
})