package com.practiceapp.practiceapp.service;

import com.practiceapp.practiceapp.entity.PostEntity;
import com.practiceapp.practiceapp.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    

}
