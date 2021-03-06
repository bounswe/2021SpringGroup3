package com.practiceapp.practiceapp.controller.views;


import com.mashape.unirest.http.exceptions.UnirestException;
import com.practiceapp.practiceapp.controller.post.UpdatePostController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Map;

@Controller
@RequestMapping(path = "home/kanyequote")
public class GetKanyeViewController {

    @Autowired
    UpdatePostController updatePostController;

    @RequestMapping(path = "", method = RequestMethod.GET)
    public String getQuote(Model model) throws UnirestException {

        ResponseEntity<String> kanye_quote = updatePostController.getRandomKanyeQuote();
        String s = kanye_quote.getBody();
        String[] arrayString = s.split("\"");
        model.addAttribute("kanye_quote", arrayString[3]);
        return "get_kanye";
    }

}
