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
@Document(collection = "users")
public class UserEntity {

    @Id
    @Field
    private String id;

    @Field
    private String username;

    @Field
    private String email;

    private Set<CommunityEntity> joined_communities = new HashSet<>();

    private Set<CommunityEntity> created_communities = new HashSet<>();


}
