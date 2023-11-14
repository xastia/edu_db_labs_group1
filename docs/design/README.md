# Проєктування бази даних

## Mодель бізнес-об'єктів

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;">

@startuml

    entity User
    entity Role
    entity Grant
    entity Survey
    entity Question
    entity Answer
    entity Action
    entity Permission
    entity State

    User "0,*"--"1,1" Role
    Grant "0,*"--"1,1" Role
    User "1,1"--"0,*" Answer
    User "1,1"--"0,*" Survey
    Survey "1,1"*--"0,*" Question
    Role "1,1"--"0,*" Action
    Survey "1,1"--"0,*" Action
    Answer "0,*"--*"1,1" Question
    Grant "0,*"--"1,1" Permission
    Action "0,*"--"1,1" State

    entity User.id
    entity User.firstname
    entity User.lastname
    entity User.nickname
    entity User.email
    entity User.password
    
    entity Role.id
    entity Role.name

    entity Permission.id
    entity Permission.name

    entity Grant.id
    entity Grant.appointed

    entity Survey.id
    entity Survey.title
    entity Survey.description
    entity Survey.createdAt

    entity Question.id
    entity Question.text
    entity Question.type

    entity Answer.id
    entity Answer.text

    entity Action.id
    entity Action.date
    entity Action.state

    entity State.id
    entity State.name

    User.id --* User
    User.firstname --* User
    User.lastname --* User
    User.nickname --* User
    User.email --* User
    User.password --* User

    Role *-- Role.id
    Role *-- Role.name

    Grant *-- Grant.id
    Grant *-- Grant.appointed

    Permission *-- Permission.id
    Permission *-- Permission.name

    Survey *-- Survey.id
    Survey *-- Survey.title
    Survey *-- Survey.description
    Survey *-- Survey.createdAt

    Question *-- Question.id
    Question *-- Question.text
    Question *-- Question.type

    Answer *-- Answer.id
    Answer *-- Answer.text

    Action *-- Action.id
    Action *-- Action.date

    State *-- State.id
    State *-- State.name

@enduml

</center>

## ER-модель
<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;">

@startuml

    package UserControl {
        entity User
        {
            id: INT
            firstname: MEDIUMTEXT
            lastname: MEDIUMTEXT
            nickname: MEDIUMTEXT
            email: MEDIUMTEXT
            password: MEDIUMTEXT
        }
    }
    package PermissionControl {
    entity Grant    
        {
            id: INT
            appointed: DATE
        }

        entity Role
        {
            id: INT
            name: TINYTEXT
        }
    
        entity Permission
        {
            id: INT
            name: TINYTEXT
        }
    }

    package SurveyControl {
        entity Survey
        {
        id: INT
        title: MEDIUMTEXT
        description: LONGTEXT
        created: DATE
        }

        entity Answer
        {
            id: INT
            text: MEDIUMTEXT
        }
 
        entity Question
        {
            id: INT
            text: MEDIUMTEXT
            type: TINYTEXT
        }
    
        entity Action
        {
            id: INT
            date: DATE
        }
    
        entity State
        {
            id: INT
            name: TINYTEXT
        }
    }
    User "0,*"--"1,1" Role
    Grant "0,*"--"1,1" Role
    User "1,1"--"0,*" Answer
    User "1,1"--"0,*" Survey
    Survey "1,1"*--"0,*" Question
    Role "1,1"--"0,*" Action
    Survey "1,1"--"0,*" Action
    Answer "0,*"--*"1,1" Question
    Grant "0,*"--"1,1" Permission
    Action "0,*"--"1,1" State

@enduml

</center>

## Реляційна схема

![relation-diagram](./images/relation-diagram.png)
