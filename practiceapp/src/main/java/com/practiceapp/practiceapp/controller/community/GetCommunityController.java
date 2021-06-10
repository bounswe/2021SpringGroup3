package com.practiceapp.practiceapp.controller.community;

import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/community")
public class GetCommunityController {

    @Autowired
    private CommunityService communityService;

    @RequestMapping(path = "/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public CommunityEntity getCommunityByName(@RequestParam String name)
    {
        return communityService.getByName(name);
    }

}
