package com.practiceapp.practiceapp.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import io.swagger.annotations.ApiModelProperty;

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
    @ApiModelProperty(
            notes = "The database generated community ID",
            hidden = true)
    private String id;

    @Field
    @NotNull(message="Community name can not be null")
    @ApiModelProperty(
                required = true,
                value = "Name of the community",
                example = "CmpE352")
    private String name;

    @Field
    @NotNull(message="Community description can not be null")
    @ApiModelProperty(
            required = true,
            value = "Description of the community",
            example = "Community about the fundamentals of software engineering")
    private String description;

    @Field
    @ApiModelProperty(
            value = "Privacy setting of the community",
            notes= "Communities are public by default")
    private boolean publicity = true;

    @Field
    @ApiModelProperty(
            value = "Preferred language in the community",
            example = "")
    private String language;

    // References to users and posts:

    @DBRef(lazy=true)
    @JsonBackReference(value="members")
    @ApiModelProperty(
            value = "Members of the community",
            hidden = true)
    private List<UserEntity> members = new ArrayList<>();

    @DBRef(lazy=true)
    @JsonBackReference(value="posts")
    @ApiModelProperty(
            value = "Posts of the community",
            hidden = true)
    private List<PostEntity> posts = new ArrayList<>();

}
