import React, { useRef, useEffect, useState } from "react";
import Piece from "./Piece";
import { copyPosition } from "../../helper";
import "./Pieces.css";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  query,
} from "firebase/firestore";
import { createPosition } from "../../helper";
import { auth, db } from "../../firebase";
import {onSnapshot } from "firebase/firestore"; 


const Pieces = () => {
  const piecesRef = useRef();
  const [currentUser, setCurrentUser] = useState(null);
  const [state, setState] = useState(createPosition());

  // e.clientX and e.clientY represent the current horizontal and vertical coordinates of the mouse pointer relative to the viewport.
  // left and top provide info about the position and size of the div element representing the chessboard
  const calculateCoords = (e) => {
    const { width, left, top } = piecesRef.current.getBoundingClientRect();
    const size = width / 8;
    const y = Math.floor((e.clientX - left) / size); //(713-272.8000183105469)/80
    const x = 7 - Math.floor((e.clientY - top) / size);
    return { x, y };
  };

  const onDrop = async (e) => {
    const newPosition = copyPosition(state);
    const { x, y } = calculateCoords(e);
    const [p, rank, file] = e.dataTransfer.getData("text/plain").split(",");

    newPosition[rank][file] = "";
    newPosition[x][y] = p;
    setState(newPosition);

    try {
      const chessCollection = collection(db, "chess");
      const querySnapshot = await getDocs(chessCollection);

      if (!querySnapshot.empty) {
        const docRef = doc(chessCollection, querySnapshot.docs[0].id); // Create a DocumentReference
        await updateDoc(docRef, {
          item: JSON.stringify(newPosition),
        });
      } else {
        addDoc(collection(db, "chess"), {
          id: currentUser.uid,
          item: JSON.stringify(newPosition),
        });
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    // Add an event listener to Firebase auth to track the authentication state.
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    // Clean up the listener when the component unmounts.
    return () => unsubscribe();
  }, []);

  //get realtime updates
  useEffect(() => {
    const chessRef = collection(db, "chess");
    const chessQuery = query(chessRef); 
    const snapshot = async() => {
      await onSnapshot(chessQuery, (querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          setState(JSON.parse(doc.data().item))
        });
      });
    }
    snapshot()
  },[]);

  return (
    <div
      className="pieces"
      onDrop={onDrop}
      onDragOver={onDragOver}
      ref={piecesRef}
    >
      {state?.map((r, rank) => {
        return r?.map((f, file) => {
          return state[rank][file] ? (
            <Piece
              key={rank + "-" + file}
              rank={rank}
              file={file}
              piece={state[rank][file]}
            />
          ) : null;
        });
      })}
    </div>
  );
};

export default Pieces;
