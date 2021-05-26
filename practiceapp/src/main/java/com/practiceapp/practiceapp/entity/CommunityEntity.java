package com.practiceapp.practiceapp.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.HashSet;
import java.util.Set;

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

    private Set<String> topics = new HashSet<>();

    private Set<UserEntity> members = new HashSet<>();

    private Set<PostEntity> posts = new HashSet<>();

}
