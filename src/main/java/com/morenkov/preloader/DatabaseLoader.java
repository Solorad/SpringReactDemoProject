package com.morenkov.preloader;

import com.morenkov.entity.Book;
import com.morenkov.entity.Employee;
import com.morenkov.repository.BookRepository;
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
@Component
public class DatabaseLoader implements CommandLineRunner {

    private final EmployeeRepository employeeRepository;
    private final BookRepository bookRepository;

    @Autowired
    public DatabaseLoader(EmployeeRepository employeeRepository, BookRepository bookRepository) {
        this.employeeRepository = employeeRepository;
        this.bookRepository = bookRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
//        addUsers();
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