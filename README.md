# Canvas Coords

A tiny library for drawing a customizable grid and/or mouse coordinates on an HTML5 Canvas element.

Intended for educational / developer use only, not for production code.


## Install
`npm install canvas-coords`

## Usage

**Mouse Arguments**
```js
new Mouse(ctx, canvas, color, font, x, y)

ctx // the context to use
canvas // canvas to use
color = 'gray', // set color to any CSS color value
font = '16px Monospace' // set the font
x = 0 // inital X position
y = 0 // initial Y position
```

**Mouse Methods**
```js
const mouse = new Mouse(ctx, canvas, color, font, x, y)

// passing true enables tracking mouse x/y
// passing false disables it
// this does not draw the text
mouse.track(enabled?)

// can be used to access mouse X/Y and do custom functionality
mouse.track() // true by default
console.log(mouse.x, mouse.y)

// draws the X/Y position near the cursor
mouse.draw()
```

**Grid Arguments**
```js
new Grid(color, lineWidth, step, boldNth, boldColor, boldWidth, font)

color = 'gray' // unbolded line color
lineWidth = 0.3 // normal line width
step = 10 // space between lines
boldNth = 5 // bold every nth line with boldColor
boldColor = 'DarkGray' // bolded line color & text color
boldWidth = 0.5 // bolded line size
font = '16px Monospace' // font for numbers
```

**Grid Methods**
```js
const grid = new Grid() // use default values

// draws lines and text
grid.draw(ctx, canvas)

// creates a lines array on self
grid.createLines(canvas)

// can be used to manually draw lines without text
grid.lines.forEach(line => line.draw(ctx))

// draws text at each boldNth line
grid.drawText(ctx, canvas)

```

**Example**
```js
import { Grid, Mouse } from 'canvas-coords'

;(function () {
  let ctx, canvas, mouse, grid

  function init () {
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')
    mouse = new Mouse(ctx, canvas)
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
```
