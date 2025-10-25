// Archivo: src/main/java/com/example/app/empleado/EmpleadoDTO.java

package com.example.app.empleado;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmpleadoDTO {

    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 100 caracteres")
    private String nombre;

    @NotBlank(message = "El apellido es obligatorio")
    @Size(min = 3, max = 100, message = "El apellido debe tener entre 3 y 100 caracteres")
    private String apellido;

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "El formato del email no es válido")
    @Size(max = 150, message = "El email no puede exceder 150 caracteres")
    private String email;

    private String telefono;

    @NotNull(message = "La fecha de contratación es obligatoria")
    private LocalDate fechaContratacion;

    @NotNull(message = "El salario es obligatorio")
    @DecimalMin(value = "0.0", inclusive = false, message = "El salario debe ser mayor que 0")
    private BigDecimal salario;

    private String cargo;

    // --- CAMBIO AQUÍ ---
    // Ya no es un ID, es el nombre del departamento
    @NotBlank(message = "El departamento es obligatorio")
    @Size(max = 200, message = "El nombre del departamento no puede exceder 200 caracteres")
    private String departamento;
}