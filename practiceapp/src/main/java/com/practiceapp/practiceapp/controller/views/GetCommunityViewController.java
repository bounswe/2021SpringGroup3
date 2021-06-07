package com.practiceapp.practiceapp.controller.views;


import com.practiceapp.practiceapp.entity.CommunityEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.net.InetAddress;
import java.net.UnknownHostException;

@Controller
@RequestMapping(path = "/home/community")
public class GetCommunityViewController {


    @Autowired
    Environment environment;

    @Value("${base.url}")
    private String base_url;
    private String target_url = "community/";

    RestTemplate restTemplate = new RestTemplate();

    @RequestMapping(path = "/",method = RequestMethod.GET)
    public String showCommunity(Model model, @RequestParam String name)  {

        CommunityEntity community = restTemplate.getForObject(base_url + target_url + "/?name=" + name, CommunityEntity.class);
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
        return "redirect:/home/community/?name="+name;
    }


}
