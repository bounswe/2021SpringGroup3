package com.practiceapp.practiceapp.service;


import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.entity.UserEntity;
import com.practiceapp.practiceapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String saveUser(UserEntity userEntity){
        UserEntity user = userRepository.save(userEntity);
        return "Success";
    }

    public UserEntity getByUserName(String userName) {
        return userRepository.getByUsername(userName);
    }

    public UserEntity getById(String id){
        return userRepository.getById(id);
    }

    public UserEntity joinCommunity(UserEntity user, CommunityEntity community){
        List<CommunityEntity> joinedCommunities= user.getJoined_communities();
        joinedCommunities.add(community);
        user.setJoined_communities(joinedCommunities);
        userRepository.save(user);

        return user;
    }
}
