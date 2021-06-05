package com.practiceapp.practiceapp.controller.views;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/home")
public class IndexViewController {

    private String placesUrl = "http://localhost:9090/home/places/ist";

    @GetMapping("/")
    public String getIndex(Model model){

        model.addAttribute("places",placesUrl);

        return "index";
    }

}
