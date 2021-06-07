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

    public Profile getProfile(String id) {
        return profileRepository.getById(id);
    }

    public Profile updateProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    public Profile setRandomPic(String id) {
        Profile profile = getProfile(id);
        if (profile != null) {
        String generatedPic = picturesApi.getRandomCatPic();
            profile.setPhoto(generatedPic);
            profile = updateProfile(profile);
        }
        return profile;
    }


}
