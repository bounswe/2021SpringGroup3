package com.practiceapp.practiceapp.entity;

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

    // References to users and posts:
    @DBRef(lazy=true)
    private List<UserEntity> members = new ArrayList<>();
    @DBRef(lazy=true)
    private List<PostEntity> posts = new ArrayList<>();

}
