import React, { Component, useState, useCallback, useRef } from 'react'

export default function Status(props) {
  return (
    <div>
      <p>Robot Trash: {this.props.robot_trash}</p>
      <p>Room Trash: {this.props.room_trash}</p>
    </div>
  )
}
