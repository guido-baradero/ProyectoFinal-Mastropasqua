document.addEventListener('DOMContentLoaded', () => {
    // Cargar datos iniciales en localStorage si no están presentes
    const cargarDatosIniciales = async () => {
        try {
            const archivos = [
                { nombre: 'db_usuarios.json', clave: 'usuarios' },
                { nombre: 'db_materiales.json', clave: 'materiales' },
                { nombre: 'db_tareas.json', clave: 'tareas' }
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
});

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const usuarioIngresado = document.getElementById('usuarioLogin').value;
    const contrasenaIngresada = document.getElementById('contrasenaLogin').value;
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let usuarioEncontrado = usuarios.find(u => u.usuario === usuarioIngresado && u.contrasena === contrasenaIngresada);

    if (usuarioEncontrado) {
        // Mostrar mensaje de éxito primero
        Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            timer: 2000,
            showConfirmButton: false, // Evita que el usuario tenga que hacer clic para cerrar el mensaje
            willClose: () => {
                // Esta función se ejecuta justo antes de que se cierre el SweetAlert
                // Redirección según el rol del usuario después de que el mensaje desaparezca
                const alcanceUsuario = usuarioEncontrado.alcance.toLowerCase();
                if (alcanceUsuario === 'despachante') {
                    window.location.href = '/pages/despacho.html';
                } else if (alcanceUsuario === 'operador') {
                    window.location.href = '/pages/operador.html';
                } else {
                    console.error('Rol de usuario no reconocido:', alcanceUsuario);
                }
            }
        });

        // Actualizar el estado del usuario logueado a "conectado"
        usuarios = usuarios.map(u => {
            if (u.idUsuario === usuarioEncontrado.idUsuario) {
                return { ...u, conectado: true };
            }
            return u;
        });

        // Guardar los datos actualizados en localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        // Guardar el idUsuario del usuario logueado
        localStorage.setItem('usuarioLogueado', usuarioEncontrado.idUsuario);

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error de autenticación',
            text: 'Usuario o contraseña incorrectos',
        });
    }
});
