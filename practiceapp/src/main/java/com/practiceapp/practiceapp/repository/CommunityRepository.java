package com.practiceapp.practiceapp.repository;

import com.practiceapp.practiceapp.entity.CommunityEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityRepository extends MongoRepository<CommunityEntity, String> {

    CommunityEntity getByName(String name);
    CommunityEntity getById(String id);
    List<CommunityEntity> findAllByPublicity(Boolean Publicity);
}
