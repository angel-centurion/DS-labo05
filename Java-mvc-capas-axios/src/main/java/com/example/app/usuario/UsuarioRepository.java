package com.example.app.usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repositorio de Spring Data JPA para la entidad Usuario.
 * Proporciona métodos CRUD básicos y métodos de consulta personalizados.
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    /**
     * Método de consulta personalizado para buscar un usuario por sus credenciales (login y clave).
     * Spring Data JPA genera automáticamente la consulta SQL basada en el nombre del método.
     *
     * @param login El nombre de usuario (login)
     * @param clave La contraseña (clave)
     * @return Un Optional que contiene al Usuario si se encuentra, o un Optional vacío si no.
     */
    Optional<Usuario> findByLoginAndClave(String login, String clave);
}