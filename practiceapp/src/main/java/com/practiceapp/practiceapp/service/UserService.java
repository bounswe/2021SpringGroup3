package com.practiceapp.practiceapp.service;


import com.practiceapp.practiceapp.entity.UserEntity;
import com.practiceapp.practiceapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String saveUser(UserEntity userEntity){
        UserEntity user = userRepository.save(userEntity);
        return "Succes";
    }

    public UserEntity getByUserName(String userName) {
        return userRepository.getByUsername(userName);
    }
}
