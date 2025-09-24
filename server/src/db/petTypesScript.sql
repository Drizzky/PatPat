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
('Norwegian Forest', @catId),
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
("Campbell's Russian Dwarf", @hamsterId),
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
('Tortoise', @reptileId),
('Turtle', @reptileId),
('Crocodile', @reptileId);

SET @snakeId = (SELECT id FROM TYPES WHERE name = 'Snake');
SET @lizardId = (SELECT id FROM TYPES WHERE name = 'Lizard');
SET @turtleId = (SELECT id FROM TYPES WHERE name = 'Turtle');
SET @tortoiseId = (SELECT id FROM TYPES WHERE name = 'Tortoise');

--SNAKES
INSERT INTO TYPES (name, idParent) VALUES
('Python', @snakeId),
('Boa', @snakeId),
('Colubrid', @snakeId),
('Viper', @snakeId);

SET @pythonId = (SELECT id FROM TYPES WHERE name = 'Python' LIMIT 1);
SET @boaId = (SELECT id FROM TYPES WHERE name = 'Boa' LIMIT 1);
SET @colubridId = (SELECT id FROM TYPES WHERE name = 'Colubrid' LIMIT 1);
SET @viperId = (SELECT id FROM TYPES WHERE name = 'Viper' LIMIT 1);

-- Pythons
INSERT INTO TYPES (name, idParent) VALUES
('Ball ', @pythonId),
('Burmese', @pythonId),
('Blood', @pythonId),
('Green Tree', @pythonId);

-- Boas
INSERT INTO TYPES (name, idParent) VALUES
('Constrictor', @boaId),
('Red-Tail Boa', @boaId),
('Rosy Boa', @boaId),
('Kenyan Sand', @boaId),
('Brazilian Rainbow', @boaId);

-- Colubrids
INSERT INTO TYPES (name, idParent) VALUES
('Corn', @colubridId),
('King', @colubridId),
('Milk', @colubridId),
('Garter', @colubridId),
('Water', @colubridId),
('Black Rat', @colubridId),
('Hognose', @colubridId);

-- Vipers
INSERT INTO TYPES (name, idParent) VALUES
('Rattlesnake', @viperId);

--LIZARDS
INSERT INTO TYPES (name, idParent) VALUES
('Gecko', @lizardId),
('Dragon', @lizardId),
('Chameleon', @lizardId),
('Monitor', @lizardId),
('Iguana', @lizardId),
('Anole', @lizardId),
('Skink', @lizardId);
('Egyptian Spiny-Tailed Lizard', @lizardId),
('Ornate Spiny-Tailed Lizard', @lizardId),
('Sudanese Spiny-Tailed Lizard', @lizardId);

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
('Bearded', @dragonId),
('Frilled', @dragonId),
('Chinese Water', @dragonId),
("Rankin's", @dragonId),
('Komodo', @dragonId),
('Crested', @dragonId),

--CHAMALEONS
INSERT INTO TYPES (name, idParent) VALUES
("Jackson's", @chameleonId),
('Brookesia Micra', @chameleonId),
('Lance-Nosed', @chameleonId),
("Parson's", @chameleonId),
('Brown Leaf', @chameleonId),
('Jewelled', @chameleonId),
('Rhinoceros', @chameleonId),
('Panther', @chameleonId),
('Veiled', @chameleonId),
('Nose-Horned', @chameleonId),
('Cameroon Salfin', @chameleonId),
('Carpet', @chameleonId),
('Rudis', @chameleonId),
('Vemen', @chameleonId);

--MONITORS
INSERT INTO TYPES (name, idParent) VALUES
INSERT INTO TYPES (name, idParent) VALUES
('Ackie', @monitorId),             
('Spiny-Tailed', @monitorId),
('Black-Throated', @monitorId),
('White-Throated', @monitorId),
('Peach-Throated', @monitorId),
('Water', @monitorId),
('Savannah', @monitorId),     
('Tree', @monitorId),
('Rough-Necked', @monitorId),
('Mangrove', @monitorId),
('Nile', @monitorId),
("Dumeril's", @monitorId),
('Emerald Tree', @monitorId),
('Argus', @monitorId),
('Crocodile', @monitorId),
('Lace', @monitorId),
('Yellow-Spotted', @monitorId);

-- TURTLES
INSERT INTO TYPES (name, idParent) VALUES
('Red-Eared Slider', @turtleId),
('Box Turtle', @turtleId),
('African Sideneck', @turtleId),
('Eastern Box', @turtleId),
('Western Painted', @turtleId),
('Mississippi Map', @turtleId),
('Common Musk', @turtleId),
('Spotted', @turtleId),
('Yellow-Bellied Slider', @turtleId),
("Reeve's", @turtleId),
('Wood', @turtleId);

-- TORTOISES
INSERT INTO TYPES (name, idParent) VALUES
('Red-Footed', @tortoiseId),
("Hermann's", @tortoiseId),
('Russian', @tortoiseId),
('Marginated', @tortoiseId),
('Asia Minor', @tortoiseId),
('Sulcata', @tortoiseId),
('Greek', @tortoiseId),
('Indian Star', @tortoiseId),
('Aldabra Giant', @tortoiseId),
('Burmese Star', @tortoiseId),
('Desert', @tortoiseId),
('Leopard', @tortoiseId),
('Egyptian', @tortoiseId),
('Pancake', @tortoiseId),
('Gopher', @tortoiseId),
('Hingeback', @tortoiseId),
('Elongated', @tortoiseId),
('Yellow-Footed', @tortoiseId),
('Galapagos', @tortoiseId);

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

-- PARROTS
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
