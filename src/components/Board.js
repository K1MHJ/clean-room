import React, { Component, useState, useCallback, useRef } from 'react'
import produce from 'immer'

const numRows = 50
const numCols = 50

function Board() {
  const [grid, setGrid] = useState(() => {
    const rows = []
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0))
    }
    return rows
  })

  const [running, setRunning] = useState(false)

  const runningRef = useRef(running)
  runningRef.current = running

  const createMap = useCallback(() => {
    runningRef.current = false

  })
  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return
    }

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {}
        }
        if (gridCopy[0][0] === 1) {
          gridCopy[0][0] = 0
        } else {
          gridCopy[0][0] = 1
        }
      })
    })
    setTimeout(runSimulation, 1000)
  }, [])

  return (
    <>
      <button
        onClick={() => {
          setRunning(!running)
          if (!running) {
            runningRef.current = true
            runSimulation()
          }
        }}
      >
        {running ? 'stop' : 'start'}
      </button>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols},20px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? 'pink' : undefined,
                border: 'solid 1px black',
              }}
            />
          ))
        )}
      </div>
    </>
  )
}

export default Board
