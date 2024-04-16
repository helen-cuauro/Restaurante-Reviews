CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user'))
);

CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES users(id) NOT NULL,
    restaurantId INTEGER REFERENCES restaurants(id) NOT NULL,
    score INTEGER NOT NULL CHECK (score BETWEEN 1 AND 5),
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL
);

-- Crear la relación entre Users y Reviews
ALTER TABLE Reviews
ADD CONSTRAINT fk_user_reviews
FOREIGN KEY (userId)
REFERENCES Users(id)
ON DELETE CASCADE;

-- Crear la relación entre Restaurants y Reviews
ALTER TABLE Reviews
ADD CONSTRAINT fk_restaurant_reviews
FOREIGN KEY (restaurantId)
REFERENCES Restaurants(id)
ON DELETE CASCADE;