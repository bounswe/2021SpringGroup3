package com.practiceapp.practiceapp.controller.views;


import com.practiceapp.practiceapp.controller.joining.JoiningCommunityController;
import com.practiceapp.practiceapp.controller.user.CreateUserController;
import com.practiceapp.practiceapp.entity.PostEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(path = "home/joincommunity")
public class JoinCommunityViewController {

    @Autowired
    private JoiningCommunityController joiningCommunityController;

    @RequestMapping(path = "/join", method = RequestMethod.GET)
    public String joinCommunity(Model model){
        String user_name = "";
        String community_name = "";
        model.addAttribute("user_name",user_name);
        model.addAttribute("community_name",community_name);
        return "join_community";
    }


    @RequestMapping(path = "/join/save", method = RequestMethod.POST)
    public String saveJoin(@ModelAttribute("user_name") String user_name, @ModelAttribute("community_name") String community_name){
        joiningCommunityController.joiningCommunity(user_name, community_name);
        return "redirect:/home/joincommunity/join";
    }

}
