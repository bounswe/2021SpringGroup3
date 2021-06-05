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
import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.entity.UserEntity;
import com.practiceapp.practiceapp.repository.CommunityRepository;
import com.practiceapp.practiceapp.utils.DetectLanguageApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CommunityService {

    @Autowired
    private CommunityRepository communityRepository;

    public CommunityEntity getById(String id){
        return communityRepository.getById(id);
    }

    @Autowired
    private DictionaryApi dictionaryApi;

    @Autowired
    private DetectLanguageApi detectLanguageApi;

    /**
    *Gets the posts of given community
    *
    *@param id is the id of the community
    *@return list of post entities
    */
    public List<PostEntity> getPosts(String id){
        return communityRepository.findById(id).get().getPosts();
    }

    /**
    *Communicates with "http://dictionaryapi.dev" dictionary api
    *
    *@param lang_code is the language of the word e.g. en_US for English tr for Turkish
    *@param word to get the definiton of
    *@return definition of the word
    */
    public String getDefinition(String lang_code, String word)throws UnirestException {
        JsonNode s = dictionaryApi.getDefinition(lang_code,word).getBody();
        return s.getArray().getJSONObject(0).getJSONArray("meanings").getJSONObject(0).getJSONArray("definitions").getJSONObject(0).get("definition").toString();
    }

    /**
     * Interacts with community repository to create community
     *
     * @param communityEntity to be created
     * @return Created community entity
     */
    public CommunityEntity createCommunity(CommunityEntity communityEntity){
        return communityRepository.save(communityEntity);
    }

    /**
     * Communicates with third-party <a href="https://detectlanguage.com/">Detect Language API</a>
     *
     * @param text to be detected
     * @return detected language's code
     *
     * @see DetectLanguageApi#detectLanguage(String)
     */
    public String detectLanguage(String text){
        return detectLanguageApi.detectLanguage(text);
    }

    /**
     * Communicates with third-party <a href="https://detectlanguage.com/">Detect Language API</a>
     *
     * @return all languages with their codes and names
     *
     * @see DetectLanguageApi#getAllLanguages()
     */
    public String getALlLanguages(){
        return detectLanguageApi.getAllLanguages();
    }

}
