import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChartComponent = ({ data }: any) => (
  <PieChart width={400} height={300}>
    <Pie data={data} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
      {data.map((_: any, index: number) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
);

export default PieChartComponent;
