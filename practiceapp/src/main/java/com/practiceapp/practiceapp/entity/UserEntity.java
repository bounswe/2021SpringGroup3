package com.practiceapp.practiceapp.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.bson.types.ObjectId;
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
    private ObjectId id;

    @Field
    private String username;

    @Field
    private String email;

    @Field
    @DBRef(lazy = true)
    private Profile profile;

    //@JsonIgnore annotation here is to resolve the infinite loop issue (which ends up in stack overflow error) when trying to load a user or a community
    // The reasoning is that, when trying to load a user, it tries to load the dbref for the community in its joined communities list, and when trying to load that community,
    // it tries to load the dbref for the user in its members list. This goes on forever and ends up in an infinite loop.

    @JsonIgnore
    @DBRef(lazy = true)
    private List<CommunityEntity> joined_communities = new ArrayList<>();

    @JsonIgnore
    @DBRef(lazy = true)
    private List<CommunityEntity> created_communities = new ArrayList<>();


}
