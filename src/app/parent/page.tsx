'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/stat-card';
import { useAuth } from '@/hooks/use-auth';
import { getChildrenByParent, mockEvents } from '@/lib/data';
import { Parent } from '@/lib/types';

export default function ParentDashboard() {
  const { user } = useAuth();
  
  // Get parent's children
  const children = getChildrenByParent(user?.id || '');
  
  if (!children.length) {
    return <div>No children found</div>;
  }

  // Calculate aggregate stats
  const totalFeesPending = children.reduce((sum, child) => sum + child.fees.pending, 0);
  const avgAttendance = children.reduce((sum, child) => sum + child.attendance.percentage, 0) / children.length;
  const avgGrade = children.reduce((sum, child) => {
    const childAvg = Object.values(child.grades).reduce((acc: number, grade: any) => 
      acc + parseFloat(grade.overall.replace(/[^0-9.]/g, '') || '85'), 0
    ) / Object.keys(child.grades).length;
    return sum + childAvg;
  }, 0) / children.length;

  const upcomingEvents = mockEvents.filter(event => 
    new Date(event.date) >= new Date() && event.audience.includes('parent')
  );

  const recentActivities = [
    { child: children[0].name, activity: 'Submitted Math Assignment', time: '2 hours ago', type: 'academic' },
    { child: children[0].name, activity: 'Fee Payment Due', time: '1 day ago', type: 'financial' },
    { child: children[0].name, activity: 'Marked Present in Class', time: '1 day ago', type: 'attendance' },
    { child: children[0].name, activity: 'Teacher Comment Added', time: '2 days ago', type: 'communication' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {(user as Parent)?.name}!</h1>
        <p className="text-gray-600">Monitor your {children.length > 1 ? 'children\'s' : 'child\'s'} academic progress and school activities.</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Children Enrolled"
          value={children.length}
          icon="👨‍👩‍👧‍👦"
          description="Active students"
        />
        
        <StatCard
          title="Average Attendance"
          value={`${avgAttendance.toFixed(1)}%`}
          change={{ value: 2, label: 'from last month', type: 'positive' }}
          icon="📅"
          description="Overall attendance rate"
        />
        
        <StatCard
          title="Average Grade"
          value={`${avgGrade.toFixed(1)}%`}
          change={{ value: 3, label: 'from last month', type: 'positive' }}
          icon="📊"
          description="Academic performance"
        />
        
        <StatCard
          title="Pending Fees"
          value={`$${totalFeesPending}`}
          change={{ value: 5, label: 'from last month', type: 'negative' }}
          icon="💰"
          description="Outstanding payments"
        />
      </div>

      {/* Children Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {children.map((child) => (
          <Card key={child.id}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-lg">
                    {child.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <div>
                  <CardTitle className="text-lg">{child.name}</CardTitle>
                  <CardDescription>{child.grade} • Section {child.section} • Roll #{child.rollNumber}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{child.attendance.percentage}%</p>
                  <p className="text-xs text-gray-500">Attendance</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {Object.values(child.grades).reduce((acc: number, grade: any) => 
                      acc + parseFloat(grade.overall.replace(/[^0-9.]/g, '') || '85'), 0
                    ) / Object.keys(child.grades).length < 1 ? 
                      (Object.values(child.grades).reduce((acc: number, grade: any) => 
                        acc + parseFloat(grade.overall.replace(/[^0-9.]/g, '') || '85'), 0
                      ) / Object.keys(child.grades).length).toFixed(1) + '%' : 
                      (Object.values(child.grades).reduce((acc: number, grade: any) => 
                        acc + parseFloat(grade.overall.replace(/[^0-9.]/g, '') || '85'), 0
                      ) / Object.keys(child.grades).length).toFixed(0) + '%'
                    }
                  </p>
                  <p className="text-xs text-gray-500">Average Grade</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">${child.fees.pending}</p>
                  <p className="text-xs text-gray-500">Pending Fees</p>
                </div>
              </div>
              
              {/* Subject Grades */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 mb-2">Recent Grades</p>
                {Object.entries(child.grades).slice(0, 3).map(([subject, grades]: [string, any]) => (
                  <div key={subject} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{subject}</span>
                    <span className={`font-medium ${
                      grades.overall.startsWith('A') ? 'text-green-600' :
                      grades.overall.startsWith('B') ? 'text-blue-600' :
                      grades.overall.startsWith('C') ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {grades.overall}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities and Communication */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates about your {children.length > 1 ? 'children' : 'child'}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                      activity.type === 'academic' ? 'bg-blue-500' :
                      activity.type === 'financial' ? 'bg-green-500' :
                      activity.type === 'attendance' ? 'bg-purple-500' :
                      activity.type === 'communication' ? 'bg-orange-500' : 'bg-gray-500'
                    }`}>
                      {activity.type === 'academic' ? '📚' :
                       activity.type === 'financial' ? '💰' :
                       activity.type === 'attendance' ? '📅' :
                       activity.type === 'communication' ? '💬' : '📋'}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.activity}</p>
                    <p className="text-xs text-gray-500">{activity.child}</p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fee Summary & Quick Actions */}
        <div className="space-y-6">
          {/* Fee Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Fee Summary</CardTitle>
              <CardDescription>Payment overview for all children</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {children.map((child) => (
                  <div key={child.id} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{child.name}</span>
                      <span className={`text-sm font-medium ${
                        child.fees.pending > 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {child.fees.pending > 0 ? `$${child.fees.pending} due` : 'Paid up'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Due: {new Date(child.fees.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 text-left bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="text-sm font-medium text-gray-900">View Reports</div>
                </button>
                <button className="p-3 text-left bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <div className="text-2xl mb-2">💰</div>
                  <div className="text-sm font-medium text-gray-900">Pay Fees</div>
                </button>
                <button className="p-3 text-left bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <div className="text-2xl mb-2">💬</div>
                  <div className="text-sm font-medium text-gray-900">Message Teacher</div>
                </button>
                <button className="p-3 text-left bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                  <div className="text-2xl mb-2">📅</div>
                  <div className="text-sm font-medium text-gray-900">Schedule Meeting</div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming School Events</CardTitle>
          <CardDescription>Important dates and activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingEvents.slice(0, 3).map((event) => (
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