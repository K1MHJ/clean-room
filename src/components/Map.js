import React from 'react'

export default function Map({ tiles, size }) {
  return (
    <div
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        backgroudColor: 'white',
        width: size.width * 32,
        height: size.height * 32,
      }}
    >
      {tiles.map((row, y) => (
        <div style={{ display: 'flex' }} key={y}>
          {row.map((tile, x) => (
            <div
              key={x}
              style={{
                borderTop: '0px solid black',
                borderRight: '0px solid black',
                backgroundColor: 'black',
                backgroundImage: `url(/images/${tile.v.img}.png)`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: `-0px -0px`,
                width: '32px',
                height: '32px',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
