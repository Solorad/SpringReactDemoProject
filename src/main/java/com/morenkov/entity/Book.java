package com.morenkov.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.Set;

/**
 * Created by solorad on 01.12.16.
 */
@Data
public class Book {
    @Id
    private String id;
    private String name;
    private String description;
    private Integer pageNum;
    private Integer likeNumber;
}
