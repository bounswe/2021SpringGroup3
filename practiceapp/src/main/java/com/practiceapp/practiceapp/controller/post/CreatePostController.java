package com.practiceapp.practiceapp.controller.post;


import com.practiceapp.practiceapp.entity.PostEntity;
import com.practiceapp.practiceapp.service.PostService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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


    @ApiOperation(value="Save Post",response=Integer.class)
    @RequestMapping(path = "/save",method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE)
    public int savePost(@Valid @RequestBody PostEntity postEntity){

        return postService.savePost(postEntity);
    }



}
