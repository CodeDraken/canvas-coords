export class Mouse {
  constructor (
    ctx, canvas, color = 'gray',
    font = '16px Monospace', x = 0, y = 0
  ) {
    this.x = x
    this.y = y
    this.ctx = ctx
    this.canvas = canvas
    this.color = color

    this.setPos = this.setPos.bind(this)
  }

  track (enabled = true) {
    const { canvas } = this

    if (enabled) {
      canvas.addEventListener('mousemove', this.setPos)
    } else {
      canvas.removeEventListener('mousemove', this.setPos)
    }

    return this
  }

  // sets x, y from mousemove event
  setPos (evt) {
    const { canvas } = this
    const canvasDimensions = canvas.getBoundingClientRect()

    // get mouse position relative to canvas
    this.x = Math.floor(evt.clientX - canvasDimensions.left)
    this.y = Math.floor(evt.clientY - canvasDimensions.top)

    return this
  }

  draw () {
    const { x, y, canvas, ctx } = this
    const txt = `X: ${x}, Y: ${y}`

    ctx.save()
    ctx.fillStyle = this.color
    ctx.font = '16px Monospace'

    // offset the text position for readability (so it doesnt go off screen)
    const offsetX = x < canvas.width / 2 ? 20 : -ctx.measureText(txt).width - 20
    const offsetY = y < canvas.height / 2 ? 25 : -18

    ctx.fillText(txt, this.x + offsetX, this.y + offsetY)
    ctx.restore()

    return this
  }
}

export default Mouse
