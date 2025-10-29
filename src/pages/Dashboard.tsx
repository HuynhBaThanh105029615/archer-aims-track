import { useAuth } from '@/contexts/AuthContext';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Plus, Trophy, Clock, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const draftScores = [
    { id: 1, round: 'WA 720', date: '2025-10-28', arrows: 36, status: 'draft' },
    { id: 2, round: 'Portsmouth', date: '2025-10-25', arrows: 48, status: 'draft' },
  ];

  const submittedScores = [
    { id: 3, round: 'WA 1440', date: '2025-10-22', score: 1285, status: 'approved' },
    { id: 4, round: 'WA 720', date: '2025-10-15', score: 658, status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 🎯</h1>
          <p className="text-muted-foreground">Track your progress and manage your scores</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5 text-accent" />
                Personal Best
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">1285</div>
              <p className="text-sm text-muted-foreground mt-1">WA 1440 • Oct 22, 2025</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Draft Scores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{draftScores.length}</div>
              <p className="text-sm text-muted-foreground mt-1">In progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Completed Rounds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{submittedScores.length}</div>
              <p className="text-sm text-muted-foreground mt-1">This month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Draft Scores</CardTitle>
                <Link to="/score-entry">
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Score
                  </Button>
                </Link>
              </div>
              <CardDescription>Continue your unfinished rounds</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {draftScores.map((score) => (
                  <Link key={score.id} to={`/score-entry/${score.id}`}>
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors cursor-pointer">
                      <div>
                        <p className="font-semibold">{score.round}</p>
                        <p className="text-sm text-muted-foreground">{score.arrows} arrows recorded</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{score.status}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">{score.date}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Submitted Scores</CardTitle>
              <CardDescription>Awaiting review or approved</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {submittedScores.map((score) => (
                  <div key={score.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold">{score.round}</p>
                      <p className="text-sm text-muted-foreground">Score: {score.score}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={score.status === 'approved' ? 'default' : 'secondary'}>
                        {score.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{score.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
