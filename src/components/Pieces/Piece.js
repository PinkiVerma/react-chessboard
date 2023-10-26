import React from 'react';
import "./Pieces.css"

const Piece = (props) => {
    const {rank, file, piece} = props;

    const onDragStart = (e) => {
        e.dataTransfer.effectAllowed = 'move' //remove '+' when dragging
        e.dataTransfer.setData('text/plain', `${piece},${rank},${file}`)

        // Schedule the piece to be hidden after setting up the drag-and-drop data.
        setTimeout(()=>{
             e.target.style.display = 'none' //hide the piece that is being dragged
        },0)
    }

    const onDragEnd = (e) => {
        e.target.style.display = 'block'
    }
    
  return (
    <div className={`piece ${piece} p-${file}${rank}`}
    draggable={true}
    onDragStart={onDragStart}
    onDragEnd={onDragEnd}
    />
  )
}

export default Piece