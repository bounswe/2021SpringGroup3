package com.practiceapp.practiceapp.controller.post;


import com.mashape.unirest.http.exceptions.UnirestException;
import com.practiceapp.practiceapp.entity.PostEntity;
import com.practiceapp.practiceapp.service.PostService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/post")
public class UpdatePostController {

    @Autowired
    private PostService postService;

    @ApiOperation(value="Update Post",response=String.class)
    @RequestMapping(path = "/update",method = RequestMethod.PUT,consumes = MediaType.APPLICATION_JSON_VALUE)
    public int updatePost(@Valid @RequestBody PostEntity postEntity){
        return postService.updatePost(postEntity);
    }

    @RequestMapping(path = "/kanye-quote",method = RequestMethod.GET)
    public ResponseEntity<String> getRandomKanyeQuote() throws UnirestException {
        return ResponseEntity.ok(postService.getRandomKanyeQuote());
    }
}
