-- ===========================
-- TOP LEVEL CATEGORIES
-- ===========================
INSERT INTO TYPES (name, idParent) VALUES
('Mammal', NULL),
('Reptile', NULL),
('Bird', NULL),
('Fish', NULL),
('Amphibian', NULL),
('Insect', NULL),
('Arachnid', NULL),
('Exotic Mammal', NULL),

-- ===========================
-- MAMMALS
-- ===========================
SET @mammalId = (SELECT id FROM TYPES WHERE name = 'Mammal');
SET @exoticId = (SELECT id FROM TYPES WHERE name = 'Exotic Mammal');

--
INSERT INTO TYPES (name, idParent) VALUES
('Dog', @mammalId),
('Cat', @mammalId),
('Rabbit', @mammalId),
('Rodent', @mammalId),
('Ferret', @mammalId),
('Guinea Pig', @mammalId);

SET @dogId = (SELECT id FROM TYPES WHERE name = 'Dog');
SET @catId = (SELECT id FROM TYPES WHERE name = 'Cat');
SET @rodentId = (SELECT id FROM TYPES WHERE name = 'Rodent');

--DOGS
INSERT INTO TYPES (name, idParent) VALUES
('Labrador', @dogId),
('Beagle', @dogId),
('Bulldog', @dogId),
('German Shepherd', @dogId),
('Alaskan Malamute', @dogId),
('Akita', @dogId),
('Shiba Inu', @dogId),
('American Foxhound', @dogId)
('American Bulldog', @dogId),
('Husky', @dogId),
('German Shephard', @dogId),
('Labrador', @dogId),
('French Bulldog', @dogId),
('Beagle', @dogId),
('Dachshund', @dogId),
('Pug', @dogId),
('Rottweiler', @dogId),
('Great Dane', @dogId),
('Boxer', @dogId),
('Yorkshire Terrier', @dogId),
('English Cocker Spaniel', @dogId),
('Chow Chow', @dogId),
('Bull Terrier', @dogId),
('Corgi', @dogId),
('Pomeranian', @dogId),
('Basenji', @dogId),
('Doberman', @dogId),
('Sheltie', @dogId),
('Shih Tzu', @dogId),
('Poodle', @dogId),
('Australian Shepherd', @dogId),
('Chihuaha', @dogId),
('Golden Retriever', @dogId),
('American Pit Bull Terrier', @dogId),
('Bloodhound', @dogId),
('Bullmastiff', @dogId),
('Collie', @dogId),
('Dalmation', @dogId),
('English Foxhound', @dogId);


--CATS
INSERT INTO TYPES (name, idParent) VALUES
('Siamese', @catId),
('Persian', @catId),
('Maine Coon', @catId),
('Sphynx', @catId),
('British Shorthair', @catId),
('Bombay', @catId),
('Siberian', @catId),
('Munchkin', @catId),
('Ragdoll', @catId),
('Bengal', @catId),
('Burmese', @catId),
('Peterbald', @catId),
('Ragamuffin', @catId),
('Scottish Fold', @catId),
('Somali', @catId),
('Abyssinian', @catId),
('American Shorthair', @catId),
('Norwegian Forest Cat', @catId),
('Oriental Shorthair', @catId),
('Devon Rex', @catId),
('Russian Blue', @catId),
('Turkish Angora', @catId),
('Tabby', @catId);

--RODENTS
INSERT INTO TYPES (name, idParent) VALUES
('Rat', @rodentId),
('Mouse', @rodentId),
('Chinchilla', @rodentId),
('Gerbil', @rodentId),
('Hamster', @rodentId);

SET @ratId = (SELECT id FROM TYPES WHERE name = 'Rat');
SET @mouseId = (SELECT id FROM TYPES WHERE name = 'Mouse');
SET @hamsterId = (SELECT id FROM TYPES WHERE name = 'Hamster');

--RATS
INSERT INTO TYPES (name, idParent) VALUES
('Fancy', @ratId),
('Dumbo', @ratId),
('Sphynx', @ratId),
('Rex', @ratId),
('Satin', @ratId),
('Tailless', @ratId),
('Topaz', @ratId),
('Bristle Coat', @ratId),
('Manx', @ratId),
('Siamese', @ratId);

--MICE
INSERT INTO TYPES (name, idParent) VALUES
('Fancy', @mouseId),
('Standard', @mouseId),
('Long-Haired', @mouseId),
('Satin', @mouseId),
('Rex', @mouseId),
('Hairless', @mouseId),
('Tailless', @mouseId),
('Agouti', @mouseId),
('Brindle', @mouseId),
('Pied', @mouseId),
('Himalayan', @mouseId),
('Merle', @mouseId);

--HAMSTERS
INSERT INTO TYPES (name, idParent) VALUES
('Syrian', @hamsterId),
('Chinese', @hamsterId),
('Winter White Russian Dwarf', @hamsterId),
('Campbell Russian Dwarf', @hamsterId),
('Roborovski Dwarf', @hamsterId),
('European', @hamsterId),

INSERT INTO TYPES (name, idParent) VALUES
('Sugar Glider', @exoticId),
('Hedgehog', @exoticId),
('Capybara', @exoticId);

-- ===========================
-- REPTILES
-- ===========================
SET @reptileId = (SELECT id FROM TYPES WHERE name = 'Reptile');

INSERT INTO TYPES (name, idParent) VALUES
('Snake', @reptileId),
('Lizard', @reptileId),
('Turtle', @reptileId),
('Crocodile', @reptileId);

SET @snakeId = (SELECT id FROM TYPES WHERE name = 'Snake');
SET @lizardId = (SELECT id FROM TYPES WHERE name = 'Lizard');
SET @turtleId = (SELECT id FROM TYPES WHERE name = 'Turtle');

--SNAKES REDO
INSERT INTO TYPES (name, idParent) VALUES
('Ball Python', @snakeId),
('Corn Snake', @snakeId),
('King Snake', @snakeId);
('Milk Snake', @snakeId),
('Garter Snake', @snakeId),
('Water Snake', @snakeId),
('Green Tree Python', @snakeId),
('Brazilian Rainbow Boa', @snakeId),
('Red-Tail Boa', @snakeId),
('Kenyan Sand Boa', @snakeId),
('Burmese Python', @snakeId),
('Blood Python', @snakeId),
('Black Rat Snake', @snakeId),
('Rattle Snake', @snakeId),
('Boa Constrictor', @snakeId),
('Rosy Boa', @snakeId),
("Hognose", @SnakeId);

--LIZARDS
INSERT INTO TYPES (name, idParent) VALUES
('Gecko', @lizardId),
('Dragon', @lizardId),
('Chameleon', @lizardId),
('Monitor', @lizardId),
('Iguana', @lizardId),
('Anole', @lizardId),
('Skink', @lizardId);

SET @geckoId = (SELECT id FROM TYPES WHERE name = 'Gecko');
SET @dragonId = (SELECT id FROM TYPES WHERE name = 'Dragon');
SET @chameleonId = (SELECT id FROM TYPES WHERE name = 'Chameleon');
SET @monitorId = (SELECT id FROM TYPES WHERE name = 'Monitor');
SET @iguanaId = (SELECT id FROM TYPES WHERE name = 'Iguana');
SET @anoleId = (SELECT id FROM TYPES WHERE name = 'Anole');
SET @skinkId = (SELECT id FROM TYPES WHERE name = 'Skink');

-- GECKOS
INSERT INTO TYPES (name, idParent) VALUES
('Leopard', @geckoId),
('Crested', @geckoId),
('Gargoyle', @geckoId),
('African Fat-Tailed', @geckoId),
('Tokay', @geckoId),
('Madagascar Day', @geckoId),
('Giant Day', @geckoId),
('Chinese Cave', @geckoId),
('Frog-Eyed', @geckoId),
('Flying', @geckoId),
('Electric Blue Day', @geckoId);

--DRAGONS
INSERT INTO TYPES (name, idParent) VALUES
('Bearded Dragon', @dragonId),
('Frilled Dragon', @dragonId),
('Chinese Water Dragon', @dragonId),
("Rankin's Dragon", @dragonId),
('Komodo Dragon', @dragonId),
('Crested Dragons', @dragonId),
('Egyptian Spiny-Tailed Lizard', @dragonId),
('Ornate Spiny-Tailed Lizard', @dragonId),
('Sudanese Spiny-Tailed Lizard', @dragonId);

--CHAMALEONS
INSERT INTO TYPES (name, idParent) VALUES
("Jackson's Chameleon", @chameleonId),
('Brookesia Micra', @chameleonId),
('Lance-Nosed Chameleon', @chameleonId),
("Parson's Chameleon", @chameleonId),
('Brown Leaf Chameleon', @chameleonId),
('Jewelled Chameleon', @chameleonId),
('Rhinoceros Chameleon', @chameleonId),
('Panther Chameleon', @chameleonId),
('Veiled Chameleon', @chameleonId),
('Nose-Horned Chameleon', @chameleonId),
('Cameroon Salfin Chameleon', @chameleonId),
('Carpet Chameleon', @chameleonId),
('Rudis Chameleon', @chameleonId),
('Vemen Chameleon', @chameleonId);

--MONITORS
INSERT INTO TYPES (name, idParent) VALUES
('Spiny-Tailed Monitor', @monitorId)

INSERT INTO TYPES (name, idParent) VALUES
('Red-Eared Slider', @turtleId),
('Box Turtle', @turtleId);

-- ===========================
-- BIRDS
-- ===========================
SET @birdId = (SELECT id FROM TYPES WHERE name = 'Bird');

INSERT INTO TYPES (name, idParent) VALUES
('Parrot', @birdId),
('Canary', @birdId),
('Finch', @birdId),
('Cockatiel', @birdId);

SET @parrotId = (SELECT id FROM TYPES WHERE name = 'Parrot');

INSERT INTO TYPES (name, idParent) VALUES
('Macaw', @parrotId),
('African Grey', @parrotId),
('Budgerigar', @parrotId);

-- ===========================
-- FISH
-- ===========================
SET @fishId = (SELECT id FROM TYPES WHERE name = 'Fish');

INSERT INTO TYPES (name, idParent) VALUES
('Goldfish', @fishId),
('Betta', @fishId),
('Guppy', @fishId),
('Angelfish', @fishId),
('Cichlid', @fishId);

-- ===========================
-- AMPHIBIANS
-- ===========================
SET @amphibianId = (SELECT id FROM TYPES WHERE name = 'Amphibian');

INSERT INTO TYPES (name, idParent) VALUES
('Frog', @amphibianId),
('Salamander', @amphibianId),
('Toad', @amphibianId);

-- ===========================
-- INSECTS
-- ===========================
SET @insectId = (SELECT id FROM TYPES WHERE name = 'Insect');

INSERT INTO TYPES (name, idParent) VALUES
('Beetle', @insectId),
('Butterfly', @insectId),
('Ant', @insectId),
('Cockroach', @insectId);

-- ===========================
-- ARACHNIDS
-- ===========================
SET @arachnidId = (SELECT id FROM TYPES WHERE name = 'Arachnid');

INSERT INTO TYPES (name, idParent) VALUES
('Spider', @arachnidId),
('Scorpion', @arachnidId);

SET @spiderId = (SELECT id FROM TYPES WHERE name = 'Spider');

INSERT INTO TYPES (name, idParent) VALUES
('Tarantula', @spiderId);

SET @tarantulaId = (SELECT id FROM TYPES WHERE name = 'Tarantula');

INSERT INTO TYPES (name, idParent) VALUES
('Mexican Red Knee', @tarantulaId),
('Pinktoe', @tarantulaId);
