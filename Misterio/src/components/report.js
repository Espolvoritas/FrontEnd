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
      <a className="Counter"> 
        <button  onClick={(e) => {
      e.preventDefault(); decrementCounter()}}>➖</button>
        {counter}
        <button onClick={(e) => {
      e.preventDefault(); incrementCounter()}}>➕</button>
      </a>
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
      
      <div className="solution">
        <h3 className="solution-header">Solución</h3>
          <select className="select" defaultValue={'DEFAULT'}>
            <option value='DEFAULT' disabled hidden>Monstruo</option>
            <option>Dr. Jekyll Mr. Hyde</option>
            <option>Drácula</option>
            <option>Fantasma</option>
            <option>Frankenstein</option>
            <option>Hombre Lobo</option>
            <option>Momia</option>
          </select> <br/>
          <select className="select" defaultValue={'DEFAULT'}>
            <option value='DEFAULT' disabled hidden>Víctima</option>
            <option>Ama de Llaves</option>
            <option>Conde</option>
            <option>Condesa</option>
            <option>Doncella</option>
            <option>Jardinero</option>
            <option>Mayordomo</option>
          </select>  <br/>
          <select className="select" defaultValue={'DEFAULT'}>
            <option value='DEFAULT' disabled hidden>Recinto</option>
            <option>Alcoba</option>
            <option>Biblioteca</option>
            <option>Bodega</option>
            <option>Cochera</option>
            <option>Laboratorio</option>
            <option>Panteón</option>
            <option>Salón</option>
            <option>Vestíbulo</option>
          </select>
      </div>
    </div>
  );
}

export default Report;