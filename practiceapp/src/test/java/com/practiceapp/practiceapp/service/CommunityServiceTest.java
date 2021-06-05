package com.practiceapp.practiceapp.service;

import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.repository.CommunityRepository;
import com.practiceapp.practiceapp.utils.DetectLanguageApi;
import com.practiceapp.practiceapp.utils.DictionaryApi;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@WebMvcTest(CommunityService.class)
public class CommunityServiceTest {

    @Autowired
    private CommunityService communityService;

    @MockBean
    private CommunityRepository communityRepository;

    @MockBean
    private DetectLanguageApi detectLanguageApi;

    @MockBean
    private DictionaryApi dictionaryApi;

    private CommunityEntity publicCommunity;
    private CommunityEntity privateCommunity;




    @BeforeEach
    void setUp() {
        publicCommunity = new CommunityEntity();
        publicCommunity.setName("CmpE352_public");
        publicCommunity.setDescription("Fundamentals of Software Engineering");

        privateCommunity = new CommunityEntity();
        privateCommunity.setName("CmpE352_private");
        privateCommunity.setDescription("Fundamentals of Software Engineering");
        privateCommunity.setPublicity(false);
    }


    /**
     *  Checks whether
     *  {@link CommunityService#createCommunity(CommunityEntity)}
     *  calls CommunityRepository and returns respond of the repository without error
     *
     *  Expected:
     *              - Return community as repository {@link CommunityRepository#save(Object)} responded
     *
     */
    @Test
    void createCommunity_isCreatedCommunityReturnedCorrectly() {

        when(communityRepository.save(any(CommunityEntity.class))).thenReturn(publicCommunity);
        CommunityEntity response = communityService.createCommunity(publicCommunity);

        assertEquals(response, publicCommunity);

    }


    /**
     *  Checks whether
     *  {@link CommunityService#createCommunity(CommunityEntity)}
     *  calls repository with correct parameters
     *
     *  Expected:
     *              - Call repository {@link CommunityRepository#save(Object)} with specified community entity
     *
     */
    @Test
    void createCommunity_isRepositoryCalledCorrectly() {

        when(communityRepository.save(any(CommunityEntity.class))).thenAnswer(i -> i.getArguments()[0]);
        CommunityEntity response = communityService.createCommunity(publicCommunity);

        assertEquals(response, publicCommunity);

    }


    /**
     *  Checks whether 
     *  {@link CommunityService#findByPublicity(Boolean)}
     *  calls CommunityRepository and returns respond of the repository without error
     *
     *  Expected:
     *              - Return community as repository {@link CommunityRepository#save(Object)} responded
     *
     */
    @Test
    void findByPublicity_isCommunitiesReturnedCorrectly() {

        when(communityRepository.findAllByPublicity(any(Boolean.class))).thenReturn(List.of(publicCommunity));
        List<CommunityEntity> communityEntities = communityService.findByPublicity(publicCommunity.isPublicity());

        assertEquals(communityEntities, List.of(publicCommunity));
    }


    /**
     *  Checks whether 
     *  {@link CommunityService#findByPublicity(Boolean)}
     *  calls CommunityRepository and returns respond of the repository without error
     *
     *  Expected:
     *              - Return community as repository {@link CommunityRepository#save(Object)} responded
     *
     */
    @Test
    void findByPublicity_isRepositoryCalledCorrectly() {

        when(communityRepository.findAllByPublicity(true)).thenReturn(List.of(publicCommunity));
        when(communityRepository.findAllByPublicity(false)).thenReturn(List.of(publicCommunity));
        List<CommunityEntity> communityEntities = communityService.findByPublicity(publicCommunity.isPublicity());

        assertEquals(communityEntities.get(0).isPublicity(), publicCommunity.isPublicity());
    }


    /**
     *  Checks whether
     *  {@link CommunityService#detectLanguage(String)}
     *  works properly
     *
     *  Expected:
     *              - Return language code as
     *                {@link DetectLanguageApi#detectLanguage(String)}} responded
     *
     */
    @Test
    void detectLanguage() {

        when(detectLanguageApi.detectLanguage(any(String.class))).thenReturn("en");

        String language = communityService.detectLanguage(publicCommunity.getDescription());
        assertEquals(language, "en");
    }
}

