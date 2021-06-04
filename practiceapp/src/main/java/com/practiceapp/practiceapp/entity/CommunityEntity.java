package com.practiceapp.practiceapp.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.mongodb.lang.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotNull;
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
    @NotNull
    private String name;

    @Field
    @NotNull
    private String description;

    @Field
    // Communities are public by default
    private boolean isPublic = true;

    @Field
    private String language;

    @Field
    @Nullable
    private String country;

    @Field
    @Nullable
    private String city;

    private List<String> topics = new ArrayList<>();

    //@JsonBackReference annotation here is to resolve the infinite loop issue (which ends up in stack overflow error) when trying to load a user or a community
    // The reasoning is that, when trying to load a user, it tries to load the dbref for the community in its joined communities list, and when trying to load that community,
    // it tries to load the dbref for the user in its members list. This goes on forever and ends up in an infinite loop.

    // References to users and posts:
    @JsonBackReference
    @DBRef(lazy = true)
    private List<UserEntity> members = new ArrayList<>();

    @JsonBackReference
    @DBRef(lazy = true)
    private List<PostEntity> posts = new ArrayList<>();

}
