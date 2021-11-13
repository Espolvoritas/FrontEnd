import React, { useState, useRef } from "react";

const Report = () => {

  function Counter() {
    const counterAux = useRef(0);
    const [counter, setCounter] = useState(counterAux.current);
    const incrementCounter = () => {
      counterAux.current += 1;
      setCounter(counterAux.current);
    }
    let decrementCounter = () => {
      counterAux.current -= 1;
      setCounter(counterAux.current);
    }
  
    if(counter<=1) {
      decrementCounter = () => setCounter(0);
    }
  
    return (
      <text className="Counter"> 
        <button  onClick={(e) => {
      e.preventDefault(); decrementCounter()}}>➖</button>
        {counter}
        <button onClick={(e) => {
      e.preventDefault(); incrementCounter()}}>➕</button>
      </text>
    );
  }

  return(
    <div>
    <div className="Report">
      <div className="column-mis">
        <h3>"MIS"</h3>
       <p>Dr. Jekyll Mr. Hyde {Counter()}<br/>
        Drácula {Counter()}<br/>
        Fantasma {Counter()}<br/>
        Frankenstein {Counter()}<br/>
        Hombre Lobo {Counter()}<br/>
        Momia {Counter()}<br/>
        </p>
      </div>

      <div className="column-te">
        <h3>"TE"</h3>
        Ama de Llaves{Counter()}<br/>
        Conde{Counter()}<br/>
        Condesa{Counter()}<br/>
        Doncella{Counter()}<br/>
        Jardinero{Counter()}<br/>
        Mayordomo{Counter()}<br/>
      </div>

      <div className="column-rio">
        <h3>"RIO"</h3>
        Alcoba {Counter()}<br/>
        Biblioteca {Counter()}<br/>
        Bodega {Counter()}<br/>
        Cochera {Counter()}<br/>
        Laboratorio {Counter()}<br/>
        Panteón {Counter()}<br/>
        Salón {Counter()}<br/>
        Vestíbulo {Counter()}<br/>
      </div>
    </div>
    

    </div>
  );
}

export default Report;