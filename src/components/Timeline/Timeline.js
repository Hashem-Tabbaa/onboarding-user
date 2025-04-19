// src/components/Timeline/Timeline.js
import React, { useEffect, useState } from "react";
import { getTimeline } from "../../service/api";
import TimelineItem from "./TimelineItem";

/**
 * Props:
 *  - activeTimeline: the current selected timeline object
 *  - onTimelineChange: callback accepting the new timeline object when a timeline item is clicked
 */
function Timeline({ activeTimeline, onTimelineChange }) {
  const [timelineItems, setTimelineItems] = useState([]);

  useEffect(() => {
    const data = getTimeline();
    setTimelineItems(data);
    // If no active timeline is set, choose the first timeline item
    if (!activeTimeline && data.length > 0) {
      onTimelineChange(data[0]);
    }
  }, []);

  const handleStepClick = (step) => {
    onTimelineChange(step);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex justify-center flex-wrap gap-10 max-w-4xl">
        {timelineItems.map((step) => {
          return (
            <TimelineItem
              key={step.id}
              step={step}
              isActive={activeTimeline?.id === step.id}
              // You could also pass more info (if available) like isCompleted
              onClick={handleStepClick}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Timeline;
