import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trophy, Medal, Award } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Leaderboard = () => {
  const { user } = useAuth();
  const [selectedRound, setSelectedRound] = useState('WA 720');

  const rounds = ['WA 720', 'WA 1440', 'Portsmouth', 'FITA 18', 'Indoor 25m'];

  const leaderboardData = [
    { rank: 1, archer: 'Emma Wilson', score: 695, xCount: 48, date: 'Oct 28, 2025' },
    { rank: 2, archer: 'Mike Johnson', score: 678, xCount: 42, date: 'Oct 27, 2025' },
    { rank: 3, archer: 'Sarah Smith', score: 665, xCount: 38, date: 'Oct 26, 2025' },
    { rank: 4, archer: 'John Archer', score: 658, xCount: 35, date: 'Oct 25, 2025', isCurrentUser: true },
    { rank: 5, archer: 'David Brown', score: 645, xCount: 32, date: 'Oct 24, 2025' },
    { rank: 6, archer: 'Lisa Taylor', score: 632, xCount: 28, date: 'Oct 23, 2025' },
    { rank: 7, archer: 'Tom Anderson', score: 625, xCount: 25, date: 'Oct 22, 2025' },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-accent" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-muted-foreground" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-600" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Trophy className="h-8 w-8 text-accent" />
            Leaderboard
          </h1>
          <p className="text-muted-foreground">Competition rankings and top performers</p>
        </div>

        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filter by Round</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedRound} onValueChange={setSelectedRound}>
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {rounds.map((round) => (
                    <SelectItem key={round} value={round}>
                      {round}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{selectedRound} Rankings</CardTitle>
            <CardDescription>Top scores for the selected round</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Rank</th>
                    <th className="text-left p-3 font-semibold">Archer</th>
                    <th className="text-center p-3 font-semibold">Score</th>
                    <th className="text-center p-3 font-semibold">X Count</th>
                    <th className="text-center p-3 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((entry) => (
                    <tr
                      key={entry.rank}
                      className={`border-b hover:bg-accent/5 transition-colors ${
                        entry.isCurrentUser ? 'bg-primary/5' : ''
                      }`}
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {getRankIcon(entry.rank)}
                          <span className="font-bold text-lg">{entry.rank}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{entry.archer}</span>
                          {entry.isCurrentUser && (
                            <Badge variant="outline" className="text-xs">You</Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-center font-bold text-lg text-primary">
                        {entry.score}
                      </td>
                      <td className="p-3 text-center font-semibold">{entry.xCount}</td>
                      <td className="p-3 text-center text-sm text-muted-foreground">
                        {entry.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
