import React from 'react'
import './App.css'

function Wall() {
  return <div className='wall'></div>
}
function Road() {
  return <div className='road'></div>
}
function Square({ val }) {
  let content = null
  if (val === 1) {
    content = <Wall></Wall>
  } else if(val === 0){
    content = <Road></Road>
  } else {
    content = <div></div>
  }
  return <div className='square'>{content}</div>
}

export default Square
