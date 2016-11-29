package com.morenkov.preloader;

import com.morenkov.entity.Employee;
import com.morenkov.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

/**
 * @author emorenkov
 */
//@Component
public class DatabaseLoader /*implements CommandLineRunner*/ {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public DatabaseLoader(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

//    @Override
    public void run(String... strings) throws Exception {
        Set<String> adminRoles = new HashSet<>();
        adminRoles.add("ROLE_USER");
        adminRoles.add("ROLE_ADMIN");
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken("admin", "doesn't matter",
                        AuthorityUtils.createAuthorityList("ROLE_ADMIN")));
        Employee greg = employeeRepository.save(new Employee("Greg", "Malkovich", adminRoles, null, "123456"));
        Employee admin = employeeRepository.save(new Employee("admin", "The boss", adminRoles, null, "admin"));


        Set<String> userRoles = new HashSet<>();
        adminRoles.add("ROLE_USER");
        this.employeeRepository.save(new Employee("Anatoly", "Vasserman", userRoles, greg.getId(), "12"));
        this.employeeRepository.save(new Employee("Jaene", "Proudmoure", userRoles, greg.getId(), "12"));
        this.employeeRepository.save(new Employee("Kell", "Talas", userRoles, greg.getId(), "12"));

        this.employeeRepository.save(new Employee("Silvana", "Banshee", userRoles, admin.getId(), "12"));

        SecurityContextHolder.clearContext();
    }
}