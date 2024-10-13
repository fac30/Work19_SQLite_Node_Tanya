const db = require("../database/db.js");

const retrieve_products = db.prepare(/*sql*/ `
    SELECT
      id,
      name,
      quantity_per_unit,
      '£' || printf('%.2f',unit_price) AS price,
      units_in_stock,
      units_on_order,
      '£' || printf('%.2f',unit_price*units_in_stock) AS stock_value
    FROM products
  `);
  
  function listProducts() {
    return retrieve_products.all();
  }


const search_product = db.prepare(/*sql*/ `
    SELECT
      id,
      name
    FROM products
    WHERE name LIKE ?
    `);

  function searchProducts(word) {
    const search_string = `%${word}%`;
    return search_product.all(search_string);
}


const get_one_product = db.prepare(/*sql*/ `
    SELECT
      products.id AS product_id,
      products.name AS name,
      categories.name AS category_name,
      categories.description AS category_description
    FROM products JOIN categories
    ON products.category_id = categories.id
    WHERE products.id = ?
  `);
  
  function getProduct(id) {
    return get_one_product.get(id);
  }


module.exports = {
    listProducts,
    searchProducts,
    getProduct
  };
