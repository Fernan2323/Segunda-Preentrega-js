class EvaluadorCalificaciones {
  constructor() {
    this.calificaciones = [];
  }

  agregarCalificacion(calificacion) {
    this.calificaciones.push(parseFloat(calificacion));
    this.guardarCalificacionesEnLocalStorage(); // Almacenar en Local Storage
  }

  buscarCalificacionMasAlta() {
    if (this.calificaciones.length === 0) {
      return null;
    }
    return Math.max(...this.calificaciones);
  }

  calcularPromedioCalificaciones() {
    if (this.calificaciones.length === 0) {
      return null;
    }
    const sum = this.calificaciones.reduce((acc, calificacion) => acc + calificacion, 0);
    return sum / this.calificaciones.length;
  }

  cargarCalificacionesDesdeLocalStorage() {
    const calificacionesStr = localStorage.getItem('calificaciones');
    if (calificacionesStr) {
      this.calificaciones = JSON.parse(calificacionesStr);
    }
  }

  guardarCalificacionesEnLocalStorage() {
    localStorage.setItem('calificaciones', JSON.stringify(this.calificaciones));
  }
}

const evaluador = new EvaluadorCalificaciones();

document.addEventListener('DOMContentLoaded', () => {
  const listaCalificaciones = document.getElementById('listaCalificaciones');
  const agregarCalificacionBtn = document.getElementById('agregarCalificacion');
  const calificacionMasAltaBtn = document.getElementById('calificacionMasAlta');
  const mostrarCalificacionesBtn = document.getElementById('mostrarCalificaciones');
  const calcularPromedioBtn = document.getElementById('calcularPromedio');

  // Evento para agregar una calificacion
  agregarCalificacionBtn.addEventListener('click', () => {
    const calInput = document.createElement('input');
    calInput.type = 'text';
    calInput.placeholder = 'Ingrese su calificación';
    
    const agregarBtn = document.createElement('button');
    agregarBtn.textContent = 'Agregar';
    agregarBtn.addEventListener('click', () => {
      const cal = parseFloat(calInput.value);
      if (!isNaN(cal) && cal >= 0 && cal <= 10) {
        evaluador.agregarCalificacion(cal);
        mostrarCalificacionEnLista(cal, listaCalificaciones);
        calInput.value = '';  
      } else {
        alert("Error: Ingrese una calificación válida (0-10).");
      }
    });

    const container = document.createElement('div');
    container.appendChild(calInput);
    container.appendChild(agregarBtn);
    listaCalificaciones.appendChild(container);
  });

  // Evento para buscar la calificacion mas alta
  calificacionMasAltaBtn.addEventListener('click', () => {
    const calificacionMasAlta = evaluador.buscarCalificacionMasAlta();
    if (calificacionMasAlta !== null) {
      alert("La calificación más alta es: " + calificacionMasAlta);
    } else {
      alert("No se ingresaron calificaciones.");
    }
  });

  // Evento para mostrar las calificaciones almacenadas en Local Storage
  mostrarCalificacionesBtn.addEventListener('click', () => {
    const calificacionesGuardadas = JSON.parse(localStorage.getItem('calificaciones'));
    if (calificacionesGuardadas && calificacionesGuardadas.length > 0) {
      alert("Calificaciones almacenadas: " + calificacionesGuardadas.join(', '));
    } else {
      alert("No se encontraron calificaciones almacenadas.");
    }
  });

  // Evento para calcular el promedio de las calificaciones
  calcularPromedioBtn.addEventListener('click', () => {
    const promedio = evaluador.calcularPromedioCalificaciones();
    if (promedio !== null) {
      alert("El promedio de las calificaciones ingresadas es: " + promedio.toFixed(2));
    } else {
      alert("No se ingresaron calificaciones.");
    }
  });

  // Cargar calificaciones desde Local Storage al cargar la pagina
  evaluador.cargarCalificacionesDesdeLocalStorage();
  evaluador.calificaciones.forEach(calificacion => {
    mostrarCalificacionEnLista(calificacion, listaCalificaciones);
  });
});

// Funcion para mostrar una calificacion en la lista
function mostrarCalificacionEnLista(calificacion, lista) {
  const listItem = document.createElement('li');
  listItem.textContent = `Calificación: ${calificacion}`;
  lista.appendChild(listItem);
}
