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

    public String joinCommunity(String user_id, String community_id){
        UserEntity user = userRepository.getById(user_id);
        CommunityEntity community = communityRepository.getById(community_id);

        if(user == null || community == null){
            return "Fail";
        }

        //Adding the community to the user's joinedCommunity list
        List<CommunityEntity> joinedCommunities = user.getJoined_communities();
        if(!joinedCommunities.contains(community))
            joinedCommunities.add(community);
        user.setJoined_communities(joinedCommunities);
        userRepository.save(user);

        List<UserEntity> members = community.getMembers();
        if(!members.contains(user))
            members.add(user);
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