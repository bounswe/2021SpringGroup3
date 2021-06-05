package com.practiceapp.practiceapp.controller.advice;

import com.practiceapp.practiceapp.service.JoiningCommunityService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/advice")
public class AdviceController {

    @Autowired
    private JoiningCommunityService joiningCommunityService;

    @ApiOperation(value="Getting an advice", notes="This API call will return a random advice in json format.", response = String.class)
    @RequestMapping(path = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public String getAdvice(){
        return joiningCommunityService.getAdvice();
    }

    @ApiOperation(value="Searching advices with a keyword", notes="This API call will return a list of advices with the given keyword in json format.", response = String.class)
    @RequestMapping(path = "/search/{query}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public String searchAdvice(@PathVariable("query") String query){
        return joiningCommunityService.searchAdvice(query);
    }
}
