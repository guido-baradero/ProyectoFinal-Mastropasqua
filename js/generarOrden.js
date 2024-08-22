/*document.addEventListener('DOMContentLoaded', () => {
    // Cargar datos de operadores y tareas
    const cargarDatos = async () => {
        try {
            const operadores = JSON.parse(localStorage.getItem('usuarios')) || [];
            const tareas = JSON.parse(localStorage.getItem('tareas')) || [];

            // Filtrar operadores con rol 'operador'
            const operadoresFiltrados = operadores.filter(op => op.alcance === 'operador');
            const selectOperadores = document.getElementById('operador');
            const selectTareas = document.getElementById('tarea');

            // Llenar el select de operadores
            operadoresFiltrados.forEach(op => {
                let option = document.createElement('option');
                option.value = op.idUsuario;
                option.textContent = `${op.nombre} ${op.apellido}`;
                selectOperadores.appendChild(option);
            });

            // Llenar el select de tareas
            tareas.forEach(t => {
                let option = document.createElement('option');
                option.value = t.idTarea; // Asegúrate de que cada tarea tenga un id único
                option.textContent = t.descripcion;
                selectTareas.appendChild(option);
            });

            console.log('Datos de operadores y tareas cargados en los selects.');

        } catch (error) {
            console.error('Error al cargar operadores o tareas:', error);
        }
    };

    cargarDatos();

    // Función para generar un ID incremental para las órdenes
    const generarIdOrden = () => {
        let ordenes = JSON.parse(localStorage.getItem('ordenes')) || [];
        return ordenes.length ? (ordenes.length + 1).toString() : '1';
    };

    // Actualizar la vista previa de la orden
    const actualizarVistaPrevia = () => {
        const operadorId = document.getElementById('operador').value;
        const tareaId = document.getElementById('tarea').value;
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const tareas = JSON.parse(localStorage.getItem('tareas')) || [];

        const operador = usuarios.find(u => u.idUsuario === operadorId);
        const tarea = tareas.find(t => t.idTarea === tareaId);

        // Actualizar la tarjeta de vista previa
        if (operador) {
            document.getElementById('nombreUsuario').textContent = `${operador.nombre} ${operador.apellido}`;
        }
        if (tarea) {
            document.getElementById('tituloTarea').textContent = tarea.descripcion;
            document.getElementById('descripcionTarea').textContent = tarea.detalle || 'Descripción no disponible';
        }
    };

    // Asignar eventos de cambio a los selects para actualizar la vista previa
    document.getElementById('operador').addEventListener('change', actualizarVistaPrevia);
    document.getElementById('tarea').addEventListener('change', actualizarVistaPrevia);

    // Manejar la creación de una nueva orden
    document.getElementById('btnAsignarNuevaOrden').addEventListener('click', () => {
        const operadorId = document.getElementById('operador').value;
        const tareaId = document.getElementById('tarea').value;

        if (!operadorId || !tareaId) {
            alert('Por favor, selecciona un operador y una tarea.');
            return;
        }

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        let ordenes = JSON.parse(localStorage.getItem('ordenes')) || [];

        const operador = usuarios.find(u => u.idUsuario === operadorId);
        const tarea = tareas.find(t => t.idTarea === tareaId);

        const nuevaOrden = {
            idOrden: generarIdOrden(),
            tarea: tarea.descripcion,
            estado: 'asignada',
            despachante: 'Nombre del Despachante', // Aquí debes colocar el nombre del despachante actual
            operador: `${operador.nombre} ${operador.apellido}`
        };

        // Guardar la nueva orden en el localStorage
        ordenes.push(nuevaOrden);
        localStorage.setItem('ordenes', JSON.stringify(ordenes));
        window.location.reload();

        console.log('Nueva orden creada y guardada:', nuevaOrden);
    });

});
*/


document.addEventListener('DOMContentLoaded', () => {
    // Cargar datos de operadores y tareas
    const cargarDatos = async () => {
        try {
            const operadores = JSON.parse(localStorage.getItem('usuarios')) || [];
            const tareas = JSON.parse(localStorage.getItem('tareas')) || [];

            // Filtrar operadores con rol 'operador'
            const operadoresFiltrados = operadores.filter(op => op.alcance === 'operador');
            const selectOperadores = document.getElementById('operador');
            const selectTareas = document.getElementById('tarea');

            // Llenar el select de operadores
            operadoresFiltrados.forEach(op => {
                let option = document.createElement('option');
                option.value = op.idUsuario;
                option.textContent = `${op.nombre} ${op.apellido}`;
                selectOperadores.appendChild(option);
            });

            // Llenar el select de tareas
            tareas.forEach(t => {
                let option = document.createElement('option');
                option.value = t.idTarea; // Asegúrate de que cada tarea tenga un id único
                option.textContent = t.descripcion;
                selectTareas.appendChild(option);
            });

            console.log('Datos de operadores y tareas cargados en los selects.');

        } catch (error) {
            console.error('Error al cargar operadores o tareas:', error);
        }
    };

    cargarDatos();

    // Función para generar un ID incremental para las órdenes
    const generarIdOrden = () => {
        let ordenes = JSON.parse(localStorage.getItem('ordenes')) || [];
        return ordenes.length ? (ordenes.length + 1).toString() : '1';
    };

    // Obtener el nombre y apellido del despachante logueado
    const obtenerDespachanteLogueado = () => {
        const usuarioLogueado = localStorage.getItem('usuarioLogueado');
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const despachante = usuarios.find(usuario => usuario.idUsuario === usuarioLogueado);
        return `${despachante?.nombre} ${despachante?.apellido}` || 'Despachante Desconocido';
    };

    // Actualizar la vista previa de la orden
    const actualizarVistaPrevia = () => {
        const operadorId = document.getElementById('operador').value;
        const tareaId = document.getElementById('tarea').value;
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const tareas = JSON.parse(localStorage.getItem('tareas')) || [];

        const operador = usuarios.find(u => u.idUsuario === operadorId);
        const tarea = tareas.find(t => t.idTarea === tareaId);

        // Actualizar la tarjeta de vista previa
        if (operador) {
            document.getElementById('nombreUsuario').textContent = `${operador.nombre} ${operador.apellido}`;
        }
        if (tarea) {
            document.getElementById('tituloTarea').textContent = tarea.descripcion;
            document.getElementById('descripcionTarea').textContent = tarea.detalle || 'Descripción no disponible';
        }
    };

    // Asignar eventos de cambio a los selects para actualizar la vista previa
    document.getElementById('operador').addEventListener('change', actualizarVistaPrevia);
    document.getElementById('tarea').addEventListener('change', actualizarVistaPrevia);

    // Manejar la creación de una nueva orden
    document.getElementById('btnAsignarNuevaOrden').addEventListener('click', () => {
        const operadorId = document.getElementById('operador').value;
        const tareaId = document.getElementById('tarea').value;
        const comentario = document.getElementById('comentario').value; // Asumiendo que hay un input para el comentario

        if (!operadorId || !tareaId) {
            alert('Por favor, selecciona un operador y una tarea.');
            return;
        }

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        let ordenes = JSON.parse(localStorage.getItem('ordenes')) || [];

        const operador = usuarios.find(u => u.idUsuario === operadorId);
        const tarea = tareas.find(t => t.idTarea === tareaId);
        const despachanteNombre = obtenerDespachanteLogueado();

        const nuevaOrden = {
            idOrden: generarIdOrden(),
            tarea: tarea.descripcion,
            estado: 'asignada',
            despachante: despachanteNombre,
            operador: `${operador.nombre} ${operador.apellido}`,
            comentario: comentario || '' // Guardar el comentario ingresado
        };

        // Guardar la nueva orden en el localStorage
        ordenes.push(nuevaOrden);
        localStorage.setItem('ordenes', JSON.stringify(ordenes));
        window.location.reload();

        console.log('Nueva orden creada y guardada:', nuevaOrden);
    });

});
