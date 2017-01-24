package com.morenkov.preloader;

import com.morenkov.entity.Account;
import com.morenkov.entity.Book;
import com.morenkov.repository.BookRepository;
import com.morenkov.repository.AccountRepository;
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
@Component
public class DatabaseLoader implements CommandLineRunner {

    private final AccountRepository accountRepository;
    private final BookRepository bookRepository;

    @Autowired
    public DatabaseLoader(AccountRepository accountRepository, BookRepository bookRepository) {
        this.accountRepository = accountRepository;
        this.bookRepository = bookRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
        addUsers();
        addBooks();
    }

    private void addBooks() {
        Set<String> authors = new HashSet<>();
        authors.add("J.R.R. Tolkien");
        Book lordOfTheRings = Book.builder().title("Lord of the rings").authors(authors)
                .description("Description").likeNumber(3).pageNumber(2300).build();
        bookRepository.save(lordOfTheRings);

        authors = new HashSet<>();
        authors.add("L.N. Tolstoy");
        Book warAndPeace = Book.builder().title("War and Peace").authors(authors)
                .description("Description").likeNumber(1).pageNumber(1200).build();
        bookRepository.save(warAndPeace);

        authors = new HashSet<>();
        authors.add("J. D. Salinger");
        Book catcher = Book.builder().title("Catcher in the rye").authors(authors)
                .description("Description").likeNumber(2).pageNumber(1000).build();
        bookRepository.save(catcher);

        authors = new HashSet<>();
        authors.add("Erich Maria Remarque");
        Book threeComrades = Book.builder().title("Three Comrades").authors(authors)
                .description("Description").likeNumber(7).pageNumber(429).build();
        bookRepository.save(threeComrades);
    }

    private void addUsers() {
        Set<String> adminRoles = new HashSet<>();
        adminRoles.add("ROLE_USER");
        adminRoles.add("ROLE_ADMIN");
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken("admin", "doesn't matter",
                        AuthorityUtils.createAuthorityList("ROLE_ADMIN")));
        Account greg = accountRepository.save(new Account("Greg", "Greg", "Malkovich", adminRoles, "123456"));
        Account admin = accountRepository.save(new Account("admin", "admin", "The boss", adminRoles, "admin"));
        SecurityContextHolder.clearContext();
    }
}