// ============================================
// LÓGICA DE LOGIN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Si el usuario ya está logueado, redirigir al index
    if (sessionStorage.getItem('usuarioLogueado')) {
        window.location.href = 'index.html';
    }

    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', handleLogin);
});

/**
 * Maneja el evento de submit del formulario de login
 * @param {Event} event Evento del formulario
 */
async function handleLogin(event) {
    event.preventDefault();

    const login = document.getElementById('login').value.trim();
    const clave = document.getElementById('clave').value.trim();

    if (!login || !clave) {
        mostrarError('Por favor, ingresa tu usuario y contraseña.');
        return;
    }

    const btnSubmit = document.getElementById('btn-submit');
    const btnText = document.getElementById('btn-text');

    // Deshabilitar botón mientras se procesa
    btnSubmit.disabled = true;
    btnText.textContent = 'Verificando...';
    ocultarError();

    try {
        // Llamada al endpoint de autenticación del backend
        const response = await axios.post('http://localhost:8000/api/auth/login', {
            login: login,
            clave: clave
        });

        // Login exitoso
        console.log('Login exitoso:', response.data);

        // Guardar la información del usuario en sessionStorage
        // sessionStorage persiste solo mientras la pestaña del navegador esté abierta.
        sessionStorage.setItem('usuarioLogueado', JSON.stringify(response.data));

        // Redirigir al panel principal (index.html)
        window.location.href = 'index.html';

    } catch (error) {
        console.error('Error de login:', error);
        if (error.response && error.response.status === 404) {
            mostrarError('Usuario o contraseña incorrectos.');
        } else {
            mostrarError('Error al conectar con el servidor. Inténtalo más tarde.');
        }

        // Reactivar botón
        btnSubmit.disabled = false;
        btnText.textContent = 'Entrar';
    }
}

/**
 * Mostrar mensaje de error en el formulario
 * @param {string} mensaje Mensaje de error
 */
function mostrarError(mensaje) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = mensaje;
    errorDiv.style.display = 'block';
}

/**
 * Ocultar mensaje de error
 */
function ocultarError() {
    const errorDiv = document.getElementById('error-message');
    errorDiv.style.display = 'none';
}