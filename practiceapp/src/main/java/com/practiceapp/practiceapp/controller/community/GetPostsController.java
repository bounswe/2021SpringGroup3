package com.practiceapp.practiceapp.controller.community;

import com.mashape.unirest.http.exceptions.UnirestException;
import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.entity.PostEntity;
import com.practiceapp.practiceapp.service.CommunityService;
import org.bson.json.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping(path = "/community")
public class GetPostsController {

    @Autowired
    private CommunityService communityService;

    @RequestMapping(path = "/posts/{name}",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<PostEntity> getPosts(@PathVariable("name") String communityid){
        return communityService.getPosts(communityid);
    }

    @RequestMapping(path = "/definition/{lang_code}/{word}",method = RequestMethod.GET)
    public ResponseEntity<String> getDefinition(@PathVariable("lang_code") String lang_code, @PathVariable("word") String word) throws UnirestException {
        return ResponseEntity.ok(communityService.getDefinition(lang_code,word));
    }



}
