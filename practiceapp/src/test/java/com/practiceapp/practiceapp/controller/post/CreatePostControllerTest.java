package com.practiceapp.practiceapp.controller.post;


import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.entity.PostEntity;
import com.practiceapp.practiceapp.entity.UserEntity;
import com.practiceapp.practiceapp.repository.PostRepository;
import com.practiceapp.practiceapp.service.PostService;
import org.junit.Test;
import static org.mockito.Mockito.*;


import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class CreatePostControllerTest {

    //It allows us to execute requests against the test context.
    @Autowired
    private MockMvc mockMvc;

    //Fields for mock post
    Date mock_date = new Date();

    UserEntity mock_user = new UserEntity();

    List<CommunityEntity> communities = new ArrayList<>(List.of(new CommunityEntity()));



    String examplePost = "{\"post_id\":\"123\",\"text\":\"this is a mock post\"}";





    @Test
    public void savePostTest() throws Exception {



        PostService postService = mock(PostService.class);  //mock the post service

        //mock the behavior of service entity and repository
        when(postService.savePost(any(PostEntity.class))).thenReturn(1);


        //Prepare the request
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/post/save")
                .accept(MediaType.APPLICATION_JSON).content(examplePost)
                .contentType(MediaType.APPLICATION_JSON);


        //Mock the request
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse response = result.getResponse();

        assertEquals(200, response.getStatus());  //check response status
        assertEquals(result.getResponse().getContentAsString(),"1");  //check the response(1 represents success)


    }

}
