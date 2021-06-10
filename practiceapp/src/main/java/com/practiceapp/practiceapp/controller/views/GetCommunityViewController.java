package com.practiceapp.practiceapp.controller.views;


import com.practiceapp.practiceapp.controller.community.GetCommunityController;
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

    @Autowired
    GetCommunityController getCommunityController;

    @Value("${base.url}")
    private String base_url;
    private String target_url = "community/";

    RestTemplate restTemplate = new RestTemplate();

    @RequestMapping(path = "/",method = RequestMethod.GET)
    public String showCommunity(Model model, @RequestParam String name)  {

        CommunityEntity community = restTemplate.getForObject(base_url + target_url + "?name=" + name, CommunityEntity.class);
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
        model.addAttribute("show_not_found",false);
        return "community_search_form";
    }


    @RequestMapping(path = "/search",method = RequestMethod.POST)
    public String submitForm(Model model, @ModelAttribute("community") CommunityEntity communityEntity) {
        String name = communityEntity.getName();
        CommunityEntity com=getCommunityController.getCommunityByName(name);
        if(com==null){
            model.addAttribute("show_not_found",true);
            model.addAttribute("community", new CommunityEntity());
            return "community_search_form";
        }
        return "redirect:/home/community/?name="+name;
    }


}
