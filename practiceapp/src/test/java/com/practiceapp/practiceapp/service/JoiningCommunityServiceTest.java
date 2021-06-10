package com.practiceapp.practiceapp.service;

import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.entity.UserEntity;
import com.practiceapp.practiceapp.repository.CommunityRepository;
import com.practiceapp.practiceapp.repository.UserRepository;
import com.practiceapp.practiceapp.utils.AdviceApi;
import org.apache.catalina.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@WebMvcTest(JoiningCommunityService.class)
public class JoiningCommunityServiceTest {

    @Autowired
    private JoiningCommunityService joiningCommunityService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private CommunityRepository communityRepository;

    @MockBean
    private AdviceApi adviceApi;

    private UserEntity user;
    private CommunityEntity community;

    @BeforeEach
    void setUp() {
        user = new UserEntity();
        user.setUsername("unitTestUser");
        user.setEmail("unitTestUser@boun.edu.tr");

        community = new CommunityEntity();
        community.setName("unitTestCommunity");
        community.setDescription("This is the unit testing community.");
        community.setPublicity(true);
    }

    /**
     *  Checks whether
     *      - String response is "Success"
     *      - First element in user's joined communities list is community
     *      - First element in community's members list is user
     */
    @Test
    void joinCommunity_isListModified(){
        when(userRepository.getByUsername(any(String.class))).thenReturn(user);
        when(communityRepository.getByName(any(String.class))).thenReturn(community);

        String response = joiningCommunityService.joinCommunity(user.getUsername(),community.getName());

        List<CommunityEntity> communityEntityList = user.getJoined_communities();
        List<UserEntity> userEntityList = community.getMembers();

        assertEquals("Success",response);
        assertEquals(user.getUsername(),userEntityList.get(0).getUsername());
        assertEquals(community.getName(),communityEntityList.get(0).getName());
    }

}
