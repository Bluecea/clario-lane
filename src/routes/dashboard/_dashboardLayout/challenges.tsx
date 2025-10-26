import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Avatar,
  AvatarFallback,
} from "@/components";

import { Trophy, Users, Clock, Target, Medal, Crown, Star } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/_dashboardLayout/challenges")({
  component: RouteComponent,
});

export function RouteComponent() {
  const leaderboard = [
    {
      rank: 1,
      name: "Sarah Chen",
      wpm: 487,
      xp: 2450,
      streak: 28,
      avatar: "SC",
    },
    {
      rank: 2,
      name: "Mike Rodriguez",
      wpm: 465,
      xp: 2280,
      streak: 21,
      avatar: "MR",
    },
    {
      rank: 3,
      name: "Emily Watson",
      wpm: 442,
      xp: 2150,
      streak: 19,
      avatar: "EW",
    },
    {
      rank: 4,
      name: "You",
      wpm: 295,
      xp: 50,
      streak: 1,
      avatar: "YO",
      isCurrentUser: true,
    },
    { rank: 5, name: "James Kim", wpm: 288, xp: 890, streak: 8, avatar: "JK" },
  ];

  const activeChallenges = [
    {
      id: 1,
      title: "Speed Sprint Challenge",
      description: "Reach 350 WPM in a single session",
      reward: "+200 XP",
      difficulty: "Medium",
      participants: 1247,
      endsIn: "3 days",
      progress: 65,
    },
    {
      id: 2,
      title: "Comprehension Champion",
      description: "Maintain 90%+ comprehension for 5 consecutive sessions",
      reward: "+150 XP + Badge",
      difficulty: "Hard",
      participants: 856,
      endsIn: "1 week",
      progress: 40,
    },
    {
      id: 3,
      title: "Week Warrior",
      description:
        "Complete at least one practice session every day for 7 days",
      reward: "+100 XP",
      difficulty: "Easy",
      participants: 2156,
      endsIn: "6 days",
      progress: 14,
    },
  ];

  const communityGoals = [
    {
      id: 1,
      title: "Community Milestone: 1 Million Pages Read",
      current: 847523,
      goal: 1000000,
      reward: "Exclusive Badge for all participants",
    },
    {
      id: 2,
      title: "October Reading Marathon",
      current: 15842,
      goal: 50000,
      reward: "Premium feature unlock for 1 month",
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
      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Weekly Leaderboard
          </CardTitle>
          <p className="text-sm text-gray-600">
            Top performers this week - compete for the crown!
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {leaderboard.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                  user.isCurrentUser
                    ? "bg-indigo-50 border-indigo-200"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar
                      className={user.rank <= 3 ? "ring-2 ring-yellow-400" : ""}
                    >
                      <AvatarFallback
                        className={
                          user.rank === 1
                            ? "bg-yellow-400 text-yellow-900"
                            : user.rank === 2
                              ? "bg-gray-300 text-gray-700"
                              : user.rank === 3
                                ? "bg-orange-300 text-orange-900"
                                : user.isCurrentUser
                                  ? "bg-indigo-600 text-white"
                                  : "bg-gray-200 text-gray-700"
                        }
                      >
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {user.rank === 1 && (
                      <Crown className="w-4 h-4 text-yellow-500 absolute -top-2 -right-2" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">#{user.rank}</span>
                      <span
                        className={
                          user.isCurrentUser
                            ? "text-indigo-600"
                            : "text-gray-900"
                        }
                      >
                        {user.name}
                      </span>
                      {user.isCurrentUser && (
                        <Badge variant="secondary" className="text-xs">
                          You
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                      <span>{user.wpm} WPM</span>
                      <span>•</span>
                      <span>{user.xp} XP</span>
                      <span>•</span>
                      <span>{user.streak} day streak</span>
                    </div>
                  </div>
                </div>

                {user.rank <= 3 && (
                  <Medal
                    className={`w-6 h-6 ${
                      user.rank === 1
                        ? "text-yellow-500"
                        : user.rank === 2
                          ? "text-gray-400"
                          : "text-orange-400"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              <strong>Keep practicing!</strong> You're close to breaking into
              the top 3. Increase your speed by just{" "}
              {leaderboard[2].wpm - leaderboard[3].wpm} WPM to move up!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Active Challenges */}
      <div>
        <h2 className="mb-4 text-gray-900">Active Challenges</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {activeChallenges.map((challenge) => (
            <Card
              key={challenge.id}
              className="border-2 hover:border-indigo-300 transition-colors"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge
                    variant="outline"
                    className={
                      challenge.difficulty === "Easy"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : challenge.difficulty === "Medium"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                          : "bg-red-50 text-red-700 border-red-200"
                    }
                  >
                    {challenge.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="w-3 h-3" />
                    <span>{challenge.endsIn}</span>
                  </div>
                </div>
                <CardTitle className="text-lg">{challenge.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  {challenge.description}
                </p>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Your Progress</span>
                    <span className="text-indigo-600">
                      {challenge.progress}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all"
                      style={{ width: `${challenge.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>
                      {challenge.participants.toLocaleString()} joined
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-indigo-600">
                    <Star className="w-4 h-4" />
                    <span>{challenge.reward}</span>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  <Target className="w-4 h-4 mr-2" />
                  Continue Challenge
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Community Goals */}
      <div>
        <h2 className="mb-4 text-gray-900">Community Goals</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {communityGoals.map((goal) => (
            <Card
              key={goal.id}
              className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200"
            >
              <CardContent className="pt-6">
                <h3 className="mb-3 text-purple-900">{goal.title}</h3>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-700">
                      {goal.current.toLocaleString()} /{" "}
                      {goal.goal.toLocaleString()}
                    </span>
                    <span className="text-purple-600">
                      {Math.round((goal.current / goal.goal) * 100)}%
                    </span>
                  </div>
                  <div className="h-3 bg-white rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                      style={{ width: `${(goal.current / goal.goal) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white/60 backdrop-blur-sm p-3 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Reward:</strong> {goal.reward}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
