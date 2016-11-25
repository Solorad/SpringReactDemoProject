package com.morenkov.repository;

import com.morenkov.entity.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

/**
 * Created by emorenkov on 15.11.16.
 */
@RepositoryRestResource(collectionResourceRel = "employees", path = "employees")
public interface EmployeeRepository extends MongoRepository<Employee, String> {

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Override
    Employee save(@Param("employee") Employee employee);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Override
    void delete(@Param("id") String id);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Override
    void delete(@Param("employee") Employee employee);

    Employee findByFirstName(String firstNaame);
}
