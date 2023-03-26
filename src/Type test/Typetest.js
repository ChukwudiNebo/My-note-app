import React, { useEffect, useState } from "react";
import "./typetest.css";

const Typetest = () => {
  const [speed, setSpeed] = useState();
  const [accuracy, setAccuracy] = useState(0);
  const [color, setColor] = useState([]);
  const [time, setTime] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [mistake, setMistake] = useState(0);
  const [paragraph, setParagraph] = useState([
    "it is quite hard right now but things will eventually get better",
    // "love",
  ]);
  const [textarea, setTextarea] = useState("");
  const onChange = (e) => {
    setTextarea(e.target.value);
  };
  const splitTextarea = textarea.split("");
  const joinPara = paragraph.join("");
  const para = joinPara.split("");

  // Function to compare the paragraph and the textarea and push the colors to another array
  const arrCompare = (a, b) => {
    const newColor = [];
    for (let i = 0; i < b.length; i++) {
      if (a[i] === b[i]) {
        newColor.push("green");
      } else {
        newColor.push("red");
      }
    }
    setColor(newColor);

    // To get the number of mistyped letters
    const countedRed = newColor.reduce(
      (allColor, colors) => {
        const currCount = allColor[colors] ?? 0;
        return {
          ...allColor,
          [colors]: currCount + 1,
        };
      },
      { red: 0 }
    );
    // console.log(countedRed)
    setMistake(countedRed.red);
  };

  // Typing Accuracy
  const accuracyType = () => {
    if (mistake <= 0) {
      setAccuracy(100);
    } else if (mistake < 5) {
      setAccuracy(95);
      //   console.log("95%");
    } else if (mistake < 10) {
      setAccuracy(90);
      // console.log('90%')
    } else if (mistake < 20) {
      setAccuracy(70);
      // console.log('70%')
    } else {
      setAccuracy(50);
      // console.log('50%')
    }
  };

  // Speed Accuracy
  const speedAccuracy = () => {
    if (mistake < 5) {
      setSpeed(92.5);
      //   console.log("95%");
    } else if (mistake < 10) {
      setSpeed(85.5);
      // console.log('90%')
    } else if (mistake < 20) {
      setSpeed(70.5);
      // console.log('70%')
    } else {
      setSpeed(50.5);
      // console.log('50%')
    }
  };

  // This triggers the arr function
  useEffect(() => {
    arrCompare(splitTextarea, para);
  }, [textarea]);

  //   const seconds =time%60;

  const paragraphJoin = para.join("");

  // Button for the timer
  const startTest = () => {
    setIsRunning(!isRunning);
  };

  // UseEffect for the timer
  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
    accuracyType();
    speedAccuracy();
    return () => clearTimeout(timer);
  }, [isRunning, time]);

  return (
    <>
      <div>
        <div>Time:{time}s</div>
        <div>Mistakes:{mistake}</div>
        <div>
          {paragraphJoin}
          <div className="d-flex">
            {para.map((typeParagraph, index) => (
              <p
                key={index}
                className={color[index] ? color[index] : color[index]}
              >
                {typeParagraph}
              </p>
            ))}
          </div>

          {/* {paragraph.map((typeParagraph, index) => (
            <p key={index} className={color[index] ? color[index] : ""}>
              {typeParagraph}
            </p>
          ))} */}
        </div>
        <div>
          <textarea
            name="textarea"
            id=""
            cols="30"
            rows="10"
            value={textarea}
            onChange={(e) => onChange(e)}
          ></textarea>

          <div>
            <button className="btn btn-primary" onClick={startTest}>
              {!isRunning ? "Start Test" : "Stop Test"}
            </button>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <p>{!isRunning ? "" : `Accuracy ${accuracy} %`}</p>
            </div>
            <div>
              <p>{!isRunning ? "" : `Speed ${speed} wpm`}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Typetest;
