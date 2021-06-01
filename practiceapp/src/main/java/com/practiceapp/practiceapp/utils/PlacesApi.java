package com.practiceapp.practiceapp.utils;


import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.json.JSONArray;
//import org.json.JSONObject;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Component;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Component
public class PlacesApi {


    private String base_url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=";
    private String api_key;


    /**
     *
     * @param input location
     * @return candidates for input location according to text search
     * @throws UnirestException
     */
    public List<String> getPlaces(String input) throws UnirestException {

        List<String> places = new ArrayList<String>();

        try {
            String path = "src/main/resources/api_keys.json";
            Object key_obj = new JSONParser().parse(new FileReader(path));

            JSONObject jsonObject = (JSONObject) key_obj;

            //api key is fetched from other file which is not open source
            api_key = jsonObject.get("places").toString();


            HttpResponse<JsonNode> request = Unirest.get(base_url + input + "&key=" + api_key).asJson();
            org.json.JSONObject obj = request.getBody().getObject();
            JSONArray arr = obj.getJSONArray("results");
            for (int i = 0; i < arr.length(); i++) {
                String place = arr.getJSONObject(i).getString("name");
                places.add(place);
            }

            return places;
        }

        catch(Exception e){
            return places;
        }


    }



}
