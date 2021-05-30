package com.practiceapp.practiceapp.controller.places;


import com.mashape.unirest.http.exceptions.UnirestException;
import com.practiceapp.practiceapp.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/places")
public class GetPlacesController {

    @Autowired
    private PostService postService;

    @RequestMapping(path = "/{input}",method = RequestMethod.GET)
    public ResponseEntity<String> getPlaces(@PathVariable("input") String input) throws UnirestException {
        return ResponseEntity.ok(postService.getPlaces(input));
    }


}
