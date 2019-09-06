const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const w = window.innerWidth;
// const w = 1600;
// const h = 900;
const h = window.innerHeight

const intro = document.querySelector('.intro')

canvas.setAttribute("width", w);
canvas.setAttribute("height", h);

const restart = document.getElementById('restart')

restart.addEventListener('click', e => window.location.reload())

const feelTheThunder = new FeelTheThunder(ctx, w, h);
// intro.classList.add('intro--out')
feelTheThunder.startScreen()
// feelTheThunder.start();
