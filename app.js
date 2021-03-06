new Vue({
  el: "#app",
  data: {
    saludJugador: 100,
    saludMonstruo: 100,
    hayUnaPartidaEnJuego: false,
    turnos: [], //es para registrar los eventos de la partida
    esJugador: false,
    rangoAtaque: [3, 10],
    rangoAtaqueEspecial: [10, 20],
    rangoAtaqueDelMonstruo: [5, 12],
  },

  methods: {
    getSalud(salud) {
      return `${salud}%`;
    },
    empezarPartida: function () {
      this.hayUnaPartidaEnJuego = true;
      this.saludJugador = 100;
      this.saludMonstruo = 100;
    },
    atacar: function () {
      const herida = this.calcularHeridas(3, 10);
      this.saludMonstruo -= herida;
      this.turnos.unshift({
        esJugador: true,
        texto: "El jugador golpea al monstruo por " + herida,
      });
      if (this.verificarGanador()) {
        return;
      }
      this.ataqueDelMonstruo();
    },

    ataqueEspecial: function () {
      const herida = this.calcularHeridas(10, 20);
      this.saludMonstruo -= herida;
      this.turnos.unshift({
        esJugador: true,
        texto:
          "El jugador golpea con un ataque especial al monstruo por " + herida,
      });
      if (this.verificarGanador()) {
        return;
      }
      this.ataqueDelMonstruo();
    },

    curar: function () {
      if (this.saludJugador <= 90) {
        this.saludJugador += 10;
      } else {
        this.saludJugador = 100;
      }
      this.turnos.unshift({
        esJugador: true,
        texto:
          "El jugador se cura incrementÃ³ su salud y su valor actual es  " +
          this.saludJugador,
      });
      this.ataqueDelMonstruo();
    },

    registrarEvento(evento) {},

    terminarPartida: function () {
      this.hayUnaPartidaEnJuego = false;
    },

    ataqueDelMonstruo: function () {
      const herida = this.calcularHeridas(5, 12);
      this.saludJugador -= herida;
      this.turnos.unshift({
        esJugador: falso,
        texto: "El monstruo golpea al monstruo por " + herida,
      });
      this.verificarGanador();
    },

    calcularHeridas: function (min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    verificarGanador: function () {
      if (this.saludMonstruo <= 0) {
        if (confirm("Ganaste, Jugar de nuevo?")) {
          this.empezarPartida();
        } else {
          this.hayUnaPartidaEnJuego = false;
        }
        return true;
      } else if (this.saludJugador <= 0) {
        if (confirm("Perdiste, Jugar de nuevo?")) {
          this.empezarPartida();
        } else {
          this.hayUnaPartidaEnJuego = false;
        }
        return true;
      }
      return false;
    },
    cssEvento(turno) {
      //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acÃ¡ queda mucho mas entendible en el codigo HTML.
      return {
        "player-turno": turno.esJugador,
        "monster-turno": !turno.esJugador,
      };
    },
  },
});
