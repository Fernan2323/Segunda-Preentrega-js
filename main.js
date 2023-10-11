class EvaluadorCalificaciones {
    constructor() {
      this.calificaciones = [];
    }
  
    agregarCalificacion(calificacion) {
      this.calificaciones.push(parseFloat(calificacion));
    }
  
    buscarCalificacionMasAlta() {
      if (this.calificaciones.length === 0) {
        return null;
      }
      return Math.max(...this.calificaciones);
    }
  
    evaluarCalificaciones() {
      do {
        let cal = prompt("Ingrese su calificación");
  
        if (cal === null) {
          break;
        }
  
        this.agregarCalificacion(cal);
  
        if (cal >= 0 && cal <= 10) {
          if (cal < 3) {
            alert("Recursar");
          } else if (cal < 5) {
            alert("Recuperar");
          } else if (cal < 8) {
            alert("Suficiente, Aprueba");
          } else if (cal < 9) {
            alert("Sobresaliente, Aprueba");
          } else {
            alert("Excelente, Aprueba");
          }
        } else {
          alert("Error: Ingrese una calificación dentro del rango 0-10");
        }
      } while (true);
    }
  }
  
  const evaluador = new EvaluadorCalificaciones();
  evaluador.evaluarCalificaciones();
  
  const calificacionMasAlta = evaluador.buscarCalificacionMasAlta();
  if (calificacionMasAlta !== null) {
    alert("La calificación más alta es: " + calificacionMasAlta);
  } else {
    alert("No se ingresaron calificaciones.");
  }
  