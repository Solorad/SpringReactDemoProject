package com.morenkov.security;

import com.morenkov.entity.Account;
import com.morenkov.repository.AccountRepository;
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
public class AccountDetailsService implements UserDetailsService {

    private final AccountRepository repository;

    @Autowired
    public AccountDetailsService(AccountRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        Account account = this.repository.findByUsername(name);
        return new User(account.getFirstName(), account.getPassword(),
                AuthorityUtils.createAuthorityList(account.getRoles().toArray(new String[account.getRoles().size()])));
    }

}
