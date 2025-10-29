import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Save, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ScoreEntry = () => {
  const [selectedRound, setSelectedRound] = useState('');
  const [scores, setScores] = useState<(string | number)[][]>(
    Array(12).fill(null).map(() => Array(6).fill(''))
  );
  const { toast } = useToast();

  const rounds = ['WA 720', 'WA 1440', 'Portsmouth', 'FITA 18', 'Indoor 25m'];

  const handleScoreChange = (endIndex: number, arrowIndex: number, value: string) => {
    const newScores = [...scores];
    newScores[endIndex][arrowIndex] = value;
    setScores(newScores);
  };

  const calculateEndTotal = (endScores: (string | number)[]) => {
    return endScores.reduce((sum: number, score) => {
      const val = typeof score === 'number' ? score : score === 'X' ? 10 : score === 'M' ? 0 : Number(score) || 0;
      return sum + val;
    }, 0);
  };

  const calculateGrandTotal = () => {
    return scores.reduce((total: number, end) => total + calculateEndTotal(end), 0);
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft saved",
      description: "Your score has been saved as a draft.",
    });
  };

  const handleSubmit = () => {
    if (!selectedRound) {
      toast({
        title: "Select a round",
        description: "Please select a round before submitting.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Score submitted",
      description: "Your score has been submitted for review.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Score Entry</h1>
          <p className="text-muted-foreground">Record your arrows for each end</p>
        </div>

        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Round Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedRound} onValueChange={setSelectedRound}>
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue placeholder="Select a round" />
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
            <CardTitle>Score Sheet</CardTitle>
            <CardDescription>Enter scores: 1-10, X for 10+X, M for miss</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-2 text-center font-semibold">End</th>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <th key={i} className="border p-2 text-center font-semibold">
                        Arrow {i}
                      </th>
                    ))}
                    <th className="border p-2 text-center font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map((end, endIndex) => (
                    <tr key={endIndex} className="hover:bg-accent/5">
                      <td className="border p-2 text-center font-medium">{endIndex + 1}</td>
                      {end.map((score, arrowIndex) => (
                        <td key={arrowIndex} className="border p-1">
                          <Input
                            value={score}
                            onChange={(e) => handleScoreChange(endIndex, arrowIndex, e.target.value.toUpperCase())}
                            className="text-center h-12 text-lg font-semibold"
                            maxLength={2}
                          />
                        </td>
                      ))}
                      <td className="border p-2 text-center font-bold text-lg">
                        {calculateEndTotal(end)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-primary/10">
                    <td colSpan={7} className="border p-2 text-right font-bold">
                      Grand Total:
                    </td>
                    <td className="border p-2 text-center font-bold text-xl text-primary">
                      {calculateGrandTotal()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex gap-4 mt-6 justify-end">
              <Button variant="outline" onClick={handleSaveDraft} className="gap-2">
                <Save className="h-4 w-4" />
                Save Draft
              </Button>
              <Button onClick={handleSubmit} className="gap-2">
                <Send className="h-4 w-4" />
                Submit for Review
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScoreEntry;
