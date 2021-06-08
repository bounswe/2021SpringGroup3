package com.practiceapp.practiceapp.controller.community;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.service.CommunityService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping(path = "/community")
public class CreateCommunityController {

    @Autowired
    private CommunityService communityService;

    @Autowired
    private ObjectMapper objectMapper;

    @ApiOperation(value="Create Community",
            notes=" This method creates new community. \n" +
                    "If language of community is not given, detects language using " +
                    "[third-party API](https://ws.detectlanguage.com). \n" +
                    "Community name and description can not be empty. \n" +
                    "Name of the community should be **unique**.",
            response=String.class)
    @ApiResponses(value={
            @ApiResponse(code = 201, message = "Successfully created community"),
            @ApiResponse(code = 400, message = "Bad Request: Ie.Mandatory fields are missing"),
            @ApiResponse(code = 403, message = "Forbidden: Name should be unique")
    })

    @RequestMapping(path = "/create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> createCommunity(@Valid @RequestBody CommunityEntity communityEntity) throws JsonProcessingException {
        if (communityService.exists(communityEntity.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body( "name should be unique");
        } else {
            if (communityEntity.getLanguage() == null){
                String detected_language = communityService.detectLanguage(communityEntity.getDescription());
                communityEntity.setLanguage(detected_language);
            }
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(objectMapper.writeValueAsString(communityService.createCommunity(communityEntity)));
        }
    }

}
