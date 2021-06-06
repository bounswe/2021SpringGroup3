package com.practiceapp.practiceapp.utils;

import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.stereotype.Component;

import java.net.http.HttpResponse;

@Component
public class KanyeRestApi {

    public String getRandomKanyeQuote() throws UnirestException {
        return Unirest.get("https://api.kanye.rest/").asString().getBody();
    }
}