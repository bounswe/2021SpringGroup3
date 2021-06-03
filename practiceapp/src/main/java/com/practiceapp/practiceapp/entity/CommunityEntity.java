package com.practiceapp.practiceapp.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "communities")
public class CommunityEntity {

    @Id
    @Field
    private String id;

    @Field
    private String name;

    @Field
    private String description;

    @Field
    // Communities are public by default
    private boolean isPublic = true;

    @Field
    private String language;

    @Field
    private String country;

    @Field
    private String city;

    private List<String> topics = new ArrayList<>();

    // References to users and posts:
    @JsonBackReference
    @DBRef(lazy = true)
    private List<UserEntity> members = new ArrayList<>();

    @JsonBackReference
    @DBRef(lazy = true)
    private List<PostEntity> posts = new ArrayList<>();

}
