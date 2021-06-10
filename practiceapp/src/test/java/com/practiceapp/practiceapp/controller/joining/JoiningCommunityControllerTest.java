package com.practiceapp.practiceapp.controller.joining;

import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.entity.UserEntity;
import com.practiceapp.practiceapp.service.JoiningCommunityService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;


@WebMvcTest(JoiningCommunityController.class)
public class JoiningCommunityControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JoiningCommunityService joiningCommunityService;

    private UserEntity user;
    private CommunityEntity community;

    @BeforeEach
    void setUp() {
        user = new UserEntity();
        user.setUsername("unitTestUser");
        user.setEmail("unitTestUser@boun.edu.tr");

        community = new CommunityEntity();
        community.setName("unitTestCommunity");
        community.setDescription("This is the unit testing community.");
        community.setPublicity(true);
    }

    @Test
    public void joiningCommunity() throws Exception{
        when(joiningCommunityService.joinCommunity(any(String.class),any(String.class))).thenReturn("Success");

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .put("/joiningCommunity/"+user.getUsername()+"/"+community.getName());

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        assertEquals(200,result.getResponse().getStatus());
        assertEquals("Success",result.getResponse().getContentAsString());
    }
}
