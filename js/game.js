const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const w = window.innerWidth;
const h = 800;

canvas.setAttribute("width", w);
canvas.setAttribute("height", h);

const feelTheThunder = new FeelTheThunder(ctx, w, h);
feelTheThunder.start();
