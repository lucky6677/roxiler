const Transaction = require('../models/transactionModel');
const axios = require('axios');

// Initialize database with seed data
const initializeDatabase = async (req, res) => {
  try {
    const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    await Transaction.deleteMany({});
    await Transaction.insertMany(data);
    res.status(200).json({ message: 'Database initialized successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to initialize database', error: error.message });
  }
};

// Get transactions with search and pagination
const getTransactions = async (req, res) => {
  const { page = 1, perPage = 10, search = '', month } = req.query;
  const query = {
    dateOfSale: { $gte: new Date(`${month}-01`), $lt: new Date(`${month}-31`) },
  };

  if (search) {
    query.$or = [
      { title: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') },
      { price: { $eq: parseFloat(search) } },
    ];
  }

  try {
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));
    const count = await Transaction.countDocuments(query);

    res.status(200).json({ data: transactions, total: count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error: error.message });
  }
};

// Get statistics
const getStatistics = async (req, res) => {
  const { month } = req.query;
  const startDate = new Date(`${month}-01`);
  const endDate = new Date(`${month}-31`);

  try {
    const transactions = await Transaction.find({
      dateOfSale: { $gte: startDate, $lt: endDate },
    });

    const totalSale = transactions.reduce((acc, t) => acc + (t.sold ? t.price : 0), 0);
    const soldItems = transactions.filter((t) => t.sold).length;
    const notSoldItems = transactions.filter((t) => !t.sold).length;

    res.status(200).json({ totalSale, soldItems, notSoldItems });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
};

// Get bar chart data
const getBarChartData = async (req, res) => {
  const { month } = req.query;
  const startDate = new Date(`${month}-01`);
  const endDate = new Date(`${month}-31`);

  try {
    const transactions = await Transaction.find({
      dateOfSale: { $gte: startDate, $lt: endDate },
    });

    const priceRanges = Array(10).fill(0);
    transactions.forEach((t) => {
      const index = Math.min(Math.floor(t.price / 100), 9);
      priceRanges[index]++;
    });

    res.status(200).json({
      ranges: [
        '0-100', '101-200', '201-300', '301-400', '401-500',
        '501-600', '601-700', '701-800', '801-900', '901+',
      ],
      counts: priceRanges,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bar chart data', error: error.message });
  }
};

// Get pie chart data
const getPieChartData = async (req, res) => {
  const { month } = req.query;
  const startDate = new Date(`${month}-01`);
  const endDate = new Date(`${month}-31`);

  try {
    const transactions = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pie chart data', error: error.message });
  }
};

// Combined API
const getCombinedData = async (req, res) => {
  try {
    const [statistics, barChart, pieChart] = await Promise.all([
      getStatistics(req, res),
      getBarChartData(req, res),
      getPieChartData(req, res),
    ]);

    res.status(200).json({ statistics, barChart, pieChart });
  } catch (error) {
    res.status(500).json({ message: 'Error combining data', error: error.message });
  }
};

module.exports = {
  initializeDatabase,
  getTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData,
  getCombinedData,
};
