"use client"

import type React from "react"

import { useState, type InputHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface FuturisticInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const FuturisticInput = forwardRef<HTMLInputElement, FuturisticInputProps>(
  ({ className, label, id, type = "text", required, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)
    const [isValid, setIsValid] = useState(false)

    const handleFocus = () => setIsFocused(true)

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      setHasValue(e.target.value !== "")

      // Simple validation
      if (type === "email") {
        setIsValid(e.target.value.includes("@") && e.target.value.includes("."))
      } else if (type === "password") {
        setIsValid(e.target.value.length >= 6)
      } else {
        setIsValid(e.target.value !== "")
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value !== "")

      // Real-time validation
      if (type === "email") {
        setIsValid(e.target.value.includes("@") && e.target.value.includes("."))
      } else if (type === "password") {
        setIsValid(e.target.value.length >= 6)
      } else {
        setIsValid(e.target.value !== "")
      }
    }

    return (
      <div className="relative">
        <input
          id={id}
          type={type}
          ref={ref}
          className={cn(
            "peer w-full rounded-lg border bg-transparent px-4 py-3 text-black/90 outline-none transition-all",
            "placeholder:text-transparent focus:ring-2",
            isValid && hasValue ? "border-blue-500" : "border-black/20",
            isFocused ? "border-blue-600 ring-2 ring-blue-500/20" : "focus:border-blue-600",
            className,
          )}
          placeholder={label}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          required={required}
          aria-label={label}
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            "absolute left-4 top-3 z-10 origin-[0] transform text-black/60 transition-all duration-200",
            "pointer-events-none",
            (isFocused || hasValue) && "-translate-y-7 scale-75 text-xs font-medium",
            isFocused && "text-blue-600",
          )}
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
        {isValid && hasValue && (
          <div className="absolute right-3 top-3 size-6 rounded-full bg-blue-50 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        )}
      </div>
    )
  },
)

FuturisticInput.displayName = "FuturisticInput"