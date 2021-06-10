package com.practiceapp.practiceapp.controller.views;

import com.practiceapp.practiceapp.controller.community.GetCommunityController;
import com.practiceapp.practiceapp.controller.post.CreatePostController;
import com.practiceapp.practiceapp.controller.post.UpdatePostController;
import com.practiceapp.practiceapp.controller.user.CreateUserController;
import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.entity.PostEntity;
import com.practiceapp.practiceapp.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;


@Controller
@RequestMapping(path = "home/post")
public class PostViewController {

    @Value("${base.url}")
    private String base_url;

    @Autowired
    private CreatePostController createPostController;

    @Autowired
    private UpdatePostController updatePostController;

    @Autowired
    private CreateUserController createUserController;

    @Autowired
    private GetCommunityController getCommunityController;

    RestTemplate restTemplate = new RestTemplate();

    @RequestMapping(path = "")
    public String showPostup(Model model){
        return "index";
    }


    @RequestMapping(path = "/create", method = RequestMethod.GET)
    public String createPost(Model model){
        PostEntity post = new PostEntity();
        String user_name = "";
        String community_name = "";
        model.addAttribute("post",post);
        model.addAttribute("user_name", user_name);
        model.addAttribute("community_name", community_name);
        return "create_post";
    }

    @RequestMapping(path = "/create/save", method = RequestMethod.POST)
    public String savePost(@ModelAttribute("post") PostEntity post, @ModelAttribute("user_name") String user_name, @ModelAttribute("community_name") String community_name){
        UserEntity userEntity = createUserController.getUserByName(user_name);
        CommunityEntity communityEntity = getCommunityController.getCommunityByName(community_name);
        post.setAuthor(userEntity);
        List<CommunityEntity> list = new ArrayList<>();
        list.add(communityEntity);
        post.setCommunities(list);
        createPostController.savePost(post);
        return "redirect:/home/posts/"+community_name;
    }

    @RequestMapping(path = "/update", method = RequestMethod.GET)
    public String updatePost(Model model){
        PostEntity post = new PostEntity();
        model.addAttribute("post",post);
        return "update_post";
    }

    @RequestMapping(path = "/update/save", method = RequestMethod.POST)
    public String saveUpdate(@ModelAttribute("post") PostEntity post){
        updatePostController.updatePost(post);

        return "redirect:/home/post/update";
    }

}


