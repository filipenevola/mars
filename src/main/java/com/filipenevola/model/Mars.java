package com.filipenevola.model;

import lombok.Data;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Data
@Entity
public class Mars extends AbstractPersistable<Long> {

    @NotNull
	private int maximumX;

    @NotNull
	private int maximumY;
}
