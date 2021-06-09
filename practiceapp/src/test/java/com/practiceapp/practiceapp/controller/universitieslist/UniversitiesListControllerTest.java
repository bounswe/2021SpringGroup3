package com.practiceapp.practiceapp.controller.universitieslist;

import com.practiceapp.practiceapp.service.CommunityService;
import com.practiceapp.practiceapp.utils.UniversitiesListApi;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.Mockito.*;

@WebMvcTest(UniversitiesListController.class)
class UniversitiesListControllerTest {

    @MockBean
    private CommunityService communityService;

    @MockBean
    private UniversitiesListApi universitiesListApi;

    @Autowired
    private MockMvc mockMvc;

    String universitiesList;
    String country;

    @BeforeEach
    void setUp() {
        universitiesList = new String("[{\"country\":\"Sweden\",\"web_pages\":[\"http://www.bth.se/\"],\"name\":\"Blekinge Institute of Technology\",\"domains\":[\"bth.se\"],\"state-province\":null,\"alpha_two_code\":\"SE\"}," +
                "{\"country\":\"Sweden\",\"web_pages\":[\"http://www.chalmers.se/\"],\"name\":\"Chalmers University of Technology\",\"domains\":[\"chalmers.se\"],\"state-province\":null,\"alpha_two_code\":\"SE\"}," +
                "{\"country\":\"Sweden\",\"web_pages\":[\"http://www.du.se/\"],\"name\":\"Dalarna University College\",\"domains\":[\"du.se\"],\"state-province\":null,\"alpha_two_code\":\"SE\"}," +
                "{\"country\":\"Sweden\",\"web_pages\":[\"http://www.gu.se/\"],\"name\":\"Göteborg University\",\"domains\":[\"gu.se\"],\"state-province\":null,\"alpha_two_code\":\"SE\"}]");

        country = new String("Sweden");
    }

    @Test
    void getUniversitiesList() throws Exception {
        when(communityService.getUniversitiesList(any(String.class))).thenReturn(universitiesList);
        when(universitiesListApi.getUniversitiesList(any(String.class))).thenReturn(universitiesList);

        mockMvc.perform(MockMvcRequestBuilders.get("/universitieslist/"+country))
                .andExpect(MockMvcResultMatchers.status().is(200))                                      //Checks whether the status is OK.
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].country", Matchers.is(country)))     //Checks whether the country is right.
                .andExpect(MockMvcResultMatchers.jsonPath("$[2].country", Matchers.is(country)));    //Checks whether the result includes multiple universities.
    }
}