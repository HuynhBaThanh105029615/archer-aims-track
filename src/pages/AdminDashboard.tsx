import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Trophy, Shield, Activity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { toast } = useToast();

  const users = [
    { id: 1, name: 'John Archer', email: 'john@example.com', role: 'archer' },
    { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', role: 'archer' },
    { id: 3, name: 'Mike Recorder', email: 'mike@example.com', role: 'recorder' },
  ];

  const competitions = [
    { id: 1, name: 'Spring Championship 2025', date: 'Apr 15, 2025', status: 'upcoming' },
    { id: 2, name: 'Indoor Series', date: 'Oct 28, 2025', status: 'active' },
    { id: 3, name: 'Summer Open', date: 'Aug 10, 2025', status: 'completed' },
  ];

  const auditLog = [
    { id: 1, action: 'Score approved', user: 'Mike Recorder', target: 'John Archer - WA 720', time: '2 hours ago' },
    { id: 2, action: 'User promoted', user: 'Admin', target: 'Sarah Smith → Recorder', time: '5 hours ago' },
    { id: 3, action: 'Competition created', user: 'Admin', target: 'Spring Championship 2025', time: '1 day ago' },
  ];

  const handlePromoteUser = (userId: number) => {
    toast({
      title: "User promoted",
      description: "User has been promoted to Recorder role.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">Manage users, competitions, and system settings</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Recorders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Competitions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Active Scores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Manage Users</TabsTrigger>
            <TabsTrigger value="competitions">Competitions</TabsTrigger>
            <TabsTrigger value="audit">Audit Log</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Promote users to Recorder or manage roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Name</th>
                        <th className="text-left p-3 font-semibold">Email</th>
                        <th className="text-center p-3 font-semibold">Role</th>
                        <th className="text-center p-3 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-accent/5">
                          <td className="p-3 font-medium">{user.name}</td>
                          <td className="p-3 text-muted-foreground">{user.email}</td>
                          <td className="p-3 text-center">
                            <Badge variant={user.role === 'recorder' ? 'default' : 'secondary'}>
                              {user.role}
                            </Badge>
                          </td>
                          <td className="p-3 text-center">
                            {user.role === 'archer' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handlePromoteUser(user.id)}
                              >
                                Promote to Recorder
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="competitions">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Competitions</CardTitle>
                    <CardDescription>Create and manage archery competitions</CardDescription>
                  </div>
                  <Button>Create Competition</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {competitions.map((comp) => (
                    <div key={comp.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{comp.name}</p>
                        <p className="text-sm text-muted-foreground">{comp.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            comp.status === 'active' ? 'default' :
                            comp.status === 'upcoming' ? 'secondary' : 'outline'
                          }
                        >
                          {comp.status}
                        </Badge>
                        <Button size="sm" variant="outline">Manage</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit">
            <Card>
              <CardHeader>
                <CardTitle>Audit Log</CardTitle>
                <CardDescription>Recent system activities and changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {auditLog.map((log) => (
                    <div key={log.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      <Activity className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium">{log.action}</p>
                        <p className="text-sm text-muted-foreground">by {log.user}</p>
                        <p className="text-sm">{log.target}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{log.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
