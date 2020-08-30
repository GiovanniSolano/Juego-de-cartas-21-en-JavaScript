/**
 * 2C = Two of clubs
 * 2D = Two of diamons
 * 2H = Two of hearts
 * 2S = Two of spades
 */


const miModulo = (() => {

    'use strict'



    let deck = [];

    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];
    // let puntosJugador = 0,
    //     puntosComputadora = 0;

    let puntosJugadores = [];


    // referencia del html

    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');
    const puntosSmall = document.querySelectorAll('small'),
        divCartasJugadores = document.querySelectorAll('.divCartas');

    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();

        puntosJugadores = [];

        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);

        }

        puntosSmall.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    }


    // Crea un nuevo deck aleatorio
    const crearDeck = () => {
        deck = [];

        for (let i = 2; i <= 10; i++) {

            for (let tipo of tipos) {

                deck.push(i + tipo);

            }

        }

        for (let tipo of tipos) {
            for (let especial of especiales) {

                deck.push(especial + tipo);

            }
        };
        return _.shuffle(deck);

    }


    // Función para tomar una carta

    const pedirCarta = () => {

        if (deck.length === 0) {

            throw 'No hay cartas en el deck';

        }

        return deck.pop();


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

    //Turno, 0 - primer jugador, último computadora
    const acumularPuntos = (turno, carta) => {
        puntosJugadores[turno] += valorCarta(carta);
        puntosSmall[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];

    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

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


    // turno de la computadora

    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {

            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(puntosJugadores.length - 1, carta);
            crearCarta(carta, puntosJugadores.length - 1);


            // <img class="carta" src="assets/cartas/10C.png" alt=""> -

            // const imgCarta = document.createElement('img');
            // imgCarta.src = `assets/cartas/${carta}.png`;
            // imgCarta.classList.add('carta');
            // divCartasComputadora.append(imgCarta);

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();


    }


    // Eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();


        const puntosJugador = acumularPuntos(0, carta);

        // <img class="carta" src="assets/cartas/10C.png" alt=""> -

        crearCarta(carta, 0);


        // const imgCarta = document.createElement('img');
        // imgCarta.src = `assets/cartas/${carta}.png`;
        // imgCarta.classList.add('carta');
        // divCartasJugador.append(imgCarta);

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
        turnoComputadora(puntosJugadores[0]);
    });
    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
    });

    return {

        nuevoJuego: inicializarJuego

    };

})();