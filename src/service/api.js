import timelineData from '../data/timeline.json';
import timelineActivities from '../data/timeline-activities.json'

export function getTimeline() {
    return timelineData;
}

export function getActivitiesForTimeline(timelineId) {
    const timeline = timelineActivities.find((item) => item.timelineId === timelineId);
    // Return the object or an empty structure if not found.
    return timeline || { timelineId, timelineName: "", activities: [] };
  }