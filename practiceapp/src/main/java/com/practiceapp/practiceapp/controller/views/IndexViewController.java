package com.practiceapp.practiceapp.controller.views;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexViewController {

    private String baseUrl = "/home/";

    private String placesUrl = baseUrl + "places/ist";  //şimdilik form lazım  daha

    private String searchCommunitiesUrl = baseUrl +"communities/search";

    private String dictionaryUrl = baseUrl +"dict/search";

    //private String adviceUrl = ""

    @GetMapping(path= "/home")
    public String getIndex(Model model){

        model.addAttribute("places",placesUrl);
        model.addAttribute("communities",searchCommunitiesUrl);
        model.addAttribute("dictionary",dictionaryUrl);

        return "index";
    }

}
