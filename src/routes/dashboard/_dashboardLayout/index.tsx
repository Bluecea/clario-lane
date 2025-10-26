import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Progress,
} from "@/components";

import {
  ArrowUp,
  Calendar,
  CheckCircle2,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useUserProfileStore } from "@/store";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/_dashboardLayout/")({
  component: RouteComponent,
});

export function RouteComponent() {
  const userProfile = useUserProfileStore();

  console.log({ userProfile });

  // Mock data for the chart
  const progressData = [
    { day: "Day 1", wpm: userProfile.baseLineWPM },
    { day: "Day 2", wpm: userProfile.baseLineWPM! + 10 },
    { day: "Day 3", wpm: userProfile.baseLineWPM! + 15 },
    { day: "Day 4", wpm: userProfile.baseLineWPM! + 25 },
    { day: "Day 5", wpm: userProfile.baseLineWPM! + 30 },
    { day: "Day 6", wpm: userProfile.baseLineWPM! + 40 },
    { day: "Today", wpm: userProfile.currentWPM },
  ];

  const goalWPM = Math.round(userProfile.baseLineWPM! * 1.5);
  const progressPercent = Math.round(
    ((userProfile.currentWPM! - userProfile.baseLineWPM!) /
      (goalWPM - userProfile.baseLineWPM!)) *
      100,
  );
  const improvement = userProfile.currentWPM! - userProfile.baseLineWPM!;

  const todaysTasks = [
    {
      id: 1,
      title: "Complete daily reading exercise",
      completed: false,
      xp: 25,
    },
    { id: 2, title: "Practice word chunking drill", completed: true, xp: 20 },
    { id: 3, title: "Take comprehension quiz", completed: false, xp: 30 },
  ];

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
      transition={{ type: "spring" }}
      className="space-y-6"
      key="overview"
    >
      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className=" text-sm">Current Speed</span>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-2xl text-primary mb-1">
              {userProfile.currentWPM} WPM
            </div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <ArrowUp className="w-3 h-3" />
              <span>+{improvement} from baseline</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className=" text-sm">Comprehension</span>
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl text-primary mb-1">
              {userProfile.currentComprehensionScore}%
            </div>
            <div className="text-sm ">Excellent retention</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className=" text-sm">Total Sessions</span>
              <Calendar className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl text-primary mb-1">
              {userProfile.totalSessions}
            </div>
            <div className="text-sm ">Keep it up!</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className=" text-sm">Goal Progress</span>
              <Target className="w-4 h-4 text-orange-600" />
            </div>
            <div className="text-2xl text-primary mb-1">{progressPercent}%</div>
            <div className="text-sm ">
              {goalWPM - userProfile.currentWPM} WPM to go
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Your Reading Speed Journey</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="wpm"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={{ fill: "#4f46e5", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Practice Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {todaysTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-3 rounded-lg border-2 ${
                  task.completed
                    ? "bg-green-50 border-green-200"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      task.completed
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300"
                    }`}
                  >
                    {task.completed && (
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span
                    className={
                      task.completed
                        ? "line-through text-gray-500"
                        : "text-gray-900"
                    }
                  >
                    {task.title}
                  </span>
                </div>
                <span className="text-sm text-indigo-600">+{task.xp} XP</span>
              </div>
            ))}
            <Button className="w-full mt-4">
              <Zap className="w-4 h-4 mr-2" />
              Start Practice Session
            </Button>
          </CardContent>
        </Card>

        {/* Goal Tracker */}
        <Card>
          <CardHeader>
            <CardTitle>30-Day Goal Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm ">Starting Point</span>
                  <span className="text-sm text-gray-900">
                    {userProfile.baseLineWPM} WPM
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm ">Current Speed</span>
                  <span className="text-sm text-indigo-600">
                    {userProfile.currentWPM} WPM
                  </span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-sm ">30-Day Goal</span>
                  <span className="text-sm text-gray-900">{goalWPM} WPM</span>
                </div>
                <Progress value={progressPercent} className="h-3" />
                <p className="text-sm  mt-2 text-center">
                  {progressPercent}% complete
                </p>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="mb-2 text-primary">On Track!</h3>
                <p className="text-sm text-gray-700">
                  You're making great progress. At this rate, you'll hit your
                  goal in {Math.round(30 * (1 - progressPercent / 100))} days.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white p-3 rounded-lg border">
                  <div className="text-lg text-indigo-600">
                    {userProfile.streakDays}
                  </div>
                  <div className="text-xs ">Day Streak</div>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <div className="text-lg text-indigo-600">
                    {userProfile.badges?.length || 0}
                  </div>
                  <div className="text-xs ">Badges</div>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <div className="text-lg text-indigo-600">
                    {userProfile.level}
                  </div>
                  <div className="text-xs ">Level</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
