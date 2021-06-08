package com.practiceapp.practiceapp.controller.community;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.practiceapp.practiceapp.controller.user.CreateUserController;
import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.entity.PostEntity;
import com.practiceapp.practiceapp.repository.CommunityRepository;
import com.practiceapp.practiceapp.service.CommunityService;
import com.practiceapp.practiceapp.utils.DictionaryApi;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultMatcher;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@WebMvcTest(GetPostsController.class)
public class GetPostsControllerTest {

    @MockBean
    private CommunityService communityService;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private CommunityEntity communityEntity;
    private PostEntity post1;
    private PostEntity post2;

    @BeforeEach
    void setUp(){                   //set community and its posts
        post1 = new PostEntity();
        post2 = new PostEntity();
        communityEntity = new CommunityEntity();
        post1.setPost_id("post1");
        post2.setPost_id("post2");
        communityEntity.setName("CmpE352");
        communityEntity.setPosts(List.of(post1, post2));
    }

    @Test
    void getPosts() throws Exception{
        when(communityService.getPosts(any(String.class))).thenReturn(communityEntity.getPosts());
        MvcResult result = mockMvc.perform(get("/community/posts/{name}",communityEntity.getName()))
                .andExpect(status().isOk())                                                 //check status code
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))         //check response type
                .andReturn();

        JSONAssert.assertEquals(objectMapper.writeValueAsString(List.of(post1, post2)),    //check response content
                result.getResponse().getContentAsString(), false);
    }

}
