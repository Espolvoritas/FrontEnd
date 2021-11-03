import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";


const Rules = () => {
    return (
        <Popup 
            trigger={<button className="rules-button">❔</button>}
            modal
        >
            {close => (
                <div className="rules-content">
                    <button className="close-rules" onClick={close}>✖</button> <br/>
                    <p className="rules-text">
                    <h3>¡A JUGAR!</h3>
                    El detective deberá avanzar hacia un recinto del tablero
                    que falte en su informe. Una vez que caiga allí deberá
                    sospechar completando con la víctima y el monstruo que desee.

                    Ejemplo: Si el recinto es el panteón, el monstruo es Drácula
                    y la víctima es el jardinero, la sospecha que tenés que
                    formular al jugador de tu derecha es: “Drácula asesinó al
                    jardinero en el panteón”.
                    Una vez hecha la sospecha, el jugador de la derecha
                    debe verificar entre sus cartas si tiene una o más de las
                    cartas mencionadas. Si tuviera una o más, deberá mostrarle
                    una sola carta.
                    
                    Si el jugador de la derecha no tiene ninguna carta de
                    las mencionadas en la sospecha, pasará la pregunta al
                    siguiente jugador y así sucesivamente hasta que se haya
                    mostrado una de las tres cartas a quien realizó la sospecha.
                    Una vez mostrada, el jugador marcará en su informe
                    el dato recibido y pasará el dado al jugador siguiente.
                    Cada jugador actúa de la misma manera, diciendo sus
                    sospechas en cada turno hasta descubrir a la víctima, al
                    monstruo y el lugar del hecho.
                    
                    <h3>FIN DE LA PARTIDA</h3>
                    Cada jugador anotará en su informe las averiguaciones
                    que haya conseguido. Según la información obtenida
                    irá eliminando monstruos, víctimas y recintos hasta que
                    haya quedado uno de cada uno. 
                    Por ejemplo: 
                    MONSTRUO: MOMIA / VÍCTIMA: CONDE / RECINTO: BODEGA <br/>
                    Si el detective está seguro de que esas son las tres cartas
                    del sobre MISTERIO, en su turno podrá abrir el sobre y
                    develar la verdadera información del crimen sin mostrarla
                    a los demás. Si la solución coincide con el contenido del
                    sobre, deberá mostrarla a los demás jugadores y habrá
                    ganado la partida. En caso contrario, devolverá las cartas
                    al sobre y quedará eliminado para interrogar, aunque deberá
                    continuar en el juego para responder por sus cartas.<br/>

                    ¡Atención! Podés decir tu sospecha preguntando por las cartas
                    que ya tenés para despistar al resto de los jugadores,
                    pero nunca decir que no tenés una carta y tenerla en verdad.

                    <h3>CASILLAS ESPECIALES</h3>

                    LA TRAMPA: si un jugador cae en ella deberá quedarse un turno sin
                    avanzar, saliendo por la misma, o por otra que desee. <br/>
                    
                    COBRA, ESCORPIÓN, TARÁNTULA Y VAMPIRO:
                    Si un jugador cae en una, podrá pasar a otra con el mismo dibujo
                    para acercarse al recinto que le convenga.
                    </p>

                </div>
            )}
        </Popup>
        )


}

export default Rules;