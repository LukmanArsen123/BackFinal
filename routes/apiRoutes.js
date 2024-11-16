const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.get('/news', async (req, res) => {
  try {
    const response = await fetch('https://newsapi.org/v2/everything?q=Apple&from=2024-11-16&sortBy=popularity&apiKey=d247d6b24d4a44fdac07c38f2d3d577b');
    const data = await response.json();
    res.render('api/news', { newsArticles: data.articles });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching news data');
  }
});

router.get('/stock', async (req, res) => {
  try {
    const response = await fetch('https://yh-finance.p.rapidapi.com/stock/get-fundamentals?symbol=AMRN&region=US&lang=en-US&modules=assetProfile%2CsummaryProfile%2CfundProfile', {
      headers: {
        'x-rapidapi-key': '5dfe42dc9amshc95107c75137406p14ded1jsnb5150c5e521c',
        'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
      },
    });
    const data = await response.json();
    res.render('api/stock', { stockData: data });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching stock data');
  }
});

module.exports = router;
