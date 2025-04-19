// src/components/Timeline/TimelineItem.js
import React from "react";
import { CheckCircle, Circle } from "lucide-react";

/**
 * TimelineItem
 * @param {Object} props
 * @param {Object} props.step - The timeline step object, e.g. { id: '1', name: 'Day 1' }
 * @param {boolean} props.isActive - Indicates if this step is currently active
 * @param {boolean} props.isCompleted - Indicates if this step has been completed
 * @param {Function} [props.onClick] - Optional callback when the step is clicked
 */
function TimelineItem({ step, isActive, isCompleted, onClick }) {
  // Decide which icon to show: completed check icon or default circle
  const Icon = isCompleted ? CheckCircle : Circle;
  const textClass = isActive
    ? "text-blue-800 underline"
    : "text-gray-600 hover:text-blue-600";

  return (
    <div
      className="relative flex flex-col items-center cursor-pointer"
      onClick={() => onClick?.(step)}
    >
      <Icon
        className={
          isCompleted ? "text-blue-600 w-10 h-7 mb-1" : "text-gray-400 w-10 h-7 mb-1"
        }
      />
      <span className={`text-sm ${textClass}`}>{step.name}</span>
    </div>
  );
}

export default TimelineItem;
