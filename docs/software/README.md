# Реалізація інформаційного та програмного забезпечення

## SQL-скрипт для створення на початкового наповнення бази даних
    
```sql

    -- MySQL Workbench Forward Engineering

    SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
    SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
    SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

    -- -----------------------------------------------------
    -- Schema mydb
    -- -----------------------------------------------------

    -- -----------------------------------------------------
    -- Schema mydb
    -- -----------------------------------------------------
    CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
    USE `mydb` ;

    -- -----------------------------------------------------
    -- Table `mydb`.`User`
    -- -----------------------------------------------------
    CREATE TABLE IF NOT EXISTS `mydb`.`User` (
    `id` INT NOT NULL,
    `firstname` MEDIUMTEXT NULL,
    `lastname` MEDIUMTEXT NULL,
    `nickname` MEDIUMTEXT NULL,
    `email` MEDIUMTEXT NULL,
    `password` MEDIUMTEXT NULL,
    `Role_id` INT NOT NULL,
    PRIMARY KEY (`id`, `Role_id`),
    INDEX `fk_User_Role1_idx` (`Role_id` ASC) VISIBLE,
    CONSTRAINT `fk_User_Role1`
        FOREIGN KEY (`Role_id`)
        REFERENCES `mydb`.`Role` (`id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
    ENGINE = InnoDB;


    -- -----------------------------------------------------
    -- Table `mydb`.`Role`
    -- -----------------------------------------------------
    CREATE TABLE IF NOT EXISTS `mydb`.`Role` (
    `id` INT NOT NULL,
    `name` TINYTEXT NULL,
    PRIMARY KEY (`id`))
    ENGINE = InnoDB;


    -- -----------------------------------------------------
    -- Table `mydb`.`User`
    -- -----------------------------------------------------
    CREATE TABLE IF NOT EXISTS `mydb`.`User` (
    `id` INT NOT NULL,
    `firstname` MEDIUMTEXT NULL,
    `lastname` MEDIUMTEXT NULL,
    `nickname` MEDIUMTEXT NULL,
    `email` MEDIUMTEXT NULL,
    `password` MEDIUMTEXT NULL,
    `Role_id` INT NOT NULL,
    PRIMARY KEY (`id`, `Role_id`),
    INDEX `fk_User_Role1_idx` (`Role_id` ASC) VISIBLE,
    CONSTRAINT `fk_User_Role1`
        FOREIGN KEY (`Role_id`)
        REFERENCES `mydb`.`Role` (`id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
    ENGINE = InnoDB;


    -- -----------------------------------------------------
    -- Table `mydb`.`Survey`
    -- -----------------------------------------------------
    CREATE TABLE IF NOT EXISTS `mydb`.`Survey` (
    `id` INT NOT NULL,
    `title` MEDIUMTEXT NULL,
    `description` LONGTEXT NULL,
    `created` DATE NULL,
    `User_id` INT NOT NULL,
    PRIMARY KEY (`id`, `User_id`),
    INDEX `fk_Survey_User1_idx` (`User_id` ASC) VISIBLE,
    CONSTRAINT `fk_Survey_User1`
        FOREIGN KEY (`User_id`)
        REFERENCES `mydb`.`User` (`id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
    ENGINE = InnoDB;


    -- -----------------------------------------------------
    -- Table `mydb`.`Question`
    -- -----------------------------------------------------
    CREATE TABLE IF NOT EXISTS `mydb`.`Question` (
    `id` INT NOT NULL,
    `text` MEDIUMTEXT NULL,
    `type` TINYTEXT NULL,
    `Survey_id` INT NOT NULL,
    PRIMARY KEY (`id`, `Survey_id`),
    INDEX `fk_Question_Survey1_idx` (`Survey_id` ASC) VISIBLE,
    CONSTRAINT `fk_Question_Survey1`
        FOREIGN KEY (`Survey_id`)
        REFERENCES `mydb`.`Survey` (`id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
    ENGINE = InnoDB;


    -- -----------------------------------------------------
    -- Table `mydb`.`Answer`
    -- -----------------------------------------------------
    CREATE TABLE IF NOT EXISTS `mydb`.`Answer` (
    `id` INT NOT NULL,
    `text` MEDIUMTEXT NULL,
    `User_id` INT NOT NULL,
    `Question_id` INT NOT NULL,
    PRIMARY KEY (`id`, `User_id`, `Question_id`),
    INDEX `fk_Answer_User_idx` (`User_id` ASC) VISIBLE,
    INDEX `fk_Answer_Question1_idx` (`Question_id` ASC) VISIBLE,
    CONSTRAINT `fk_Answer_User`
        FOREIGN KEY (`User_id`)
        REFERENCES `mydb`.`User` (`id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    CONSTRAINT `fk_Answer_Question1`
        FOREIGN KEY (`Question_id`)
        REFERENCES `mydb`.`Question` (`id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
    ENGINE = InnoDB;


    -- -----------------------------------------------------
    -- Table `mydb`.`Permission`
    -- -----------------------------------------------------
    CREATE TABLE IF NOT EXISTS `mydb`.`Permission` (
    `id` INT NOT NULL,
    `name` TINYTEXT NOT NULL,
    PRIMARY KEY (`id`, `name`))
    ENGINE = InnoDB;


    -- -----------------------------------------------------
    -- Table `mydb`.`Grant`
    -- -----------------------------------------------------
    CREATE TABLE IF NOT EXISTS `mydb`.`Grant` (
    `id` INT NOT NULL,
    `appointed` DATE NULL,
    `Role_id` INT NOT NULL,
    `Permission_id` INT NOT NULL,
    PRIMARY KEY (`id`, `Role_id`, `Permission_id`),
    INDEX `fk_Grant_Role1_idx` (`Role_id` ASC) VISIBLE,
    INDEX `fk_Grant_Permission1_idx` (`Permission_id` ASC) VISIBLE,
    CONSTRAINT `fk_Grant_Role1`
        FOREIGN KEY (`Role_id`)
        REFERENCES `mydb`.`Role` (`id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    CONSTRAINT `fk_Grant_Permission1`
        FOREIGN KEY (`Permission_id`)
        REFERENCES `mydb`.`Permission` (`id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
    ENGINE = InnoDB;


    -- -----------------------------------------------------
    -- Table `mydb`.`State`
    -- -----------------------------------------------------
    CREATE TABLE IF NOT EXISTS `mydb`.`State` (
    `id` INT NOT NULL,
    `name` TINYTEXT NULL,
    PRIMARY KEY (`id`))
    ENGINE = InnoDB;


    -- -----------------------------------------------------
    -- Table `mydb`.`Action`
    -- -----------------------------------------------------
    CREATE TABLE IF NOT EXISTS `mydb`.`Action` (
    `id` INT NOT NULL,
    `date` DATE NULL,
    `Survey_id` INT NOT NULL,
    `State_id` INT NOT NULL,
    `Role_id` INT NOT NULL,
    PRIMARY KEY (`id`, `Survey_id`, `State_id`, `Role_id`),
    INDEX `fk_Action_Survey1_idx` (`Survey_id` ASC) VISIBLE,
    INDEX `fk_Action_State1_idx` (`State_id` ASC) VISIBLE,
    INDEX `fk_Action_Role1_idx` (`Role_id` ASC) VISIBLE,
    CONSTRAINT `fk_Action_Survey1`
        FOREIGN KEY (`Survey_id`)
        REFERENCES `mydb`.`Survey` (`id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    CONSTRAINT `fk_Action_State1`
        FOREIGN KEY (`State_id`)
        REFERENCES `mydb`.`State` (`id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    CONSTRAINT `fk_Action_Role1`
        FOREIGN KEY (`Role_id`)
        REFERENCES `mydb`.`Role` (`id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
        ENGINE = InnoDB;

    SET SQL_MODE=@OLD_SQL_MODE;
    SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
    SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


```

## RESTfull сервіс для управління даними

RESTfull API для управління даними таблиці Survey створеної в MySQL 
було створено за допомогою фреймворку Spring Boot на мові Java. 
RESTfull API представляє собою CRUD застосунок. 

### Файл .gradle з встановленими залежностями

```
    plugins {
	    id 'java'
	    id 'org.springframework.boot' version '3.2.0'
	    id 'io.spring.dependency-management' version '1.1.4'
    }

    group = 'com.example'
    version = '0.0.1-SNAPSHOT'

    java {
	    sourceCompatibility = '17'
    }

    repositories {
	    mavenCentral()
    }

    dependencies {
	    implementation 'org.springframework.boot:spring-boot-starter-web'
	    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
	    implementation 'mysql:mysql-connector-java:8.0.28'
	    runtimeOnly 'mysql:mysql-connector-java'
	    developmentOnly 'org.springframework.boot:spring-boot-devtools'
	    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    }

    tasks.named('test') {
	    useJUnitPlatform()
    }
```

### Підключення бази даних

```
    spring.jpa.hibernate.ddl-auto=update
    spring.datasource.url=jdbc:mysql://localhost:3306/lab6?useUnicode=true&useSSL=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC
    spring.datasource.username=root
    spring.datasource.password=7327Tim2005&

```

### Основний клас для запуску API
```
    package com.example.lab6;

    import org.springframework.boot.SpringApplication;
    import org.springframework.boot.autoconfigure.SpringBootApplication;
    
    @SpringBootApplication
    public class Lab6Application {
    
        public static void main(String[] args) {
            SpringApplication.run(Lab6Application.class, args);
        }
    }
```

### Клас сутності для взаємодії з БД

```
    package com.example.lab6.Entity;

    import jakarta.persistence.*;
    import java.sql.Date;
    import java.time.LocalDate;
    
    @Entity
    @Table(name = "survey")
    public class SurveyEntity {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String title;
        private String description;
        private Date created = Date.valueOf(LocalDate.now());
    
        public SurveyEntity() {
        }
        public void setId(Long id) {
            this.id = id;
        }
    
        public Long getId() {
            return id;
        }
    
        public String getTitle() {
            return title;
        }
    
        public void setTitle(String title) {
            this.title = title;
        }
    
        public String getDescription() {
            return description;
        }
    
        public void setDescription(String description) {
            this.description = description;
        }
    
        public Date getCreated() {
            return created;
        }
    
        public void setCreated(Date created) {
            this.created = created;
        }
    }
```

### Контролер для роботи з опитуваннями

```
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
```

### Репозиторій для роботи з опитуванняи

```
    package com.example.lab6.Repository;

    import com.example.lab6.Entity.SurveyEntity;
    import org.springframework.data.repository.CrudRepository;
    
    public interface SurveyRepo extends CrudRepository <SurveyEntity, Long>{
        SurveyEntity findByTitle(String title);
    }
```

### Сервіс для роботи з опитуваннями

```
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
            if (surveyRepo.findById(id) == null){
                throw new SurveyNotFoundException("Такого опитування вже не існує");
            }
            surveyRepo.deleteById(id);
            return id;
        }
        
        public SurveyEntity updateSurvey(Long id, SurveyEntity survey) throws SurveyAlreadyExistException {
            SurveyEntity surveyEntity = surveyRepo.findById(id).get();
            surveyEntity.setTitle(survey.getTitle());
            surveyEntity.setDescription(survey.getDescription());
            if(surveyRepo.findByTitle(surveyEntity.getTitle()) != null){
                throw new SurveyAlreadyExistException("Опитування з такою назвою вже існує!");
            }
            return surveyRepo.save(surveyEntity);
        }
    }
```

### Виняткові ситуації, які можуть виникнути

```
    package com.example.lab6.Exception;
    
    public class SurveyAlreadyExistException extends Exception{
        public SurveyAlreadyExistException(String message) {
            super(message);
        }
    }
```

```
    package com.example.lab6.Exception;

    public class SurveyNotFoundException extends Exception{
        public SurveyNotFoundException(String message) {
            super(message);
        }
    }
```