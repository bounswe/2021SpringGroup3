package com.practiceapp.practiceapp.controller.views;


import com.practiceapp.practiceapp.entity.CommunityEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;

@Controller
@RequestMapping(path = "/home/communities")
public class GetCommunityViewController {

    private String url = "http://localhost:9090/community";

    RestTemplate restTemplate = new RestTemplate();

    @RequestMapping(path = "/",method = RequestMethod.GET)
    public String showCommunity(Model model, @RequestParam String name){

        CommunityEntity community = restTemplate.getForObject(url + "/?name=" + name, CommunityEntity.class);
        model.addAttribute("community",community);
        return "community";
    }

    @RequestMapping(path = "/",method = RequestMethod.POST)
    public String seePosts(@ModelAttribute("community") CommunityEntity communityEntity) {
        String name = communityEntity.getName();
        return "redirect:/home/posts/"+name;
    }


    @RequestMapping(path = "/search",method = RequestMethod.GET)
    public String showCommunitySearchForm(Model model) {
        CommunityEntity communityEntity = new CommunityEntity();
        model.addAttribute("community", communityEntity);

        return "community_search_form";
    }

    @RequestMapping(path = "/search",method = RequestMethod.POST)
    public String submitForm(@ModelAttribute("community") CommunityEntity communityEntity) {
        String name = communityEntity.getName();
        return "redirect:/home/communities/?name="+name;
    }


}
