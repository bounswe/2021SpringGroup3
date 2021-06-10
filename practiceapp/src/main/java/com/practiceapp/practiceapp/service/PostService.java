package com.practiceapp.practiceapp.service;
import java.io.*;

import com.mashape.unirest.http.exceptions.UnirestException;
import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.entity.PostEntity;
import com.practiceapp.practiceapp.repository.CommunityRepository;
import com.practiceapp.practiceapp.repository.PostRepository;
import com.practiceapp.practiceapp.utils.KanyeRestApi;
import com.practiceapp.practiceapp.utils.PlacesApi;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommunityRepository communityRepository;

    @Autowired
    private KanyeRestApi kanyeRestApi;

    @Autowired
    private PlacesApi placesApi;

    /**
     * Updatees the given post entity in database
     * @param postEntity to be updated
     * @return updated postEntity
     */
    public PostEntity updatePost(PostEntity postEntity) { return postRepository.save(postEntity); }

    /**
     * Calls Kanye Rest API
     * @return a random Kanye Wst quote as a String
     * @throws UnirestException
     */
    public String getRandomKanyeQuote() throws UnirestException { return kanyeRestApi.getRandomKanyeQuote(); }

    /**
     * Saves the given post entity to database
     * @param postEntity to be created
     * @return 1 = success code   0 = failure
     */
    public int savePost(PostEntity postEntity){
        postEntity.setDate(new Date());
        List<CommunityEntity>communities = postEntity.getCommunities();
        postEntity = postRepository.save(postEntity);
        for (int i = 0;i<communities.size();i++) {
            CommunityEntity community=communities.get(i);
            community.getPosts().add(postEntity);
            communityRepository.save(community);
        }
        if(postEntity==null){
            return 0;
        }
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
