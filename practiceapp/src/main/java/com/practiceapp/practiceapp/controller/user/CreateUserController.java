package com.practiceapp.practiceapp.controller.user;


import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.entity.Profile;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.practiceapp.practiceapp.entity.UserEntity;
import com.practiceapp.practiceapp.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/user")
public class CreateUserController {

    @Autowired
    private UserService userService;

    @ApiOperation(value="Save User",notes="User can be verify by verification token",response=String.class)
    @RequestMapping(path = "/save", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public String saveUser(@Valid @RequestBody UserEntity userEntity){
        return userService.saveUser(userEntity);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public UserEntity getUser(@PathVariable("id") String id){
        return userService.getById(id);
    }

    @RequestMapping(path = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public UserEntity getUserByName(@RequestParam String userName){
       return userService.getByUserName(userName);
    }

    @RequestMapping(path = "/joinedcommunities", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CommunityEntity> getUserJoinedCommunitiesByName(@RequestParam String userName){
        return userService.getUserJoinedCommunitiesByName(userName);
    }

    @RequestMapping(path = "/createdcommunities", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CommunityEntity> getUserCreatedCommunitiesByName(@RequestParam String userName){
        return userService.getUserCreatedCommunitiesByName(userName);
    }
}
