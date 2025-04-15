
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

type AuthFormProps = {
  type: 'login' | 'signup';
};

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This is a mock implementation - in a real app, you would connect to a backend
    if (type === 'login') {
      // Mock login success
      toast({
        title: 'Login successful',
        description: 'Welcome back to Eventify!',
      });
      navigate('/');
    } else {
      // Mock signup success
      toast({
        title: 'Account created successfully',
        description: 'Welcome to Eventify! You can now login.',
      });
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-4 px-6 border-b">
        <div className="flex items-center">
          <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft size={18} className="mr-2" />
            Back to Home
          </Link>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {type === 'login' ? 'Log in to your account' : 'Create an account'}
            </CardTitle>
            <CardDescription className="text-center">
              {type === 'login'
                ? 'Enter your credentials to access your account'
                : 'Fill in your details to get started'}
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {type === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              {type === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-eventify-purple">
                {type === 'login' ? 'Log In' : 'Sign Up'}
              </Button>
              
              <div className="text-center text-sm">
                {type === 'login' ? (
                  <>
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-eventify-purple font-medium">
                      Sign up
                    </Link>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <Link to="/login" className="text-eventify-purple font-medium">
                      Log in
                    </Link>
                  </>
                )}
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default AuthForm;
