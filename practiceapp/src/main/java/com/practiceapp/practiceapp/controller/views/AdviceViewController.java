package com.practiceapp.practiceapp.controller.views;

import com.practiceapp.practiceapp.controller.advice.AdviceController;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
public class AdviceViewController {

    @Autowired
    private AdviceController adviceController;

    @RequestMapping(path = "/home/advice", method = RequestMethod.GET)
    public String showAdvice(Model model){
        String adviceString = adviceController.getAdvice();

        JSONObject jsonObject = new JSONObject(adviceString);
        JSONObject adviceslip = jsonObject.getJSONObject("slip");

        model.addAttribute("id",adviceslip.get("id"));
        model.addAttribute("advice",adviceslip.get("advice"));

        return "advice";
    }

    @GetMapping(path = "home/searchadvice")
    public String searchAdvice(Model model){
        model.addAttribute("keyword","");
        model.addAttribute("showAdvices",false);

        return "searchadvice";
    }

    @PostMapping(path = "home/searchadvice")
    public String searchAdviceSent(Model model, @RequestParam("keyword") String keyword){
        String adviceListString = adviceController.searchAdvice(keyword);

        JSONObject jsonObject = new JSONObject(adviceListString);

        Map<Integer, String> slips = new HashMap<>();
        if(jsonObject.has("message")){
            slips.put(-1, "No advices were found");
            model.addAttribute("showAdvices",true);
            model.addAttribute("slips",slips);
            return "searchadvice";
        }

        JSONArray slipList = jsonObject.getJSONArray("slips");

        for(int i = 0; i<slipList.length(); i++){
            Integer id = slipList.getJSONObject(i).getInt("id");
            String advice = slipList.getJSONObject(i).getString("advice");
            slips.put(id, advice);
        }

        model.addAttribute("showAdvices",true);
        model.addAttribute("slips",slips);

        return "searchadvice";
    }
}
