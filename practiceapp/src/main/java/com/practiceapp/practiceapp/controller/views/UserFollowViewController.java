package com.practiceapp.practiceapp.controller.views;


import com.practiceapp.practiceapp.controller.user.UserFollowController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(path = "home/userfollow")
public class UserFollowViewController {

    @Autowired
    private UserFollowController userFollowController;

    @RequestMapping(path = "", method = RequestMethod.GET)
    public String followUser(Model model){
        String follower_name = "";
        String followed_name = "";
        model.addAttribute("follower_name",follower_name);
        model.addAttribute("followed_name", followed_name);
        return "follow_user";
    }

    @RequestMapping(path = "/save", method = RequestMethod.POST)
    public String saveFollow(@ModelAttribute("follower_name") String follower_name, @ModelAttribute("followed_name") String followed_name){
        userFollowController.followUser(follower_name, followed_name);
        return "redirect:/home/userfollow";
    }

}
