package com.morenkov.security;

import com.morenkov.entity.Employee;
import com.morenkov.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

/**
 * @author emorenkov
 */
@Component
public class SpringDataUserDetailsService implements UserDetailsService {

    private final EmployeeRepository repository;

    @Autowired
    public SpringDataUserDetailsService(EmployeeRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        Employee employee = this.repository.findByFirstName(name);
        return new User(employee.getFirstName(), employee.getPassword(),
                AuthorityUtils.createAuthorityList(employee.getRoles().toArray(new String[employee.getRoles().size()])));
    }

}
