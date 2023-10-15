# Модель прецедентів

## Загальна схема
  
<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;"
>

@startuml

    actor Expert
    actor Client
  
    usecase "USER.MANAGE_ACCOUNT\nВзаємодія з\nобліковим записом" as UInteraction
    usecase "SURVEY.CREATE\nСтворити\nопитування" as SCreate
    usecase "SURVEY.CLOSE\nЗакрити\nопитування" as SClose
    usecase "SURVEY.MANAGE_QUESTIONS\nРедагувати опиутвання" as SEdit
    usecase "EXPERT.SURVEY_INTERACTION\nВзаємодія з опиутванням" as EInteraction
    usecase "SURVEY.SHARE\nПоділитись\nопитуванням" as SShare
    usecase "SURVEY.MANAGE_RESULTS\nВзаємодія\nз результатами" as SResults
 
  
      Client -d-|> Expert
      Expert -d-> EInteraction
      Client -d->UInteraction
      Client -l->SEdit
      Client -u->SShare
      Client -r->SResults
      Client -u->SClose
      Client -u->SCreate
      
@enduml

</center>

## Схема клієнта

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;"
>

@startuml

    actor Client as Client
  
    usecase "USER.SIGNUP\nЗареєструвати" as SIGNUP
    usecase "USER.SIGNIN\nАвторизувати"  as SIGNIN
    usecase "SURVEY.CREATE\nСтворити опитування" as CREATTE
    usecase "SURVEY.CLOSE\nЗакрити опитування" as CLOSE
    usecase "SURVEY.GET_RESULTS\nОтримати результати\n опитування" as GET_RESULT
    usecase "SURVEY.GET_QUESTION\nОтримати статистику\n відповідей на конкретне питання" as GET_QUESTION
    usecase "SURVEY.ADD_QUESTION\nДодати питання\n до опитування" as ADD_QUESTION
    usecase "SURVEY.DELETE_QUESTION\nВидалити питання\n з опитування" as DELETE_QUESTION
    usecase "SURVEY.EXPORT\nЕкспортувати результати\n опитування" as EXPORT
    usecase "USER.SHARE\nНадати доступ\n до опитування" as SHARE
    usecase "USER.MANAGE_ACCOUNT\nВзаємодія з\nобліковим записом" as UInteraction
    usecase "SURVEY.MANAGE_QUESTIONS\nРедагувати опитування" as SEdit
    usecase "SURVEY.MANAGE_RESULTS\nВзаємодія з результатами" as SResults
  
      Client -r-> UInteraction
      Client -d-> SEdit
      Client -l-> SResults
      Client -u-> CREATTE
      Client -u-> CLOSE
      Client -u-> SHARE
      UInteraction -r-> SIGNUP
      UInteraction -d-> SIGNIN
      SEdit <-d. DELETE_QUESTION : extends
      SEdit <-d. ADD_QUESTION : extends
      SResults <-l. GET_RESULTS : extends 
      SResults <-u. GET_QUESTION : extends 
      SResults <-d. EXPORT : extends
  
@enduml

</center>

## Схема експерта

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;"
>

@startuml

    actor "Експерт" as Collaborator

    usecase "EXPERT.SURVEY_INTERACTION\nВзаємодія з опитування"  as SurveyInteraction
    usecase "EXPERT.TAKE_SURVEY\nПройти опитування" as TakeSurvey
    usecase "EXPERT.CHANGE_ANSWERS\nЗмінити відповіді пройденого опитування" as ChangeAnswers
    
    Collaborator -d-> SurveyInteraction
    SurveyInteraction  -d-> TakeSurvey
    SurveyInteraction  <.d. ChangeAnswers : extends
    
    
@enduml


</center>

## Сценарії використання

### USER.SIGNUP

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;"
>

@startuml

    |Клієнт|
    start;
    :натискає форму реєстрації; 

    |Система|
    :генерує форму для реєстрації;
    :повертає форму користувачу;

    |Клієнт|
    :вводить дані для реєстрації;
    :натискає кнопку\n"Зареєструватися";

    |Система|
    :обробляє отримані дані від клієнта;
    note right #ffaaaa
    <b> Може виникнути
    <b> InvalidDataException
    <b> AlreadyRegisteredException
    end note
    :створює обліковий запис;
    :повідомляє клієнту про успішне\n створення облікового запису;

    |Клієнт|
    stop;

@enduml

</center>

### USER.SIGNIN

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;"
>

@startuml

    |Клієнт|
    start;
    :натискає кнопку "Вхід"; 

    |Система|
    :генерує форму авторизації;
    :повертає форму користувачу;

    |Клієнт|
    :вводить дані для входу;
    :натискає кнопку "Увійти";

    |Система|
    :обробляє отримані дані від клієнта;
    note right #ffaaaa
    <b> Може виникнути
    <b> InvalidDataException
    end note
    :повідомляє клієнту про успішну авторизацію;
    :надає доступ до облікового запису;

    |Клієнт|
    stop;

@enduml

</center>

### SURVEY.CREATE

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;"
>

@startuml

    |Клієнт|
    start;
    :натискає кнопку \n створити опитування;

    |Система|
    :створює шаблон для \n створення опитування;

    |Клієнт|
    :відкриває шаблон опитування;
    :заповнює поля в шаблоні;
    :надсилає запит в систему для \n збереження опитування;

    |Система|
    :обробляє запит;
    note right #ffaaaa
    <b> Може виникнути
    <b> EmptySurveyException
    end note
    :додає опитування в базу;
    :надає користувачу сторінку \n створеного опитування;

    |Клієнт|
    stop;

@enduml

</center>

### SURVEY.CLOSE

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;"
>

@startuml

    |Клієнт|
    start;
    :обирає відкрите опитування;
    :надсилає запит в систему для \n закриття опитування;

    |Система|
    :обробляє запит;
    :закриває опитвання;
    
    |Система|
    :зберігає результати опитування;

    |Клієнт|
    :отримує повідомлення \nпро закриття опитування;
    stop;

@enduml

</center>

### SURVEY.GET_RESULTS

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;"
>

@startuml

    |Клієнт|
    start;
    :обирає опитування;
    :натискає на кнопку\n"Отримати результати";
    :надсилає запит для\nперегляду результатів;

    |Система|

    :обробляє запит\nдля перегляду результатів;
    :надає результати опитування;
    
    |Клієнт|
    stop;

@enduml

</center>

### SURVEY.ADD_QUESTION

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;"
>

@startuml

    |Клієнт|
    start;
    :обирає опитування;
    :натискає кнопку\n"Редагувати опитування"; 

    |Система|
    :отримує запит на\nредагування опитування;
    :відправляє форму\nдля редагування;

    |Клієнт|
    :отримує форму;
    :обирає тип питання;
    :додає питання;

    |Система|
    :обробляє запит на додавання;
    note right #ffaaaa
    <b> Може виникнути
    <b> QuestionExistsException
    end note
    :додає питання у базу даних;
    :відправляє повідомлення\nпро успішне додавання питання;

    |Клієнт|
    stop;

@enduml

</center>

### SURVEY.DELETE_QUESTION

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;"
>

@startuml

    |Клієнт|
    start;
    :обирає опитування;
    :натискає кнопку\n"Редагувати опитування"; 

    |Система|
    :отримує запит на\nредагування опитування;
    :відправляє форму\nдля редагування;

    |Клієнт|
    :отримує форму;
    :обирає питання;
    :надсилає запит\nна видалення питанння;

    |Система|
    :обробляє запит на видалення;
    note right #ffaaaa
    <b> Може виникнути
    <b> EmptySurveyException
    end note
    :видаляє питання з бази даних;
    :відправляє повідомлення\nпро успішне видалення питання;

    |Клієнт|
    stop;

@enduml

</center>

### EXPERT.TAKE_SURVEY

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;"
>

@startuml

    |Клієнт|    
    start;
    :переходить по посиланню;
    :відповідає на питання опитування;
    :завершує проходження;
    
    |Система|
    :обробляє результати опитування;
    note right #ffaaaa
    <b> може виникнути
    <b> SurveyNotCompletedException
    end note
    :зберігає відповіді у базу даних;
    
    |Клієнт|
    :отримує повідомлення про\nзавершення опитування;
    stop;

@enduml

</center>

### EXPERT.CHANGE_ANSWERS

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;"
>

@startuml

    |Експерт|
    start;
    :відкриває опитування;
    :натискає кнопку "Змінити відповіді";
    
    |Система|
    :оброблює запит\n перевіряє можливість редагування;
    note right #ffaaaa
    <b> може виникнути
    <b> SurveyNotAvailableException
    end note
    :отримує дані з БД;
    :надсилає дані;
        
    |Експерт|
    :відповідає на питання з опитування;
    :натискає кнопку "Надіслати";
    
    |Система|
    :система оновлює дані в БД;
    note right #ffaaaa
    <b> може виникнути
    <b> SurveyNotCompletedException
    end note
    
    |Експерт|
    :отримує підтвердження змінених відповідей;
    stop;
@enduml

</center>

### SURVEY.EXPORT

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;"
>

@startuml

    |Клієнт|
    start;
    :обирає опитування;
    
    |Система|
    :надає варіанти експорту;
    
    |Клієнт|
    :обирає варіант експорту;
    :відправляє запит;
    
    |Система|
    : обробляє запит;
    note right #ffaaaa
    <b> Може виникнути
    <b> DataFormatRequiredException
    end note
    :генерує файл з \n результатами опитування \n у вибраному форматі;
    
    |Клієнт|
    :отримує готовий файл;
    stop;

@enduml

</center>

### SURVEY.SHARE

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;"
>

@startuml

    |Клієнт|
    start;
    :обирає відкрите опитування;
    :натискає на кнопку поділитись;
    
    |Система|
    :генерує унікальне посилання;
    
    |Клієнт|
    stop;

@enduml

</center>

### SURVEY.GET_QUESTION

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;"
>

@startuml

    |Клієнт|
    start;
    :відкриває опитування;
    
    |Система|
    :отримує дані з БД;
    :надсилаю дані клієнту;
        
    |Клієнт|
    :натискає на питання;
    
    |Система|
    :отримує статистичні дані з БД\n надсилає дані клієнту;
    note right #ffaaaa
    <b> може виникнути
    <b> EmptyResultsException
    end note

    |Клієнт|
    :отримує дані про опитування;
    stop;

@enduml
