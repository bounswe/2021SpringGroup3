package com.practiceapp.practiceapp.controller.user;


import com.practiceapp.practiceapp.entity.Profile;
import com.practiceapp.practiceapp.entity.UserEntity;
import com.practiceapp.practiceapp.service.ProfileService;
import com.practiceapp.practiceapp.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/user")
public class CreateUserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ProfileService profileService;

    @ApiOperation(value="Save User",notes="User can be verify by verification token",response=String.class)
    @RequestMapping(path = "/save", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public String saveUser(@Valid @RequestBody UserEntity userEntity){
        return userService.saveUser(userEntity);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public UserEntity getUser(@PathVariable("id") String id){
        return null;
    }

    @RequestMapping(path = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public UserEntity getUserByName(@RequestParam String userName){
       return userService.getByUserName(userName);
    }

    @RequestMapping(path = "/updateProfile", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Profile updateProfile(@Valid @RequestBody Profile profile){
        return profileService.updateProfile(profile);
    }


}
