package com.example.app.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object (DTO) para enviar la respuesta de un login exitoso.
 * Contiene los datos del usuario que son seguros para enviar al frontend
 * (NO incluye la contraseña).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor // Se usa en AuthService para crear la respuesta
public class LoginResponseDTO {

    private Long id;
    private String nombre;
    private String login;
}
