package com.example.app.auth;

import com.example.app.common.exception.ResourceNotFoundException;
import com.example.app.usuario.Usuario;
import com.example.app.usuario.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Lógica de negocio para la autenticación.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true) // Es readOnly porque el login solo consulta datos
public class AuthService {

    private final UsuarioRepository usuarioRepository;

    /**
     * Valida las credenciales del usuario.
     * @param login El nombre de usuario (ej. 'jorge')
     * @param clave La contraseña (ej. '1234')
     * @return Un DTO con los datos del usuario si se encuentra.
     * @throws ResourceNotFoundException si las credenciales no coinciden (esto resulta en un 404 Not Found).
     */
    public LoginResponseDTO login(String login, String clave) {

        // Busca en la BD un usuario que coincida con el login Y la clave
        Usuario usuario = usuarioRepository.findByLoginAndClave(login, clave)
                .orElseThrow(() -> new ResourceNotFoundException("Credenciales incorrectas"));

        // Si se encuentra, mapea los datos a un DTO de respuesta (sin la clave)
        return new LoginResponseDTO(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getLogin()
        );
    }
}
