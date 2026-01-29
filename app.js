const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();


app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));




app.get('/categories', (req, res) => {
  db.query('SELECT * FROM Category', (err, result) => {
    res.render('category', { categories: result });
  });
});


app.post('/add-category', (req, res) => {
  db.query(
    'INSERT INTO Category (CategoryName) VALUES (?)',
    [req.body.categoryName],
    () => res.redirect('/categories')
  );
});




app.get('/products', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  const sql = `
    SELECT p.ProductId, p.ProductName,
           c.CategoryId, c.CategoryName
    FROM Product p
    JOIN Category c ON p.CategoryId = c.CategoryId
    LIMIT ? OFFSET ?
  `;

  db.query(sql, [pageSize, offset], (err, products) => {
    res.render('product-list', { products, page });
  });
});

app.get('/add-product', (req, res) => {
  db.query('SELECT * FROM Category', (err, categories) => {
    res.render('product', { categories });
  });
});


app.post('/add-product', (req, res) => {
  const { productName, categoryId } = req.body;
  db.query(
    'INSERT INTO Product (ProductName, CategoryId) VALUES (?, ?)',
    [productName, categoryId],
    () => res.redirect('/products')
  );
});



app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});