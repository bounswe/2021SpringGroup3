package com.practiceapp.practiceapp.controller.community;

import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.entity.PostEntity;
import com.practiceapp.practiceapp.service.CommunityService;
import org.bson.json.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping(path = "/community")
public class GetPostsController {

    @Autowired
    private CommunityService communityService;

    @RequestMapping(path = "/posts",method = RequestMethod.GET)
    public List<PostEntity> getPosts(@RequestParam String communityid){
        return communityService.getPosts(communityid);
    }



}
