package com.practiceapp.practiceapp.service;

import com.practiceapp.practiceapp.entity.Profile;
import com.practiceapp.practiceapp.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    public Profile getProfile(String id) {
        return profileRepository.getById(id);
    }

    public Profile updateProfile(Profile profile) {
        return profileRepository.save(profile);
    }


}
