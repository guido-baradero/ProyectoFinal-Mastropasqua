document.addEventListener('DOMContentLoaded', () => {
    const modalElement = document.getElementById('modalConsumoMateriales');
    const modal = new bootstrap.Modal(modalElement);
    const materialSelect = document.getElementById('material');
    const cantidadInput = document.getElementById('cantidad');
    let materiales = JSON.parse(localStorage.getItem('materiales')) || [];

    // Función para cargar los materiales en el select
    function cargarMateriales() {
        materialSelect.innerHTML = ''; // Limpiar el select

        materiales.forEach(material => {
            if (material.cantidad > 0) { // Solo mostrar materiales con cantidad disponible
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
    modalElement.querySelector('.btn-primary').addEventListener('click', () => {
        actualizarMateriales();
        modal.hide();
    });

    modalElement.querySelector('.btn-secondary').addEventListener('click', () => {
        modal.hide();
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const modal = new bootstrap.Modal(document.getElementById('modalConsumoMateriales'));
    const selectMaterial = document.getElementById('material');
    const inputCantidad = document.getElementById('cantidad');
    const btnGuardarCambios = document.getElementById('btnGuardarCambios');

    // Función para cargar los materiales en el select
    function cargarMateriales() {
        const materiales = JSON.parse(localStorage.getItem('materiales')) || [];
        selectMaterial.innerHTML = '<option selected disabled>Selecciona un material</option>';

        materiales.forEach(material => {
            const option = document.createElement('option');
            option.value = material.idProducto;
            option.textContent = `${material.material} - Cantidad: ${material.cantidad}`;
            selectMaterial.appendChild(option);
        });
    }









    // Función para guardar los cambios en el localStorage
    function guardarCambios() {
        const idMaterial = selectMaterial.value;
        const cantidadUtilizada = parseInt(inputCantidad.value, 10);

        if (!idMaterial || isNaN(cantidadUtilizada) || cantidadUtilizada <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, selecciona un material y una cantidad válida.',
            });
            return;
        }

        // Obtener los materiales del localStorage
        let materiales = JSON.parse(localStorage.getItem('materiales')) || [];

        // Buscar el material seleccionado
        const material = materiales.find(m => m.idProducto === idMaterial);

        if (material) {
            // Restar la cantidad utilizada
            if (material.cantidad >= cantidadUtilizada) {
                material.cantidad -= cantidadUtilizada;
                localStorage.setItem('materiales', JSON.stringify(materiales));
                Swal.fire({
                    icon: 'success',
                    title: 'Orden cumplida',
                    text: `La orden ${ordenIdActualizar} ha sido cumplida exitosamente.`,
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Orden cumplida',
                    text: `La orden ${ordenIdActualizar} ha sido cumplida exitosamente.`,
                });
            }
        }

        // Cerrar el modal
        modal.hide();
    }

    // Configurar el botón de guardar cambios
    btnGuardarCambios.addEventListener('click', guardarCambios);

    // Cargar los materiales al abrir el modal
    document.getElementById('modalConsumoMateriales').addEventListener('show.bs.modal', cargarMateriales);
});
