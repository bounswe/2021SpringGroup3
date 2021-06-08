package com.practiceapp.practiceapp.service;

import com.practiceapp.practiceapp.entity.Profile;
import com.practiceapp.practiceapp.repository.ProfileRepository;
import com.practiceapp.practiceapp.utils.PicturesApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private PicturesApi picturesApi;

    public Profile getProfile(String username) {
        return profileRepository.getByName(username);
    }

    public Profile getProfileByName(String name){
        return profileRepository.getByName(name);
    }

    public Profile updateProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    public Profile setRandomPic(String username) {
        Profile profile = getProfile(username);
        if (profile != null) {
        String generatedPic = picturesApi.getRandomCatPic();
            profile.setPhoto(generatedPic);
            profile = updateProfile(profile);
        }
        return profile;
    }


}
