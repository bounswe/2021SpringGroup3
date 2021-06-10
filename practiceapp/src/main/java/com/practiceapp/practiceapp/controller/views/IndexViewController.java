package com.practiceapp.practiceapp.controller.views;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexViewController {

    private String baseUrl = "/home/";

    //Third Party Functionalities
    private String placesUrl = baseUrl + "places/search";
    private String dictionaryUrl = baseUrl +"dict/search";
    private String kanyeUrl = baseUrl + "kanyequote";
    private String universitiesUrl = baseUrl + "universities/search";
    private String adviceUrl = baseUrl + "advice";
    private String searchAdviceUrl = baseUrl + "searchadvice";




    //Profile Links
    private String getProfileUrl = baseUrl + "getprofile";
    private String updateProfileUrl = baseUrl + "updateprofileform";
    private String setRandomPicUrl = baseUrl + "setrandompic";

    //Community Links
    private String searchCommunityUrl = baseUrl +"community/search";
    private String searchCommunitiesUrl = baseUrl +"communities/search";
    private String createCommunitiesUrl = baseUrl + "communities/create";
    private String getJoinedCommunitiesUrl = baseUrl + "getjoinedcommunities";
    private String joinCommunityUrl = baseUrl + "joincommunity/join";

    //User Links
    private String getUserByNameUrl = baseUrl + "getuserbyname";
    private String saveUserUrl = baseUrl + "saveuser";
    private String userFollowUrl = baseUrl + "userfollow";

    //Post Links
    private String updatePostUrl = baseUrl + "post/update";
    private String createPostUrl = baseUrl + "post/create";
    private String searchPostUrl = baseUrl + "posts/search";

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
        model.addAttribute("community",searchCommunityUrl);
        model.addAttribute("communities",searchCommunitiesUrl);
        model.addAttribute("dictionary",dictionaryUrl);
        model.addAttribute("create_community",createCommunitiesUrl);
        model.addAttribute("join_community",joinCommunityUrl);
        model.addAttribute("kanye",kanyeUrl);
        model.addAttribute("universities",universitiesUrl);
        model.addAttribute("createPost",createPostUrl);
        model.addAttribute("updatePost",updatePostUrl);
        model.addAttribute("searchPost",searchPostUrl);
        model.addAttribute("user_follow",userFollowUrl);

        return "index";
    }

}
