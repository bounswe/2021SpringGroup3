package com.practiceapp.practiceapp.controller.user;

import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.entity.UserEntity;
import com.practiceapp.practiceapp.service.CommunityService;
import com.practiceapp.practiceapp.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/joining")
public class JoinCommunityController {

    @Autowired
    private UserService userService;
    @Autowired
    private CommunityService communityService;

    @ApiOperation(value="Join Community", notes="Community will be added to the user's joined communities list.", response = String.class)
    @RequestMapping(path = "/joincommunity/{user_id}_{community_id}", method = RequestMethod.PUT)
    public UserEntity joinCommunity(@PathVariable("user_id") String user_id, @PathVariable("community_id") String community_id){
        UserEntity user = userService.getById(user_id);
        CommunityEntity community = communityService.getById(community_id);
        return userService.joinCommunity(user,community);
    }

    @ApiOperation(value="Add User", notes="User will be added to the community's members list.", response=String.class)
    @RequestMapping(path = "adduser/{user_id}_{community_id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public CommunityEntity addUser(@PathVariable("user_id") String user_id, @PathVariable("community_id") String community_id){
        UserEntity user = userService.getById(user_id);
        CommunityEntity community = communityService.getById(community_id);
        return communityService.addUser(user,community);
    }


}
