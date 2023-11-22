# This That back end

## Description

Simple nest.js api endpoint for marvel characters and their friends/enemies


## Installation

Ensure that you have Node.js, Nest.js and postgresql installed on your system then modifying the .env variables and make sure the docker variables are exactly the same. Note, you can run locally without docker.

Ensure you have an open db. I've used TablePlus. Use the same user, password and name that is stored in your .env

```bash
LOCAL DEPLOYMENT 
npm i
npm run start

access endpoint via https://localhost:3000/characters

DOCKER DEPLOYMENT 
npm i
docker build -t your-image-name:tag .
npm run down
npm run up

access endpoint via https://localhost:3001/characters
```

## Mock-Up

The following picture shows the relationship between the data ERD:

![The following picture shows an example of the application being used.](./erd_marvel.png)




## SQL QUERIES


CRUD: 

```bash
# Schema deployment
CREATE TABLE Character (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    gender ENUM('male', 'female', 'other') NOT NULL,
    active BOOLEAN NOT NULL
);

CREATE TABLE Character_Character_KnownAccomplices (
    characterId INT,
    knownAccompliceId INT,
    PRIMARY KEY (characterId, knownAccompliceId),
    FOREIGN KEY (characterId) REFERENCES Character(id) ON DELETE CASCADE,
    FOREIGN KEY (knownAccompliceId) REFERENCES Character(id) ON DELETE CASCADE
);

CREATE TABLE Character_Character_KnownEnemies (
    characterId INT,
    knownEnemyId INT,
    PRIMARY KEY (characterId, knownEnemyId),
    FOREIGN KEY (characterId) REFERENCES Character(id) ON DELETE CASCADE,
    FOREIGN KEY (knownEnemyId) REFERENCES Character(id) ON DELETE CASCADE
);

```



  
```bash  
CREATE
# - Create a lonely character without enemies or accomplices:
INSERT INTO "character"("name", "age", "gender", "active") VALUES ($1, $2, $3, $4) RETURNING "id" -- PARAMETERS: ["Mr Marvel",20,"male",true]
# - Create a character with known enemies and accomplices:
WITH new_character AS (
    INSERT INTO "Character"("name", "age", "gender", "active")
    VALUES ('Mr Marvel', 20, 'male', true)
    RETURNING "id"
)
INSERT INTO "Character_Character_KnownAccomplices"("characterId", "knownAccompliceId")
SELECT new_character.id, 1 FROM new_character;
```

```bash  
READ
# - Read all characters
SELECT * FROM "character"
# - Read all the data in the database: 
SELECT * 
FROM "character" "Character" LEFT JOIN "character_known_accomplices_character" "Character_Character__Character_knownAccomplices" ON "Character_Character__Character_knownAccomplices"."characterId_1"="Character"."id" LEFT JOIN "character" "Character__Character_knownAccomplices" ON "Character__Character_knownAccomplices"."id"="Character_Character__Character_knownAccomplices"."characterId_2"  
```

```bash  
UPDATE
# - Update a character
UPDATE "character" SET "name" = $1, "age" = $2, "gender" = $3, "active" = $4 WHERE "id" IN ($5) -- PARAMETERS: ["Goku",20,"male",true,"8"]
```

```bash  
DESTROY
# - delete character
DELETE FROM "character" WHERE "id" IN ($1) -- PARAMETERS: ["9"]
```

## Notes
- The task was really interesting. I have never used NestJs so it was great fun learning how to build an Entity then link services and controllers to mutate and populate the schema with data.
- Highlight: Getting the CRUD operations to work across multiple ports with docker
- Challenge: Completely new file structure and syntax with NestJs that i am unfamiliar with.
- Furthermore i would implement more complex queries and handle edge cases. I would also grab the front end data and store it. Then i would display a sort of 'build your own team' where your heros are displayed.

###

Written by Christian Alteri

To learn more about other projects, [click here](https://github.com/ChristianAlteri/marvel-api).

####

[![License](https://img.shields.io/badge/LICENSE-MIT-red)](LICENSE)