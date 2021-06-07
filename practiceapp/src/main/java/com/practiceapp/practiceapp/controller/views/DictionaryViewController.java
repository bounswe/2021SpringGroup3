package com.practiceapp.practiceapp.controller.views;


import com.practiceapp.practiceapp.entity.CommunityEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;

@Controller
@RequestMapping(path = "/home/dict")
public class DictionaryViewController {

    private String url = "http://localhost:9090/community/definition/en_US/";
    RestTemplate restTemplate = new RestTemplate();

    @RequestMapping(path = "/{word}",method = RequestMethod.GET)
    public String showDefinition(Model model, @PathVariable("word") String word){


        ResponseEntity<String> response = restTemplate.getForEntity(url + word, String.class);
        String definition = response.getBody();
        model.addAttribute("word",word);
        model.addAttribute("definition",definition);
        return "dictionary";
    }


    @RequestMapping(path = "/search",method = RequestMethod.GET)
    public String showDictionaryForm(Model model) {
        String word=new String();
        model.addAttribute("word", word);

        return "dictionary_form";
    }

    @RequestMapping(path = "/search",method = RequestMethod.POST)
    public String submitForm(@ModelAttribute("word") String word) {
        return "redirect:/home/dict/"+word;
    }


}
