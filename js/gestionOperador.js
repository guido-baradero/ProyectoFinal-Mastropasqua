document.addEventListener('DOMContentLoaded', () => {
    // Cargar el usuario logueado
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (!usuarioLogueado) {
        console.error('No hay usuario logueado.');
        return;
    }

    // Cargar las ordenes
    let ordenes = JSON.parse(localStorage.getItem('ordenes')) || [];

    // Filtrar las ordenes por el operador logueado
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const operador = usuarios.find(usuario => usuario.idUsuario === usuarioLogueado);
    const operadorNombre = `${operador?.nombre} ${operador?.apellido}`;
    const ordenesOperador = ordenes.filter(orden => orden.operador === operadorNombre && orden.estado === 'asignada');

    // Mostrar las ordenes en la pantalla
    const contenedorOrdenes = document.getElementById('ordenesContenedor');
    if (!contenedorOrdenes) {
        console.error('Contenedor de órdenes no encontrado.');
        return;
    }

    // Inicializa el modal de Bootstrap
    const modalElement = document.getElementById('modalConsumoMateriales');
    const modal = new bootstrap.Modal(modalElement);

    // Seleccionar botones del modal
    const btnClose = modalElement.querySelector('.btn-secondary');
    const btnSaveChanges = modalElement.querySelector('.btn-primary');

    // Variable para almacenar el ID de la orden a actualizar
    let ordenIdActualizar = null;

    // Funcion para mostrar el modal y almacenar el ID de la orden a actualizar
    function mostrarModal(idOrden) {
        ordenIdActualizar = idOrden;
        modal.show();
    }

    // Manejar los clics en los botones
    contenedorOrdenes.addEventListener('click', (event) => {
        const idOrden = event.target.closest('.card')?.dataset.ordenId;
        if (event.target.classList.contains('btnCumplirOrden')) {
            mostrarModal(idOrden);
        } else if (event.target.classList.contains('btnReagendar')) {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "¿Deseas reagendar esta orden?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, reagendar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    actualizarEstadoOrden(idOrden, 'reagendada');
                }
            });
        }
    });

    // Manejar clic en Cerrar
    btnClose.addEventListener('click', () => {
        modal.hide();
    });

    // Manejar clic en Guardar cambios
    btnSaveChanges.addEventListener('click', () => {
        if (ordenIdActualizar !== null) {
            actualizarEstadoOrden(ordenIdActualizar, 'cumplida');
            modal.hide();
        }
    });

    function actualizarEstadoOrden(idOrden, nuevoEstado) {
        // Actualizar el estado de la orden en el array de ordenes
        ordenes = ordenes.map(orden => {
            if (orden.idOrden === idOrden) {
                return { ...orden, estado: nuevoEstado };
            }
            return orden;
        });

        // Guardar las ordenes actualizadas en localStorage
        localStorage.setItem('ordenes', JSON.stringify(ordenes));

        // Eliminar la tarjeta correspondiente del DOM
        const card = document.querySelector(`.card[data-orden-id='${idOrden}']`);
        if (card) {
            card.remove();
        }

        console.log(`Orden ${idOrden} actualizada a ${nuevoEstado} y removida del DOM.`);
    }

    // Inicializar las tarjetas de ordenes
    ordenesOperador.forEach(orden => {
        const card = document.createElement('div');
        card.className = 'card mb-3';
        card.dataset.ordenId = orden.idOrden;

        // Definir el color del header segun el estado de la orden
        let headerColor = '';
        switch (orden.estado) {
            case 'cumplida':
                headerColor = 'bg-success';
                break;
            case 'reagendada':
                headerColor = 'bg-warning';
                break;
            case 'asignada':
                headerColor = 'bg-primary';
                break;
            case 'cancelada':
                headerColor = 'bg-danger';
                break;
        }

        card.innerHTML = `
            <div class="card-header ${headerColor}">
                Número de orden: ${orden.idOrden}
            </div>
            <div class="card-body">
                <h5 class="card-title">${orden.tarea || 'Sin tarea'}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Asignada por: ${orden.despachante || 'Desconocido'}</li>
                <li class="list-group-item">${orden.comentario || 'Sin comentario'}</li>
            </ul>
            <div class="card-body">
                <button class="btn btn-secondary btnCumplirOrden">Cumplir</button>
                <button class="btn btn-warning btnReagendar">Reagendar</button>
            </div>
        `;

        // Agregar la tarjeta al contenedor
        contenedorOrdenes.appendChild(card);
    });
});