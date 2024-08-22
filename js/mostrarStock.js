document.addEventListener('DOMContentLoaded', () => {
    // Obtener los elementos del DOM
    const btnStock = document.getElementById('btnStock');
    const stockContainer = document.getElementById('stock-container');
    const stockTbody = document.getElementById('stock-tbody');

    // Función para cargar y mostrar el stock de materiales
    function mostrarStock() {
        // Obtener la lista de materiales del localStorage
        const materiales = JSON.parse(localStorage.getItem('materiales')) || [];

        // Limpiar el contenido actual de la tabla
        stockTbody.innerHTML = '';

        // Agregar los materiales a la tabla
        materiales.forEach(material => {
            const row = document.createElement('tr');

            // Cambiar el color segun la cantidad
            const buttonColor = material.cantidad <= material.cantidadMin ? 'btn-danger' : 'btn-secondary';

            row.innerHTML = `
                <td>${material.idProducto}</td>
                <td>${material.material}</td>
                <td>${material.cantidadMin}</td>
                <td>${material.cantidad}</td>
                <td>
                    <button class="btn ${buttonColor} btn-reponer" data-id="${material.idProducto}">Reponer Stock</button>
                </td>
            `;
            stockTbody.appendChild(row);
        });

        // Mostrar stock
        stockContainer.classList.remove('d-none');

        // Agregar el evento de clic a todos los botones de reponer stock
        const botonesReponer = document.querySelectorAll('.btn-reponer');
        botonesReponer.forEach(boton => {
            boton.addEventListener('click', (event) => {
                // Obtener el ID del material
                const materialId = event.target.getAttribute('data-id');

                // Buscar el material en el array y actualizar su cantidad
                const materiales = JSON.parse(localStorage.getItem('materiales')) || [];
                const material = materiales.find(m => m.idProducto == materialId);

                if (material) {
                    material.cantidad += 100;

                    // Guardar los cambios en localStorage
                    localStorage.setItem('materiales', JSON.stringify(materiales));

                    // Actualizar la tabla
                    mostrarStock();
                }
            });
        });
    }

    // Click boton stock
    btnStock.addEventListener('click', () => {
        mostrarStock();
    });
    // Ocultar stock
    document.addEventListener('click', (event) => {
        if (!event.target.closest('#stock-container') && !event.target.closest('#btnStock')) {
            stockContainer.classList.add('d-none');
        }
    });
});