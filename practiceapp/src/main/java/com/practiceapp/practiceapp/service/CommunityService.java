package com.practiceapp.practiceapp.service;


import com.mashape.unirest.http.JsonNode;
import com.practiceapp.practiceapp.entity.CommunityEntity;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.practiceapp.practiceapp.entity.PostEntity;
import com.practiceapp.practiceapp.repository.CommunityRepository;
import com.practiceapp.practiceapp.utils.DictionaryApi;
import com.practiceapp.practiceapp.utils.DetectLanguageApi;
import com.practiceapp.practiceapp.utils.UniversitiesListApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CommunityService {

    @Autowired
    private CommunityRepository communityRepository;

    @Autowired
    private DictionaryApi dictionaryApi;

    @Autowired
    private DetectLanguageApi detectLanguageApi;


    @Autowired
    private UniversitiesListApi universitiesListApi;


    /**
     * Gets a community by name.
     * @param name is the name of the requested community.
     * @return corresponding community entity.
     */
    public CommunityEntity getByName(String name)
    {
        return communityRepository.getByName(name);
    }


    /**
    *Gets the posts of given community
    *
    *@param name is the name of the community
    *@return list of post entities
    */
    public List<PostEntity> getPosts(String name){
        return communityRepository.getByName(name).getPosts();
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


    // BELOW FUNCTIONS CONSUMES THIRD-PARTY APIs:

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



    /**
     * Gets the list of universities of a given country via third-party api.
     *
     * @param country is the name of the requested country.
     * @return list of universities as List<string>.
     * @throws UnirestException
     */
    public List<String> getUniversitiesList(String country) throws UnirestException
    {
        return universitiesListApi.getUniversitiesList(country);
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

}
