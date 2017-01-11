package com.morenkov.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.Set;

/**
 * Created by solorad on 01.12.16.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Book {
    @Id
    private String id;
    private String title;
    private Set<String> authors;
    private String description;
    private Integer pageNumber;
    private Integer likeNumber;
    private Integer totalStars;
    private Integer scoreCount;
    private Integer publishDate;
    @JsonIgnore
    private Long version;
}
