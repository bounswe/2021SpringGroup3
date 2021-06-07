package com.practiceapp.practiceapp.controller.views;

import com.practiceapp.practiceapp.entity.CommunityEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.ServletContext;
import java.util.ArrayList;
import java.util.Arrays;

@Controller
@RequestMapping(path = "/home/places")
public class GetPlacesViewController {

    @Value("${base.url}")
    private String base_url;
    private String target_url = "places/";

    RestTemplate restTemplate = new RestTemplate();

    @RequestMapping(path = "/{input}",method = RequestMethod.GET)
    public String showPlaces(Model model,@PathVariable("input") String input){

        ResponseEntity<ArrayList> response = restTemplate.getForEntity(base_url + target_url + input, ArrayList.class);
        ArrayList<String> places = response.getBody();

        model.addAttribute("places",places);
        return "places";
    }



    @RequestMapping(path = "/search",method = RequestMethod.GET)
    public String placesSearchForm(Model model) {
        String place=new String();
        model.addAttribute("place",place);

        return "places_form";
    }

    @RequestMapping(path = "/search",method = RequestMethod.POST)
    public String submitForm(@ModelAttribute("place") String place) {
        return "redirect:/home/places/"+place;
    }





}
