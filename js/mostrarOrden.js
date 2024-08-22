document.addEventListener('DOMContentLoaded', () => {
    const btnReagendadas = document.getElementById('btnReagendadas');
    const btnAsignadas = document.getElementById('btnAsignadas');
    const btnCumplidas = document.getElementById('btnCumplidas');
    const btnCanceladas = document.getElementById('btnCanceladas');
    const ordenesTbody = document.getElementById('ordenes-tbody');

    const obtenerOrdenes = () => {
        return JSON.parse(localStorage.getItem('ordenes')) || [];
    };

    const obtenerTareas = () => {
        return JSON.parse(localStorage.getItem('tareas')) || [];
    };

    const guardarOrdenes = (ordenes) => {
        localStorage.setItem('ordenes', JSON.stringify(ordenes));
    };

    const mostrarOrdenesFiltradas = (estado) => {
        const ordenes = obtenerOrdenes();
        const tareas = obtenerTareas();
        ordenesTbody.innerHTML = '';

        console.log(`Ordenes con estado: ${estado}`);

        const ordenesFiltradas = ordenes.filter(orden => orden.estado === estado);

        ordenesFiltradas.forEach(orden => {
            const tarea = tareas.find(t => t.descripcion === orden.tarea);
            console.log(`Orden encontrada: ${JSON.stringify(orden)}`);
            console.log(`Tarea asociada: ${JSON.stringify(tarea)}`);

            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${orden.idOrden}</td>
                <td>${tarea ? tarea.descripcion : 'Descripción no disponible'}</td>
                <td>${orden.despachante}</td>
                <td>${orden.operador}</td>
                ${estado === 'reagendada' ? `
                <td>
                    <button class="btn btn-danger btn-sm btnEliminar">Eliminar</button>
                    <button class="btn btn-warning btn-sm btnReasignar">Reasignar</button>
                </td>
                ` : ''}
            `;
            ordenesTbody.appendChild(fila);

            if (estado === 'reagendada') {
                const btnEliminar = fila.querySelector('.btnEliminar');
                const btnReasignar = fila.querySelector('.btnReasignar');

                btnEliminar.addEventListener('click', () => eliminarOrden(orden.idOrden));
                btnReasignar.addEventListener('click', () => reasignarOrden(orden.idOrden));
            }
        });

        if (ordenesFiltradas.length === 0) {
            ordenesTbody.innerHTML = '<tr><td colspan="5" class="text-center">No hay ordenes con este estado.</td></tr>';
        }
    };

    const eliminarOrden = (idOrden) => {
        const ordenes = obtenerOrdenes();
        const ordenIndex = ordenes.findIndex(orden => orden.idOrden === idOrden);

        if (ordenIndex !== -1) {
            Swal.fire({
                title: "¿Estas seguro?",
                text: "Estas por cancelar a orden",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, eliminar"
            }).then((result) => {
                if (result.isConfirmed) {
                    // Cambiar el estado a 'cancelada' y eliminar el operador
                    ordenes[ordenIndex].estado = 'cancelada';
                    ordenes[ordenIndex].operador = ''; // Eliminar el operador asignado

                    // Guardar las ordenes actualizadas
                    guardarOrdenes(ordenes);

                    // Mostrar mensaje de confirmación
                    Swal.fire({
                        title: "Eliminada",
                        text: "La orden paso a cancelada",
                        icon: "success"
                    });

                    // Actualizar la vista
                    mostrarOrdenesFiltradas('reagendada');
                }
            });
        }
    };

    const reasignarOrden = (idOrden) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Deseas reasignar esta orden?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, reasignar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const ordenes = obtenerOrdenes();
                const ordenIndex = ordenes.findIndex(orden => orden.idOrden === idOrden);
                if (ordenIndex !== -1) {
                    ordenes[ordenIndex].estado = 'asignada';
                    guardarOrdenes(ordenes);
                    mostrarOrdenesFiltradas('reagendada');
                    Swal.fire(
                        'Reasignada!',
                        'La orden ha sido reasignada.',
                        'success'
                    );
                }
            }
        });
    };
    btnReagendadas.addEventListener('click', () => mostrarOrdenesFiltradas('reagendada'));
    btnAsignadas.addEventListener('click', () => mostrarOrdenesFiltradas('asignada'));
    btnCumplidas.addEventListener('click', () => mostrarOrdenesFiltradas('cumplida'));
    btnCanceladas.addEventListener('click', () => mostrarOrdenesFiltradas('cancelada'));

    mostrarOrdenesFiltradas('asignada');
});
