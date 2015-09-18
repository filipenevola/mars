package com.filipenevola.rest;

import com.filipenevola.model.Rover;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "rover", path = "rover")
public interface RoverRepository extends PagingAndSortingRepository<Rover, Long> {

}
