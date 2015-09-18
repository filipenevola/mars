package com.filipenevola.rest;

import com.filipenevola.model.Mars;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "mars", path = "mars")
public interface MarsRepository extends PagingAndSortingRepository<Mars, Long> {

}
