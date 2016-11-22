package com.morenkov.repository;

import com.morenkov.entity.Manager;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * @author emorenkov
 */
@RepositoryRestResource(exported = false)
public interface ManagerRepository extends MongoRepository<Manager, String> {

	Manager save(Manager manager);

	Manager findByName(String name);

}
