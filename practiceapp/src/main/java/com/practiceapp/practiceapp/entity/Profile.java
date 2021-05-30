package com.practiceapp.practiceapp.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "profiles")
public class Profile {

    @Id
    @Field
    private String id;

    @Field
    private String name;

    @Field
    private String description;

    @Field
    private boolean isPublic = true;

    @Field
    private String photo;

    @Field
    private boolean isPhotoPublic = true;


}
