/**
 * 2C = Two of clubs
 * 2D = Two of diamons
 * 2H = Two of hearts
 * 2S = Two of spades
 */


let deck = [];

const tipos = ['C', 'D', 'H', 'S'];

const especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0,
    puntosComputadora = 0;


// referencia del html

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const puntosSmall = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-carta');
const divCartasComputadora = document.querySelector('#computadora-carta');

// Crea un nuevo deck aleatorio
const crearDeck = () => {

    for (let i = 2; i <= 10; i++) {

        for (let tipo of tipos) {

            deck.push(i + tipo);

        }

    }

    for (let tipo of tipos) {
        for (let especial of especiales) {

            deck.push(especial + tipo);

        }
    }
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;

}

// Función para tomar una carta

const pedirCarta = () => {

    if (deck.length === 0) {

        throw 'No hay cartas en el deck';

    }
    const carta = deck.pop();

    return carta;


}

const valorCarta = (carta) => {


    // Regresa un nuevo string cortado
    const valor = carta.substring(0, carta.length - 1);


    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10 :
        valor * 1;


    // let puntos = 0;

    // if (isNaN(valor)) {
    //     // No es un número
    //     puntos = (valor === 'A') ? 11 : 10;

    // } else {
    //     // Es un número
    //     puntos = Number(valor);
    // }
}

// turno de la computadora

const turnoComputadora = (puntosMinimos) => {

    do {

        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosSmall[1].innerText = puntosComputadora;

        // <img class="carta" src="assets/cartas/10C.png" alt=""> -

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }



    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));


    setTimeout(() => {

        if (puntosComputadora === puntosMinimos) {
            alert('Hubo un empate!!!');
        } else if (puntosMinimos > 21) {
            alert('Computadora gana');
        } else if (puntosComputadora > 21) {
            alert('Jugador Gana');
        } else {
            alert('Computadora Gana');
        }


    }, 10);


}

crearDeck();

// Eventos
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosSmall[0].innerText = puntosJugador;

    // <img class="carta" src="assets/cartas/10C.png" alt=""> -

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        console.warn('Perdiste, te pasaste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn('Ganaste, obtuviste 21');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }




});

btnDetener.addEventListener('click', () => {

    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);


});

btnNuevo.addEventListener('click', () => {

    console.clear();

    deck = [];
    deck = crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;
    puntosSmall[0].innerText = 0;
    puntosSmall[1].innerText = 0;

    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;

});