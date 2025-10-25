// Archivo: src/main/java/com/example/app/empleado/EmpleadoRepository.java

package com.example.app.empleado; // ¡Cambiado!

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {

    // Cambiado: Buscar por nombre y apellido (o solo por nombre, según la necesidad)
    List<Empleado> findByNombreContainingIgnoreCase(String nombre);

    // Opcional: buscar por email para verificar duplicados
    boolean existsByEmail(String email);
}