import { useEffect, useState } from 'react';
import { fetchStatistics, fetchBarChartData, fetchPieChartData, fetchTransactions } from '../services/api';
import TransactionsTable from '../components/TransactionsTable';
import Statistics from '../components/Statistics';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';

const Dashboard = () => {
    const [year, setYear] = useState('2021');
    const [month, setMonth] = useState('03'); // Default month
    const [transactions, setTransactions] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [barChartData, setBarChartData] = useState({});
    const [pieChartData, setPieChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data: transactionsData} = await fetchTransactions(year+'-'+month, 1, 10, '');
            const { data: statisticsData } = await fetchStatistics(year+'-'+month);
            const { data: barChart } = await fetchBarChartData(year+'-'+month);
            const { data: pieChart } = await fetchPieChartData(year+'-'+month);
            console.log(transactionsData.data);
            setTransactions(transactionsData?.data);
            setStatistics(statisticsData);
            setBarChartData(barChart);
            setPieChartData(pieChart);
        };

        fetchData();
    }, [month, year]);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Dashboard</h1>
            <div className="mb-6">
                <label htmlFor="month" className="font-medium">Select Month:</label>
                <select
                    id="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="ml-2 border p-2"
                >
                    {/* Add other months dynamically if needed */}
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
                <label htmlFor="month" className="font-medium ml-4">Select year:</label>
                <select
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="ml-2 border p-2"
                >
                    {/* Add other months dynamically if needed */}
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                </select>

            </div>

            <Statistics statistics={statistics} />
            <TransactionsTable transactions={transactions} />
            <div className="flex mt-6 gap-4">
                <BarChart data={barChartData} />
                <PieChart data={pieChartData} />
            </div>
        </div>
    );
};

export default Dashboard;
