"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { useTranslations } from 'next-intl';

interface MonthlyData {
  month: string;
  amount: number;
}

interface IncomeLineChartProps {
  data: MonthlyData[];
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload?.[0]?.value) {
    return (
      <div className="bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-xl">
        <div className="flex flex-col gap-1">
          <span className="text-zinc-300 text-sm font-medium">{label}</span>
          <span className="text-white text-sm">
            {new Intl.NumberFormat('tr-TR', {
              style: 'currency',
              currency: 'TRY',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(Number(payload[0].value))}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export function IncomeLineChart({ data }: IncomeLineChartProps) {
  const t = useTranslations('income.reports');

  const minValue = Math.min(...data.map(item => item.amount));
  const maxValue = Math.max(...data.map(item => item.amount));
  const padding = (maxValue - minValue) * 0.1;

  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-zinc-200 text-sm font-medium">
          {t('monthlyTrends')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full mt-4 overflow-x-auto">
          <div className="min-w-[500px] h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <XAxis 
                  dataKey="month" 
                  stroke="#71717a"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#71717a"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value.toLocaleString()}`}
                  domain={[
                    Math.floor((minValue - padding) / 1000) * 1000,
                    Math.ceil((maxValue + padding) / 1000) * 1000
                  ]}
                  width={60}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: "#10b981", strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: "#10b981" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 