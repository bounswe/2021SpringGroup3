package com.practiceapp.practiceapp.controller.views;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;

@Controller
@RequestMapping(path = "/home/places")
public class GetPlacesViewController {

    private String url = "http://localhost:9090/places/";
    RestTemplate restTemplate = new RestTemplate();

    @RequestMapping(path = "/{input}",method = RequestMethod.GET)
    public String showPlaces(Model model,@PathVariable("input") String input){
        ResponseEntity<ArrayList> response = restTemplate.getForEntity(url + input, ArrayList.class);
        ArrayList<String> places = response.getBody();

        model.addAttribute("places",places);
        return "places";
    }






}
