package com.practiceapp.practiceapp.controller.views;


import com.mashape.unirest.http.exceptions.UnirestException;
import com.practiceapp.practiceapp.controller.post.UpdatePostController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
@RequestMapping(path = "home/kanyequote")
public class GetKanyeController {

    @Autowired
    UpdatePostController updatePostController;

    @RequestMapping(path = "")
    public String getQuote(Model model) throws UnirestException {

        ResponseEntity<String> kanye_quote = updatePostController.getRandomKanyeQuote();
        model.addAttribute("kanye_quote", kanye_quote);
        return "get_kanye";
    }

}
