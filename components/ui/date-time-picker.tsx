"use client";

import React, { useState} from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { Clock, ChevronUp, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateTimePickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export function DateTimePicker({ value, onChange, className, disabled }: DateTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const [hours, minutes] = value.split(":").map(Number);

  const formatTimeInput = (input: string) => {
    // Sadece sayıları al
    const numbers = input.replace(/\D/g, '');
    
    if (numbers.length >= 4) {
      const hours = parseInt(numbers.substring(0, 2));
      const minutes = parseInt(numbers.substring(2, 4));
      
      // Saat ve dakika kontrolü
      const validHours = hours > 23 ? '00' : numbers.substring(0, 2);
      const validMinutes = minutes > 59 ? '00' : numbers.substring(2, 4);
      
      return `${validHours}:${validMinutes}`;
    }
    
    if (numbers.length >= 2) {
      const hours = parseInt(numbers.substring(0, 2));
      if (hours > 23) {
        return '00' + (numbers.length > 2 ? ':' + numbers.substring(2) : '');
      }
      return numbers.substring(0, 2) + (numbers.length > 2 ? ':' + numbers.substring(2) : '');
    }
    
    return numbers;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatTimeInput(e.target.value);
    setTempValue(formatted);
    
    // Eğer geçerli bir saat formatıysa (HH:mm) onChange'i çağır
    if (/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(formatted)) {
      onChange(formatted);
    }
  };

  const handleTimeChange = (newHours: number, newMinutes: number) => {
    const formattedTime = `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}`;
    setTempValue(formattedTime);
    onChange(formattedTime);
  };

  const handleHourChange = (delta: number) => {
    let newHours = (hours + delta) % 24;
    if (newHours < 0) newHours = 23;
    handleTimeChange(newHours, minutes);
  };

  const handleMinuteChange = (delta: number) => {
    let newMinutes = (minutes + delta) % 60;
    if (newMinutes < 0) newMinutes = 59;
    handleTimeChange(hours, newMinutes);
  };

  const handleQuickTimeSelect = (time: string) => {
    setTempValue(time);
    onChange(time);
    setIsOpen(false);
  };

  const quickTimes = [
    { label: "Sabah", times: ["08:00", "09:00", "10:00"] },
    { label: "Öğle", times: ["12:00", "13:00", "14:00"] },
    { label: "Akşam", times: ["17:00", "18:00", "19:00"] },
  ];

  React.useEffect(() => {
    setTempValue(value);
  }, [value]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Input
            type="text"
            value={tempValue}
            onChange={handleInputChange}
            placeholder="HH:mm"
            maxLength={5}
            className={cn(
              "pl-4 pr-10 py-2 bg-zinc-800/50 border-zinc-700 text-zinc-300",
              "font-mono text-base",
              disabled && "opacity-50 cursor-not-allowed",
              className
            )}
          />
          <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-3 bg-zinc-800 border-zinc-700">
        {/* Dijital Saat Gösterimi */}
        <div className="text-center mb-3 p-2 bg-zinc-900 rounded-lg border border-zinc-700">
          <span className="font-mono text-2xl text-zinc-100">
            {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}
          </span>
        </div>

        {/* Saat ve Dakika Seçici */}
        <div className="flex justify-center gap-6 mb-3">
          {/* Saat */}
          <div className="flex flex-col items-center">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleHourChange(1)}
              className="text-zinc-300 hover:text-blue-400 hover:bg-blue-400/10 h-7 w-10"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <div className="w-10 h-10 flex items-center justify-center font-mono text-lg bg-zinc-700/50 rounded-lg text-zinc-100">
              {String(hours).padStart(2, "0")}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleHourChange(-1)}
              className="text-zinc-300 hover:text-blue-400 hover:bg-blue-400/10 h-7 w-10"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
            <span className="text-xs text-zinc-500 mt-1">Saat</span>
          </div>

          <div className="text-xl font-mono text-zinc-500 flex items-center mb-6">:</div>

          {/* Dakika */}
          <div className="flex flex-col items-center">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleMinuteChange(1)}
              className="text-zinc-300 hover:text-blue-400 hover:bg-blue-400/10 h-7 w-10"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <div className="w-10 h-10 flex items-center justify-center font-mono text-lg bg-zinc-700/50 rounded-lg text-zinc-100">
              {String(minutes).padStart(2, "0")}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleMinuteChange(-1)}
              className="text-zinc-300 hover:text-blue-400 hover:bg-blue-400/10 h-7 w-10"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
            <span className="text-xs text-zinc-500 mt-1">Dakika</span>
          </div>
        </div>

        {/* Hızlı Seçimler */}
        <div className="space-y-2">
          {quickTimes.map((period) => (
            <div key={period.label}>
              <div className="text-xs font-medium text-zinc-500 mb-1">{period.label}</div>
              <div className="grid grid-cols-3 gap-1">
                {period.times.map((time) => (
                  <Button
                    key={time}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuickTimeSelect(time)}
                    className={cn(
                      "text-xs font-mono py-1 px-2",
                      value === time
                        ? "bg-blue-500/20 text-blue-400"
                        : "text-zinc-300 hover:bg-blue-400/10 hover:text-blue-400"
                    )}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
} 