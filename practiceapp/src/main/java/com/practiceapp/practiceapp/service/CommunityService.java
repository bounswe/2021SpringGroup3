package com.practiceapp.practiceapp.service;


import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.practiceapp.practiceapp.entity.PostEntity;
import com.practiceapp.practiceapp.repository.CommunityRepository;
import com.practiceapp.practiceapp.utils.DictionaryApi;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.practiceapp.practiceapp.entity.UserEntity;
import com.practiceapp.practiceapp.repository.CommunityRepository;
import com.practiceapp.practiceapp.utils.DetectLanguageApi;
import com.practiceapp.practiceapp.utils.UniversitiesListApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import java.util.List;

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

  
    @Autowired
    private UniversitiesListApi universitiesListApi;
    
    /*
      Gets a community by name. name is the name of the requested community. Returns corresponding community entity.
    */
    public CommunityEntity getByName(String name)
    {
        return communityRepository.getByName(name);
    }
  
    /**
    *Gets the posts of given community
    *
    *@param id is the id of the community
    *@return list of post entities
    */
    public List<PostEntity> getPosts(String name){
        return communityRepository.getByName(name).getPosts();
    }

    /**
    *Communicates with "http://dictionaryapi.dev" dictionary api
    *
    *@param lang_code is the language of the word e.g. en_US for English tr for Turkish
    *@param word to get the definiton of
    *@return definition of the word
    */
    public String getDefinition(String lang_code, String word)throws UnirestException {
        String definition;
        JsonNode s = dictionaryApi.getDefinition(lang_code,word).getBody();
        JSONObject obj = s.getObject();
        if(obj==null){                                  //if api returns the definition it returns a JSON array
            definition = s.getArray().getJSONObject(0).getJSONArray("meanings").getJSONObject(0).getJSONArray("definitions").getJSONObject(0).get("definition").toString();
            return definition;
        }
        else if(obj.has("message")){                // if word is not found a message will be returned that indicates word is not found
            return s.getObject().get("message").toString();
        }
        else{                                           //this part may not be used since the api returns a message
            return "The word you look is not found.";
        }
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
     * Interacts with community repository to create community
     *
     * @String name of the community
     * @return whether community with specified name exists
     */
    public boolean exists(String name){
        return communityRepository.getByName(name) != null;
    }

    /**
     * Interacts with community repository to get communities with specified publicity
     *
     * @param isPublic publicity of community
     * @return List of private/public communities
     */
    public List<CommunityEntity> findByPublicity(Boolean isPublic){
        return communityRepository.findAllByPublicity(isPublic);
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
  
    /*
      Gets the list of universities of a given country via third-party api. country is the name of the requested country. Returns a list of universities as string.
    */
    public String getUniversitiesList(String country) throws UnirestException
    {
        return universitiesListApi.getUniversitiesList(country);
    }


}
