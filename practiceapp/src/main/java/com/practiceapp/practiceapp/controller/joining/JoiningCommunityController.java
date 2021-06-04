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
    @RequestMapping(path = "/{user_id}_{community_id}", method = RequestMethod.PUT)
    public String joiningCommunity(@PathVariable("user_id") String user_id, @PathVariable("community_id") String community_id){
        return joiningCommunityService.joinCommunity(user_id,community_id);
    }

    @ApiOperation(value="Getting an advice", notes="This API call will return a random advice in json format.", response = String.class)
    @RequestMapping(path = "/getadvice", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public String getAdvice(){
        return joiningCommunityService.getAdvice();
    }

    @ApiOperation(value="Searching advices with a keyword", notes="This API call will return a list of advices with the given keyword in json format.", response = String.class)
    @RequestMapping(path = "/searchadvice/{query}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public String searchAdvice(@PathVariable("query") String query){
        return joiningCommunityService.searchAdvice(query);
    }





}