
const Statistics = ({ statistics}: { statistics: any}) => (
  <div className="grid grid-cols-3 gap-4">
    <div className="p-4 border rounded">Total Sales: ${statistics.totalSale || 0}</div>
    <div className="p-4 border rounded">Sold Items: {statistics.soldItems || 0}</div>
    <div className="p-4 border rounded">Unsold Items: {statistics.notSoldItems || 0}</div>
  </div>
);

export default Statistics;
