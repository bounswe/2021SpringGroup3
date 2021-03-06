package com.practiceapp.practiceapp.controller.community;

import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.service.CommunityService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.mockito.Mockito.*;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.mockito.ArgumentMatchers.any;

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
        privateCommunity.setName("Mock_Private1");
        privateCommunity.setDescription("This is private community 1");
        privateCommunity.setPublicity(false);

        publicCommunity1 = new CommunityEntity();
        publicCommunity1.setName("Mock_Public1");
        publicCommunity1.setDescription("This is public community 1");

        publicCommunity2 = new CommunityEntity();
        publicCommunity2.setName("Mock_Public_2");
        publicCommunity2.setDescription("This is public community 2");
    }


    /**
     *  Checks whether {@link GetCommunitiesByPublicityController#getCommunitiesByPublicity(boolean)}
     *  returns public communities as requested
     *
     *  Expected:
     *              - Returning OK-200 and public communities as requested
     *
     */

    @Test
    void getCommunitiesByPublicity_isPublicCommunitiesReturnedSuccessfully() throws Exception {
        when(communityService.findByPublicity(any(Boolean.class))).thenReturn(List.of(publicCommunity1, publicCommunity2));

        MvcResult result = mockMvc.perform(get("/communities/").param("public", "true")).andExpect(status().isOk()).andReturn();

        JSONAssert.assertEquals(objectMapper.writeValueAsString(List.of(publicCommunity1, publicCommunity2)),
                result.getResponse().getContentAsString(), false);
    }


    /**
     *  Checks whether {@link GetCommunitiesByPublicityController#getCommunitiesByPublicity(boolean)}
     *  returns private communities as requested
     *
     *  Expected:
     *              - Return OK-200 and private communities as requested
     *
     */

    @Test
    void getCommunitiesByPublicity_isPrivateCommunitiesReturnedSuccessfully() throws Exception {
        when(communityService.findByPublicity(any(Boolean.class))).thenReturn(List.of(privateCommunity));

        MvcResult result = mockMvc.perform(get("/communities/").param("public", "false")).andExpect(status().isOk()).andReturn();

        JSONAssert.assertEquals(objectMapper.writeValueAsString(List.of(privateCommunity)),
                result.getResponse().getContentAsString(), false);
    }


    /**
     *  Checks whether {@link GetCommunitiesByPublicityController#getCommunitiesByPublicity(boolean)}
     *  returns public communities as requested
     *
     *  Expected:
     *              - Calling correct methods of the communityService with correct parameter exactly once
     *
     */

    @Test
    void getCommunitiesByPublicity_isCommunityServiceCalledCorrectly() throws Exception {
        when(communityService.findByPublicity(any(Boolean.class))).thenReturn(List.of(publicCommunity1, publicCommunity2));

        mockMvc.perform(get("/communities/").param("public", "true")).andExpect(status().isOk()).andReturn();

        verify(communityService, times(1)).findByPublicity(true);
        verifyNoMoreInteractions(communityService);
    }
}
