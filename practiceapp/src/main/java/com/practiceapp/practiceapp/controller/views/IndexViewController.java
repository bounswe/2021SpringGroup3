package com.practiceapp.practiceapp.controller.views;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexViewController {

    private String baseUrl = "/home/";

    private String placesUrl = baseUrl + "places/ist";



    //private String adviceUrl = ""

    @GetMapping(path= "/home")
    public String getIndex(Model model){

        model.addAttribute("places",placesUrl);

        return "index";
    }

}
