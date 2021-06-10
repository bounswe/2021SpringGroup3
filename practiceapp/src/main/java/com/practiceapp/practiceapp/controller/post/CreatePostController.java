package com.practiceapp.practiceapp.controller.post;


import com.practiceapp.practiceapp.entity.PostEntity;
import com.practiceapp.practiceapp.service.PostService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;
import java.io.File;

@RestController
@RequestMapping(path = "/post")
public class CreatePostController {

    @Autowired
    private PostService postService;


    @ApiOperation(
            value="Save Post",
            notes = "Implemented to create new posts and submitting to the database.",
            response=Integer.class)
    @ApiResponses(value={
            @ApiResponse(code = 200, message = "Post created"),
            @ApiResponse(code = 400, message = "Bad Request: Ie.Mandatory fields are missing")
    })
    @RequestMapping(path = "/save",method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE)
    public int savePost(@Valid @RequestBody PostEntity postEntity){

        return postService.savePost(postEntity);
    }



}
