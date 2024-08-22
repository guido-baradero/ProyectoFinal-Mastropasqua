document.addEventListener('DOMContentLoaded', function () {
    const btnCerrarSesion = document.getElementById('btnCerrarSesion');
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', function () {
            // Mostrar un mensaje de confirmación antes de cerrar sesión
            Swal.fire({
                title: '¿Estás seguro?',
                text: "¡Estás a punto de cerrar sesión!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, cerrar sesión',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Obtener el idUsuario del usuario logueado
                    const idUsuario = localStorage.getItem('usuarioLogueado');
                    if (idUsuario) {
                        // Obtener los usuarios del localStorage
                        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
                        // Encontrar el usuario que está conectado
                        const usuario = usuarios.find(u => u.idUsuario === idUsuario);
                        if (usuario) {
                            // Establecer el estado de conectado a false
                            usuario.conectado = false;
                            // Actualizar el estado del usuario en localStorage
                            localStorage.setItem('usuarios', JSON.stringify(usuarios));
                        }
                        // Eliminar el idUsuario del localStorage
                        localStorage.removeItem('usuarioLogueado');
                    }
                    // Redirigir al usuario a la página de login o inicio
                    window.location.href = '../index.html'; // Cambia esta URL según tu estructura de archivos
                }
            });
        });
    }
});