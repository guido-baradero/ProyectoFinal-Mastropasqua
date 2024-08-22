document.addEventListener('DOMContentLoaded', () => {
    const modalElement = document.getElementById('modalConsumoMateriales');
    const modal = new bootstrap.Modal(modalElement);
    const materialSelect = document.getElementById('material');
    const cantidadInput = document.getElementById('cantidad');
    const btnGuardarCambios = document.getElementById('btnGuardarCambios');
    let materiales = JSON.parse(localStorage.getItem('materiales')) || [];

    // Función para cargar los materiales en el select
    function cargarMateriales() {
        materialSelect.innerHTML = '<option selected disabled>Selecciona un material</option>';
        materiales.forEach(material => {
            if (material.cantidad > 0) {
                const option = document.createElement('option');
                option.value = material.idProducto;
                option.textContent = `${material.material} (${material.cantidad} disponibles)`;
                materialSelect.appendChild(option);
            }
        });
    }

    // Llamar a la función para cargar los materiales cuando el DOM se cargue
    cargarMateriales();

    // Función para actualizar los materiales en localStorage
    function actualizarMateriales() {
        const selectedMaterialId = materialSelect.value;
        const cantidad = parseInt(cantidadInput.value, 10);

        if (!selectedMaterialId || isNaN(cantidad) || cantidad <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Selecciona un material y una cantidad válida.',
            });
            return;
        }

        materiales = materiales.map(material => {
            if (material.idProducto === selectedMaterialId) {
                if (material.cantidad >= cantidad) {
                    material.cantidad -= cantidad;
                    Swal.fire({
                        icon: 'success',
                        title: 'Material actualizado',
                        text: `Se ha consumido ${cantidad} del material ${material.material}.`,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No hay suficiente cantidad de este material.',
                    });
                }
            }
            return material;
        });

        // Guardar los materiales actualizados en localStorage
        localStorage.setItem('materiales', JSON.stringify(materiales));

        // Actualizar el select de materiales
        cargarMateriales();
    }

    // Agregar eventos a los botones del modal
    btnGuardarCambios.addEventListener('click', () => {
        actualizarMateriales();
        modal.hide();
    });

    modalElement.querySelector('.btn-secondary').addEventListener('click', () => {
        modal.hide();
    });

    // Cargar los materiales al abrir el modal
    modalElement.addEventListener('show.bs.modal', cargarMateriales);
});