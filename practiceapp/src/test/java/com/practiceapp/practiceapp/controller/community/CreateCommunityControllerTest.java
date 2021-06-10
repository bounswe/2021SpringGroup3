package com.practiceapp.practiceapp.controller.community;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.service.CommunityService;
import lombok.SneakyThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import static org.mockito.Mockito.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(CreateCommunityController.class)
@EnableWebMvc
public class CreateCommunityControllerTest {

    @MockBean
    private CommunityService communityService;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    // Community without specified language
    private CommunityEntity community;
    // Community whose language is detected by third-party API(mock)
    private CommunityEntity communityLangDetected;
    // Community with specified language
    private CommunityEntity communityWithLang;

    @BeforeEach
    void setUp() {
        community = new CommunityEntity();
        community.setName("CmpE352");
        community.setDescription("Fundamentals of Software Engineering");

        communityLangDetected = new CommunityEntity();
        communityLangDetected.setName("CmpE352");
        communityLangDetected.setDescription("Fundamentals of Software Engineering");
        communityLangDetected.setLanguage("en");

        communityWithLang = new CommunityEntity();
        communityWithLang.setName("CmpE352");
        communityWithLang.setDescription("Fundamentals of Software Engineering");
        communityWithLang.setLanguage("tr");
    }


    /**
     *  Checks whether controller returns created community as requested
     *
     *  Expected:
     *              - Returning CREATED-201 as status and created community
     *
     */

    @Test
    void createCommunity_isCommunityCreatedSuccessfully() throws Exception{

        when(communityService.detectLanguage(any(String.class))).thenReturn("en");
        when(communityService.createCommunity(any(CommunityEntity.class))).thenReturn(communityLangDetected);
        when(communityService.exists(any(String.class))).thenReturn(false);

        MvcResult result = mockMvc.perform(post("/community/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(community)))
                .andExpect(status().isCreated()).andReturn();

        JSONAssert.assertEquals(objectMapper.writeValueAsString(communityLangDetected),
                result.getResponse().getContentAsString(), false);
    }


    /**
     *  Checks whether controller returns created community as requested
     *
     *  Expected:
     *              - Calling correct methods of communityService with correct parameter exactly once
     *
     */

    @Test
    void createCommunity_isCommunityServiceCalledCorrectly() throws Exception{

        when(communityService.detectLanguage(any(String.class))).thenReturn("en");
        when(communityService.createCommunity(any(CommunityEntity.class))).thenReturn(communityLangDetected);
        when(communityService.exists(any(String.class))).thenReturn(false);

        mockMvc.perform(post("/community/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(community)))
                .andExpect(status().isCreated()).andReturn();

        verify(communityService, times(1)).detectLanguage(community.getDescription());
        verify(communityService, times(1)).createCommunity(communityLangDetected);
        verify(communityService, times(1)).exists(communityLangDetected.getName());
        verifyNoMoreInteractions(communityService);
    }


    /**
     *  Checks whether controller returns 403 since there exists a community with specified name
     *
     *  Expected:
     *              - Return FORBIDDEN-403
     *
     */

    @Test
    void createCommunity_isDuplicateNameRejected() throws Exception{
        when(communityService.exists(any(String.class))).thenReturn(true);

        mockMvc.perform(post("/community/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(community)))
                .andExpect(status().isForbidden()).andReturn();
    }


    /**
     *  Checks whether given language is changed by calling detectLanguage API
     *
     *  Expected:
     *              - Return CREATED-201
     *              - Set community's language as given (success: returns "tr").
     *
     */

    @Test
    void createCommunity_isGivenLanguagePreserved() throws Exception{
        when(communityService.exists(any(String.class))).thenReturn(false);
        when(communityService.detectLanguage(any(String.class))).thenReturn("en");
        when(communityService.createCommunity(any(CommunityEntity.class))).thenReturn(communityWithLang);

        MvcResult result = mockMvc.perform(post("/community/create").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(communityWithLang))).andExpect(status().isCreated()).andReturn();

        JSONAssert.assertEquals(objectMapper.writeValueAsString(communityWithLang),
                result.getResponse().getContentAsString(), false);

    }
}
