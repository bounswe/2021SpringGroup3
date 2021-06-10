package com.practiceapp.practiceapp.repository;

import com.practiceapp.practiceapp.entity.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProfileRepository extends MongoRepository<Profile, String> {


    Profile getByName(String username);


}
