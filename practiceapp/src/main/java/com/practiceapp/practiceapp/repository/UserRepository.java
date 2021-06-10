package com.practiceapp.practiceapp.repository;


import com.practiceapp.practiceapp.entity.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<UserEntity, String> {
    UserEntity getByUsername(String userName);
    UserEntity getById(String id);
}
