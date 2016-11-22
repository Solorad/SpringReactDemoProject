package com.morenkov.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Version;

/**
 * Created by emorenkov on 15.11.16.
 */
@Data
@Entity
public class Employee {
    private @Id @GeneratedValue String id;
    private String firstName;
    private String lastName;
    private String description;

    private @Version @JsonIgnore Long version;

    private @ManyToOne Manager manager;

    private Employee() {}

    public Employee(String firstName, String lastName, String description, Manager manager) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.description = description;
        this.manager = manager;
    }
}
