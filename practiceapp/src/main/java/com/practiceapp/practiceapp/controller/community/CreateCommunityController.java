package com.practiceapp.practiceapp.controller.community;

import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.service.CommunityService;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping(path = "/community")
public class CreateCommunityController {

    @Autowired
    private CommunityService communityService;

    @ApiOperation(value="Create Community", response=String.class)
    @RequestMapping(path = "/create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public CommunityEntity createCommunity(@Valid @RequestBody CommunityEntity communityEntity){
        String detected_language = communityService.detectLanguage(communityEntity.getDescription());
        communityEntity.setLanguage(detected_language);
        return communityService.createCommunity(communityEntity);
    }




}
