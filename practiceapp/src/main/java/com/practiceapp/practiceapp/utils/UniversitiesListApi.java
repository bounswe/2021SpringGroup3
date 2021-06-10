package com.practiceapp.practiceapp.utils;

import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UniversitiesListApi {

    //Returns a list of universities of a specific country in a string list.
    public List<String> getUniversitiesList(String country) throws UnirestException {
        String jsonString = new String(Unirest.get("http://universities.hipolabs.com/search?country="+country)
                .asJson().getBody().toString());

        JSONArray jsonArray = new JSONArray(jsonString);

        List<String> names = new ArrayList<String>();

        for(int i=0;i<jsonArray.length();i++)
        {
            JSONObject jsonObject = jsonArray.getJSONObject(i);
            names.add(jsonObject.getString("name"));
        }
        return names;
    }
}
