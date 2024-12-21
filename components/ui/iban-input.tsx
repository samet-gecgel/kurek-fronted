"use client";

import React from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

interface IBANInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function IBANInput({ value, onChange, className, ...props }: IBANInputProps) {
  const formatIBAN = (input: string) => {
    // Sadece rakamları al
    const numbers = input.replace(/[^\d]/g, '');
    
    // 26 rakamdan fazlasını alma (TR dahil toplam 26 rakam)
    const truncated = numbers.slice(0, 26);
    
    // Rakamları gruplara böl (2-4-4-4-4-4-4 formatında)
    const groups = [];
    
    // İlk 2 rakam
    if (truncated.length > 0) groups.push(truncated.slice(0, 2));
    
    // Ortadaki 4'lü gruplar
    for (let i = 2; i < 26; i += 4) {
      if (truncated.slice(i, i + 4)) {
        groups.push(truncated.slice(i, i + 4));
      }
    }

    return groups.join(' ');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatIBAN(e.target.value);
    onChange(`TR${formatted}`);
  };

  // TR prefix'ini kaldır ve kalan kısmı formatla
  const displayValue = value.startsWith('TR') 
    ? value.slice(2) 
    : value;

  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 font-mono">
        TR
      </div>
      <Input
        {...props}
        value={displayValue}
        onChange={handleChange}
        className={cn(
          "bg-zinc-800/50 border-zinc-700/50 text-white h-12 pl-10 font-mono tracking-wider",
          className
        )}
        maxLength={30} // TR + 26 rakam + boşluklar
        placeholder="12 3456 7890 1234 5678 9012 34"
      />
    </div>
  );
} 