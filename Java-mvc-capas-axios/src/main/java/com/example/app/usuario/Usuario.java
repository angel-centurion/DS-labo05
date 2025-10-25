package com.example.app.usuario;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entidad que representa la tabla 'usuarios' en la base de datos.
 * Se utiliza para la autenticación (login).
 */
@Entity
@Table(name = "usuarios") // Coincide con el script.txt
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(length = 20)
    private String login;

    // --- AÑADE ESTA LÍNEA ---
    @Column(length = 20)
    private String clave;
    // -------------------------
}