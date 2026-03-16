-- Sample Bakery Data for Bite Bills
-- Run this after creating tables to populate with sample products

-- Insert sample bakery products
INSERT INTO products (_id, itemName, itemPrice, itemImage, itemDescription, ingredients, category) VALUES
-- Pastries
(uuid_generate_v4(), 'Chocolate Croissant', 45, 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop&crop=center', 'Flaky, buttery croissant filled with rich dark chocolate. Freshly baked daily.', 'Flour, Butter, Chocolate, Yeast, Milk, Eggs', 'Pastries'),
(uuid_generate_v4(), 'Almond Croissant', 55, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop&crop=center', 'Classic croissant topped with almond cream and sliced almonds. A customer favorite.', 'Flour, Butter, Almonds, Sugar, Eggs, Cream', 'Pastries'),
(uuid_generate_v4(), 'Pain au Chocolat', 40, 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop&crop=center', 'Traditional French pastry with chocolate batons encased in flaky pastry.', 'Flour, Butter, Dark Chocolate, Yeast', 'Pastries'),

-- Breads
(uuid_generate_v4(), 'Sourdough Bread', 120, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop&crop=center', 'Artisanal sourdough bread with a crispy crust and soft interior. Perfect for sandwiches.', 'Flour, Water, Salt, Sourdough Starter', 'Breads'),
(uuid_generate_v4(), 'Multigrain Bread', 100, 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop&crop=center', 'Healthy multigrain bread packed with seeds and grains. High in fiber and nutrition.', 'Whole Wheat Flour, Oats, Seeds, Honey, Yeast', 'Breads'),
(uuid_generate_v4(), 'Baguette', 35, 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop&crop=center', 'Traditional French baguette with a crispy exterior and soft crumb.', 'Flour, Water, Salt, Yeast', 'Breads'),

-- Cakes
(uuid_generate_v4(), 'Red Velvet Cake', 450, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&crop=center', 'Moist red velvet cake with cream cheese frosting. Serves 8-10 people.', 'Flour, Cocoa, Red Food Coloring, Cream Cheese, Butter, Sugar', 'Cakes'),
(uuid_generate_v4(), 'Chocolate Fudge Cake', 500, 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=300&fit=crop&crop=center', 'Rich chocolate cake with fudge frosting. A chocolate lover''s dream.', 'Dark Chocolate, Flour, Butter, Sugar, Eggs, Cream', 'Cakes'),
(uuid_generate_v4(), 'Vanilla Cupcakes (6 pack)', 180, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&crop=center', 'Six fluffy vanilla cupcakes with buttercream frosting. Perfect for parties.', 'Flour, Butter, Sugar, Vanilla, Eggs, Milk', 'Cakes'),

-- Cookies
(uuid_generate_v4(), 'Chocolate Chip Cookies (12 pack)', 150, 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop&crop=center', 'Classic chocolate chip cookies with melty chocolate chunks. Baked fresh daily.', 'Flour, Butter, Brown Sugar, Chocolate Chips, Vanilla', 'Cookies'),
(uuid_generate_v4(), 'Oatmeal Raisin Cookies (12 pack)', 140, 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop&crop=center', 'Chewy oatmeal cookies with plump raisins and cinnamon. A healthy treat.', 'Oats, Flour, Raisins, Butter, Cinnamon, Honey', 'Cookies'),

-- Brownies
(uuid_generate_v4(), 'Fudge Brownies (9 piece)', 200, 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=400&h=300&fit=crop&crop=center', 'Rich, fudgy brownies with walnuts. Cut into 9 perfect squares.', 'Dark Chocolate, Butter, Sugar, Eggs, Flour, Walnuts', 'Brownies'),
(uuid_generate_v4(), 'Blondies (9 piece)', 190, 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop&crop=center', 'Buttery blondies with white chocolate chips and macadamia nuts.', 'White Chocolate, Butter, Brown Sugar, Flour, Macadamia Nuts', 'Brownies');

-- Insert sample reviews
INSERT INTO productreviews (_id, reviewText, rating, productName, reviewerName, reviewDate) VALUES
(uuid_generate_v4(), 'Absolutely delicious! The chocolate croissant is perfectly flaky and the chocolate is just right.', 5, 'Chocolate Croissant', 'Priya Sharma', '2024-01-15'),
(uuid_generate_v4(), 'Best sourdough bread in the city. Great texture and flavor. Will definitely order again!', 5, 'Sourdough Bread', 'Rahul Kumar', '2024-01-14'),
(uuid_generate_v4(), 'The red velvet cake was amazing! Moist and flavorful. Perfect for our anniversary celebration.', 5, 'Red Velvet Cake', 'Anjali Patel', '2024-01-13'),
(uuid_generate_v4(), 'Love the chocolate chip cookies! Always fresh and chewy. My kids can''t get enough.', 4, 'Chocolate Chip Cookies (12 pack)', 'Vikram Singh', '2024-01-12'),
(uuid_generate_v4(), 'The baguette is authentic and crispy. Makes the best sandwiches for lunch.', 4, 'Baguette', 'Meera Joshi', '2024-01-11');

-- Insert sample newsletter subscribers
INSERT INTO newslettersubscribers (_id, emailAddress, firstName, lastName, status) VALUES
(uuid_generate_v4(), 'priya.sharma@email.com', 'Priya', 'Sharma', 'active'),
(uuid_generate_v4(), 'rahul.kumar@email.com', 'Rahul', 'Kumar', 'active'),
(uuid_generate_v4(), 'anjali.patel@email.com', 'Anjali', 'Patel', 'active'),
(uuid_generate_v4(), 'vikram.singh@email.com', 'Vikram', 'Singh', 'active'),
(uuid_generate_v4(), 'meera.joshi@email.com', 'Meera', 'Joshi', 'active');