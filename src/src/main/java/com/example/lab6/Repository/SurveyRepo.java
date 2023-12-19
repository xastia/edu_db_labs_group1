package com.example.lab6.Repository;

import com.example.lab6.Entity.SurveyEntity;
import org.springframework.data.repository.CrudRepository;

public interface SurveyRepo extends CrudRepository <SurveyEntity, Long>{
    SurveyEntity findByTitle(String title);
}
