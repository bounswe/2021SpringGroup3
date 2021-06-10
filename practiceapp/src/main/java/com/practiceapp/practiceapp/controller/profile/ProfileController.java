package com.practiceapp.practiceapp.controller.profile;


import com.practiceapp.practiceapp.entity.Profile;
import com.practiceapp.practiceapp.service.ProfileService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @ApiOperation(
            value="Get Profile by its username",
            notes=" This method returns a profile which has the given username ",
            response=String.class)
    @ApiResponses(value={
            @ApiResponse(code = 200, message = "Successfully returned the profile"),
    })
    @RequestMapping(path = "/{username}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Profile getProfile(@PathVariable("username") String username){
        return profileService.getProfile(username);
    }


    @ApiOperation(value="Update Profile", notes=" This method updates the existed profile or creates new one", response=Profile.class)
    @ApiResponses(value={
            @ApiResponse(code = 201, message = "Successfully updated"),
            @ApiResponse(code = 400, message = "Bad Request: Ie.Mandatory fields are missing")
    })
    @RequestMapping(path = "/updateProfile", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Profile updateProfile(@Valid @RequestBody Profile profile){
        return profileService.updateProfile(profile);
    }


    @ApiOperation(value="Set Random Profile Pic", notes=" This method updates the existed profile's pic", response=Profile.class)
    @ApiResponses(value={
            @ApiResponse(code = 201, message = "Successfully updated"),
            @ApiResponse(code = 400, message = "Bad Request: Ie.Mandatory fields are missing")
    })    @RequestMapping(path = "/setRandomPic/{username}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Profile setRandomPic(@PathVariable("username") String username){
        return profileService.setRandomPic(username);
    }


}
