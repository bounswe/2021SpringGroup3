package com.practiceapp.practiceapp.controller.community;

import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.service.CommunityService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.skyscreamer.jsonassert.JSONAssert;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;


@WebMvcTest(GetCommunitiesByPublicityController.class)
public class GetCommunitiesByPublicityControllerTest {

    @MockBean
    private CommunityService communityService;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private CommunityEntity privateCommunity;
    private CommunityEntity publicCommunity1;
    private CommunityEntity publicCommunity2;

    @BeforeEach
    void setUp() {
        privateCommunity = new CommunityEntity();
        privateCommunity.setId("1");
        privateCommunity.setName("Mock_Private1");
        privateCommunity.setDescription("This is private community 1");
        privateCommunity.setPublicity(false);

        publicCommunity1 = new CommunityEntity();
        publicCommunity1.setId("2");
        publicCommunity1.setName("Mock_Public1");
        publicCommunity1.setDescription("This is public community 1");

        publicCommunity2 = new CommunityEntity();
        publicCommunity2.setId("3");
        publicCommunity2.setName("Mock_Public_2");
        publicCommunity2.setDescription("This is public community 2");
    }


    /**
     *  Checks whether {@link GetCommunitiesByPublicityController#getCommunitiesByPublicity(boolean)}
     *  returns communities
     *
     *  Expected:
     *              - Return OK-200
     *              - Calling service to get communities
     *              - Return communities as service responded
     *
     */

    @Test
    void getPublicCommunities() throws Exception {
        when(communityService.findByPublicity(any(Boolean.class))).thenReturn(List.of(publicCommunity1, publicCommunity2));

        MvcResult result = mockMvc.perform(get("/community/").param("public", "true")).andExpect(status().isOk()).andReturn();

        JSONAssert.assertEquals(objectMapper.writeValueAsString(List.of(publicCommunity1, publicCommunity2)),
                result.getResponse().getContentAsString(), false);
    }


    /**
     *  Checks whether
     *  {@link GetCommunitiesByPublicityController#getCommunitiesByPublicity(boolean)}
     *  calls service with correct parameter
     *
     *  Expected:
     *              - Return OK-200
     *              - Calling service for private communities as it is requested
     *              - Return communities as service responded
     *
     */

    @Test
    void isServiceCalledCorrectly() throws Exception {
        when(communityService.findByPublicity(false)).thenReturn(List.of(privateCommunity));
        when(communityService.findByPublicity(true)).thenReturn(List.of(publicCommunity1));

        MvcResult result = mockMvc.perform(get("/community/").param("public", "false")).andExpect(status().isOk()).andReturn();

        JSONAssert.assertEquals(objectMapper.writeValueAsString(List.of(privateCommunity)),
                result.getResponse().getContentAsString(), false);
    }
}
