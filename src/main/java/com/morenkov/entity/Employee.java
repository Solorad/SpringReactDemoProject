package com.morenkov.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;


/**
 * Created by emorenkov on 15.11.16.
 */
@Data
@ToString(exclude = "password")
public class Employee {
    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    @Id
    private String id;
    private String firstName;
    private String lastName;
    private Set<String> roles;
    private String manager;
    @JsonIgnore
    private String password;
    @JsonIgnore
    private Long version;

    private Employee() {
    }

    public Employee(String firstName, String lastName, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.setPassword(password);
        roles = new HashSet<>();
        roles.add("ROLE_USER");
    }

    public Employee(String firstName, String lastName, Set<String> roles, String manager, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.roles = roles;
        this.manager = manager;
        this.setPassword(password);
    }

    public void setPassword(String password) {
        this.password = PASSWORD_ENCODER.encode(password);
    }
}
