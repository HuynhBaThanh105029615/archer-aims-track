import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, TrendingUp, Calendar } from 'lucide-react';

const History = () => {
  const personalBest = {
    score: 1285,
    round: 'WA 1440',
    date: 'Oct 22, 2025',
    xCount: 42,
  };

  const scoreHistory = [
    { id: 1, round: 'WA 1440', date: 'Oct 22, 2025', score: 1285, xCount: 42, isPB: true },
    { id: 2, round: 'WA 720', date: 'Oct 15, 2025', score: 658, xCount: 28, isPB: false },
    { id: 3, round: 'Portsmouth', date: 'Oct 8, 2025', score: 575, xCount: 35, isPB: false },
    { id: 4, round: 'WA 720', date: 'Oct 1, 2025', score: 645, xCount: 24, isPB: false },
    { id: 5, round: 'FITA 18', date: 'Sep 24, 2025', score: 542, xCount: 18, isPB: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">History & Personal Bests</h1>
          <p className="text-muted-foreground">Track your progress over time</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="md:col-span-2 border-l-4 border-l-accent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Trophy className="h-6 w-6 text-accent" />
                Current Personal Best
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Score</p>
                  <p className="text-3xl font-bold text-accent">{personalBest.score}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Round</p>
                  <p className="text-lg font-semibold">{personalBest.round}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">X Count</p>
                  <p className="text-lg font-semibold">{personalBest.xCount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Date</p>
                  <p className="text-lg font-semibold">{personalBest.date}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Avg Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">+5.2%</div>
              <p className="text-sm text-muted-foreground mt-1">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Score History
            </CardTitle>
            <CardDescription>Your completed and approved rounds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Date</th>
                    <th className="text-left p-3 font-semibold">Round</th>
                    <th className="text-center p-3 font-semibold">Score</th>
                    <th className="text-center p-3 font-semibold">X Count</th>
                    <th className="text-center p-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {scoreHistory.map((score) => (
                    <tr key={score.id} className="border-b hover:bg-accent/5 transition-colors">
                      <td className="p-3">{score.date}</td>
                      <td className="p-3 font-medium">{score.round}</td>
                      <td className="p-3 text-center font-bold text-lg">
                        {score.score}
                      </td>
                      <td className="p-3 text-center">{score.xCount}</td>
                      <td className="p-3 text-center">
                        {score.isPB ? (
                          <Badge className="bg-accent hover:bg-accent/90">
                            <Trophy className="h-3 w-3 mr-1" />
                            PB
                          </Badge>
                        ) : (
                          <Badge variant="outline">Approved</Badge>
                        )}
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

export default History;
