package com.practiceapp.practiceapp.controller.views;

import com.practiceapp.practiceapp.controller.profile.ProfileController;
import com.practiceapp.practiceapp.controller.user.CreateUserController;
import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.entity.Profile;
import com.practiceapp.practiceapp.entity.UserEntity;
import org.apache.catalina.User;
import org.bson.json.JsonObject;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import springfox.documentation.spring.web.json.Json;

import java.net.http.HttpResponse;
import java.util.List;

@Controller
public class CreateUserViewController {

    @Autowired
    private CreateUserController createUserController;
    @Autowired
    private ProfileViewController profileViewController;

    RestTemplate restTemplate = new RestTemplate();
    
    @Value("${base.url}") private String base_url;
    
    @GetMapping(path="home/getuserbyname")
    public String getUserByName(Model model){
        model.addAttribute("username","");
        model.addAttribute("showuser",false);
        model.addAttribute("nouser",false);

        return "getuserbyname";
    }

    @PostMapping(path="home/getuserbyname")
    public String getUserByNameSent(Model model, @RequestParam("username") String username){
        UserEntity user = createUserController.getUserByName(username);

        if(user == null){
            model.addAttribute("nouser",true);
            return "getuserbyname";
        }

        model.addAttribute("user",user);
        model.addAttribute("showuser",true);

        return "getuserbyname";
    }

    @GetMapping(path="home/saveuser")
    public String saveUser(Model model){
        UserEntity user = new UserEntity();
        model.addAttribute("user",user);
        model.addAttribute("showmessage",false);

        return "saveuser";
    }

    @PostMapping(path = "home/saveuser")
    public String saveUserSent(Model model, @ModelAttribute("user") UserEntity user){

        HttpEntity<UserEntity> request = new HttpEntity<>(user);
        restTemplate.postForObject(base_url + "user/save",request,String.class);
        //model.addAttribute("user",createdUser);
        model.addAttribute("showmessage",true);
        profileViewController.getProfileSent(model,user.getUsername());

        return "getProfile";
    }

    @GetMapping(path = "home/getjoinedcommunities")
    public String getJoinedCommunities(Model model){
        model.addAttribute("username","");
        model.addAttribute("showlist",false);

        return "getjoinedcommunities";
    }

    @PostMapping(path = "home/getjoinedcommunities")
    public String getJoinedCommunitiesSent(Model model,@RequestParam("username") String username){
        List<CommunityEntity> communityList = createUserController.getUserJoinedCommunitiesByName(username);

        model.addAttribute("communitylist",communityList);
        model.addAttribute("showlist",true);


        return "getJoinedCommunities";
    }

}
