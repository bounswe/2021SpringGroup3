package com.practiceapp.practiceapp.utils;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class AdviceApi {

    private String base_url = "https://api.adviceslip.com/";

    //Returns a random advice
    public String getAdvice(){
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(base_url + "advice",String.class);

        return response.getBody();
    }

    //Returns a list of advices with the given keyword
    public String searchAdvice(String query){
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(base_url + "advice/search/" + query,String.class);

        return response.getBody();
    }
}
