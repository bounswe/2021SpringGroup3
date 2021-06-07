package com.practiceapp.practiceapp.controller.views;

import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.entity.PostEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Controller
@RequestMapping(path = "/home/posts")
public class GetPostsViewController {


    private String url = "http://localhost:9090/community/posts";

    RestTemplate restTemplate = new RestTemplate();

    @RequestMapping(path = "/{community_name}",method = RequestMethod.GET)
    public String showPostsByCommunityName(Model model, @PathVariable("community_name") String community_name){  //TEST AFTER POSTS ADDED!

        List<PostEntity> posts = restTemplate.getForObject(url + "/" + community_name, List.class);
        model.addAttribute("posts",posts);
        return "posts";
    }

}
