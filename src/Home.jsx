import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

async function clearCollection(path) {
  try {
    const collectionRef = collection(db, path); 
    const querySnapshot = await getDocs(collectionRef);

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    console.log("Collection cleared successfully.");
  } catch (error) {
    console.error("Error clearing the collection:", error);
  }
}

export default function Home() {
  const navigate = useNavigate();

  async function startOnlineGame() {

    await clearCollection("chess");

    const game = {
      gameId: `${Math.random().toString(36).substr(2, 9)}_${Date.now()}`,
    };

    navigate(`/game/${game.gameId}`);
  }

  return (
    <div>
      <button onClick={startOnlineGame}>Play Online</button>
    </div>
  );
}
