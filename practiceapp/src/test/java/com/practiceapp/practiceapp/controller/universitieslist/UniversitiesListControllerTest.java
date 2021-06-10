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

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;

@WebMvcTest(UniversitiesListController.class)
class UniversitiesListControllerTest {

    @MockBean
    private CommunityService communityService;

    @MockBean
    private UniversitiesListApi universitiesListApi;

    @Autowired
    private MockMvc mockMvc;

    List<String> universitiesList;
    String country;
    String university1;

    @BeforeEach
    void setUp() {
        universitiesList = new ArrayList<String>();
        universitiesList.add("AKAD Hochschulen für Berufstätige, Fachhochschule Leipzig");
        universitiesList.add("Hochschule für Berufstätige Rendsburg");
        country = new String("Germany");
        university1 = new String("AKAD Hochschulen für Berufstätige, Fachhochschule Leipzig");
    }

   @Test
   void getUniversitiesList() throws Exception {
        when(communityService.getUniversitiesList(any(String.class))).thenReturn(universitiesList);
        when(universitiesListApi.getUniversitiesList(any(String.class))).thenReturn(universitiesList);

        mockMvc.perform(MockMvcRequestBuilders.get("/universitieslist/"+country))
                .andExpect(MockMvcResultMatchers.status().is(200))                                  //Checks whether the status is 200.
                .andExpect(MockMvcResultMatchers.jsonPath("$[0]", Matchers.is(university1)));    //Checks whether the first university is correct.
    }
}