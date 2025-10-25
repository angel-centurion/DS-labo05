-- ==========================
-- CREACIÓN DE TABLAS
-- ==========================

CREATE TABLE usuarios(
                         id SERIAL PRIMARY KEY,
                         nombre VARCHAR(100) NOT NULL,
                         login VARCHAR(20),
                         clave VARCHAR(20)
);

-- Tabla de Empleados
CREATE TABLE empleados (
                           id SERIAL PRIMARY KEY,
                           nombre VARCHAR(100) NOT NULL,
                           apellido VARCHAR(100) NOT NULL,
                           email VARCHAR(150) UNIQUE NOT NULL,
                           telefono VARCHAR(20),
                           fecha_contratacion DATE NOT NULL,
                           salario NUMERIC(10,2) NOT NULL,
                           cargo VARCHAR(100),
                           departamento VARCHAR(200)
);

-- ==========================
-- INSERCIÓN DE DATOS
-- ==========================
-- Usuarios (2 registros)
INSERT INTO usuarios (nombre, login, clave) VALUES
                                                ('Jorge Curioso', 'jorge', '1234'),
                                                ('Mac Pato', 'max', '1234');

-- Empleados (20 registros de ejemplo)
INSERT INTO empleados (nombre, apellido, email, telefono, fecha_contratacion, salario, cargo, departamento) VALUES
                                                                                                                ('Ana', 'Pérez', 'ana.perez@empresa.com', '999111222', '2021-03-10', 3500.00, 'Analista RRHH', 'Recursos Humanos'),
                                                                                                                ('Luis', 'García', 'luis.garcia@empresa.com', '999111223', '2020-07-15', 5000.00, 'Desarrollador Senior', 'Tecnología'),
                                                                                                                ('María', 'Lopez', 'maria.lopez@empresa.com', '999111224', '2019-02-01', 4200.00, 'Diseñadora UX', 'Tecnología'),
                                                                                                                ('Carlos', 'Ramírez', 'carlos.ramirez@empresa.com', '999111225', '2022-05-20', 2800.00, 'Asistente Marketing', 'Marketing'),
                                                                                                                ('Lucía', 'Fernández', 'lucia.fernandez@empresa.com', '999111226', '2023-01-10', 3100.00, 'Ejecutiva de Ventas', 'Marketing'),
                                                                                                                ('Miguel', 'Torres', 'miguel.torres@empresa.com', '999111227', '2018-08-08', 6000.00, 'Jefe de Tecnología', 'Tecnología'),
                                                                                                                ('Rosa', 'Castro', 'rosa.castro@empresa.com', '999111228', '2021-12-12', 2900.00, 'Asistente Administrativo', 'Recursos Humanos'),
                                                                                                                ('Jorge', 'Flores', 'jorge.flores@empresa.com', '999111229', '2020-11-30', 4800.00, 'Contador', 'Finanzas'),
                                                                                                                ('Patricia', 'Mendoza', 'patricia.mendoza@empresa.com', '999111230', '2017-09-14', 7000.00, 'Gerente de Finanzas', 'Finanzas'),
                                                                                                                ('Raúl', 'Díaz', 'raul.diaz@empresa.com', '999111231', '2022-06-18', 3200.00, 'Analista de Datos', 'Tecnología'),
                                                                                                                ('Elena', 'Morales', 'elena.morales@empresa.com', '999111232', '2023-04-01', 2800.00, 'Community Manager', 'Marketing'),
                                                                                                                ('Diego', 'Reyes', 'diego.reyes@empresa.com', '999111233', '2019-07-22', 4500.00, 'Ingeniero de Software', 'Tecnología'),
                                                                                                                ('Verónica', 'Soto', 'veronica.soto@empresa.com', '999111234', '2021-10-05', 3800.00, 'Especialista en Selección', 'Recursos Humanos'),
                                                                                                                ('Hugo', 'Rojas', 'hugo.rojas@empresa.com', '999111235', '2020-02-28', 5200.00, 'Arquitecto de Software', 'Tecnología'),
                                                                                                                ('Claudia', 'Vega', 'claudia.vega@empresa.com', '999111236', '2022-09-09', 3400.00, 'Ejecutiva de Cuentas', 'Marketing'),
                                                                                                                ('Fernando', 'Cruz', 'fernando.cruz@empresa.com', '999111237', '2018-12-17', 6100.00, 'Gerente de TI', 'Tecnología'),
                                                                                                                ('Andrea', 'Navarro', 'andrea.navarro@empresa.com', '999111238', '2021-06-25', 3600.00, 'Analista Financiero', 'Finanzas'),
                                                                                                                ('Pablo', 'Guzmán', 'pablo.guzman@empresa.com', '999111239', '2020-08-13', 4700.00, 'Desarrollador Backend', 'Tecnología'),
                                                                                                                ('Gabriela', 'Ortega', 'gabriela.ortega@empresa.com', '999111240', '2023-03-03', 3000.00, 'Asistente Contable', 'Finanzas'),
                                                                                                                ('Sebastián', 'Ibarra', 'sebastian.ibarra@empresa.com', '999111241', '2019-11-11', 4200.00, 'Desarrollador Frontend', 'Tecnología');