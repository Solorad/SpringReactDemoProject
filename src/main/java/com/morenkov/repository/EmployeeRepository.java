package com.morenkov.repository;

import com.morenkov.entity.Employee;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created by solorad on 15.11.16.
 */
public interface EmployeeRepository extends PagingAndSortingRepository<Employee, Long> {

}
