// basic line class
class Line {
  constructor (color, lineWidth, startX, startY, endX, endY) {
    this.color = color
    this.lineWidth = lineWidth
    this.startX = startX
    this.startY = startY
    this.endX = endX
    this.endY = endY
  }

  draw (ctx) {
    const { color, lineWidth, startX, startY, endX, endY } = this
    ctx.save()

    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)
    ctx.stroke()

    ctx.restore()
  }
}

export class Grid {
  constructor (
    color = 'gray', lineWidth = 0.3, step = 10,
    boldNth = 5, boldColor = 'DarkGray', boldWidth = 0.5
  ) {
    this.color = color
    this.lineWidth = lineWidth
    this.step = step
    this.boldNth = boldNth
    this.boldColor = boldColor
    this.boldWidth = boldWidth

    this.lines = null
  }

  createLines (canvas) {
    const {
      color, lineWidth, step,
      boldNth, boldColor, boldWidth
    } = this

    const lines = []
    const div = boldNth * step

    // vertical lines
    for (let x = 0; x < canvas.width; x += step) {
      const isNth = x % div === 0

      lines.push(
        isNth
          ? new Line(boldColor, boldWidth, x, 0, x, canvas.height)
          : new Line(color, lineWidth, x, 0, x, canvas.height)
      )
    }

    // horizontal lines
    for (let y = 0; y < canvas.height; y += step) {
      const isNth = y % div === 0

      lines.push(
        isNth
          ? new Line(boldColor, boldWidth, 0, y, canvas.width, y)
          : new Line(color, lineWidth, 0, y, canvas.width, y)
      )
    }

    this.lines = lines
  }

  drawText (ctx, canvas) {
    const { step, boldNth, boldColor } = this

    ctx.save()
    ctx.font = '16px Monospace'
    ctx.fillStyle = boldColor

    // add 0,0
    ctx.fillText('0', 1, 15)

    // create vertical text
    for (let x = step * boldNth; x < canvas.width; x += step * boldNth) {
      ctx.fillText(x, x, 15)
    }

    // create horizontal text
    for (let y = step * boldNth; y < canvas.height; y += step * boldNth) {
      ctx.fillText(y, 0, y + 15)
    }

    ctx.restore()
  }

  draw (ctx, canvas) {
    if (!this.lines) this.createLines(canvas)

    this.lines.forEach(line => line.draw(ctx))
    this.drawText(ctx, canvas)
  }
}

export default Grid
