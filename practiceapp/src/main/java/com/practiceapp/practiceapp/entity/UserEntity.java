package com.practiceapp.practiceapp.entity;


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
@Document(collection = "users")
public class UserEntity {

    @Id
    @Field
    private String id;

    @Field
    private String username;

    @Field
    private String email;

    @Field
    @DBRef(lazy = true)
    private Profile profile;

    @DBRef(lazy = true)
    private List<CommunityEntity> joined_communities = new ArrayList<>();

    @DBRef(lazy = true)
    private List<CommunityEntity> created_communities = new ArrayList<>();


}
