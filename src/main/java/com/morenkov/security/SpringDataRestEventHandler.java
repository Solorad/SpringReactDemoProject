package com.morenkov.security;

import com.morenkov.config.SpringWebConfig;
import com.morenkov.entity.Employee;
import com.morenkov.repository.EmployeeRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/**
 * @author emorenkov
 */
@Component
@RepositoryEventHandler(Employee.class)
public class SpringDataRestEventHandler {
    private static final Logger log = LogManager.getLogger(SpringWebConfig.class);

    private final EmployeeRepository employeeRepository;

    @Autowired
    public SpringDataRestEventHandler(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @HandleBeforeCreate
    public void applyUserInformationUsingSecurityContext(Employee employee) {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        Employee manager = this.employeeRepository.findByFirstName(name);
        if (manager != null) {
            employee.setManager(manager.getId());
        } else {
            log.error("Current user '{}' is not found", name);
        }

    }
}
