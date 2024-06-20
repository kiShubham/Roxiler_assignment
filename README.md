# Roxiler_assignment

# Roxilier Assignment
Visit: 
**[https://shubham-opal.vercel.app/]()**
visit the assignment sheet : [https://drive.google.com/file/d/1Z0m_Ja_Wu76DjYJ00Egz_mUhO3hZrj7t/view?usp=sharing]()
#### we have created a transaction Dashboard for showing transaction in a particular month and represente data in table and as charts .

## Stack :  `Vite+React` `Node Js` `Express Js` `Mongo db` 
## API 
- Used MVC architecture 

- Data Source
THIRD PARTY API URL :
[https://s3.amazonaws.com/roxiler.com/product_transaction.json]()

1. **GET** :  API to initialize the database. fetch the JSON from the third party API and initialize the database with seed data.
2. **Get**:  API to list the all transactions
    -  API support's search and pagination on product transactions
    - Based on the value of search parameters, it should match search text on product title/description/price and based on matching result it should return the product transactions
3. **Get** :  API for statistics
4. **Get** :  API for bar chart ( the response contain price range and the number of items in that range for the selected month regardless of the year ) 
5. **Get** :   API for pie chart. Unique categories and number of items from that category for the selected month regardless of the year.
6. **Get** : API which fetches the data from all the 3 APIs mentioned above, combines the response and sends a final response of the combined JSON
------
## Frontend /client : vite + react 
 #### By using above created apis, we have  created a single page react web app .
![dash](https://github.com/kiShubham/Roxiler_assignment/assets/121343665/0cf49bf6-9432-4e2c-9be8-a2bcec5fddea)
features added
  - search 
  - dropdown 
  - pagination
Search and Pagination filter is done across the backend as demand by the assignment ;

### Dependencies: `chart js` `Axios` ;


