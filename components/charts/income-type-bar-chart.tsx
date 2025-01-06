"use client";

import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { useTranslations } from 'next-intl';

interface IncomeTypeData {
  name: string;
  value: number;
}

interface IncomeTypeBarChartProps {
  data: IncomeTypeData[];
}

const CustomBarTooltip = ({ 
  active, 
  payload, 
  label 
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
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

export function IncomeTypeBarChart({ data }: IncomeTypeBarChartProps) {
  const t = useTranslations('income.reports');

  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-zinc-200 text-base font-medium">
          {t('incomeDistribution')}
        </CardTitle>
        <CardDescription className="text-zinc-400">
          {t('incomeDistributionSubtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full mt-4 overflow-x-auto">
          <div className="min-w-[600px] h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid 
                  vertical={false} 
                  stroke="#27272a" 
                  strokeDasharray="4" 
                />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#71717a', fontSize: 12 }}
                  tickMargin={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#71717a', fontSize: 12 }}
                  tickFormatter={(value) => 
                    new Intl.NumberFormat('tr-TR', {
                      style: 'currency',
                      currency: 'TRY',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(value)
                  }
                  width={80}
                />
                <Tooltip 
                  content={CustomBarTooltip}
                  cursor={false}
                />
                <Bar 
                  dataKey="value" 
                  fill="#2563eb"
                  radius={[8, 8, 8, 8]}
                  maxBarSize={80}
                  className="transition-all duration-300 hover:fill-[#1d4ed8]"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 