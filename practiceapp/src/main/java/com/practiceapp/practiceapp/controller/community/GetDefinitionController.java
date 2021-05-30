package com.practiceapp.practiceapp.controller.community;

import com.mashape.unirest.http.JsonNode;
import com.practiceapp.practiceapp.service.CommunityService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/community")
public class GetDefinitionController {

    @Autowired
    private CommunityService communityService;
    @RequestMapping(path = "/definition/{lang_code}/{word}",method = RequestMethod.GET)
    public ResponseEntity<String> getDefinition(@PathVariable("lang_code") String lang_code, @PathVariable("word") String word) throws UnirestException {
        return ResponseEntity.ok(communityService.getDefinition(lang_code,word));
    }
}
