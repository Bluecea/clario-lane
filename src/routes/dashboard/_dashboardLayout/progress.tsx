import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components";
import {
  Award,
  TrendingUp,
  Calendar,
  Target,
  Trophy,
  Flame,
  CheckCircle2,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useUserProfileStore } from "@/store";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/_dashboardLayout/progress")({
  component: RouteComponent,
});

export function RouteComponent() {
  const userProfile = useUserProfileStore();

  // Mock data for charts
  const weeklyProgress = [
    { day: "Mon", wpm: userProfile.baseLineWPM! + 5, comprehension: 75 },
    { day: "Tue", wpm: userProfile.baseLineWPM! + 12, comprehension: 78 },
    { day: "Wed", wpm: userProfile.baseLineWPM! + 18, comprehension: 82 },
    { day: "Thu", wpm: userProfile.baseLineWPM! + 25, comprehension: 80 },
    { day: "Fri", wpm: userProfile.baseLineWPM! + 32, comprehension: 85 },
    { day: "Sat", wpm: userProfile.baseLineWPM! + 38, comprehension: 83 },
    {
      day: "Sun",
      wpm: userProfile.currentWPM!,
      comprehension: userProfile.currentComprehensionScore!,
    },
  ];

  const sessionData = [
    { week: "Week 1", sessions: 5, avgWPM: userProfile.baseLineWPM! + 10 },
    { week: "Week 2", sessions: 6, avgWPM: userProfile.baseLineWPM! + 25 },
    { week: "Week 3", sessions: 7, avgWPM: userProfile.baseLineWPM! + 35 },
    { week: "This Week", sessions: 4, avgWPM: userProfile.currentWPM! },
  ];

  const badges = [
    {
      id: "first_drill",
      name: "First Steps",
      icon: "🎯",
      earned: true,
      description: "Completed your first drill",
    },
    {
      id: "week_streak",
      name: "Week Warrior",
      icon: "🔥",
      earned: true,
      description: "7-day practice streak",
    },
    {
      id: "speed_demon",
      name: "Speed Demon",
      icon: "⚡",
      earned: false,
      description: "Reach 400 WPM",
    },
    {
      id: "comprehension_master",
      name: "Comprehension Master",
      icon: "🧠",
      earned: false,
      description: "90%+ comprehension rate",
    },
    {
      id: "dedicated",
      name: "Dedicated Reader",
      icon: "📚",
      earned: false,
      description: "30-day practice streak",
    },
    {
      id: "milestone_500",
      name: "500 Club",
      icon: "🏆",
      earned: false,
      description: "Reach 500 WPM",
    },
  ];

  const milestones = [
    {
      id: 1,
      title: "Completed Baseline Test",
      date: "6 days ago",
      completed: true,
    },
    {
      id: 2,
      title: "First 100 XP Earned",
      date: "5 days ago",
      completed: true,
    },
    { id: 3, title: "7-Day Streak", date: "Today", completed: true },
    { id: 4, title: "Reach 300 WPM", date: "In progress", completed: false },
    {
      id: 5,
      title: "Complete 30 Sessions",
      date: "Upcoming",
      completed: false,
    },
  ];

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
      transition={{ type: "spring" }}
      className="space-y-6"
    >
      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">Improvement</span>
            </div>
            <div className="text-2xl text-indigo-900">
              +
              {Math.round(
                ((userProfile.currentWPM! - userProfile.baseLineWPM!) /
                  userProfile.baseLineWPM!) *
                  100,
              )}
              %
            </div>
            <p className="text-sm text-gray-600 mt-1">from baseline</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">Sessions</span>
            </div>
            <div className="text-2xl text-indigo-900">
              {"userProfile.totalSessions"}
            </div>
            <p className="text-sm text-gray-600 mt-1">total completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <Flame className="w-5 h-5 text-orange-600" />
              <span className="text-sm text-gray-600">Best Streak</span>
            </div>
            <div className="text-2xl text-indigo-900">
              {userProfile.streakDays} days
            </div>
            <p className="text-sm text-gray-600 mt-1">current streak</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <span className="text-sm text-gray-600">Badges</span>
            </div>
            <div className="text-2xl text-indigo-900">
              {badges.filter((b) => b.earned).length}/{badges.length}
            </div>
            <p className="text-sm text-gray-600 mt-1">earned</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Reading Speed Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyProgress}>
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
                    strokeWidth={2}
                    dot={{ fill: "#4f46e5", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comprehension Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="comprehension"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: "#10b981", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Session Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Practice Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sessionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="week" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="sessions"
                  fill="#4f46e5"
                  name="Sessions"
                />
                <Bar
                  yAxisId="right"
                  dataKey="avgWPM"
                  fill="#06b6d4"
                  name="Avg WPM"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-lg border-2 text-center ${
                    badge.earned
                      ? "bg-yellow-50 border-yellow-200"
                      : "bg-gray-50 border-gray-200 opacity-60"
                  }`}
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <h3 className="text-sm mb-1">{badge.name}</h3>
                  <p className="text-xs text-gray-600">{badge.description}</p>
                  {badge.earned && (
                    <Badge className="mt-2 bg-yellow-500 text-white text-xs">
                      Earned
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Milestones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-600" />
              Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {milestones.map((milestone, idx) => (
                <div key={milestone.id} className="flex items-start gap-3">
                  <div className="relative">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        milestone.completed ? "bg-green-500" : "bg-gray-200"
                      }`}
                    >
                      {milestone.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      ) : (
                        <span className="text-gray-500 text-sm">{idx + 1}</span>
                      )}
                    </div>
                    {idx < milestones.length - 1 && (
                      <div
                        className={`absolute left-1/2 top-8 w-0.5 h-6 -translate-x-1/2 ${
                          milestone.completed ? "bg-green-500" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <h3
                      className={`mb-1 ${
                        milestone.completed ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-gray-600">{milestone.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
