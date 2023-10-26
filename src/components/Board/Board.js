import React from "react";
import "./Board.css";
import Ranks from "../Ranks/Ranks";
import Files from "../Files/Files";
import Pieces from "../Pieces/Pieces";

const Board = () => {
  const ranks = Array(8)
    .fill()
    .map((x, i) => 8 - i); //[8,7,6,5,4,3,2,1]
  const files = Array(8)
    .fill()
    .map((x, i) => i + 1); //[a,b,c,d,e,f,g,h]

  const getClassName = (i, j) => {
    let c = "tile";
    c += (i + j) % 2 === 0 ? " tile--light" : " tile--dark";
    return c; //"tile tile--light/dark"
  };

  return (
    <div className="board">
      <Ranks ranks={ranks} />
      <div className="tiles">
        {ranks.map((ranks, i) => {
          return files.map((files, j) => {
            return (
              <div
                key={files + "-" + ranks}
                className={getClassName(i, j)}
              ></div>
            );
          });
        })}
      </div>
      <Pieces />
      <Files files={files} />
    </div>
  );
};

export default Board;
