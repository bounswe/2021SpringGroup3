package com.practiceapp.practiceapp.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @JsonManagedReference
    @DBRef(lazy = true)
    private List<CommunityEntity> joined_communities = new ArrayList<>();

    @JsonManagedReference
    @DBRef(lazy = true)
    private List<CommunityEntity> created_communities = new ArrayList<>();


}
