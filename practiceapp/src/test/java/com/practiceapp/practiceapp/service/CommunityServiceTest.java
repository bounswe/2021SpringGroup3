package com.practiceapp.practiceapp.service;

import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.entity.PostEntity;
import com.practiceapp.practiceapp.repository.CommunityRepository;
import com.practiceapp.practiceapp.utils.DetectLanguageApi;
import com.practiceapp.practiceapp.utils.DictionaryApi;
import com.practiceapp.practiceapp.utils.UniversitiesListApi;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.verifyNoMoreInteractions;

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

    @MockBean
    private UniversitiesListApi universitiesListApi;

    private CommunityEntity publicCommunity;
    private CommunityEntity privateCommunity;
    private CommunityEntity communityWithPost;

    private PostEntity post;


    @BeforeEach
    void setUp() {
        publicCommunity = new CommunityEntity();
        publicCommunity.setName("CmpE352_public");
        publicCommunity.setDescription("Fundamentals of Software Engineering");

        privateCommunity = new CommunityEntity();
        privateCommunity.setName("CmpE352_private");
        privateCommunity.setDescription("Fundamentals of Software Engineering");
        privateCommunity.setPublicity(false);


        post = new PostEntity();
        post.setText("mock_post");

        communityWithPost = new CommunityEntity();
        communityWithPost.setName("community_with_post");
        communityWithPost.setDescription("this community has post");
        communityWithPost.setPosts(List.of(post));
    }


    /**
     *  Checks whether
     *  {@link CommunityService#createCommunity(CommunityEntity)}
     *  calls CommunityRepository and returns respond of the repository without error
     *
     *  Expected:
     *              - Return community as repository {@link CommunityRepository#save(Object)} responded
     *              - Calling repository with correct parameter (save)
     *              - Calling specified method of repository exactly once
     *              - No other methods of the repository is called during this test
     *
     */
    @Test
    void createCommunity_isCommunityCreatedSuccessfully() {

        when(communityRepository.save(any(CommunityEntity.class))).thenReturn(publicCommunity);
        CommunityEntity response = communityService.createCommunity(publicCommunity);

        assertEquals(publicCommunity, response);

        verify(communityRepository, times(1)).save(publicCommunity);
        verifyNoMoreInteractions(communityRepository);

    }


    /**
     *  Checks whether 
     *  {@link CommunityService#findByPublicity(Boolean)}
     *  calls CommunityRepository and returns respond of the repository without error
     *
     *  Expected:
     *              - Return community as repository {@link CommunityRepository#findAllByPublicity(Boolean)} responded
     *              - Calling specified method of the repository with correct parameter (findAllByPublicity)
     *              - Calling specified method of repository exactly once
     *              - No other methods of the repository is called during this test
     */
    @Test
    void findByPublicity_isCommunitiesReturnedCorrectly() {

        when(communityRepository.findAllByPublicity(any(Boolean.class))).thenReturn(List.of(publicCommunity));
        List<CommunityEntity> communityEntities = communityService.findByPublicity(publicCommunity.isPublicity());

        assertEquals(List.of(publicCommunity), communityEntities);

        verify(communityRepository, times(1)).findAllByPublicity(publicCommunity.isPublicity());
        verifyNoMoreInteractions(communityRepository);
    }


    /**
     *  Checks whether
     *  {@link CommunityService#getByName(String)}
     *  works properly
     *
     *  Expected:
     *              - Return community entity as {@link CommunityRepository#getByName(String)} responded
     *              - Calling specified method of the repository with correct parameter
     *              - Calling specified method of the repository exactly once
     *              - No other methods of the repository is called during this test
     *
     */
    @Test
    void getByName_isCommunityReturnedSuccessfully() {
        when(communityRepository.getByName(any(String.class))).thenReturn(publicCommunity);

        CommunityEntity response = communityService.getByName(publicCommunity.getName());

        assertEquals(publicCommunity, response);

        verify(communityRepository, times(1)).getByName(publicCommunity.getName());
        verifyNoMoreInteractions(communityRepository);
    }


    /**
     *  Checks whether
     *  {@link CommunityService#exists(String)}
     *  works properly
     *
     *  Expected:
     *              - Return true since {@link CommunityRepository#getByName(String)} responds as
     *                there is no community with specified name.
     *              - Calling specified method of the repository with correct parameter
     *              - Calling specified method of the repository exactly once
     *              - No other methods of the repository is called during this test
     *
     */
    @Test
    void exists_isFalseWhenNotExists() {
        when(communityRepository.getByName(any(String.class))).thenReturn(null);

        Boolean response = communityService.exists("new community name");

        assertEquals(false, response);

        verify(communityRepository, times(1)).getByName("new community name");
        verifyNoMoreInteractions(communityRepository);
    }


    /**
     *  Checks whether
     *  {@link CommunityService#exists(String)}
     *  works properly
     *
     *  Expected:
     *              - Return false since {@link CommunityRepository#getByName(String)}
     *                returns community
     *              - Calling specified method of the repository with correct parameter
     *              - Calling specified method of the repository exactly once
     *              - No other methods of the repository is called during this test
     */
    @Test
    void exists_isTrueWhenExists() {
        when(communityRepository.getByName(any(String.class))).thenReturn(publicCommunity);

        Boolean response = communityService.exists(publicCommunity.getName());

        assertEquals(true, response);

        verify(communityRepository, times(1)).getByName(publicCommunity.getName());
        verifyNoMoreInteractions(communityRepository);
    }



    /**
     *  Checks whether
     *  {@link CommunityService#getPosts(String)}
     *  works properly
     *
     *  Expected:
     *              - Return list of posts as {@link CommunityRepository#getByName(String)}.getPosts() responded
     *              - Calling specified method of the repository with correct parameter
     *              - Calling specified method of the repository exactly once
     *              - No other methods of the repository is called during this test
     */
    @Test
    void getPosts() {
        when(communityRepository.getByName(any(String.class))).thenReturn(communityWithPost);

        List<PostEntity> response = communityService.getPosts(communityWithPost.getName());

        assertEquals(communityWithPost.getPosts(), response);

        verify(communityRepository, times(1)).getByName(communityWithPost.getName());
        verifyNoMoreInteractions(communityRepository);
    }


    // BELOW FUNCTIONS TESTS SERVICE FUNCTIONS RELATED TO THIRD-PARTY APIs:

    /**
     *  Checks whether
     *  {@link CommunityService#detectLanguage(String)}
     *  works properly
     *
     *  Expected:
     *              - Return language code as
     *                {@link DetectLanguageApi#detectLanguage(String)} responded
     *              - Calling specified method of the DetectLanguageApi with correct parameter
     *              - Calling specified method of the DetectLanguageApi exactly once
     *              - No other methods of the DetectLanguageApi is called during this test
     */
    @Test
    void detectLanguage() {

        when(detectLanguageApi.detectLanguage(any(String.class))).thenReturn("en");

        String language = communityService.detectLanguage(publicCommunity.getDescription());
        assertEquals("en", language);

        verify(detectLanguageApi, times(1)).detectLanguage(publicCommunity.getDescription());
        verifyNoMoreInteractions(detectLanguageApi);
        verifyNoMoreInteractions(communityRepository);
    }
}

