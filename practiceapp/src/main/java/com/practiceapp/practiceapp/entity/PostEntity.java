package com.practiceapp.practiceapp.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "posts")
public class PostEntity {

    private Set<PostEntity> communities;

}
