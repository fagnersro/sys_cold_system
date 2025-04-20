"use client";

import { useState } from "react";
import { scheduleData } from "../../data/mock-schedules";
import { CalendarDay } from "../../types/schedule-types";
import { useSchedule } from "./use-schedule";

export function useCalendar() {
  const { viewMode, handleEdit } = useSchedule();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const generateCalendarDays = (): CalendarDay[] => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: CalendarDay[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ day: null, date: null, events: [] });
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      days.push({
        day: i,
        date,
        events: scheduleData.filter((schedule) => {
          const scheduleDate = new Date(schedule.date);
          return (
            scheduleDate.getDate() === i &&
            scheduleDate.getMonth() === currentMonth &&
            scheduleDate.getFullYear() === currentYear
          );
        }),
      });
    }

    return days;
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return {
    currentMonth,
    currentYear,
    monthNames,
    calendarDays: generateCalendarDays(),
    prevMonth,
    nextMonth,
    viewMode,
    handleEdit
  };
}