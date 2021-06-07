package com.practiceapp.practiceapp.controller.views;

import com.practiceapp.practiceapp.entity.CommunityEntity;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;


@Controller
@RequestMapping(path = "/home/communities")
public class GetCommunitiesByPublicityViewController {

    private String url = "http://localhost:9090/communities";

    RestTemplate restTemplate = new RestTemplate();

    @RequestMapping(path = "/{publicity}",method = RequestMethod.GET)
    public String viewCommunities(Model model, @PathVariable boolean publicity){
        CommunityEntity[] communities = restTemplate.getForObject(url + "/?public=" + publicity, CommunityEntity[].class);
        JSONArray rows = new JSONArray();
        for (CommunityEntity community: communities) {
            JSONObject row = new JSONObject()
                    .put("Name", community.getName())
                    .put("Description", community.getDescription())
                    .put("Language", community.getLanguage());
            rows.put(row);
        }
        model.addAttribute("communities", rows.toString());
        return "communities";
    }


    @RequestMapping(path = "/search",method = RequestMethod.GET)
    public String showCommunitiesForm(Model model) {
        CommunityEntity communityEntity = new CommunityEntity();
        model.addAttribute("community", communityEntity);

        return "communities_search_form";
    }


    @RequestMapping(path = "/search",method = RequestMethod.POST)
    public String submitForm(@ModelAttribute("community") CommunityEntity communityEntity) {
        Boolean publicity = communityEntity.isPublicity();
        return "redirect:/home/communities/" + publicity;
    }


}
