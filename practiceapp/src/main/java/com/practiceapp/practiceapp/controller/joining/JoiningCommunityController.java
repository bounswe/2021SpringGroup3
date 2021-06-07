package com.practiceapp.practiceapp.controller.joining;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.entity.UserEntity;
import com.practiceapp.practiceapp.service.CommunityService;
import com.practiceapp.practiceapp.service.JoiningCommunityService;
import com.practiceapp.practiceapp.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.print.attribute.standard.Media;

@RestController
@RequestMapping(path = "/joiningCommunity")
public class JoiningCommunityController {

    @Autowired
    private JoiningCommunityService joiningCommunityService;

    @ApiOperation(value="Joining Community", notes="Community will be added to the user's joined communities list and the user will be added to the community's members list.", response = String.class)
    @RequestMapping(path = "/{user_name}/{community_name}", method = RequestMethod.PUT)
    public String joiningCommunity(@PathVariable("user_name") String user_name, @PathVariable("community_name") String community_name){
        return joiningCommunityService.joinCommunity(user_name,community_name);
    }

}