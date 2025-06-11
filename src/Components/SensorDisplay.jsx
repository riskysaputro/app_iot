import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../Components/ui/card.jsx';
import AnimatedCircularProgressBarDemo from '../Components/magicui/AnimatedCircularProgressBarDemo.jsx';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]);

  // Fetch realtime data
  const fetchLatest = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/sensor/latest');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Failed to fetch latest data:', err);
    }
  };

  // Fetch history data
  const fetchHistory = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/sensor');
      const json = await res.json();
      setHistory(json);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  useEffect(() => {
    fetchLatest();
    fetchHistory();
    const interval = setInterval(() => {
      fetchLatest();
    }, 3000); // setiap 3 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="shadow-xl">
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Data Realtime</h2>
          {data ? (
            <div>
              {/* <p>
                <strong>Soil Moisture:</strong> {data.soil}
              </p> */}
              <AnimatedCircularProgressBarDemo value={data.soil} min={965} max={2650} />
              {data.soil}
              <p>
                <strong>Air Quality:</strong> {data.air}
              </p>
              <p className="text-sm text-blue-500">Last update: {new Date(data.timestamp).toLocaleTimeString()}</p>
            </div>
          ) : (
            <p>Waiting for data...</p>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-xl">
        <CardContent>
          <h2 className="text-xl font-bold mb-2">History Terbaru</h2>
          <ul className="space-y-2 text-sm max-h-64 overflow-y-auto">
            {history.map((row) => (
              <li key={row.id} className="border-b pb-1">
                <span>{new Date(row.created_at).toLocaleString()}</span>
                <br />
                Soil: {row.soil_moisture}, Air: {row.air_quality}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
