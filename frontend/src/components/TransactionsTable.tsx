import { useState } from 'react';
import { fetchTransactions } from '../services/api';
const TransactionsTable = ({ transactions }: any) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [currentTransactions, setCurrentTransactions] = useState(transactions);
  const handleSearch = async (e: any) => {
    const query = e.target.value;
    setSearch(query);
    const { data } = await fetchTransactions('2023-03', 1, 10, query); // Adjust month as needed
    setCurrentTransactions(data.data);
  };
  const handlePagination = async (direction: any) => {
    const newPage = direction === 'next' ? page + 1 : page - 1;
    if (newPage < 1) return;
    const { data } = await fetchTransactions('2023-03', newPage, 10, search); // Adjust month as needed
    setPage(newPage);
    setCurrentTransactions(data.data);
  };
  return (
    <div className="mt-6">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search transactions"
          value={search}
          onChange={handleSearch}
          className="border p-2 rounded w-full"
        />
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Sold</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-4">No transactions found</td>
            </tr>
          ) : (
            transactions?.map((transaction:any) => (
              <tr key={transaction.id}>
                <td className="border border-gray-300 p-2">{transaction.title}</td>
                <td className="border border-gray-300 p-2">{transaction.description}</td>
                <td className="border border-gray-300 p-2">${transaction.price.toFixed(2)}</td>
                <td className="border border-gray-300 p-2">{transaction.sold ? 'Yes' : 'No'}</td>
                <td className="border border-gray-300 p-2">{transaction.category}</td>
                <td className="border border-gray-300 p-2">{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePagination('prev')}
          disabled={page === 1}
          className={`p-2 border rounded ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => handlePagination('next')}
          className="p-2 border rounded"
        >
          Next
        </button>
      </div>
      {JSON.stringify(transactions)}
    </div>
  );
};
export default TransactionsTable;

