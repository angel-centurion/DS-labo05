package com.example.app.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador REST para manejar la autenticación.
 * Define el endpoint /api/auth/login.
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Permite peticiones desde el frontend (login.html)
public class AuthController {

    private final AuthService authService;

    /**
     * Endpoint para el login.
     * Recibe un LoginRequestDTO (login y clave) y devuelve un LoginResponseDTO (datos del usuario).
     * @param request DTO con 'login' y 'clave'
     * @return ResponseEntity con los datos del usuario si es exitoso, o 404 si falla.
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO request) {
        // Llama al servicio de autenticación para validar las credenciales
        LoginResponseDTO response = authService.login(request.getLogin(), request.getClave());

        // Si tiene éxito, devuelve 200 OK con los datos del usuario
        return ResponseEntity.ok(response);
    }
}
