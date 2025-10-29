import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const ReviewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rejectReason, setRejectReason] = useState('');

  const scoreData = {
    archer: 'John Archer',
    round: 'WA 720',
    date: '2025-10-28',
    scores: [
      [10, 10, 9, 9, 8, 8],
      [10, 9, 9, 8, 8, 7],
      ['X', 10, 10, 9, 9, 8],
      [10, 9, 9, 9, 8, 7],
      ['X', 'X', 10, 10, 9, 9],
      [10, 10, 9, 8, 8, 7],
    ],
  };

  const calculateEndTotal = (end: (string | number)[]) => {
    return end.reduce((sum: number, score) => {
      const val = typeof score === 'number' ? score : score === 'X' ? 10 : Number(score) || 0;
      return sum + val;
    }, 0);
  };

  const calculateGrandTotal = () => {
    return scoreData.scores.reduce((total: number, end) => total + calculateEndTotal(end), 0);
  };

  const countX = () => {
    return scoreData.scores.flat().filter(s => s === 'X').length;
  };

  const handleApprove = () => {
    toast({
      title: "Score approved",
      description: `Score for ${scoreData.archer} has been approved.`,
    });
    navigate('/recorder');
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      toast({
        title: "Comment required",
        description: "Please provide a reason for rejection.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Score rejected",
      description: `Score has been rejected and ${scoreData.archer} has been notified.`,
    });
    navigate('/recorder');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate('/recorder')} className="mb-4 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{scoreData.archer}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {scoreData.round} • {scoreData.date}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="text-sm">Pending Review</Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">{calculateGrandTotal()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">X Count</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{countX()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Arrows</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{scoreData.scores.flat().length}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Score Details</CardTitle>
            <CardDescription>Review each end carefully before approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-3 text-center font-semibold">End</th>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <th key={i} className="border p-3 text-center font-semibold">
                        Arrow {i}
                      </th>
                    ))}
                    <th className="border p-3 text-center font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {scoreData.scores.map((end, endIndex) => (
                    <tr key={endIndex}>
                      <td className="border p-3 text-center font-medium">{endIndex + 1}</td>
                      {end.map((score, arrowIndex) => (
                        <td key={arrowIndex} className="border p-3 text-center text-lg font-semibold">
                          {score}
                        </td>
                      ))}
                      <td className="border p-3 text-center font-bold text-lg">
                        {calculateEndTotal(end)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-primary/10">
                    <td colSpan={7} className="border p-3 text-right font-bold">
                      Grand Total:
                    </td>
                    <td className="border p-3 text-center font-bold text-xl text-primary">
                      {calculateGrandTotal()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Review Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Reject with comment (optional)</label>
              <Textarea
                placeholder="Enter reason for rejection..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="gap-2 flex-1">
                    <CheckCircle className="h-4 w-4" />
                    Approve Score
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Approve this score?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will officially record the score of {calculateGrandTotal()} for {scoreData.archer}.
                      This action can be reversed later if needed.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleApprove}>Confirm Approval</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button variant="destructive" onClick={handleReject} className="gap-2 flex-1">
                <XCircle className="h-4 w-4" />
                Reject Score
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReviewDetail;
