'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/stat-card';
import { mockStudents, mockTeachers, mockClasses, mockFees, mockAttendance, mockEvents } from '@/lib/data';

export default function AdminDashboard() {
  // Calculate statistics
  const totalStudents = mockStudents.length;
  const totalTeachers = mockTeachers.length;
  const totalClasses = mockClasses.length;
  
  const totalFeesCollected = mockFees
    .filter(fee => fee.status === 'paid')
    .reduce((sum, fee) => sum + fee.amount, 0);
  
  const pendingFees = mockFees
    .filter(fee => fee.status === 'pending')
    .reduce((sum, fee) => sum + fee.amount, 0);

  const attendanceToday = mockAttendance.filter(att => 
    att.date === new Date().toISOString().split('T')[0] && att.status === 'present'
  ).length;

  const upcomingEvents = mockEvents.filter(event => 
    new Date(event.date) >= new Date()
  ).length;

  const recentActivities = [
    { id: 1, action: 'New student enrolled', user: 'Alice Johnson', time: '2 hours ago', type: 'enrollment' },
    { id: 2, action: 'Fee payment received', user: 'Bob Smith', time: '3 hours ago', type: 'payment' },
    { id: 3, action: 'Teacher updated grades', user: 'Dr. Sarah Williams', time: '5 hours ago', type: 'academic' },
    { id: 4, action: 'Parent-teacher meeting scheduled', user: 'Michael Johnson', time: '1 day ago', type: 'meeting' },
    { id: 5, action: 'New assignment posted', user: 'Mr. James Anderson', time: '1 day ago', type: 'academic' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Principal Carter!</h1>
        <p className="text-gray-600">Here's what's happening at your school today.</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={totalStudents}
          change={{ value: 5, label: 'from last month', type: 'positive' }}
          icon="👥"
          description="Active enrolled students"
        />
        
        <StatCard
          title="Total Teachers"
          value={totalTeachers}
          change={{ value: 2, label: 'from last month', type: 'positive' }}
          icon="👨‍🏫"
          description="Active teaching staff"
        />
        
        <StatCard
          title="Total Classes"
          value={totalClasses}
          icon="🏫"
          description="Active class sections"
        />
        
        <StatCard
          title="Attendance Today"
          value={`${attendanceToday}/${totalStudents}`}
          change={{ value: 3, label: 'from yesterday', type: 'positive' }}
          icon="📅"
          description="Students present"
        />
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StatCard
          title="Fees Collected"
          value={`$${totalFeesCollected.toLocaleString()}`}
          change={{ value: 12, label: 'from last month', type: 'positive' }}
          icon="💰"
          description="Total payments received"
        />
        
        <StatCard
          title="Pending Fees"
          value={`$${pendingFees.toLocaleString()}`}
          change={{ value: 5, label: 'from last month', type: 'negative' }}
          icon="⏳"
          description="Outstanding payments"
        />
        
        <StatCard
          title="Upcoming Events"
          value={upcomingEvents}
          icon="📅"
          description="Scheduled activities"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest school activities and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                      activity.type === 'enrollment' ? 'bg-blue-500' :
                      activity.type === 'payment' ? 'bg-green-500' :
                      activity.type === 'academic' ? 'bg-purple-500' :
                      activity.type === 'meeting' ? 'bg-orange-500' : 'bg-gray-500'
                    }`}>
                      {activity.type === 'enrollment' ? '👥' :
                       activity.type === 'payment' ? '💰' :
                       activity.type === 'academic' ? '📚' :
                       activity.type === 'meeting' ? '📅' : '📋'}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.user}</p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats & Actions */}
        <div className="space-y-6">
          {/* Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle>School Performance</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Average Attendance</span>
                  <span className="text-sm font-bold text-green-600">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm font-medium text-gray-600">Fee Collection Rate</span>
                  <span className="text-sm font-bold text-blue-600">87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm font-medium text-gray-600">Teacher Satisfaction</span>
                  <span className="text-sm font-bold text-purple-600">95%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used admin tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 text-left bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <div className="text-2xl mb-2">👥</div>
                  <div className="text-sm font-medium text-gray-900">Add Student</div>
                </button>
                <button className="p-3 text-left bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <div className="text-2xl mb-2">👨‍🏫</div>
                  <div className="text-sm font-medium text-gray-900">Add Teacher</div>
                </button>
                <button className="p-3 text-left bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <div className="text-2xl mb-2">🏫</div>
                  <div className="text-sm font-medium text-gray-900">Create Class</div>
                </button>
                <button className="p-3 text-left bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="text-sm font-medium text-gray-900">View Reports</div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>School calendar and important dates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    event.type === 'academic' ? 'bg-blue-100 text-blue-800' :
                    event.type === 'sports' ? 'bg-green-100 text-green-800' :
                    event.type === 'cultural' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {event.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                <div className="text-xs text-gray-500">
                  {new Date(event.date).toLocaleDateString()} at {event.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}