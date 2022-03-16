import { useState, useEffect } from "react"
import useSound from "use-sound";
import play from "../assets/play.mp3"
import correct from "../assets/correct.mp3"
import wrong from "../assets/wrong.mp3"

export default function Handsome({ data, setStop, questionNumber, setQuestionNumber }) {

    const [question, setQuestion] = useState(null);
    const [selectAsnwer, setSelectAnswer] = useState(null);
    const [className, setClassName] = useState("answer");
    const [letsPlay] = useSound(play);
    const [correctAnswer] = useSound(correct);
    const [wrongAnswer] = useSound(wrong);

    useEffect(() =>{
        letsPlay();
    }, [letsPlay]);

    useEffect(() => {
        setQuestion(data[questionNumber - 1])
    }, [data, questionNumber])

    const delay = (duration, callback) => {
        setTimeout(() => {
            callback();
        }, duration);
    };

    const handleClick = (a) => {
        setSelectAnswer(a);
        setClassName("answer active")
        delay(3000, () => 
            setClassName(a.correct ? "answer correct" : "answer wrong")
        );
        delay(5000, () => {
            if (a.correct) {
                correctAnswer();
                delay (1000, () => {
                    setQuestionNumber((prev) => prev + 1);
                    setSelectAnswer(null);
                })
            }
            else {
                wrongAnswer();
                delay(1500, () => {
                    setStop(true);
                });
            }
        });
    };

    return (
        <div className="handsome">
            <div className="questions">{question?.question}</div>
            <div className="answers">
                {question?.answers.map((a) => 
                   <div className= {selectAsnwer === a ? className : "answer"} onClick = {() => {handleClick(a)}}>{a.text}</div> 
                 )}
            </div>            
        </div>
    )
}
