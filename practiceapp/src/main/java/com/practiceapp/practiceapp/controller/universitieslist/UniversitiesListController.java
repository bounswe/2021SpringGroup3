package com.practiceapp.practiceapp.controller.universitieslist;

import com.mashape.unirest.http.exceptions.UnirestException;
import com.practiceapp.practiceapp.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/universitieslist")
public class UniversitiesListController {

    @Autowired
    private CommunityService communityService;

    @RequestMapping(path = "/{country}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<String>> getUniversitiesList(@PathVariable("country") String country) throws UnirestException {
        return ResponseEntity.ok(communityService.getUniversitiesList(country));
    }

}
