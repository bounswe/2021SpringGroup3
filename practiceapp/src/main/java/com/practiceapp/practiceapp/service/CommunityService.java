package com.practiceapp.practiceapp.service;

import com.practiceapp.practiceapp.repository.CommunityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommunityService {

    @Autowired
    private CommunityRepository communityRepository;

}
