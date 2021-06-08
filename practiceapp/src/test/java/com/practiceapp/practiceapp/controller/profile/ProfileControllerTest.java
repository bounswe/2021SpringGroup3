package com.practiceapp.practiceapp.controller.profile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.practiceapp.practiceapp.entity.Profile;
import com.practiceapp.practiceapp.repository.ProfileRepository;
import com.practiceapp.practiceapp.service.ProfileService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ProfileController.class)
public class ProfileControllerTest {
    @MockBean
    private ProfileService profileService;

    @MockBean
    private ProfileRepository profileRepository;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;


    private Profile profile;

    @BeforeEach
    void setUp() {
        profile = new Profile();
        profile.setName("name");
        profile.setDescription("Hi! I am <name>");
        profile.setPhoto("www.image.com");
    }

    @Test
    void getProfile() throws Exception {

        when(profileService.getProfile(any(String.class))).thenReturn(profile);
        when(profileRepository.getByName(any(String.class))).thenReturn(profile);

        mockMvc.perform(get("/profile/{username}", profile.getName()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(profile.getName()));
    }

    @Test
    void updateProfile() throws Exception {
        when(profileService.updateProfile(any(Profile.class))).thenReturn(profile);

        MvcResult result = mockMvc.perform(post("/profile/updateProfile")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(profile)))
                .andExpect(status().isOk()).andReturn();


        JSONAssert.assertEquals(objectMapper.writeValueAsString(profile),
                result.getResponse().getContentAsString(), false);
    }

    @Test
    void setRandomPic() throws Exception {
        when(profileService.setRandomPic(any(String.class))).thenReturn(profile);

        MvcResult result = mockMvc.perform(post("/profile/setRandomPic/{username}", profile.getName())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(profile)))
                .andExpect(status().isOk()).andReturn();


        JSONAssert.assertEquals(objectMapper.writeValueAsString(profile),
                result.getResponse().getContentAsString(), false);
    }
}
