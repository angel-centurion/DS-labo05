package com.example.app.auth;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object (DTO) para recibir los datos del JSON de login
 * que envía el frontend (login.js).
 */
@Data
@NoArgsConstructor
public class LoginRequestDTO {
    // Los nombres de estas variables (login, clave) deben coincidir
    // exactamente con las claves del objeto JSON enviado por Axios.
    private String login;
    private String clave;
}
