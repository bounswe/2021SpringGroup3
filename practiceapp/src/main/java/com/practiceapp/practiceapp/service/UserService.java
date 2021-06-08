package com.practiceapp.practiceapp.service;

import com.mashape.unirest.http.exceptions.UnirestException;
import com.practiceapp.practiceapp.entity.Profile;
import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.entity.UserEntity;
import com.practiceapp.practiceapp.repository.UserRepository;
import com.practiceapp.practiceapp.utils.LyricsApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfileService profileService;

    public String saveUser(UserEntity userEntity){
        Profile profile = new Profile();
        profile.setName(userEntity.getUsername());
        profile.setDescription("Default description");
        Profile updatedProfile = profileService.updateProfile(profile);

        userEntity.setProfile(updatedProfile);
        userRepository.save(userEntity);

        return "Success";
    }

    public UserEntity getByUserName(String userName) {
        return userRepository.getByUsername(userName);
    }



    public UserEntity getById(String id){
        return userRepository.getById(id);
    }

    public List<CommunityEntity> getUserJoinedCommunitiesByName(String userName) {
        return userRepository.getByUsername(userName).getJoined_communities();
    }

    public List<CommunityEntity> getUserCreatedCommunitiesByName(String userName) {
        return userRepository.getByUsername(userName).getCreated_communities();
    }
}
