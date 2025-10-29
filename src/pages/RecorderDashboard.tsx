import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ClipboardCheck, Eye } from 'lucide-react';

const RecorderDashboard = () => {
  const submissions = [
    { id: 1, archer: 'John Archer', round: 'WA 720', date: '2025-10-28', score: 658, status: 'pending' },
    { id: 2, archer: 'Sarah Smith', round: 'Portsmouth', date: '2025-10-28', score: 589, status: 'pending' },
    { id: 3, archer: 'Mike Johnson', round: 'WA 1440', date: '2025-10-27', score: 1250, status: 'pending' },
    { id: 4, archer: 'Emma Wilson', round: 'FITA 18', date: '2025-10-27', score: 532, status: 'reviewed' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <ClipboardCheck className="h-8 w-8 text-primary" />
            Recorder Dashboard
          </h1>
          <p className="text-muted-foreground">Review and approve submitted scores</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">
                {submissions.filter(s => s.status === 'pending').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reviewed Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {submissions.filter(s => s.status === 'reviewed').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{submissions.length}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submitted Scores</CardTitle>
            <CardDescription>Click "Review" to inspect and approve scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Archer</th>
                    <th className="text-left p-3 font-semibold">Round</th>
                    <th className="text-center p-3 font-semibold">Score</th>
                    <th className="text-center p-3 font-semibold">Date</th>
                    <th className="text-center p-3 font-semibold">Status</th>
                    <th className="text-center p-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission) => (
                    <tr key={submission.id} className="border-b hover:bg-accent/5">
                      <td className="p-3 font-medium">{submission.archer}</td>
                      <td className="p-3">{submission.round}</td>
                      <td className="p-3 text-center font-bold">{submission.score}</td>
                      <td className="p-3 text-center">{submission.date}</td>
                      <td className="p-3 text-center">
                        <Badge variant={submission.status === 'pending' ? 'secondary' : 'default'}>
                          {submission.status}
                        </Badge>
                      </td>
                      <td className="p-3 text-center">
                        <Link to={`/review/${submission.id}`}>
                          <Button size="sm" variant="outline" className="gap-2">
                            <Eye className="h-4 w-4" />
                            Review
                          </Button>
                        </Link>
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

export default RecorderDashboard;
