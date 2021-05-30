package com.practiceapp.practiceapp.service;

import com.mashape.unirest.http.exceptions.UnirestException;
import com.practiceapp.practiceapp.entity.PostEntity;
import com.practiceapp.practiceapp.repository.PostRepository;
import com.practiceapp.practiceapp.utils.PlacesApi;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PlacesApi placesApi;

    public int savePost(PostEntity postEntity){
        postRepository.save(postEntity);
        return 1;
    }

    public String getPlaces(String input) throws UnirestException {
        return placesApi.getPlaces(input);
    }

}
