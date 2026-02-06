import { useState, useEffect } from "react";
import "./App.css";
import cat from "./assets/cat.png";
import catlook from "./assets/catlook.jpg";
import question from "./assets/question.jpg";
import looking from "./assets/looking.jpg";
import minion from "./assets/minion.png";
import capi from "./assets/capi.png";

export default function ValentinePage() {
  const [noCount, setNoCount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 50 }); // initial NO next to YES
  const [noMessage, setNoMessage] = useState("");
  const [currentImage, setCurrentImage] = useState(cat);

  const messages = ["Really?", "Realllyyy?", "Are you sure?", "Hmmmm?"];
  const images = [catlook, question, looking, minion]; // NO click sequence


  useEffect(() => {
    if (accepted || noCount >= 5) {
      setCurrentImage(capi);
    }
  }, [accepted, noCount]);

  const moveNo = () => {
    if (noCount < 5) {
      setNoCount((c) => c + 1);
      setPos({
        top: Math.random() * 90,
        left: Math.random() * 90,
      });
      setNoMessage(messages[noCount]);
      setCurrentImage(images[noCount]); // first NO click => catlook
    }
  };

  const handleYesClick = () => {
    setAccepted(true);
  };

  const showYesOnly = noCount >= 5;

  return (
    <div className="container">
      <h1>💖 Will you be my Valentine? 💖</h1>
      <img src={currentImage} alt="Valentine" className="center-image" />

      <div className="button-container">
        <button onClick={handleYesClick} className="yes-button">
          YES
        </button>

        {noCount < 5 && !accepted && (
          <button onClick={moveNo} onTouchStart={moveNo} className="no-button">
            NO
          </button>
        )}
      </div>

      {noMessage && <p className="no-message">{noMessage}</p>}

      {showYesOnly && !accepted && (
        <p>The universe has decided. Click YES to accept 😌💖</p>
      )}

      {accepted && <h2>Yay!!! 💘🥰</h2>}
    </div>
  );
}
