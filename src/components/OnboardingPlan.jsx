import React, { useState } from "react";
import Timeline from "./Timeline/Timeline";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { getActivitiesForTimeline } from "../service/api";
import { CheckCircle } from "lucide-react";

export default function OnboardingPlan() {
  const [activeTimeline, setActiveTimeline] = useState(null);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);

  // When timeline changes, fetch missions and set the first as selected
  const handleTimelineChange = (timeline) => {
    setActiveTimeline(timeline);
    const data = getActivitiesForTimeline(timeline.id);
    const missions = data.missions || [];
    setActivities(missions);
    setSelectedActivity(missions[0] || null);
  };

  // When an activity is clicked in the ToC
  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
  };

  // Mark selected activity as completed
  const handleMarkCompleted = () => {
    if (!selectedActivity) return;
    const updated = activities.map((act) =>
      act.id === selectedActivity.id ? { ...act, isCompleted: true } : act
    );
    setActivities(updated);
    setSelectedActivity({ ...selectedActivity, isCompleted: true });
  };

  // Progress calculation
  const total = activities.length;
  const completed = activities.filter((a) => a.isCompleted).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="p-6 sm:p-10 space-y-8 bg-white shadow-md rounded-2xl max-w-7xl mx-auto my-8">
      {/* Breadcrumb & Title */}
      {/* <div className="text-sm text-gray-500">
        <a href="#" className="text-blue-600 hover:underline">Home</a> &gt; Onboarding Plan
      </div> */}
      <h1 className="text-3xl font-bold text-gray-900">
        Someone's Onboarding Plan
      </h1>

      {/* Timeline */}
      <Timeline
        activeTimeline={activeTimeline}
        onTimelineChange={handleTimelineChange}
      />

      {/* Progress */}
      {activeTimeline && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            {activeTimeline.name} activities to complete ({total - completed})
          </h2>
          <div className="flex items-center space-x-3">
            <span className="text-green-600 text-sm font-medium">{percent}% complete</span>
            <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full transition-all" style={{ width: `${percent}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Table of Contents */}
        <div className="border rounded-xl p-5 space-y-4">
          <h3 className="font-semibold text-lg text-gray-800">{activeTimeline?.name} Missions</h3>
          {activities.map((activity) => (
            <div
              key={activity.id}
              onClick={() => handleActivityClick(activity)}
              className={`cursor-pointer p-2 rounded transition flex items-center justify-between ${
                selectedActivity?.id === activity.id
                  ? 'bg-blue-50 border-l-4 border-blue-600'
                  : 'hover:bg-gray-100'
              }`}
            >
              <div>
                <div className="text-base font-medium text-gray-900">{activity.title}</div>
                {activity.person && (
                  <div className="text-sm text-gray-500">{activity.person}</div>
                )}
              </div>
              {activity.isCompleted && <CheckCircle className="w-5 h-5 text-green-500" />}
            </div>
          ))}
        </div>

        {/* Detail View */}
        <div className="border rounded-xl p-5 space-y-4">
          {selectedActivity ? (
            <>
              <h3 className="text-xl font-semibold text-gray-800">{selectedActivity.title}</h3>
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>  
                {selectedActivity.description}
              </ReactMarkdown>
              <button
                onClick={handleMarkCompleted}
                disabled={selectedActivity.isCompleted}
                className={`mt-4 px-4 py-2 rounded ${
                  selectedActivity.isCompleted
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                {selectedActivity.isCompleted ? 'Completed' : 'Mark as Completed'}
              </button>
            </>
          ) : (
            <p className="text-gray-500">Select an activity from the left to view its details.</p>
          )}
        </div>
      </div>
    </div>
  );
}
