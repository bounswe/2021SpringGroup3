package com.practiceapp.practiceapp.service;

import com.practiceapp.practiceapp.entity.Profile;
import com.practiceapp.practiceapp.repository.ProfileRepository;
import com.practiceapp.practiceapp.utils.PicturesApi;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@WebMvcTest(ProfileService.class)
public class ProfileServiceTest {
    @Autowired
    private ProfileService profileService;

    @MockBean
    private ProfileRepository profileRepository;

    @MockBean
    private PicturesApi picturesApi;

    private Profile profile;

    @BeforeEach
    void setUp() {
        profile = new Profile();
        profile.setId("1233");
        profile.setName("name");
        profile.setDescription("Hi! I am <name>");
        profile.setPhoto("www.image.com");
    }

    @Test
    void updateProfile(){
        when(profileRepository.save(any(Profile.class))).thenReturn(profile);
        Profile response = profileService.updateProfile(profile);
        assertEquals(response, profile);
    }

    @Test
    void getProfile(){
        when(profileRepository.getById(any(String.class))).thenReturn(profile);
        Profile response = profileService.getProfile(profile.getId());
        assertEquals(response.getId(),profile.getId());
    }

    @Test
    void setRandomPic(){
        String url = "www.com";
        when(picturesApi.getRandomCatPic()).thenReturn(url);
        Profile response = profileService.setRandomPic(profile.getId());
        assertEquals(response.getPhoto().getClass(), url.getClass());
    }
}
