package com.practiceapp.practiceapp.controller.views;

import com.practiceapp.practiceapp.controller.profile.ProfileController;
import com.practiceapp.practiceapp.entity.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ProfileViewController {

    @Autowired
    private ProfileController profileController;

    @GetMapping(path="home/getprofile")
    public String getProfile(Model model){
        model.addAttribute("profilename","");
        model.addAttribute("showProfile",false);
        model.addAttribute("noprofile",false);

        return "getprofile";
    }

    @PostMapping(path = "home/getprofile")
    public String getProfileSent(Model model, @RequestParam("profilename") String profilename){
        Profile profile = profileController.getProfile(profilename);

        if(profile == null){
            model.addAttribute("noprofile",true);
            return "getprofile";
        }

        model.addAttribute("profile",profile);
        model.addAttribute("showProfile",true);

        return "getprofile";
    }

    //--------------------------------

    @GetMapping(path = "home/updateprofileform")
    public String updateProfileForm(Model model){
        String username ="";
        model.addAttribute("username",username);

        return "updateProfileForm";
    }

    @PostMapping(path = "home/updateprofileform")
    public String updateProfileFormSent(Model model, @ModelAttribute("username") String username){

        Profile profile = profileController.getProfile(username);
        updateProfile(model,profile);

        return "updateprofile";
    }



    @GetMapping(path = "home/updateprofile")
    public String updateProfile(Model model, Profile profile){
        //Profile profile = new Profile();
        model.addAttribute("profile",profile);
        model.addAttribute("showmessage",false);

        return "updateprofile";
    }

    @PostMapping(path = "home/updateprofile")
    public String updateProfileSent(Model model,@ModelAttribute("profile") Profile profile){
        Profile updatedProfile = profileController.getProfile(profile.getName());
        if(updatedProfile == null){

            return "updateprofile";
        }

        updatedProfile.setDescription(profile.getDescription());
        updatedProfile.setIsPublic(profile.getIsPublic());
        updatedProfile.setIsPhotoPublic(profile.getIsPhotoPublic());

        profileController.updateProfile(updatedProfile);
        getProfileSent(model,profile.getName());

        return "getprofile";
    }

    @GetMapping(path = "home/setrandompic")
    public String setRandomPic(Model model){
        model.addAttribute("profilename","");
        model.addAttribute("showpic",false);

        return "setrandompic";
    }

    @PostMapping(path = "home/setrandompic")
    public String setRandomPicSent(Model model, @RequestParam("profilename") String profilename){
        Profile profile = profileController.setRandomPic(profilename);
        model.addAttribute("randompic",profile.getPhoto());
        model.addAttribute("showpic",true);
        getProfileSent(model,profilename);
        return "getProfile";
    }
}
