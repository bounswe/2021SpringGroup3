package com.practiceapp.practiceapp.utils;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import org.springframework.stereotype.Component;

@Component
public class PicturesApi {
    String base_url = "https://thatcopy.pw/catapi/rest/";

    public String getRandomCatPic()  {
        try {

            HttpResponse<JsonNode> obj =
                    Unirest.get(base_url).asJson();
            return obj.getBody().getObject().getString("url");
        }

        catch(Exception E) {
            return "https://i.thatcopy.pw/cat/N2puzyr.jpg";
        }
    }
}
