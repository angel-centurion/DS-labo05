// Archivo: src/main/java/com/example/app/empleado/EmpleadoService.java

package com.example.app.empleado;

import com.example.app.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class EmpleadoService {

    private final EmpleadoRepository empleadoRepository;
    // private final DepartamentoRepository departamentoRepository; // <-- ELIMINAR ESTA LÍNEA

    // ... (obtenerTodos y obtenerPorId no cambian) ...

    // Crear
    public EmpleadoDTO crear(EmpleadoDTO empleadoDTO) {
        if (empleadoDTO.getId() != null) empleadoDTO.setId(null);

        Empleado empleado = convertirAEntidad(empleadoDTO);
        Empleado empleadoGuardado = empleadoRepository.save(empleado);
        return convertirADTO(empleadoGuardado);
    }

    // Actualizar
    public EmpleadoDTO actualizar(Long id, EmpleadoDTO empleadoDTO) {
        Empleado empleado = empleadoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado con id: " + id));

        // Actualizar campos
        empleado.setNombre(empleadoDTO.getNombre());
        empleado.setApellido(empleadoDTO.getApellido());
        empleado.setEmail(empleadoDTO.getEmail());
        empleado.setTelefono(empleadoDTO.getTelefono());
        empleado.setFechaContratacion(empleadoDTO.getFechaContratacion());
        empleado.setSalario(empleadoDTO.getSalario());
        empleado.setCargo(empleadoDTO.getCargo());

        // --- CAMBIO AQUÍ ---
        // Simplemente asigna el string
        empleado.setDepartamento(empleadoDTO.getDepartamento());

        Empleado empleadoActualizado = empleadoRepository.save(empleado);
        return convertirADTO(empleadoActualizado);
    }

    // ... (eliminar y buscarPorNombre no cambian) ...

    // Métodos auxiliares de conversión
    private EmpleadoDTO convertirADTO(Empleado empleado) {
        return new EmpleadoDTO(
                empleado.getId(),
                empleado.getNombre(),
                empleado.getApellido(),
                empleado.getEmail(),
                empleado.getTelefono(),
                empleado.getFechaContratacion(),
                empleado.getSalario(),
                empleado.getCargo(),
                // --- CAMBIO AQUÍ ---
                empleado.getDepartamento() // Mapeo directo
        );
    }

    private Empleado convertirAEntidad(EmpleadoDTO dto) {
        // --- CAMBIO AQUÍ ---
        // Ya no se busca en el DepartamentoRepository

        return new Empleado(
                dto.getId(),
                dto.getNombre(),
                dto.getApellido(),
                dto.getEmail(),
                dto.getTelefono(),
                dto.getFechaContratacion(),
                dto.getSalario(),
                dto.getCargo(),
                dto.getDepartamento() // Mapeo directo
        );
    }

    // --- MÉTODOS QUE NO SE MODIFICAN ---

    // Obtener todos
    public List<EmpleadoDTO> obtenerTodos() {
        return empleadoRepository.findAll()
                .stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    // Obtener por ID
    public EmpleadoDTO obtenerPorId(Long id) {
        Empleado empleado = empleadoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado con id: " + id));
        return convertirADTO(empleado);
    }

    // Eliminar
    public void eliminar(Long id) {
        if (!empleadoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Empleado no encontrado con id: " + id);
        }
        empleadoRepository.deleteById(id);
    }

    // Buscar por nombre (o nombre completo)
    public List<EmpleadoDTO> buscarPorNombre(String nombre) {
        return empleadoRepository.findByNombreContainingIgnoreCase(nombre)
                .stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }
}