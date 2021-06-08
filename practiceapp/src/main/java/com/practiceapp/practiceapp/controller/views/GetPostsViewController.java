package com.practiceapp.practiceapp.controller.views;

import com.practiceapp.practiceapp.entity.PostEntity;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestTemplate;

import java.util.List;


@Controller
@RequestMapping(path = "/home/posts")
public class GetPostsViewController {

    @Value("${base.url}")
    private String base_url;
    private String target_url = "/community/posts/";

    RestTemplate restTemplate = new RestTemplate();

    @RequestMapping(path = "/{community_name}",method = RequestMethod.GET)
    public String showPostsByCommunityName(Model model, @PathVariable("community_name") String community_name){  //TEST AFTER POSTS ADDED!

        List<PostEntity> posts = restTemplate.getForObject(base_url + target_url + "/" + community_name, List.class);
        JSONArray rows = new JSONArray();
        for (PostEntity post: posts) {
            JSONObject row = new JSONObject()
                    .put("Content", post.getText())
                    .put("Date", post.getDate().toString())
                    .put("Location", post.getLocation())
                    .put("Author", post.getAuthor().getUsername());

            rows.put(row);
        }
        model.addAttribute("posts", rows);
        return "posts";
    }

}
