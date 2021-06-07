package com.practiceapp.practiceapp.controller.profile;


import com.practiceapp.practiceapp.entity.Profile;
import com.practiceapp.practiceapp.service.ProfileService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @ApiOperation(value="Get profile by id",response=Profile.class)
    @RequestMapping(path = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Profile getProfile(@PathVariable("id") String id){
        return profileService.getProfile(id);
    }


    @ApiOperation(value="Update Profile",response=Profile.class)
    @RequestMapping(path = "/updateProfile", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Profile updateProfile(@Valid @RequestBody Profile profile){
        return profileService.updateProfile(profile);
    }


    @ApiOperation(value="Set random profile picture if the user didn't upload one",response=Profile.class)
    @RequestMapping(path = "/setRandomPic/{id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Profile setRandomPic(@PathVariable("id") String id){
        return profileService.setRandomPic(id);
    }


}
