package com.practiceapp.practiceapp.controller.views;


import com.practiceapp.practiceapp.entity.CommunityEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestTemplate;

@Controller
@RequestMapping(path = "/home/communities")
public class CreateCommunityViewController {

    private String url = "http://localhost:9090/community";

    RestTemplate restTemplate = new RestTemplate();

    @RequestMapping(path = "/add",method = RequestMethod.GET)
    public String showCommunitySearchForm(Model model) {
        CommunityEntity communityEntity = new CommunityEntity();
        model.addAttribute("community", communityEntity);

        return "community_create_form";
    }

    //SUBMIT FORM LAZIM


}
