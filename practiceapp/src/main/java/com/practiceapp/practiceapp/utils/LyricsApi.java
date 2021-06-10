package com.practiceapp.practiceapp.utils;

import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.stereotype.Component;

import java.net.http.HttpResponse;

@Component
public class LyricsApi {

    public String getLyrics(String artist,String title) throws UnirestException {
        return Unirest.get("https://api.lyrics.ovh/v1/"+artist+"/"+title)
                .asString().getBody();
    }
}
