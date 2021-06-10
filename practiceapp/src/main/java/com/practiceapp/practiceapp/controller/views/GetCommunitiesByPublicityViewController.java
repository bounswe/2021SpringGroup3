package com.practiceapp.practiceapp.controller.views;

import com.practiceapp.practiceapp.entity.CommunityEntity;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributesModelMap;


@Controller
@RequestMapping(path = "/home/communities")
public class GetCommunitiesByPublicityViewController {

    @Value("${base.url}")
    private String base_url;
    private String target_url = "communities/";

    RestTemplate restTemplate = new RestTemplate();

    @RequestMapping(path = "/",method = RequestMethod.GET)
    public String viewCommunities(Model model, @RequestParam(value="public", required = false, defaultValue = "true")
            boolean publicity){
        CommunityEntity[] communities = restTemplate.getForObject(base_url + target_url + "?public=" + publicity, CommunityEntity[].class);
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
        RedirectAttributes redirectAttributes = new RedirectAttributesModelMap();
        redirectAttributes.addAttribute("public", publicity);
        return "redirect:/home/communities/";
    }


}
