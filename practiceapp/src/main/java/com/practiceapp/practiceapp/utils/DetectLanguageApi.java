package com.practiceapp.practiceapp.utils;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.FileReader;
import java.nio.file.Paths;

@Component
public class DetectLanguageApi {



    private String uri = "https://ws.detectlanguage.com/0.2/detect";

    /**
     * Detects language of given text
     * @param text whose language to be detected
     * @return Detected language's code
     */
    public String detectLanguage(String text)
    {

        try
        {
            RestTemplate restTemplate = new RestTemplate();

            // Headers for request
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.AUTHORIZATION, "Bearer " + getApi_key());
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Parameters for request
            MultiValueMap<String, String> map= new LinkedMultiValueMap<>();
            map.add("q", text);

            // Creates the entity and sends request
            HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(map, headers);
            ResponseEntity<JsonNode> response = restTemplate.exchange(uri, HttpMethod.POST, entity, JsonNode.class);

            //return response.getBody().toString();
            return response.getBody().get("data").get("detections").get(0).get(0).get("language").asText();
        }
        catch(Exception e)
        {
            return "";
        }

    }

    /**
     * Gets all languages with their codes
     * @return List of languages as
     * [{
     *         "code":
     *         "name":
     * }]
     */
    public String getAllLanguages()
    {

        final String uri = "https://ws.detectlanguage.com/0.2/languages";

        try
        {
            RestTemplate restTemplate = new RestTemplate();
            // Headers for request
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.AUTHORIZATION, "Bearer " + getApi_key());
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Creates the entity and sends request
            HttpEntity<String> entity = new HttpEntity<>("{}", headers);
            ResponseEntity<JsonNode> response = restTemplate.exchange(uri, HttpMethod.GET, entity, JsonNode.class);
            return response.getBody().toString();
        }
        catch(Exception e)
        {
            return e.toString();
        }

    }

    // Gets API key from the api-keys.json file
    private String getApi_key(){
        try {
            String path = Paths.get("./api_keys.json").toAbsolutePath().toString();
            Object key_obj = new JSONParser().parse(new FileReader(path));
            JSONObject jsonObject = (JSONObject) key_obj;
            return jsonObject.get("languages").toString();
        }
        catch(Exception e) {
            return e.toString();
        }
    }
}
