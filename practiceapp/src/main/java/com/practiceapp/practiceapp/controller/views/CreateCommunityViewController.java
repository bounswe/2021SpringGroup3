package com.practiceapp.practiceapp.controller.views;


import com.practiceapp.practiceapp.entity.CommunityEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestTemplate;

@Controller
@RequestMapping(path = "/home/communities")
public class CreateCommunityViewController {

    @Value("${base.url}")
    private String base_url;
    private String target_url = "community/";

    RestTemplate restTemplate = new RestTemplate();

    @RequestMapping(path = "/create",method = RequestMethod.GET)
    public String createCommunityForm(Model model) {
        CommunityEntity communityEntity = new CommunityEntity();
        model.addAttribute("community", communityEntity);
        return "community_create_form";
    }

    @RequestMapping(path = "/create",method = RequestMethod.POST)
    public String createCommunity(Model model, @ModelAttribute("community") CommunityEntity communityEntity) {
        if(communityEntity.getName().equals("")){
            return "community_create_form";
        }
        HttpEntity<CommunityEntity> request = new HttpEntity<>(communityEntity);
        CommunityEntity createdCommunityEntity = restTemplate.postForObject(base_url + target_url + "/create", request, CommunityEntity.class);
        model.addAttribute("community", createdCommunityEntity);
        return "community";
    }
}
