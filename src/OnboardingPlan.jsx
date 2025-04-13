import React from "react";
import { CheckCircle } from "lucide-react"; // install: npm install lucide-react

const steps = ["Day 1", "Week 1", "Week 2", "Week 3", "Month 1", "Month 2", "Month 3"];

const tasks = [
  { title: "Team Overview" },
  { title: "Your Onboarding Buddy", person: "Fadi E'layan" },
  { title: "Standing Meeting: Welcome Onboard", person: "Montaser Elmasri" },
  {
    title: "Amazon Orientation",
    description:
      "Welcome! We're excited to have you with us on our mission to be the Earth's most customer-centric company. We've gathered some videos and activities to help introduce you to life at Amazon.",
    link: "#",
  },
];

function OnboardingPlan() {
  return (
    <div className="p-6 sm:p-10 space-y-8 bg-white shadow-md rounded-2xl max-w-7xl mx-auto my-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">
        <a href="#" className="text-blue-600 hover:underline">
          Home
        </a>{" "}
        &gt; Onboarding Plan
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900">Hashem's Onboarding Plan</h1>

      {/* Tabs */}
      <div className="flex space-x-6 border-b text-sm font-medium text-gray-600">
        <button className="pb-2 border-b-2 border-blue-600 text-blue-600">Activities</button>
        <button className="pb-2 hover:text-blue-600">Projects</button>
        <button className="pb-2 hover:text-blue-600">Resources</button>
      </div>

      {/* Timeline + Print */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex flex-wrap gap-6">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <CheckCircle className="text-blue-600 w-5 h-5" />
              <span className="text-sm text-blue-800 underline cursor-pointer">{step}</span>
            </div>
          ))}
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100">
          Print
        </button>
      </div>

      {/* Progress */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          Day 1 activities to complete (6)
        </h2>
        <div className="flex items-center space-x-3">
          <span className="text-green-600 text-sm font-medium">100% complete</span>
          <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full w-full transition-all" />
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Table of Contents */}
        <div className="border rounded-xl p-5 space-y-4">
          <h3 className="font-semibold text-lg text-gray-800">Table of Contents</h3>
          {tasks.slice(0, 3).map((task, index) => (
            <div key={index}>
              <div className="text-base font-medium text-gray-900">{task.title}</div>
              {task.person && <div className="text-sm text-gray-500">{task.person}</div>}
            </div>
          ))}
        </div>

        {/* Orientation */}
        <div className="border rounded-xl p-5 space-y-4">
          <h3 className="font-semibold text-lg text-gray-800">Amazon Orientation</h3>
          <p className="text-sm text-gray-700">{tasks[3].description}</p>
          <a href={tasks[3].link} className="text-blue-600 underline text-sm">
            Review your Orientation
          </a>
          <div className="flex space-x-4 pt-2">
            <button className="text-sm text-blue-600 hover:underline">Submit Feedback</button>
            <button className="text-sm text-red-600 hover:underline">Report an issue</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingPlan;
