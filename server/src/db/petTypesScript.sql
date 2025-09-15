INSERT INTO TYPES (name, idParent) VALUES
('Animal', NULL),
('Reptile', NULL),
('Bird', NULL),
('Fish', NULL),
('Amphibian', NULL),
('Insect', NULL),
('Arachnid', NULL),
('Exotic Mammal', NULL),
('Small Pet', NULL);

-- ===========================
-- MAMMALS
-- ===========================
INSERT INTO TYPES (name, idParent) VALUES
('Dog', (SELECT id FROM TYPES WHERE name = 'Animal' LIMIT 1)),
('Cat', (SELECT id FROM TYPES WHERE name = 'Animal' LIMIT 1)),
('Rabbit', (SELECT id FROM TYPES WHERE name = 'Animal' LIMIT 1)),
('Rodent', (SELECT id FROM TYPES WHERE name = 'Animal' LIMIT 1)),
('Ferret', (SELECT id FROM TYPES WHERE name = 'Animal' LIMIT 1)),
('Guinea Pig', (SELECT id FROM TYPES WHERE name = 'Animal' LIMIT 1)),
('Hamster', (SELECT id FROM TYPES WHERE name = 'Animal' LIMIT 1));

-- Dog breeds
INSERT INTO TYPES (name, idParent) VALUES
('Labrador', (SELECT id FROM TYPES WHERE name = 'Dog' LIMIT 1)),
('Beagle', (SELECT id FROM TYPES WHERE name = 'Dog' LIMIT 1)),
('Bulldog', (SELECT id FROM TYPES WHERE name = 'Dog' LIMIT 1)),
('German Shepherd', (SELECT id FROM TYPES WHERE name = 'Dog' LIMIT 1));

-- Cat breeds
INSERT INTO TYPES (name, idParent) VALUES
('Siamese', (SELECT id FROM TYPES WHERE name = 'Cat' LIMIT 1)),
('Persian', (SELECT id FROM TYPES WHERE name = 'Cat' LIMIT 1)),
('Maine Coon', (SELECT id FROM TYPES WHERE name = 'Cat' LIMIT 1)),
('Sphynx', (SELECT id FROM TYPES WHERE name = 'Cat' LIMIT 1));

-- Rodents & small mammals
INSERT INTO TYPES (name, idParent) VALUES
('Rat', (SELECT id FROM TYPES WHERE name = 'Rodent' LIMIT 1)),
('Mouse', (SELECT id FROM TYPES WHERE name = 'Rodent' LIMIT 1)),
('Chinchilla', (SELECT id FROM TYPES WHERE name = 'Rodent' LIMIT 1));

-- Exotic Mammals
INSERT INTO TYPES (name, idParent) VALUES
('Sugar Glider', (SELECT id FROM TYPES WHERE name = 'Exotic Mammal' LIMIT 1)),
('Hedgehog', (SELECT id FROM TYPES WHERE name = 'Exotic Mammal' LIMIT 1)),
('Capybara', (SELECT id FROM TYPES WHERE name = 'Exotic Mammal' LIMIT 1));

-- ===========================
-- REPTILES
-- ===========================
INSERT INTO TYPES (name, idParent) VALUES
('Snake', (SELECT id FROM TYPES WHERE name = 'Reptile' LIMIT 1)),
('Lizard', (SELECT id FROM TYPES WHERE name = 'Reptile' LIMIT 1)),
('Turtle', (SELECT id FROM TYPES WHERE name = 'Reptile' LIMIT 1)),
('Crocodile', (SELECT id FROM TYPES WHERE name = 'Reptile' LIMIT 1));

-- Snakes
INSERT INTO TYPES (name, idParent) VALUES
('Ball Python', (SELECT id FROM TYPES WHERE name = 'Snake' LIMIT 1)),
('Corn Snake', (SELECT id FROM TYPES WHERE name = 'Snake' LIMIT 1)),
('King Snake', (SELECT id FROM TYPES WHERE name = 'Snake' LIMIT 1));

-- Lizards
INSERT INTO TYPES (name, idParent) VALUES
('Leopard Gecko', (SELECT id FROM TYPES WHERE name = 'Lizard' LIMIT 1)),
('Bearded Dragon', (SELECT id FROM TYPES WHERE name = 'Lizard' LIMIT 1)),
    ('Chameleon', (SELECT id FROM TYPES WHERE name = 'Lizard' LIMIT 1));

-- Turtles
INSERT INTO TYPES (name, idParent) VALUES
('Red-Eared Slider', (SELECT id FROM TYPES WHERE name = 'Turtle' LIMIT 1)),
('Box Turtle', (SELECT id FROM TYPES WHERE name = 'Turtle' LIMIT 1));

-- ===========================
-- BIRDS
-- ===========================
INSERT INTO TYPES (name, idParent) VALUES
('Parrot', (SELECT id FROM TYPES WHERE name = 'Bird' LIMIT 1)),
('Canary', (SELECT id FROM TYPES WHERE name = 'Bird' LIMIT 1)),
('Finch', (SELECT id FROM TYPES WHERE name = 'Bird' LIMIT 1)),
('Cockatiel', (SELECT id FROM TYPES WHERE name = 'Bird' LIMIT 1));

-- Parrots
INSERT INTO TYPES (name, idParent) VALUES
('Macaw', (SELECT id FROM TYPES WHERE name = 'Parrot' LIMIT 1)),
('African Grey', (SELECT id FROM TYPES WHERE name = 'Parrot' LIMIT 1)),
('Budgerigar', (SELECT id FROM TYPES WHERE name = 'Parrot' LIMIT 1));

-- ===========================
-- FISH
-- ===========================
INSERT INTO TYPES (name, idParent) VALUES
('Goldfish', (SELECT id FROM TYPES WHERE name = 'Fish' LIMIT 1)),
('Betta', (SELECT id FROM TYPES WHERE name = 'Fish' LIMIT 1)),
('Guppy', (SELECT id FROM TYPES WHERE name = 'Fish' LIMIT 1)),
('Angelfish', (SELECT id FROM TYPES WHERE name = 'Fish' LIMIT 1)),
('Cichlid', (SELECT id FROM TYPES WHERE name = 'Fish' LIMIT 1));

-- ===========================
-- AMPHIBIANS
-- ===========================
INSERT INTO TYPES (name, idParent) VALUES
('Frog', (SELECT id FROM TYPES WHERE name = 'Amphibian' LIMIT 1)),
('Salamander', (SELECT id FROM TYPES WHERE name = 'Amphibian' LIMIT 1)),
('Toad', (SELECT id FROM TYPES WHERE name = 'Amphibian' LIMIT 1));

-- ===========================
-- INSECTS
-- ===========================
INSERT INTO TYPES (name, idParent) VALUES
('Beetle', (SELECT id FROM TYPES WHERE name = 'Insect' LIMIT 1)),
('Butterfly', (SELECT id FROM TYPES WHERE name = 'Insect' LIMIT 1)),
('Ant', (SELECT id FROM TYPES WHERE name = 'Insect' LIMIT 1)),
('Cockroach', (SELECT id FROM TYPES WHERE name = 'Insect' LIMIT 1));

-- ===========================
-- ARACHNIDS
-- ===========================
INSERT INTO TYPES (name, idParent) VALUES
('Spider', (SELECT id FROM TYPES WHERE name = 'Arachnid' LIMIT 1)),
('Scorpion', (SELECT id FROM TYPES WHERE name = 'Arachnid' LIMIT 1)),
('Tarantula', (SELECT id FROM TYPES WHERE name = 'Spider' LIMIT 1));

-- Tarantulas
INSERT INTO TYPES (name, idParent) VALUES
('Mexican Red Knee', (SELECT id FROM TYPES WHERE name = 'Tarantula' LIMIT 1)),
('Pinktoe', (SELECT id FROM TYPES WHERE name = 'Tarantula' LIMIT 1));
