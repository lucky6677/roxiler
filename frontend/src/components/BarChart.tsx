import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const BarChartComponent = ({ data }: any) => (
  <BarChart width={500} height={300} data={data?.counts?.map((count: number, index: number) => ({
    range: data.ranges[index],
    count,
  }))}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="range" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="count" fill="#8884d8" />
  </BarChart>
);

export default BarChartComponent;
