package com.practiceapp.practiceapp.service;

import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.repository.CommunityRepository;
import com.practiceapp.practiceapp.utils.DetectLanguageApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommunityService {

    @Autowired
    private CommunityRepository communityRepository;

    @Autowired
    private DetectLanguageApi detectLanguageApi;

    /**
     * Interacts with community repository to create community
     *
     * @param communityEntity to be created
     * @return Created community entity
     */
    public CommunityEntity createCommunity(CommunityEntity communityEntity){
        return communityRepository.save(communityEntity);
    }

    /**
     * Communicates with third-party <a href="https://detectlanguage.com/">Detect Language API</a>
     *
     * @param text to be detected
     * @return detected language's code
     *
     * @see DetectLanguageApi#detectLanguage(String)
     */
    public String detectLanguage(String text){
        return detectLanguageApi.detectLanguage(text);
    }

    /**
     * Communicates with third-party <a href="https://detectlanguage.com/">Detect Language API</a>
     *
     * @return all languages with their codes and names
     *
     * @see DetectLanguageApi#getAllLanguages()
     */
    public String getALlLanguages(){
        return detectLanguageApi.getAllLanguages();
    }

}
