'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Recycle, Trash2, Leaf } from 'lucide-react';
import { Badge } from '../ui/badge';

const initialData = [
  { name: 'Jan', recycled: 30, landfilled: 15 },
  { name: 'Feb', recycled: 45, landfilled: 10 },
  { name: 'Mar', recycled: 50, landfilled: 12 },
  { name: 'Apr', recycled: 60, landfilled: 8 },
  { name: 'May', recycled: 55, landfilled: 11 },
  { name: 'Jun', recycled: 70, landfilled: 5 },
];

const stats = {
  totalRecycled: 310,
  co2Saved: 155, // kg
  diversionRate: 84, // percent
};

export function CarbonTracker() {
  const [chartData, setChartData] = useState(initialData);
  const [currentStats, setCurrentStats] = useState(stats);

  const handleLogAction = (type: 'recycled' | 'landfilled') => {
    const lastMonth = chartData[chartData.length - 1];
    const newLastMonth = {
      ...lastMonth,
      [type]: lastMonth[type] + 2, // Add 2kg for demonstration
    };
    
    setChartData([
        ...chartData.slice(0, chartData.length - 1),
        newLastMonth
    ]);
    
    if (type === 'recycled') {
        setCurrentStats(prev => ({
            ...prev,
            totalRecycled: prev.totalRecycled + 2,
            co2Saved: prev.co2Saved + 1,
            diversionRate: Math.min(100, prev.diversionRate + 0.1)
        }));
    } else {
       setCurrentStats(prev => ({
            ...prev,
            diversionRate: Math.max(0, prev.diversionRate - 0.1)
        }));
    }
  };


  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Waste Footprint</CardTitle>
            <CardDescription>
              Monthly waste breakdown (in kg)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="hsl(var(--foreground))" opacity={0.8} />
                  <YAxis stroke="hsl(var(--foreground))" opacity={0.8} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="recycled"
                    fill="hsl(var(--primary))"
                    name="Recycled"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="landfilled"
                    fill="hsl(var(--muted-foreground))"
                    name="Landfilled"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Impact Summary</CardTitle>
            <CardDescription>Your eco-achievements this year</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Recycle className="h-6 w-6 text-primary" />
                <span className="font-medium">Total Recycled</span>
              </div>
              <span className="font-bold text-lg">{currentStats.totalRecycled.toFixed(0)} kg</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Leaf className="h-6 w-6 text-green-500" />
                <span className="font-medium">CO₂ Saved</span>
              </div>
              <span className="font-bold text-lg">{currentStats.co2Saved.toFixed(0)} kg</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
               <div className="flex items-center gap-3">
                <div className='p-1 bg-accent rounded-full'><Recycle className="h-4 w-4 text-accent-foreground" /></div>
                <span className="font-medium">Diversion Rate</span>
              </div>
              <Badge variant="default" className="bg-primary text-lg">{currentStats.diversionRate.toFixed(1)}%</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Log Your Actions</CardTitle>
                <CardDescription>Track your daily waste disposal.</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
                <Button className="w-full" onClick={() => handleLogAction('recycled')}>
                    <Recycle className="mr-2 h-4 w-4" /> I Recycled
                </Button>
                <Button variant="secondary" className="w-full" onClick={() => handleLogAction('landfilled')}>
                    <Trash2 className="mr-2 h-4 w-4" /> I Threw Away
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
