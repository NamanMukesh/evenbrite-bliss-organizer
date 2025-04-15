
import React from 'react';
import { 
  Area, 
  AreaChart, 
  PieChart, 
  Pie, 
  ResponsiveContainer, 
  Tooltip, 
  Cell, 
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CalendarClock, 
  Ticket, 
  CreditCard, 
  Users, 
  TrendingUp, 
  BarChart3 
} from 'lucide-react';
import { 
  weeklyTicketSales, 
  monthlyRevenue, 
  visitorDemographics, 
  ticketCategoryDistribution 
} from '@/data/mockData';

const COLORS = ['#9b87f5', '#F97316', '#22C55E', '#EAB308', '#EF4444'];

const DashboardSummary = () => {
  const currentMonthRevenue = monthlyRevenue[new Date().getMonth()].revenue;
  const previousMonthRevenue = monthlyRevenue[new Date().getMonth() - 1 >= 0 ? new Date().getMonth() - 1 : 11].revenue;
  const revenueGrowth = ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;
  
  // Calculate total weekly sales
  const totalWeeklyTickets = weeklyTicketSales.reduce((acc, day) => acc + day.sales, 0);
  
  // Stats data
  const stats = [
    {
      title: "Total Events",
      value: "12",
      description: "+2 new this month",
      icon: <CalendarClock className="h-5 w-5 text-eventify-purple" />,
      trend: "+20%",
      trendUp: true
    },
    {
      title: "Tickets Sold",
      value: totalWeeklyTickets.toString(),
      description: "Past 7 days",
      icon: <Ticket className="h-5 w-5 text-eventify-accent" />,
      trend: "+15%",
      trendUp: true
    },
    {
      title: "Monthly Revenue",
      value: `$${currentMonthRevenue.toLocaleString()}`,
      description: "This month",
      icon: <CreditCard className="h-5 w-5 text-eventify-success" />,
      trend: `${revenueGrowth > 0 ? '+' : ''}${revenueGrowth.toFixed(1)}%`,
      trendUp: revenueGrowth > 0
    },
    {
      title: "Total Attendees",
      value: "4,280",
      description: "Across all events",
      icon: <Users className="h-5 w-5 text-eventify-warning" />,
      trend: "+8%",
      trendUp: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="rounded-full bg-gray-100 p-2">{stat.icon}</div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  stat.trendUp ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {stat.trend}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="eventify-subheading">Analytics</h2>
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp size={16} />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="demographics" className="flex items-center gap-2">
              <BarChart3 size={16} />
              <span className="hidden sm:inline">Demographics</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Ticket Sales */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Ticket Sales</CardTitle>
                <CardDescription>Number of tickets sold each day this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyTicketSales}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ 
                          borderRadius: '8px', 
                          border: 'none', 
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                        }} 
                      />
                      <Bar dataKey="sales" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Revenue */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
                <CardDescription>Revenue trend over the past 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyRevenue}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip 
                        formatter={(value) => [`$${value}`, 'Revenue']}
                        contentStyle={{ 
                          borderRadius: '8px', 
                          border: 'none', 
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#9b87f5" 
                        fillOpacity={1} 
                        fill="url(#colorRevenue)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Age Demographics */}
            <Card>
              <CardHeader>
                <CardTitle>Attendee Age Demographics</CardTitle>
                <CardDescription>Age distribution of event attendees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={visitorDemographics}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {visitorDemographics.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Percentage']}
                        contentStyle={{ 
                          borderRadius: '8px', 
                          border: 'none', 
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Ticket Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Ticket Category Distribution</CardTitle>
                <CardDescription>Breakdown of ticket types sold</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ticketCategoryDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {ticketCategoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Percentage']}
                        contentStyle={{ 
                          borderRadius: '8px', 
                          border: 'none', 
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardSummary;
