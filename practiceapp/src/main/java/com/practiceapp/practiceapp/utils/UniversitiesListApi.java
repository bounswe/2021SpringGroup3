package com.practiceapp.practiceapp.utils;

import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.stereotype.Component;

@Component
public class UniversitiesListApi {

    //Returns a list of universities of a specific country in a JSONArray format.
    public String getUniversitiesList(String country) throws UnirestException {
        return Unirest.get("http://universities.hipolabs.com/search?country="+country)
             .asJson().getBody().toString();
    }
}
