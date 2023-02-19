import React, { useState } from 'react'
import useKeyPress from '../hooks/use-key-press'
import useWalk from '../hooks/use-walk'
import { MapType } from './Room.js'

export default function Robot({ onPickupTrash, tiles, area }) {
  const { predict, degree, walk, posPxl, getPosition } = useWalk()
  const reservesMax = 10
  let reservesTrash = 0

  useKeyPress((e) => {
    const dir = e.key.replace('Arrow', '').toLowerCase()
    let next_pos = predict(dir)
    console.log(next_pos)
    let nx = next_pos.x
    let ny = next_pos.y
    if (nx < 0) nx = 0
    if (ny < 0) ny = 0
    if (nx >= area.width) nx = area.width - 1
    if (ny >= area.height) ny = area.height - 1
    let next_tile = tiles[ny][nx]
    console.log(dir)
    if (MapType.wall != next_tile.type) {
      walk(dir)
      if (next_tile.type == MapType.trash) {
        console.dir('pickup')
        if (onPickupTrash(getPosition()) == MapType.trash) {
        }
      }
    }
    e.preventDefault()
  })
  return (
    <div
      style={{
        position: 'absolute',
        top: `${posPxl.y}px`,
        left: `${posPxl.x}px`,
        display: 'inline-block',
        height: `32px`,
        width: `32px`,
        transform: `rotate(${degree})`,
        backgroundImage: `url(/images/robot_down.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `-0px -0px`,
      }}
    ></div>
  )
}
