package com.practiceapp.practiceapp.service;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.practiceapp.practiceapp.entity.PostEntity;
import com.practiceapp.practiceapp.repository.CommunityRepository;
import com.practiceapp.practiceapp.utils.DictionaryApi;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CommunityService {

    @Autowired
    private CommunityRepository communityRepository;

    @Autowired
    private DictionaryApi dictionaryApi;

    public List<PostEntity> getPosts(String id){
        List<PostEntity> l = communityRepository.findById(id).get().getPosts();
        return l;
    }

    public String getDefinition(String lang_code, String word)throws UnirestException {
        JsonNode s = dictionaryApi.getDefinition(lang_code,word).getBody();
        return s.getArray().getJSONObject(0).getJSONArray("meanings").getJSONObject(0).getJSONArray("definitions").getJSONObject(0).get("definition").toString();
    }
}
