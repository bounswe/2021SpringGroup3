package com.practiceapp.practiceapp.service;

import com.mashape.unirest.http.exceptions.UnirestException;
import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.repository.CommunityRepository;
import com.practiceapp.practiceapp.utils.UniversitiesListApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommunityService {

    @Autowired
    private CommunityRepository communityRepository;

    @Autowired
    private UniversitiesListApi universitiesListApi;

    public CommunityEntity getByName(String name)
    {
        return communityRepository.getByName(name);
    }
    public String getUniversitiesList(String country) throws UnirestException
    {
        return universitiesListApi.getUniversitiesList(country);
    }
}
