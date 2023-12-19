package com.example.lab6.Controller;

import com.example.lab6.Entity.SurveyEntity;
import com.example.lab6.Exception.SurveyAlreadyExistException;
import com.example.lab6.Exception.SurveyNotFoundException;
import com.example.lab6.Service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/surveys")
public class SurveyController {

    @Autowired
    private SurveyService surveyService;

    @PostMapping
    public ResponseEntity createSurvey(@RequestBody SurveyEntity survey){
        try {
            surveyService.createSurvey(survey);
            return ResponseEntity.ok("Опитування було створено успішно");
        } catch (SurveyAlreadyExistException exception){
            return ResponseEntity.badRequest().body(exception.getMessage());
        } catch (Exception exception){
            return ResponseEntity.badRequest().body("Відбулась помилка створення опитування!");
        }
    }

    @GetMapping
    public ResponseEntity getOneSurvey(@RequestParam Long id){
        try {
            return ResponseEntity.ok(surveyService.getOne(id));
        } catch (SurveyNotFoundException exception){
            return ResponseEntity.badRequest().body(exception.getMessage());
        } catch (Exception exception){
            return ResponseEntity.badRequest().body("Відбулась помилка отримання опитувань");
        }
    }

    @GetMapping("/all")
    public ResponseEntity getSurveys(){
        try {
            return ResponseEntity.ok(surveyService.getSurveys());
        } catch (SurveyNotFoundException exception){
            return ResponseEntity.badRequest().body(exception.getMessage());
        } catch (Exception exception){
            return ResponseEntity.badRequest().body("Відбулась помилка отримання опитувань");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteSurvey(@PathVariable Long id){
        try {
            return ResponseEntity.ok("Було успішно видалено опитування з id: " +
                    surveyService.deleteSurvey(id));
        } catch (SurveyNotFoundException exception){
            return ResponseEntity.badRequest().body(exception.getMessage());
        } catch (Exception exception){
            return ResponseEntity.badRequest().body("Відбулась помилка отримання опитувань");
        }
    }

    @PutMapping
    public ResponseEntity updateSurvey(@RequestParam Long id,
                                       @RequestBody SurveyEntity survey){
        try {
            surveyService.updateSurvey(id, survey);
            return ResponseEntity.ok("Опитування було оновлено успішно");
        }catch (SurveyAlreadyExistException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        } catch (Exception exception){
            return ResponseEntity.badRequest().body("Відбулась помилка оновлення опитування!");
        }
    }

}
