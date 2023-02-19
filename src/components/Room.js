import React, { useEffect, useState, useRef } from 'react'
import Robot from './Robot.js'
import Map from './Map.js'
import Status from './Status.js'
import json_obj from './../jsons/stage.json'

const MapType = {
  empty: 0,
  wall: 1,
  road: 2,
  trash: 3,
  trashcan: 4,
  robot: 5,
}
export { MapType }
export default function Room() {
  const [tiles, setTiles] = useState([])
  const [mapSize, setMapSize] = useState({
    width: json_obj.stage[0].length,
    height: json_obj.stage.length,
  })
  const [room_trash, setRoom_trash] = useState(0)
  const [robot_trash, setRobot_trash] = useState(0)
  const _robot = { x: 0, y: 0 }
  const robotRef = useRef(null)

  for (let y = 0; y < json_obj.stage.length; y++) {
    for (let x = 0; x < json_obj.stage[y].length; x++) {
      switch (json_obj.stage[y][x]) {
        case MapType.robot: //trash can
          _robot.x = x
          _robot.y = y
          x = json_obj.stage[y].length
          y = json_obj.stage.length
          break
      }
    }
  }

  useEffect(() => {
    const _tiles = []
    let id = 0
    for (let y = 0; y < json_obj.stage.length; y++) {
      const row = []
      for (let x = 0; x < json_obj.stage[y].length; x++) {
        let img = ''
        switch (json_obj.stage[y][x]) {
          case MapType.empty: //empty
            img = ''
            break
          case MapType.wall: //wall
            img = 'wall'
            break
          case MapType.road: //road
            img = 'road'
            break
          case MapType.trash: //trash
            img = 'paper-waste'
            break
          case MapType.trashcan: //trash can
            img = 'trashbox'
            break
        }
        row.push({
          x,
          y,
          id: id++,
          type: json_obj.stage[y][x],
          v: { img: img },
        })
      }
      _tiles.push(row)
    }
    setTiles(_tiles)
    robotRef.current.setPosition(_robot.x, _robot.y)
  }, [])

  const onRobotPickupTrash = (robot_pos) => {
    console.dir(robot_pos)
    let t = tiles[robot_pos.y][robot_pos.x].type
    console.dir('hit')
    console.dir(t)
    if (t == MapType.trash) {
      t = MapType.empty
    }
    setRoom_trash((prev) => {
      return trashRemains()
    })
    return t
  }
  function trashRemains() {
    let n = 0
    tiles.forEach((row, y) => {
      row.forEach((tile, x) => {
        if (tile.type == MapType.trash) {
          n++
        }
      })
    })
    return n
  }
  return (
    <>
      <div
        className='room'
        style={{
          width: mapSize.width * 32,
          height: mapSize.height * 32,
        }}
      >
        <Map tiles={tiles} size={mapSize} />
        <Robot
          ref={robotRef}
          onPickupTrash={onRobotPickupTrash}
          tiles={tiles}
          area={{ width: mapSize.width, height: mapSize.height }}
        ></Robot>
      </div>
      <div>
        <Status robot_trash={robot_trash} room_trash={room_trash} />
      </div>
    </>
  )
}
