package com.practiceapp.practiceapp.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

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
    private String post_id;

    @Field
    private String text;

    @Field
    private Date date;

    @Field
    private String location;

    @Field
    private UserEntity author;

    @Field
    private List<CommunityEntity> communities = new ArrayList<>();




}
