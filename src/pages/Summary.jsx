import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { ArrowLeft } from "lucide-react";
import ProjectStatusOverview from "../components/ProjectStatusOverview";
import TeamWorkloadChart from "../components/TeamWorkloadChart";

function Summary() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-y-8 h-full text-gray-900 dark:text-white px-8 py-6">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-x-6">
          <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
            <div className="flex items-center gap-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to project</span>
            </div>
          </Button>
          <h1 className="text-xl font-semibold">Project Summary</h1>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-8">
        <ProjectStatusOverview />
        <TeamWorkloadChart />
      </div>
    </div>
  );
}

export default Summary;
