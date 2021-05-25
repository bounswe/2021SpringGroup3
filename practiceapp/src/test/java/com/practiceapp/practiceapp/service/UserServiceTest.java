package com.practiceapp.practiceapp.service;

import com.practiceapp.practiceapp.entity.UserEntity;
import com.practiceapp.practiceapp.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.mockito.Mockito.*;
@WebMvcTest(UserService.class)
class UserServiceTest {

    @Autowired
    private UserService userService;

    @MockBean
    private UserRepository userRepository;

    private UserEntity userEntity;

    @BeforeEach
    void setUp() {
        userEntity=new UserEntity();
        userEntity.setUsername("cmpe");
    }

    @Test
    void saveUser() {

        when(userRepository.save(any(UserEntity.class))).thenReturn(userEntity);
        when(userRepository.save(any(UserEntity.class))).thenReturn(userEntity);

        String response = userService.saveUser(userEntity);

        assertEquals(response,"Success");

    }

    @Test
    void getByUserName() {
        when(userRepository.getByUsername(any(String.class))).thenReturn(userEntity);
        when(userRepository.getByUsername(any(String.class))).thenReturn(userEntity);
        UserEntity user = userService.getByUserName(userEntity.getUsername());
        assertEquals(user.getUsername(),userEntity.getUsername());
    }
}