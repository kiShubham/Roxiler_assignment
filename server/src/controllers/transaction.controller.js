const axios = require("axios");
const services = require("../services/transactions.service");

const initialize = async (req, res) => {
  try {
    if ((await fetchMonthlyDetails()).length > 0) {
      return res.sendStatus(200);
    }
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const alltransactions = response.data;
    for (const transaction of alltransactions) {
      await services.saveAll(transaction);
    }
    res.sendStatus(200);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const fetchAll = async (req, res) => {
  try {
    const { month, pageNum, searchText, preference } = req.query;
    let page = pageNum || 1;
    if (searchText && preference == "search") {
      let data = await searchData(searchText);
      const pageData = data.slice(page * 10 - 10, page * 10);
      return res.status(200).json(pageData);
    }

    const all = await fetchMonthlyDetails(month);
    const pageData = all.slice(page * 10 - 10, page * 10); //pagination

    res.status(200).json(pageData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchData = async (text) => {
  try {
    let dex = text.toString().trim().toLowerCase();
    const allData = await fetchMonthlyDetails();
    const filteredArr = allData.filter((e) => {
      if (
        e.title.toLowerCase().includes(dex) ||
        e.description.toLowerCase().includes(dex) ||
        e.price.toString().includes(dex)
      )
        return true;
    });
    return filteredArr;
  } catch (error) {
    throw error;
  }
};

const getStats = async (req, res) => {
  try {
    const { month } = req.query;
    const all = await fetchMonthlyDetails(month);

    const sold = all.filter((e) => e.sold === true);
    const notSold = all.filter((e) => e.sold === false);
    const totalSale = sold.reduce((acc, curr) => acc + curr.price, 0);

    res.status(200).json({
      "Total Sale": totalSale,
      "Total sold item": sold.length,
      "Total not Sold item": notSold.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBarChartDetails = async (req, res) => {
  try {
    const { month } = req.query;

    const all = await fetchMonthlyDetails(month);
    const prices = all.map((e) => e.price);
    const priceRange = buildPriceRanges(prices);

    res.status(200).json(priceRange);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPieChartDetails = async (req, res) => {
  try {
    const { month } = req.query;
    const all = await fetchMonthlyDetails(month);
    const categoriesObject = categorization(all);

    res.status(200).json(categoriesObject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFigures = async (req, res) => {
  try {
    const { month } = req.query;
    const all = await fetchMonthlyDetails(month);
    const figure = genAllFigures(all);

    res.status(200).json({
      pieChart: figure.categoriesObject,
      barChart: figure.priceRange,
      statistics: figure.allStats,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const categorization = (data) => {
  const categories = new Map();
  for (let i = 0; i < data.length; i++) {
    let cat = data[i].category;
    if (categories.has(cat)) {
      categories.set(cat, categories.get(cat) + 1);
    } else categories.set(cat, 1);
  }
  return Object.fromEntries(categories); // cannot send Map in json, making a plain object
};

const fetchMonthlyDetails = async (month) => {
  let monthDigit;
  if (month) monthDigit = monthChecker(month || 0);
  const all = await services.fetch(monthDigit);
  return all;
};

const monthChecker = (month) => {
  switch (month.toLowerCase()) {
    case "january":
      return 1;
    case "february":
      return 2;
    case "march":
      return 3;
    case "april":
      return 4;
    case "may":
      return 5;
    case "june":
      return 6;
    case "july":
      return 7;
    case "august":
      return 8;
    case "september":
      return 9;
    case "october":
      return 10;
    case "november":
      return 11;
    case "december":
      return 12;
    default:
      throw new Error("Invalid month name");
  }
};

const buildPriceRanges = (prices) => {
  const priceRanges = {
    "0-100": 0,
    "101-200": 0,
    "201-300": 0,
    "301-400": 0,
    "401-500": 0,
    "501-600": 0,
    "601-700": 0,
    "701-800": 0,
    "801-900": 0,
    "901-above": 0,
  };

  prices.forEach((price) => {
    if (price >= 0 && price <= 100) {
      priceRanges["0-100"] += 1;
    } else if (price >= 101 && price <= 200) {
      priceRanges["101-200"] += 1;
    } else if (price >= 201 && price <= 300) {
      priceRanges["201-300"] += 1;
    } else if (price >= 301 && price <= 400) {
      priceRanges["301-400"] += 1;
    } else if (price >= 401 && price <= 500) {
      priceRanges["401-500"] += 1;
    } else if (price >= 501 && price <= 600) {
      priceRanges["501-600"] += 1;
    } else if (price >= 601 && price <= 700) {
      priceRanges["601-700"] += 1;
    } else if (price >= 701 && price <= 800) {
      priceRanges["701-800"] += 1;
    } else if (price >= 801 && price <= 900) {
      priceRanges["801-900"] += 1;
    } else if (price >= 901) {
      priceRanges["901-above"] += 1;
    }
  });
  return priceRanges;
};
const genAllFigures = (data) => {
  const categoriesObject = categorization(data);

  const prices = data.map((e) => e.price);
  const priceRange = buildPriceRanges(prices);

  const sold = data.filter((e) => e.sold === true);
  const notSold = data.filter((e) => e.sold === false);
  const totalSale = sold.reduce((acc, curr) => acc + curr.price, 0);
  const allStats = {
    totalSale: totalSale,
    totalSoldItem: sold.length,
    unSoldItem: notSold.length,
  };
  return { categoriesObject, priceRange, allStats };
};

module.exports = {
  initialize,
  fetchAll,
  getStats,
  getBarChartDetails,
  getPieChartDetails,
  getFigures,
};
