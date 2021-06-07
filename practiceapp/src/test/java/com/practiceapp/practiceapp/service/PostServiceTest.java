package com.practiceapp.practiceapp.service;

import com.practiceapp.practiceapp.entity.PostEntity;
import com.practiceapp.practiceapp.repository.PostRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;


@SpringBootTest
@AutoConfigureMockMvc
public class PostServiceTest {

    @Autowired
    private PostService postService;

    @MockBean
    private PostRepository postRepository;

    private PostEntity postEntity;


    /**
     * Mock post entity generated to be given as parameter
     */
    @BeforeEach
    void initiate() {
        postEntity =new PostEntity();
        postEntity.setPost_id("abc123");
        postEntity.setText("Mock post");
    }


    /**
     * Checks if postservice returns with success assuming the post repository works fine.
     */
    @Test
    void savePost() {

        when(postRepository.save(any(PostEntity.class))).thenReturn(postEntity);
        int response = postService.savePost(postEntity);
        assertEquals(response,1);

    }

}
