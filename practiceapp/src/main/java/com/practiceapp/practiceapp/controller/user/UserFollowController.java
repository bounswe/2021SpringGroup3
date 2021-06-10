package com.practiceapp.practiceapp.controller.user;


import com.practiceapp.practiceapp.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping(path = "/userfollow")
public class UserFollowController {


    @Autowired
    private UserService userService;

    @ApiOperation(value="Follow User",response=String.class)
    @RequestMapping(path = "/{follower_name}/{followed_name}",method = RequestMethod.PUT)
    public String followUser(@PathVariable("follower_name") String follower_name, @PathVariable("followed_name") String followed_name){
        return userService.followUser(follower_name, followed_name);
    }



}