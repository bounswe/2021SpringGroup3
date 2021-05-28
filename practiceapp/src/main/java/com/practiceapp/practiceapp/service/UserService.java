package com.practiceapp.practiceapp.service;


import com.mashape.unirest.http.exceptions.UnirestException;
import com.practiceapp.practiceapp.entity.UserEntity;
import com.practiceapp.practiceapp.repository.UserRepository;
import com.practiceapp.practiceapp.utils.LyricsApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LyricsApi lyricsApi;

    public String saveUser(UserEntity userEntity){
        UserEntity user = userRepository.save(userEntity);
        return "Success";
    }

    public UserEntity getByUserName(String userName) {
        return userRepository.getByUsername(userName);
    }

    public String getLyrics(String artist,String title) throws UnirestException {
        return lyricsApi.getLyrics(artist,title);
    }
}
