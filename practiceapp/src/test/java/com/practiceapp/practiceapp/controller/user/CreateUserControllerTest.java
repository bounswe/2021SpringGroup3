package com.practiceapp.practiceapp.controller.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.practiceapp.practiceapp.entity.UserEntity;
import com.practiceapp.practiceapp.repository.UserRepository;
import com.practiceapp.practiceapp.service.UserService;
import lombok.SneakyThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
@WebMvcTest(CreateUserController.class)
class CreateUserControllerTest {

    @MockBean
    private UserService userService;

    @MockBean
    private UserRepository userRepository;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private UserEntity userEntity;

    @BeforeEach
    void setUp() {
        userEntity= new UserEntity();
        userEntity.setUsername("cmpe");
    }

    @Test
    void saveUser() throws Exception{
        when(userService.saveUser(any(UserEntity.class))).thenReturn("Success");
        when(userRepository.save(any(UserEntity.class))).thenReturn(userEntity);

       mockMvc.perform(post("/user/save").contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(userEntity)))
               .andExpect(status().isOk())
               .andExpect(O->O.getResponse().getContentAsString().matches("Success"));
    }

    @Test
    void getUser() {
    }

    @Test
    void getUserByName() throws Exception {
        when(userService.getByUserName(any(String.class))).thenReturn(userEntity);
        when(userRepository.getByUsername(any(String.class))).thenReturn(userEntity);

        mockMvc.perform(get("/user/").param("userName",userEntity.getUsername()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value(userEntity.getUsername()));
    }
}