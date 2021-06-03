package com.practiceapp.practiceapp.utils;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class AdviceApi {

    private String base_url = "https://api.adviceslip.com/";

    public String getAdvice(){
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(base_url + "advice",String.class);

        return response.getBody();
    }

    public String searchAdvice(String query){
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(base_url + "advice/search/" + query,String.class);

        return response.getBody();
    }
}
