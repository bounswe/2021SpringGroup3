package com.practiceapp.practiceapp.repository;

import com.practiceapp.practiceapp.entity.PostEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends MongoRepository<PostEntity, String> {

}
