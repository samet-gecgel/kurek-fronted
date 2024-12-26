"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { ChevronUp, ChevronDown, Clock } from "lucide-react";

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export function TimePicker({ value, onChange, className, disabled }: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, minutes] = value.split(":").map(Number);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateTime = (newHours: number, newMinutes: number) => {
    const formattedHours = String(newHours).padStart(2, "0");
    const formattedMinutes = String(newMinutes).padStart(2, "0");
    onChange(`${formattedHours}:${formattedMinutes}`);
  };

  const handleHourChange = (delta: number) => {
    let newHours = (hours + delta) % 24;
    if (newHours < 0) newHours = 23;
    updateTime(newHours, minutes);
  };

  const handleMinuteChange = (delta: number) => {
    let newMinutes = (minutes + delta) % 60;
    if (newMinutes < 0) newMinutes = 59;
    updateTime(hours, newMinutes);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={cn(
          "flex items-center gap-2 bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 border border-zinc-700/50 rounded-xl px-4 py-2.5 cursor-pointer hover:from-zinc-700/90 hover:to-zinc-800/90 transition-all duration-200 shadow-lg",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <Clock className="w-4 h-4 text-blue-400" />
        <span className="text-zinc-100 font-mono text-sm tracking-wide">{value}</span>
      </div>

      {isOpen && !disabled && (
        <div className="absolute top-full left-0 mt-2 bg-gradient-to-br from-zinc-800/95 to-zinc-900/95 backdrop-blur-md border border-zinc-700/50 rounded-xl shadow-2xl z-50 w-56 p-3">
          <div className="grid grid-cols-2 gap-4">
            {/* Saat ve Dakika Seçici */}
            <div className="col-span-2 flex justify-center gap-4 mb-2">
              {/* Saat */}
              <div className="relative flex flex-col items-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="w-12 h-8 rounded-lg hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
                  onClick={() => handleHourChange(1)}
                >
                  <ChevronUp className="w-5 h-5 text-zinc-300" />
                </Button>
                <div className="text-center font-mono text-zinc-100 text-2xl font-medium my-1 w-12 bg-zinc-800/50 rounded-md py-1">
                  {String(hours).padStart(2, "0")}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="w-12 h-8 rounded-lg hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
                  onClick={() => handleHourChange(-1)}
                >
                  <ChevronDown className="w-5 h-5 text-zinc-300" />
                </Button>
                <span className="text-xs text-zinc-400 mt-1">Saat</span>
              </div>

              {/* Ayırıcı */}
              <div className="flex items-center text-zinc-400 text-2xl font-mono mb-8">:</div>

              {/* Dakika */}
              <div className="relative flex flex-col items-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="w-12 h-8 rounded-lg hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
                  onClick={() => handleMinuteChange(1)}
                >
                  <ChevronUp className="w-5 h-5 text-zinc-300" />
                </Button>
                <div className="text-center font-mono text-zinc-100 text-2xl font-medium my-1 w-12 bg-zinc-800/50 rounded-md py-1">
                  {String(minutes).padStart(2, "0")}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="w-12 h-8 rounded-lg hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
                  onClick={() => handleMinuteChange(-1)}
                >
                  <ChevronDown className="w-5 h-5 text-zinc-300" />
                </Button>
                <span className="text-xs text-zinc-400 mt-1">Dakika</span>
              </div>
            </div>

            {/* Hızlı Seçimler */}
            <div className="col-span-2 grid grid-cols-3 gap-1.5 mt-2 pt-3 border-t border-zinc-700/50">
              {["06:00", "09:00", "12:00", "15:00", "18:00", "21:00"].map((time) => (
                <Button
                  key={time}
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="px-2 py-1.5 text-xs rounded-lg hover:bg-blue-500/20 hover:text-blue-400 text-zinc-300 font-mono transition-colors"
                  onClick={() => {
                    onChange(time);
                    setIsOpen(false);
                  }}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 