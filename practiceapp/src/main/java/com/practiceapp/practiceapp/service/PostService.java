package com.practiceapp.practiceapp.service;

import com.mashape.unirest.http.exceptions.UnirestException;
import com.practiceapp.practiceapp.entity.PostEntity;
import com.practiceapp.practiceapp.repository.PostRepository;
import com.practiceapp.practiceapp.utils.KanyeRestApi;
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
    private KanyeRestApi kanyeRestApi;

    @Autowired
    private PlacesApi placesApi;

    public PostEntity updatePost(PostEntity postEntity){
        PostEntity post = postRepository.save(postEntity);
        return post;
    }

    public String getRandomKanyeQuote() throws UnirestException {
        return kanyeRestApi.getRandomKanyeQuote();
    }

    /**
     * Saves the given post entity to database
     * @param postEntity to be created
     * @return success code
     */
    public int savePost(PostEntity postEntity){
        postRepository.save(postEntity);
        return 1;
    }

    /**
     * Calls third party Places API of Google with given input location
     * @param input is the location to search by text
     * @return the list of locations possible with given inputs
     * @throws UnirestException
     */
    public List<String> getPlaces(String input) throws UnirestException {
        return placesApi.getPlaces(input);
    }

}
