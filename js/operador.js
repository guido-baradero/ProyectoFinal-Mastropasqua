document.addEventListener('DOMContentLoaded', () => {
    // Función para cargar datos iniciales
    const cargarDatosIniciales = async () => {
        try {
            const archivos = [
                { nombre: 'db_usuarios.json', clave: 'usuarios' },
                { nombre: 'db_materiales.json', clave: 'materiales' },
                { nombre: 'db_tareas.json', clave: 'tareas' },
                { nombre: 'db_ordenes.json', clave: 'ordenes' }
            ];

            for (const archivo of archivos) {
                if (!localStorage.getItem(archivo.clave)) {
                    const respuesta = await fetch(`../js/${archivo.nombre}`);
                    const datos = await respuesta.json();
                    localStorage.setItem(archivo.clave, JSON.stringify(datos));
                }
            }
        } catch (error) {
            console.error('Error cargando datos iniciales:', error);
        }
    };

    cargarDatosIniciales();

    // Obtener el ID del usuario logueado
    const usuarioLogueadoId = localStorage.getItem('usuarioLogueado');
    if (!usuarioLogueadoId) {
        console.error('No hay usuario logueado.');
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const ordenes = JSON.parse(localStorage.getItem('ordenes')) || [];

    // Encontrar el operador logueado
    const operador = usuarios.find(u => u.idUsuario === usuarioLogueadoId);
    if (!operador) {
        console.error('No se encontró el operador logueado.');
        document.getElementById('nombreOperador').textContent = 'Operador no encontrado';
        return;
    }

    console.log(`Operador logueado: ${operador.nombre} ${operador.apellido}`);
    document.getElementById('nombreOperador').textContent = `${operador.nombre} ${operador.apellido}`;

    // Filtrar las órdenes para el operador logueado
    const ordenesDelOperador = ordenes.filter(o => o.operador === `${operador.nombre} ${operador.apellido}`);
    console.log('Órdenes del operador:', ordenesDelOperador);
});
