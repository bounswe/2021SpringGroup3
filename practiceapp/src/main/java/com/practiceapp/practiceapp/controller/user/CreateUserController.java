package com.practiceapp.practiceapp.controller.user;


import com.mashape.unirest.http.exceptions.UnirestException;
import com.practiceapp.practiceapp.entity.UserEntity;
import com.practiceapp.practiceapp.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/user")
public class CreateUserController {

    @Autowired
    private UserService userService;

    @ApiOperation(value="Save User",notes="User can be verify by verification token",response=String.class)
    @RequestMapping(path = "/save",method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE)
    public String saveUser(@Valid @RequestBody UserEntity userEntity){
        return userService.saveUser(userEntity);
    }

    @RequestMapping(path = "/{id}",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public UserEntity getUser(@PathVariable("id") String id){
        return null;
    }

    @RequestMapping(path = "/",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public UserEntity getUserByName(@RequestParam String userName){
       return userService.getByUserName(userName);
    }

    @RequestMapping(path = "/lyrics/{artist}/{title}",method = RequestMethod.GET)
    public ResponseEntity<String> getLyrics(@PathVariable("artist") String artist, @PathVariable("title") String title) throws UnirestException {
        return ResponseEntity.ok(userService.getLyrics(artist,title));
    }
}
