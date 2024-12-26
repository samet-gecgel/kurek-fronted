"use client";

import React from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function PhoneInput({ value, onChange, className, ...props }: PhoneInputProps) {
  const formatPhoneNumber = (input: string) => {
    // Sadece rakamları al
    const numbers = input.replace(/[^\d]/g, '');
    
    // 10 rakamdan fazlasını alma
    const truncated = numbers.slice(0, 10);
    
    // Rakamları gruplara böl (3-3-2-2 formatında)
    const groups = [];
    
    if (truncated.length > 0) groups.push(truncated.slice(0, 3));
    if (truncated.length > 3) groups.push(truncated.slice(3, 6));
    if (truncated.length > 6) groups.push(truncated.slice(6, 8));
    if (truncated.length > 8) groups.push(truncated.slice(8, 10));

    return groups.join(' ');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
  };

  return (
    <Input
      {...props}
      value={formatPhoneNumber(value)}
      onChange={handleChange}
      className={cn(
        "bg-zinc-800/50 border-zinc-700/50 text-white font-mono tracking-wider",
        className
      )}
      maxLength={13} // 10 rakam + 3 boşluk
      placeholder="5xx xxx xx xx"
    />
  );
} 