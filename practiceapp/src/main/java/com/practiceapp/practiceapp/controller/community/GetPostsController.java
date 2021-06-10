package com.practiceapp.practiceapp.controller.community;

import com.mashape.unirest.http.exceptions.UnirestException;
import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.entity.PostEntity;
import com.practiceapp.practiceapp.service.CommunityService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
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

    @ApiOperation(value="Get Posts",
            notes=" This method gets posts of a community.",
            response=List.class)
    @ApiResponses(value={
            @ApiResponse(code = 200, message = "Successfully returned the posts."),
            @ApiResponse(code = 500, message = "Internal server error. There is no such community.")
    })

    @RequestMapping(path = "/posts/{name}",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<PostEntity> getPosts(@PathVariable("name") String communityName){
        return communityService.getPosts(communityName);
    }

    @ApiOperation(value="Get Definition",
            notes=" This method gets definition of a word.",
            response=String.class)
    @ApiResponses(value={
            @ApiResponse(code = 200, message = "Successfully returned the definition."),
            @ApiResponse(code = 500, message = "Internal server error. Word is not found.")
    })

    @RequestMapping(path = "/definition/{lang_code}/{word}",method = RequestMethod.GET)
    public ResponseEntity<String> getDefinition(@PathVariable("lang_code") String lang_code, @PathVariable("word") String word) throws UnirestException {
        return ResponseEntity.ok(communityService.getDefinition(lang_code,word));
    }



}
