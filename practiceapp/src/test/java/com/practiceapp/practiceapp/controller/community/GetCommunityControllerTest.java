package com.practiceapp.practiceapp.controller.community;

import com.practiceapp.practiceapp.controller.community.GetCommunityController;
import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.repository.CommunityRepository;
import com.practiceapp.practiceapp.service.CommunityService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.Mockito.*;

@WebMvcTest(GetCommunityController.class)
class GetCommunityControllerTest {

    @MockBean
    private CommunityService communityService;

    @MockBean
    private CommunityRepository communityRepository;

    @Autowired
    private MockMvc mockMvc;

    private CommunityEntity communityEntity;

    @BeforeEach
    void setUp() {
        communityEntity= new CommunityEntity();
        communityEntity.setName("MockCommunity");
    }

    @Test
    void getCommunityByName() throws Exception {
        when(communityService.getByName(any(String.class))).thenReturn(communityEntity);
        when(communityRepository.getByName(any(String.class))).thenReturn(communityEntity);

        mockMvc.perform(MockMvcRequestBuilders.get("/community/").param("name",communityEntity.getName()))
                .andExpect(MockMvcResultMatchers.status().is(200))                                        //Checks whether the status is 200.
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(communityEntity.getName())); //Checks whether the community name is correct.
    }
}