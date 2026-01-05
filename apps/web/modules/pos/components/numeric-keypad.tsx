"use client";

import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";

interface NumericKeypadProps {
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
  maxLength?: number;
  decimalPlaces?: number;
  className?: string;
}

export function NumericKeypad({
  value,
  onChange,
  onEnter,
  maxLength = 10,
  decimalPlaces = 2,
  className = "",
}: NumericKeypadProps) {
  const handleNumberClick = (num: string) => {
    const currentValue = value || "0";
    
    // Prevent exceeding max length
    if (currentValue.replace(".", "").length >= maxLength) {
      return;
    }

    // Handle decimal point
    if (num === ".") {
      if (currentValue.includes(".")) {
        return; // Already has decimal point
      }
      onChange(currentValue === "0" ? "0." : currentValue + ".");
      return;
    }

    // Handle numbers
    if (currentValue === "0") {
      onChange(num);
    } else {
      const newValue = currentValue + num;
      
      // Check decimal places
      if (newValue.includes(".")) {
        const decimalPart = newValue.split(".")[1];
        if (decimalPart && decimalPart.length > decimalPlaces) {
          return; // Exceeds decimal places
        }
      }
      
      onChange(newValue);
    }
  };

  const handleBackspace = () => {
    if (!value || value.length === 0) return;
    
    if (value.length === 1) {
      onChange("0");
    } else {
      onChange(value.slice(0, -1));
    }
  };

  const handleClear = () => {
    onChange("0");
  };

  return (
    <div className={`grid grid-cols-3 gap-2 ${className}`}>
      {/* Row 1: 7, 8, 9 */}
      <Button
        type="button"
        variant="outline"
        className="h-16 text-xl font-semibold"
        onClick={() => handleNumberClick("7")}
      >
        7
      </Button>
      <Button
        type="button"
        variant="outline"
        className="h-16 text-xl font-semibold"
        onClick={() => handleNumberClick("8")}
      >
        8
      </Button>
      <Button
        type="button"
        variant="outline"
        className="h-16 text-xl font-semibold"
        onClick={() => handleNumberClick("9")}
      >
        9
      </Button>

      {/* Row 2: 4, 5, 6 */}
      <Button
        type="button"
        variant="outline"
        className="h-16 text-xl font-semibold"
        onClick={() => handleNumberClick("4")}
      >
        4
      </Button>
      <Button
        type="button"
        variant="outline"
        className="h-16 text-xl font-semibold"
        onClick={() => handleNumberClick("5")}
      >
        5
      </Button>
      <Button
        type="button"
        variant="outline"
        className="h-16 text-xl font-semibold"
        onClick={() => handleNumberClick("6")}
      >
        6
      </Button>

      {/* Row 3: 1, 2, 3 */}
      <Button
        type="button"
        variant="outline"
        className="h-16 text-xl font-semibold"
        onClick={() => handleNumberClick("1")}
      >
        1
      </Button>
      <Button
        type="button"
        variant="outline"
        className="h-16 text-xl font-semibold"
        onClick={() => handleNumberClick("2")}
      >
        2
      </Button>
      <Button
        type="button"
        variant="outline"
        className="h-16 text-xl font-semibold"
        onClick={() => handleNumberClick("3")}
      >
        3
      </Button>

      {/* Row 4: ., 0, Backspace */}
      <Button
        type="button"
        variant="outline"
        className="h-16 text-xl font-semibold"
        onClick={() => handleNumberClick(".")}
      >
        .
      </Button>
      <Button
        type="button"
        variant="outline"
        className="h-16 text-xl font-semibold"
        onClick={() => handleNumberClick("0")}
      >
        0
      </Button>
      <Button
        type="button"
        variant="outline"
        className="h-16 text-xl font-semibold"
        onClick={handleBackspace}
      >
        <Delete className="h-5 w-5" />
      </Button>
    </div>
  );
}

