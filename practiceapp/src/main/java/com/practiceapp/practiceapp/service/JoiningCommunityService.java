package com.practiceapp.practiceapp.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.entity.UserEntity;
import com.practiceapp.practiceapp.repository.CommunityRepository;
import com.practiceapp.practiceapp.repository.UserRepository;
import com.practiceapp.practiceapp.utils.AdviceApi;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class JoiningCommunityService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CommunityRepository communityRepository;
    @Autowired
    private AdviceApi adviceApi;

    @Transactional
    public String joinCommunity(String user_name, String community_name){
        // Retrieving the entities
        UserEntity user = userRepository.getByUsername(user_name);
        CommunityEntity community = communityRepository.getByName(community_name);

        // If there is an entity that does not exist in the database, return "Fail"
        if(user == null || community == null){
            return "Fail";
        }

        // Retrieving the joined communities list
        List<CommunityEntity> joinedCommunities = user.getJoined_communities();

        // Checking if the community does not exist in the list
        if(!joinedCommunities.contains(community))
            joinedCommunities.add(community);

        // Setting the new community list
        user.setJoined_communities(joinedCommunities);
        userRepository.save(user);

        // Retrieving the members list
        List<UserEntity> members = community.getMembers();

        // Checking if the user does not exist in the list
        if(!members.contains(user))
            members.add(user);

        // Setting the new members list
        community.setMembers(members);
        communityRepository.save(community);

        return "Success";
    }

    public String getAdvice(){
        return adviceApi.getAdvice();
    }

    public String searchAdvice(String query){
        return adviceApi.searchAdvice(query);
    }

}