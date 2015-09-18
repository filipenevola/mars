package com.filipenevola.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.PrePersist;
import javax.validation.constraints.NotNull;

@Data
@Entity
public class Rover extends AbstractPersistable<Long> {

    @NotBlank
    private String name;

    @NotNull
    private int x;

    @NotNull
    private int y;

    @NotNull
    @JsonIgnore
    private int oldX;

    @NotNull
    @JsonIgnore
    private int oldY;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Direction direction;

    @PrePersist
    public void prePersist() {
        oldX = x;
        oldY = y;
    }
}
