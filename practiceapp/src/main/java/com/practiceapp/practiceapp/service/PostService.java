package com.practiceapp.practiceapp.service;

import com.mashape.unirest.http.exceptions.UnirestException;
import com.practiceapp.practiceapp.entity.PostEntity;
import com.practiceapp.practiceapp.repository.PostRepository;
import com.practiceapp.practiceapp.utils.KanyeRestApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private KanyeRestApi kanyeRestApi;

    public PostEntity updatePost(PostEntity postEntity){
        PostEntity post = postRepository.save(postEntity);
        return post;
    }

    public String getRandomKanyeQuote() throws UnirestException {
        return kanyeRestApi.getRandomKanyeQuote();
    }

}
