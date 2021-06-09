package com.practiceapp.practiceapp.controller.views;

import com.mashape.unirest.http.exceptions.UnirestException;
import com.practiceapp.practiceapp.controller.universitieslist.UniversitiesListController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;

@Controller
@RequestMapping(path = "/home/universities")
public class UniversitiesViewController {


    @Autowired
    UniversitiesListController universitiesListController;

    @RequestMapping(path = "/{input}",method = RequestMethod.GET)
    public String showUniversities(Model model,@PathVariable("input") String input) throws UnirestException {
        System.out.println(input);
        ResponseEntity<String> response = universitiesListController.getUniversitiesList(input);
        String universities = response.getBody();

        model.addAttribute("universities",universities);
        return "universities";
    }



    @RequestMapping(path = "/search",method = RequestMethod.GET)
    public String universitiesSearchForm(Model model) {
        String country=new String();
        model.addAttribute("country",country);

        return "universities_form";
    }

    @RequestMapping(path = "/search",method = RequestMethod.POST)
    public String submitForm(@ModelAttribute("country") String country) {
        return "redirect:/home/universities/"+country;
    }


}
