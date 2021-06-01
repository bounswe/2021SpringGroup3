package com.practiceapp.practiceapp.utils;

import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.apache.tomcat.util.json.JSONParser;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

@Component
public class UniversitiesListApi {

    public String getUniversitiesList(String country) throws UnirestException {
        return Unirest.get("http://universities.hipolabs.com/search?country="+country)
             .asJson().getBody().toString();
    }
}
