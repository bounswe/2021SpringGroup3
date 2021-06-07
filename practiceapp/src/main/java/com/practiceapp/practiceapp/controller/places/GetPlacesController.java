package com.practiceapp.practiceapp.controller.places;


import com.mashape.unirest.http.exceptions.UnirestException;
import com.practiceapp.practiceapp.service.PostService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/places")
public class GetPlacesController {

    @Autowired
    private PostService postService;

    @ApiOperation(
            value="Get places",
            notes = "Returns the relevant places to the given input text.",
            response=List.class)
    @ApiResponses(value={
            @ApiResponse(code = 200, message = "Places returned")
    })
    @RequestMapping(path = "/{input}",method = RequestMethod.GET)
    public ResponseEntity<List<String>> getPlaces(@PathVariable("input") String input) throws UnirestException {
        return ResponseEntity.ok(postService.getPlaces(input));
    }


}
