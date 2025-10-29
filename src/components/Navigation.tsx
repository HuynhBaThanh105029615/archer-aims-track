import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Target, LogOut, LayoutDashboard, History, ClipboardCheck, Users, Trophy } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 font-semibold text-lg">
            <Target className="h-6 w-6 text-primary" />
            <span>Archery Score System</span>
          </Link>

          <div className="flex items-center gap-6">
            {user.role === 'archer' && (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Link to="/history">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <History className="h-4 w-4" />
                    History
                  </Button>
                </Link>
              </>
            )}

            {user.role === 'recorder' && (
              <>
                <Link to="/recorder">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ClipboardCheck className="h-4 w-4" />
                    Reviews
                  </Button>
                </Link>
                <Link to="/leaderboard">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Trophy className="h-4 w-4" />
                    Leaderboard
                  </Button>
                </Link>
              </>
            )}

            {user.role === 'admin' && (
              <>
                <Link to="/admin">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Admin
                  </Button>
                </Link>
                <Link to="/leaderboard">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Trophy className="h-4 w-4" />
                    Leaderboard
                  </Button>
                </Link>
                <Link to="/recorder">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Users className="h-4 w-4" />
                    Users
                  </Button>
                </Link>
              </>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground capitalize">Role: {user.role}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};
