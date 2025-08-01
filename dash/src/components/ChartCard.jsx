import { Line } from "react-chartjs-2";
export default function ChartCard({ title, data, options }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="font-bold mb-2">{title}</h3>
      <Line data={data} options={options} />
    </div>
  );
}
