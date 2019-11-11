import { Grid, Mouse } from './canvas-coords'

;(function () {
  let ctx, canvas, mouse, grid

  function init () {
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')
    mouse = new Mouse(ctx, canvas, 'gray', 'Bold 16px Monospace')
    grid = new Grid()

    mouse.track()
    window.requestAnimationFrame(update)
  }

  function update () {
    window.requestAnimationFrame(update)

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    mouse.draw()
    grid.draw(ctx, canvas)
  }

  document.addEventListener('DOMContentLoaded', init)
})()
