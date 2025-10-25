// ============================================
// SISTEMA DE GESTIÓN DE EMPLEADOS
// Lógica Frontend con Axios (CRUD)
// ============================================

// ===== CONFIGURACIÓN =====
const API_URL = 'http://localhost:8000/api/empleados';
let empleadoAEliminar = null;
let usuarioLogueado = null; // Almacenará la info del usuario

// Configuración de Axios
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Interceptor para manejar errores globales
axios.interceptors.response.use(
    response => response,
    error => {
        console.error('Error en la petición:', error);
        if (error.response && error.response.status === 404) {
            mostrarError('El recurso solicitado no se encontró.');
        } else {
            mostrarError('Error de conexión con el servidor.');
        }
        return Promise.reject(error);
    }
);

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificar autenticación (Doble chequeo, el primero está en el HTML)
    usuarioLogueado = JSON.parse(sessionStorage.getItem('usuarioLogueado'));
    if (!usuarioLogueado) {
        // Seguridad por si falló el script del HTML
        window.location.href = 'login.html';
        return;
    }

    console.log('🚀 Aplicación iniciada');

    // 2. Personalizar UI y configurar Logout
    document.getElementById('user-name').textContent = usuarioLogueado.nombre;
    document.getElementById('btn-logout').addEventListener('click', () => {
        sessionStorage.removeItem('usuarioLogueado');
        window.location.href = 'login.html';
    });

    // 3. Cargar datos y configurar eventos
    cargarEmpleados();
    configurarFormulario();
    configurarBuscador();
    mostrarEstadisticas();
});

// Configurar el formulario
function configurarFormulario() {
    const form = document.getElementById('empleado-form');
    form.addEventListener('submit', guardarEmpleado);
}

// Configurar el buscador
function configurarBuscador() {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            buscarEmpleados();
        }
    });
}

// ===== FUNCIONES DE CARGA =====

/**
 * Cargar todos los empleados desde el backend
 */
async function cargarEmpleados() {
    console.log('📥 Cargando empleados...');
    mostrarLoading(true);
    ocultarError();

    try {
        const response = await axios.get(API_URL);
        console.log('✅ Empleados cargados:', response.data);
        mostrarEmpleados(response.data);
    } catch (error) {
        console.error('❌ Error al cargar empleados:', error);
        if (!error.response || error.response.status !== 404) {
            mostrarError('No se pudieron cargar los empleados.');
        }
    } finally {
        mostrarLoading(false);
    }
}

// ===== FUNCIONES DE VISUALIZACIÓN =====

/**
 * Mostrar la lista de empleados en el DOM
 * @param {Array} empleados - Array de empleados a mostrar
 */
function mostrarEmpleados(empleados) {
    const container = document.getElementById('empleados-container');

    if (empleados.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🧑‍💼</div>
                <h3>No hay empleados registrados</h3>
                <p>Agrega tu primer empleado usando el formulario de arriba</p>
            </div>
        `;
        return;
    }

    // Generar HTML para cada empleado
    const empleadosHTML = empleados.map(empleado => `
        <div class="empleado-card">
            <div class="empleado-header">
                <div>
                    <div class="empleado-nombre">${escapeHtml(empleado.nombre)} ${escapeHtml(empleado.apellido)}</div>
                    <div class="empleado-cargo">${escapeHtml(empleado.cargo) || 'Sin cargo'}</div>
                </div>
                <span class="empleado-id">ID: ${empleado.id}</span>
            </div>
            
            <div class="empleado-info">
                <span>📧 ${escapeHtml(empleado.email)}</span>
                <span>📞 ${escapeHtml(empleado.telefono) || 'N/A'}</span>
            </div>
            
            <div class="empleado-details">
                <div class="detail-item">
                    <div class="detail-label">Salario</div>
                    <div class="detail-value">$${parseFloat(empleado.salario).toFixed(2)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Departamento</div>
                    <div class="detail-value">${escapeHtml(empleado.departamento)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Contratación</div>
                    <div class="detail-value">${(empleado.fechaContratacion)}</div>
                </div>
            </div>
            
            <div class="empleado-actions">
                <button class="btn btn-warning" onclick="editarEmpleado(${empleado.id})">
                    ✏️ Editar
                </button>
                <button class="btn btn-danger" onclick="abrirModalEliminar(${empleado.id})">
                    🗑️ Eliminar
                </button>
            </div>
        </div>
    `).join('');

    container.innerHTML = `<div class="empleados-grid">${empleadosHTML}</div>`;
}

// ===== FUNCIONES CRUD =====

/**
 * Guardar empleado (Crear o Actualizar)
 * @param {Event} event - Evento del formulario
 */
async function guardarEmpleado(event) {
    event.preventDefault();
    ocultarError();

    const id = document.getElementById('empleado-id').value;

    // Recoger datos del formulario
    const empleado = {
        nombre: document.getElementById('nombre').value.trim(),
        apellido: document.getElementById('apellido').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim() || null,
        fechaContratacion: document.getElementById('fechaContratacion').value,
        salario: parseFloat(document.getElementById('salario').value),
        cargo: document.getElementById('cargo').value.trim() || null,
        departamento: document.getElementById('departamento').value.trim()
    };

    // Validaciones básicas (el backend hará las validaciones fuertes)
    if (!empleado.nombre || !empleado.apellido || !empleado.email || !empleado.fechaContratacion || !empleado.salario || !empleado.departamento) {
        mostrarError('Por favor, completa todos los campos marcados con *');
        return;
    }

    console.log('💾 Guardando empleado:', empleado);

    try {
        if (id) {
            // Actualizar empleado existente
            await axios.put(`${API_URL}/${id}`, empleado);
            console.log('✅ Empleado actualizado');
            mostrarMensajeExito('✅ Empleado actualizado correctamente');
        } else {
            // Crear nuevo empleado
            await axios.post(API_URL, empleado);
            console.log('✅ Empleado creado');
            mostrarMensajeExito('✅ Empleado creado correctamente');
        }

        limpiarFormulario();
        cargarEmpleados();
    } catch (error) {
        console.error('❌ Error al guardar empleado:', error);

        if (error.response && error.response.data) {
            // Mostrar errores de validación del backend
            const errores = error.response.data;
            if (typeof errores === 'object') {
                const mensajesError = Object.entries(errores)
                    .map(([campo, mensaje]) => `${campo}: ${mensaje}`)
                    .join(' | ');
                mostrarError(mensajesError);
            } else if (typeof errores === 'string') {
                mostrarError(errores);
            } else {
                mostrarError('Error al guardar. Verifica los datos.');
            }
        } else {
            mostrarError('Error al guardar el empleado. Verifica los datos e intenta nuevamente.');
        }
    }
}

/**
 * Editar un empleado existente
 * @param {number} id - ID del empleado a editar
 */
async function editarEmpleado(id) {
    console.log('✏️ Editando empleado:', id);
    ocultarError();

    try {
        const response = await axios.get(`${API_URL}/${id}`);
        const empleado = response.data;

        // Llenar el formulario con los datos del empleado
        document.getElementById('empleado-id').value = empleado.id;
        document.getElementById('nombre').value = empleado.nombre;
        document.getElementById('apellido').value = empleado.apellido;
        document.getElementById('email').value = empleado.email;
        document.getElementById('telefono').value = empleado.telefono || '';
        document.getElementById('fechaContratacion').value = empleado.fechaContratacion;
        document.getElementById('salario').value = empleado.salario;
        document.getElementById('cargo').value = empleado.cargo || '';
        document.getElementById('departamento').value = empleado.departamento || '';

        // Cambiar el título y texto del botón
        document.getElementById('form-title').textContent = '✏️ Editar Empleado';
        document.getElementById('btn-text').textContent = '💾 Actualizar Empleado';
        document.getElementById('btn-cancel').style.display = 'block';

        // Scroll al formulario
        window.scrollTo({ top: 0, behavior: 'smooth' });

        console.log('✅ Empleado cargado en el formulario');
    } catch (error) {
        console.error('❌ Error al cargar empleado:', error);
        mostrarError('No se pudo cargar el empleado para editar');
    }
}

/**
 * Abrir modal de confirmación para eliminar
 * @param {number} id - ID del empleado a eliminar
 */
function abrirModalEliminar(id) {
    console.log('🗑️ Abriendo modal para eliminar empleado:', id);
    empleadoAEliminar = id;
    const modal = document.getElementById('modal-confirmacion');
    modal.style.display = 'flex';
}

/**
 * Cerrar modal de confirmación
 */
function cerrarModal() {
    console.log('❌ Cerrando modal');
    const modal = document.getElementById('modal-confirmacion');
    modal.style.display = 'none';
    empleadoAEliminar = null;
}

/**
 * Confirmar eliminación del empleado
 */
async function confirmarEliminar() {
    if (!empleadoAEliminar) return;

    console.log('🗑️ Eliminando empleado:', empleadoAEliminar);

    try {
        await axios.delete(`${API_URL}/${empleadoAEliminar}`);
        console.log('✅ Empleado eliminado');
        mostrarMensajeExito('🗑️ Empleado eliminado correctamente');
        cerrarModal();
        cargarEmpleados();
    } catch (error) {
        console.error('❌ Error al eliminar empleado:', error);
        mostrarError('No se pudo eliminar el empleado');
        cerrarModal();
    }
}

// ===== FUNCIONES DE BÚSQUEDA =====

/**
 * Buscar empleados por nombre
 */
async function buscarEmpleados() {
    const searchTerm = document.getElementById('search-input').value.trim();

    if (!searchTerm) {
        cargarEmpleados();
        return;
    }

    console.log('🔍 Buscando empleados:', searchTerm);
    mostrarLoading(true);
    ocultarError();

    try {
        const response = await axios.get(`${API_URL}/buscar`, {
            params: { nombre: searchTerm }
        });

        console.log('✅ Empleados encontrados:', response.data.length);
        mostrarEmpleados(response.data);

        if (response.data.length === 0) {
            mostrarError(`No se encontraron empleados con el término: "${searchTerm}"`);
        }
    } catch (error) {
        console.error('❌ Error al buscar empleados:', error);
        mostrarError('Error al realizar la búsqueda');
    } finally {
        mostrarLoading(false);
    }
}

// ===== FUNCIONES AUXILIARES =====

/**
 * Cancelar edición y limpiar formulario
 */
function cancelarEdicion() {
    console.log('❌ Cancelando edición');
    limpiarFormulario();
    ocultarError();
}

/**
 * Limpiar el formulario
 */
function limpiarFormulario() {
    document.getElementById('empleado-form').reset();
    document.getElementById('empleado-id').value = '';
    document.getElementById('form-title').textContent = '➕ Agregar Nuevo Empleado';
    document.getElementById('btn-text').textContent = '💾 Guardar Empleado';
    document.getElementById('btn-cancel').style.display = 'none';
}

/**
 * Mostrar u ocultar el indicador de carga
 * @param {boolean} mostrar - true para mostrar, false para ocultar
 */
function mostrarLoading(mostrar) {
    const loading = document.getElementById('loading');
    loading.style.display = mostrar ? 'block' : 'none';
}

/**
 * Mostrar mensaje de error
 * @param {string} mensaje - Mensaje de error a mostrar
 */
function mostrarError(mensaje) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = mensaje;
    errorDiv.style.display = 'block';

    // Ocultar automáticamente después de 5 segundos
    setTimeout(ocultarError, 5000);
}

/**
 * Ocultar mensaje de error
 */
function ocultarError() {
    const errorDiv = document.getElementById('error-message');
    errorDiv.style.display = 'none';
}

/**
 * Mostrar mensaje de éxito
 * @param {string} mensaje - Mensaje de éxito a mostrar
 */
function mostrarMensajeExito(mensaje) {
    const container = document.querySelector('.container');
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = mensaje;

    // Insertar al inicio del container
    container.insertBefore(successDiv, container.children[1]);

    // Remover automáticamente después de 3 segundos
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

/**
 * Escapar HTML para prevenir XSS
 * @param {string} text - Texto a escapar
 * @returns {string} - Texto escapado
 */
function escapeHtml(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ===== MANEJADORES DE EVENTOS GLOBALES =====

// Cerrar modal al hacer clic fuera de él
document.addEventListener('click', (event) => {
    const modal = document.getElementById('modal-confirmacion');
    if (event.target === modal) {
        cerrarModal();
    }
});

// Cerrar modal con la tecla ESC
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        cerrarModal();
    }
});

// ===== UTILIDADES DE CONSOLA =====

/**
 * Mostrar estadísticas en consola
 */
function mostrarEstadisticas() {
    console.log(`
    ╔═══════════════════════════════════════╗
    ║   SISTEMA DE GESTIÓN DE EMPLEADOS    ║
    ╠═══════════════════════════════════════╣
    ║ API URL: ${API_URL}                   
    ║ Usuario: ${usuarioLogueado.nombre} (ID: ${usuarioLogueado.id})
    ╚═══════════════════════════════════════╝
    `);
}

// ===== FIN DEL SCRIPT =====
console.log('✅ Script app.js cargado y listo');
