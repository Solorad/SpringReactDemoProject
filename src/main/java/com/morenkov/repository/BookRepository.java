package com.morenkov.repository;

import com.morenkov.entity.Book;
import com.morenkov.entity.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

/**
 * Created by emorenkov on 15.11.16.
 */
@RepositoryRestResource(collectionResourceRel = "books", path = "books")
public interface BookRepository extends MongoRepository<Book, String> {
}
