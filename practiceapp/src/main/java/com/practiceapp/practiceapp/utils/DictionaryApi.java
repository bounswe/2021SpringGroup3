package com.practiceapp.practiceapp.utils;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.request.body.Body;
import org.json.JSONObject;
import org.springframework.stereotype.Component;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

@Component
public class DictionaryApi {


    public HttpResponse<JsonNode> getDefinition(String lang_code, String word) throws UnirestException {
        HttpResponse<JsonNode> obj=
                Unirest.get("https://api.dictionaryapi.dev/api/v2/entries/" + lang_code + "/" + word).asJson();
        return obj;
    }
}
