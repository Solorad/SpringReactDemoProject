package com.morenkov.repository;

import com.morenkov.entity.Account;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;

/**
 * Created by emorenkov on 15.11.16.
 */
public interface AccountRepository extends MongoRepository<Account, String> {

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Override
    Account save(@Param("account") Account account);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Override
    void delete(@Param("id") String id);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Override
    void delete(@Param("account") Account account);

    Account findByUsername(String username);
}
