package com.example.lab6.Service;

import com.example.lab6.Entity.SurveyEntity;
import com.example.lab6.Exception.SurveyAlreadyExistException;
import com.example.lab6.Exception.SurveyNotFoundException;
import com.example.lab6.Repository.SurveyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SurveyService {

    @Autowired
    private SurveyRepo surveyRepo;

    public SurveyEntity createSurvey(SurveyEntity survey) throws SurveyAlreadyExistException {
        if(surveyRepo.findByTitle(survey.getTitle()) != null){
            throw new SurveyAlreadyExistException("Опитування з такою назвою вже існує!");
        }
        return surveyRepo.save(survey);
    }

    public SurveyEntity getOne(Long id) throws SurveyNotFoundException {
        SurveyEntity survey = surveyRepo.findById(id).get();
        if(survey == null){
            throw new SurveyNotFoundException("Такого опитування не існує");
        }
        return survey;
    }

    public Iterable<SurveyEntity> getSurveys() throws SurveyNotFoundException {
        Iterable<SurveyEntity> surveyEntities = surveyRepo.findAll();
        if (surveyEntities == null){
            throw new SurveyNotFoundException("Опитувань не існує");
        }
        return surveyEntities;
    }

    public Long deleteSurvey(Long id) throws SurveyNotFoundException {
        if (surveyRepo.findById(id).isEmpty()){
            throw new SurveyNotFoundException("Такого опитування вже не існує");
        }
        surveyRepo.deleteById(id);
        return id;
    }

    public SurveyEntity updateSurvey(Long id, SurveyEntity survey)
            throws SurveyAlreadyExistException {
        SurveyEntity surveyEntity = surveyRepo.findById(id).get();
        surveyEntity.setTitle(survey.getTitle());
        surveyEntity.setDescription(survey.getDescription());
        if(surveyRepo.findByTitle(surveyEntity.getTitle()) != null){
            throw new SurveyAlreadyExistException("Опитування з такою назвою вже існує!");
        }
        return surveyRepo.save(surveyEntity);
    }
}
