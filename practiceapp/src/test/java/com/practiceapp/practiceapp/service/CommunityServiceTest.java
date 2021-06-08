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
     *
     */
    @Test
    void createCommunity_isCreatedCommunityReturnedCorrectly() {

        when(communityRepository.save(any(CommunityEntity.class))).thenReturn(publicCommunity);
        CommunityEntity response = communityService.createCommunity(publicCommunity);

        assertEquals(publicCommunity, response);

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

        assertEquals(publicCommunity, response);

    }


    /**
     *  Checks whether 
     *  {@link CommunityService#findByPublicity(Boolean)}
     *  calls CommunityRepository and returns respond of the repository without error
     *
     *  Expected:
     *              - Return community as repository {@link CommunityRepository#findAllByPublicity(Boolean)} responded
     *
     */
    @Test
    void findByPublicity_isCommunitiesReturnedCorrectly() {

        when(communityRepository.findAllByPublicity(any(Boolean.class))).thenReturn(List.of(publicCommunity));
        List<CommunityEntity> communityEntities = communityService.findByPublicity(publicCommunity.isPublicity());

        assertEquals(List.of(publicCommunity), communityEntities);
    }


    /**
     *  Checks whether 
     *  {@link CommunityService#findByPublicity(Boolean)}
     *  calls repository with correct parameter
     *
     *  Expected:
     *              - Calling repository with correct parameter (true)
     *              - Return community as repository {@link CommunityRepository#findAllByPublicity(Boolean)} responded
     *
     */
    @Test
    void findByPublicity_isRepositoryCalledCorrectly() {

        when(communityRepository.findAllByPublicity(true)).thenReturn(List.of(publicCommunity));
        when(communityRepository.findAllByPublicity(false)).thenReturn(List.of(publicCommunity));

        List<CommunityEntity> communityEntities = communityService.findByPublicity(publicCommunity.isPublicity());

        assertEquals( publicCommunity.isPublicity(), communityEntities.get(0).isPublicity());
    }


    /**
     *  Checks whether
     *  {@link CommunityService#getByName(String)}
     *  works properly
     *
     *  Expected:
     *              - Return community entity as {@link CommunityRepository#getByName(String)} responded
     *
     */
    @Test
    void getByName() {
        when(communityRepository.getByName(any(String.class))).thenReturn(publicCommunity);

        CommunityEntity response = communityService.getByName(publicCommunity.getName());

        assertEquals(publicCommunity, response);
    }


    /**
     *  Checks whether
     *  {@link CommunityService#exists(String)}
     *  works properly
     *
     *  Expected:
     *              - Return true since {@link CommunityRepository#getByName(String)} responds as
     *                there is no community with specified name.
     *
     */
    @Test
    void exists_isFalseWhenNotExists() {
        when(communityRepository.getByName(any(String.class))).thenReturn(null);

        Boolean response = communityService.exists("new community name");

        assertEquals(false, response);
    }


    /**
     *  Checks whether
     *  {@link CommunityService#exists(String)}
     *  works properly
     *
     *  Expected:
     *              - Return false since {@link CommunityRepository#getByName(String)}
     *                returns community
     *
     */
    @Test
    void exists_isTrueWhenExists() {
        when(communityRepository.getByName(any(String.class))).thenReturn(publicCommunity);

        Boolean response = communityService.exists(publicCommunity.getName());

        assertEquals(true, response);
    }



    /**
     *  Checks whether
     *  {@link CommunityService#getPosts(String)}
     *  works properly
     *
     *  Expected:
     *              - Return list of posts as {@link CommunityRepository#getByName(String)}.getPosts() responded
     *
     */
    @Test
    void getPosts() {
        when(communityRepository.getByName(any(String.class))).thenReturn(communityWithPost);

        List<PostEntity> response = communityService.getPosts(communityWithPost.getName());

        assertEquals(communityWithPost.getPosts(), response);
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
     *
     */
    @Test
    void detectLanguage() {

        when(detectLanguageApi.detectLanguage(any(String.class))).thenReturn("en");

        String language = communityService.detectLanguage(publicCommunity.getDescription());
        assertEquals("en", language);
    }
}

