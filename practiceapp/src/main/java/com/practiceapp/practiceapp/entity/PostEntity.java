package com.practiceapp.practiceapp.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "posts")
public class PostEntity {



    @Id
    @Field
    private ObjectId post_id;

    @Field
    @NotNull
    private String text;

    @Field
    private Date date;

    @Field
    private String location;

    @DBRef(lazy = true)
    @Field
    private UserEntity author;

    @DBRef(lazy = true)
    @Field
    private List<CommunityEntity> communities = new ArrayList<>();




}
