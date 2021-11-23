import React, { useState } from "react";

const Report = (gameName) => {

  let list_c = JSON.parse(localStorage.getItem('list_report' + gameName))
  let list_s = JSON.parse(localStorage.getItem('list_solution' + gameName))

  if(list_s === null){
    list_s = []
    for(let i = 0; i < 3; i++){
      list_s[i] = 0
    }
    localStorage.setItem('list_solution' + gameName, JSON.stringify(list_s));
  }

  function Counter(i) {

    if(list_c === null){
      list_c = []
      for(let i = 0; i < 20; i++){
        list_c[i] = 0
      }
      localStorage.setItem('list_report' + gameName, JSON.stringify(list_c));
    }

    const [count, setCount] = useState(list_c[i])
    
    const incrementCounter = () => {
      list_c[i] += 1;
      localStorage.setItem('list_report' + gameName, JSON.stringify(list_c));
      setCount(list_c[i])
    }

    const decrementCounter = () => {
      if(list_c[i] >= 1) {  
        list_c[i] -= 1;
        localStorage.setItem('list_report' + gameName, JSON.stringify(list_c));
        setCount(list_c[i])
      }
    }
  
    return (
      <a className="Counter"> 
        <button  onClick={(e) => {
      e.preventDefault(); decrementCounter()}}>➖</button>
        {count}
        <button onClick={(e) => {
      e.preventDefault(); incrementCounter()}}>➕</button>
      </a>
    );
  }

  function save_solution(i, data) {

    list_s[i] = data
    localStorage.setItem('list_solution' + gameName, JSON.stringify(list_s));
    
  }

  return(
    <div>
      <div className="Report">
        <div className="column-mis">
          <h3>"MIS"</h3>
        <p>Dr. Jekyll Mr. Hyde {Counter(0)}<br/>
          Drácula {Counter(1)}<br/>
          Fantasma {Counter(2)}<br/>
          Frankenstein {Counter(3)}<br/>
          Hombre Lobo {Counter(4)}<br/>
          Momia {Counter(5)}<br/>
          </p>
        </div>

        <div className="column-te">
          <h3>"TE"</h3>
          Ama de Llaves{Counter(6)}<br/>
          Conde{Counter(7)}<br/>
          Condesa{Counter(8)}<br/>
          Doncella{Counter(9)}<br/>
          Jardinero{Counter(10)}<br/>
          Mayordomo{Counter(11)}<br/>
        </div>

        <div className="column-rio">
          <h3>"RIO"</h3>
          Alcoba {Counter(12)}<br/>
          Biblioteca {Counter(13)}<br/>
          Bodega {Counter(14)}<br/>
          Cochera {Counter(15)}<br/>
          Laboratorio {Counter(16)}<br/>
          Panteón {Counter(17)}<br/>
          Salón {Counter(18)}<br/>
          Vestíbulo {Counter(19)}<br/>
        </div>

      </div>
      
      <div className="solution">
        <h3 className="solution-header">Solución</h3>
          <select className="select" defaultValue={list_s[0]} onChange={(e) => {save_solution(0, e.target.value)}}>
            <option value="0" disabled hidden>Monstruo</option>
            <option value='Dr. Jekyll Mr. Hyde'>Dr. Jekyll Mr. Hyde</option>
            <option value='Drácula'>Drácula</option>
            <option value='Fantasma'>Fantasma</option>
            <option value='Frankenstein'>Frankenstein</option>
            <option value='Hombre Lobo'>Hombre Lobo</option>
            <option value='Momia'>Momia</option>
          </select> <br/>
          <select className="select" defaultValue={list_s[1]} onChange={(e) => save_solution(1, e.target.value)}>
            <option value="1" disabled hidden>Víctima</option>
            <option value='Ama de Llaves'>Ama de Llaves</option>
            <option value='Conde'>Conde</option>
            <option value='Condesa'>Condesa</option>
            <option value='Doncella'>Doncella</option>
            <option value='Jardinero'>Jardinero</option>
            <option value='Mayordomo'>Mayordomo</option>
          </select>  <br/>
          <select className="select" defaultValue={list_s[2]} onChange={(e) => save_solution(2, e.target.value)}>
            <option value="2" disabled hidden>Recinto</option>
            <option value='Alcoba'>Alcoba</option>
            <option value='Biblioteca'>Biblioteca</option>
            <option value='Bodega'>Bodega</option>
            <option value='Cochera'>Cochera</option>
            <option value='Laboratorio'>Laboratorio</option>
            <option value='Panteón17'>Panteón</option>
            <option value='Salón'>Salón</option>
            <option value='Vestíbulo'>Vestíbulo</option>
          </select>
      </div>
    </div>
  );
}

export default Report;