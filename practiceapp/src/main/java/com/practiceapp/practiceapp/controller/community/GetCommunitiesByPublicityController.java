package com.practiceapp.practiceapp.controller.community;

import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.service.CommunityService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(path = "/communities")
public class GetCommunitiesByPublicityController {

    @Autowired
    private CommunityService communityService;


    @ApiOperation(
            value="Get Communities by publicity",
            notes=" This method returns public or private communities based on selection \n " +
                    "**true**: Public \n " +
                    "**false**: Private",
            response=String.class)
    @ApiResponses(value={
            @ApiResponse(code = 200, message = "Successfully returned communities"),
    })

    @RequestMapping(path = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<CommunityEntity> getCommunitiesByPublicity(@RequestParam(value="public", required = false, defaultValue = "true")
                                                                           boolean publicity) {
        return communityService.findByPublicity(publicity);
    }

}
