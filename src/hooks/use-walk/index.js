import { useState } from 'react'

export default function useWalk(props) {
  const stepSize = 32
  var position = { x: props.x, y: props.y }
  const [posPxl, setPosPxl] = useState({
    x: props.x * stepSize,
    y: props.y * stepSize,
  })
  const [dir, setDir] = useState(0)
  const [degree, setDegree] = useState(0)
  const directions = {
    down: 0,
    left: 1,
    right: 2,
    up: 3,
  }
  const modifier = {
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
    up: { x: 0, y: -1 },
  }
  function predict(dir) {
    console.log('predict')
    let x = position.x + modifier[dir].x
    let y = position.y + modifier[dir].y
    console.log(modifier[dir])
    console.log(position)
    console.log(x, y)
    return {
      x: x,
      y: y,
    }
  }
  function getPosition() {
    return position
  }
  function walk(dir) {
    switch (directions[dir]) {
      case directions.down:
        setDegree('0deg')
        break
      case directions.left:
        setDegree('90deg')
        break
      case directions.right:
        setDegree('-90deg')
        break
      case directions.up:
        setDegree('180deg')
        break
    }
    move(dir)
    setDir((prev) => {
      // if (directions[dir] === prev) move(dir)
      return directions[dir]
    })
    return position
  }
  function move(dir) {
    position.x = position.x + modifier[dir].x
    position.y = position.y + modifier[dir].y
    console.log('move')
    console.log(position.x, position.y)
    console.log(modifier[dir])
    setPosPxl((prev) => ({
      x: prev.x + modifier[dir].x * stepSize,
      y: prev.y + modifier[dir].y * stepSize,
    }))
  }
  return {
    walk,
    dir,
    degree,
    directions,
    position,
    getPosition,
    posPxl,
    predict,
  }
}
