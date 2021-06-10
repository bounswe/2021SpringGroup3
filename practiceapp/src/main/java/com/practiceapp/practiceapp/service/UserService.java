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

    public String followUser(String follower_name, String followed_name){
        UserEntity follower = userRepository.getByUsername(follower_name);
        UserEntity followed = userRepository.getByUsername(followed_name);


        //checks if given usernames are registered
        if(follower == null || followed == null){
            return "User Not Found";
        }


        List<UserEntity> temp = follower.getFollowed_users();


        //checks if user already followed the given user
        //if not add it to followed list
        if(!temp.contains(followed)){
            temp.add(followed);
            follower.setFollowed_users(temp);
        }


        temp = followed.getFollower_users();

        //checks if user is already followed by the given user
        //if not add it to follower list
        if(!temp.contains(followed)){
            temp.add(follower);
            followed.setFollower_users(temp);
        }

        userRepository.save(follower);
        userRepository.save(followed);

        return "Success";
    }
}
