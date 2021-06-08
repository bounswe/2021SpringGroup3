package com.practiceapp.practiceapp.controller.views;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexViewController {

    private String baseUrl = "/home/";

    private String placesUrl = baseUrl + "places/ist";

    //Advice Links
    private String adviceUrl = baseUrl + "advice";
    private String searchAdviceUrl = baseUrl + "searchadvice";

    //Profile Links
    private String getProfileUrl = baseUrl + "getprofile";
    private String updateProfileUrl = baseUrl + "updateprofile";
    private String setRandomPicUrl = baseUrl + "setrandompic";

    //User Links
    private String getUserByNameUrl = baseUrl + "getuserbyname";
    private String saveUserUrl = baseUrl + "saveuser";
    private String getJoinedCommunitiesUrl = baseUrl + "getjoinedcommunities";
    private String getCreatedCommunitiesUrl = baseUrl + "getcreatedcommunities";

    @GetMapping(path= "/home")
    public String getIndex(Model model){

        model.addAttribute("places",placesUrl);
        model.addAttribute("advice",adviceUrl);
        model.addAttribute("searchadvice",searchAdviceUrl);
        model.addAttribute("getprofile",getProfileUrl);
        model.addAttribute("updateProfile",updateProfileUrl);
        model.addAttribute("setrandompic",setRandomPicUrl);
        model.addAttribute("getuserbyname",getUserByNameUrl);
        model.addAttribute("saveuser",saveUserUrl);
        model.addAttribute("getjoinedcommunities",getJoinedCommunitiesUrl);
        model.addAttribute("getcreatedcommunities",getCreatedCommunitiesUrl);



        return "index";
    }

}
