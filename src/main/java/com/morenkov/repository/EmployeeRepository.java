package com.morenkov.repository;

import com.morenkov.entity.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

/**
 * Created by emorenkov on 15.11.16.
 */
@PreAuthorize("hasRole('ROLE_MANAGER')")
@RepositoryRestResource(collectionResourceRel = "employee", path = "employee")
public interface EmployeeRepository extends MongoRepository<Employee, String> {

    @Override
    @PreAuthorize("#employee?.manager == null or #employee?.manager?.name == authentication?.name")
    Employee save(@Param("employee") Employee employee);

    @Override
    @PreAuthorize("@employeeRepository.findOne(#id)?.manager?.name == authentication?.name")
    void delete(@Param("id") String id);

    @Override
    @PreAuthorize("#employee?.manager?.name == authentication?.name")
    void delete(@Param("employee") Employee employee);

}
