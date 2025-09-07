'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/stat-card';
import { useAuth } from '@/hooks/use-auth';
import { mockStudents, mockAssignments } from '@/lib/data';
import { Student } from '@/lib/types';

export default function StudentDashboard() {
  const { user } = useAuth();
  
  // Find current student data
  const studentData = mockStudents.find(student => student.id === user?.id) as Student;
  
  if (!studentData) return <div>Student data not found</div>;

  const studentAssignments = mockAssignments.filter(assignment => 
    assignment.classId === 'class1' // Mock - would be based on student's class
  );

  const upcomingAssignments = studentAssignments.filter(assignment => 
    new Date(assignment.dueDate) > new Date()
  );

  const overallGrade = Object.values(studentData.grades).reduce((acc: number, grade: any) => 
    acc + parseFloat(grade.overall.replace(/[^0-9.]/g, '') || '85'), 0
  ) / Object.keys(studentData.grades).length;

  const todaysClasses = [
    { subject: 'Mathematics', time: '09:00 AM', teacher: 'Dr. Sarah Williams', room: 'Room 101' },
    { subject: 'English', time: '10:30 AM', teacher: 'Mr. James Anderson', room: 'Room 205' },
    { subject: 'Physics', time: '02:00 PM', teacher: 'Ms. Maria Rodriguez', room: 'Lab 301' },
    { subject: 'History', time: '03:30 PM', teacher: 'Dr. Robert Brown', room: 'Room 108' },
  ];

  const recentGrades = Object.entries(studentData.grades).map(([subject, grades]: [string, any]) => ({
    subject,
    grade: grades.overall,
    assignment: 'Recent Test',
    date: '2 days ago'
  }));

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {studentData.name}!</h1>
        <p className="text-gray-600">Here's your academic overview and today's schedule.</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Overall Grade"
          value={`${overallGrade.toFixed(1)}%`}
          change={{ value: 3, label: 'from last month', type: 'positive' }}
          icon="📊"
          description="Academic performance"
        />
        
        <StatCard
          title="Attendance Rate"
          value={`${studentData.attendance.percentage}%`}
          change={{ value: 2, label: 'from last month', type: 'positive' }}
          icon="📅"
          description={`${studentData.attendance.present}/${studentData.attendance.total} days`}
        />
        
        <StatCard
          title="Pending Fees"
          value={`$${studentData.fees.pending}`}
          icon="💰"
          description={`Due by ${new Date(studentData.fees.dueDate).toLocaleDateString()}`}
        />
        
        <StatCard
          title="Assignments Due"
          value={upcomingAssignments.length}
          change={{ value: 1, label: 'new this week', type: 'neutral' }}
          icon="📚"
          description="Upcoming deadlines"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Classes</CardTitle>
            <CardDescription>Your schedule for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaysClasses.map((classItem, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-xs">
                        {classItem.time.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{classItem.subject}</p>
                    <p className="text-xs text-gray-500">{classItem.teacher} • {classItem.room}</p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {classItem.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Grades */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Grades</CardTitle>
            <CardDescription>Your latest academic performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentGrades.map((grade, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center text-xs font-bold ${
                      grade.grade.startsWith('A') ? 'border-green-500 text-green-600' :
                      grade.grade.startsWith('B') ? 'border-blue-500 text-blue-600' :
                      grade.grade.startsWith('C') ? 'border-orange-500 text-orange-600' : 'border-red-500 text-red-600'
                    }`}>
                      {grade.grade}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{grade.subject}</p>
                    <p className="text-xs text-gray-500">{grade.assignment}</p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {grade.date}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Academic Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Subject Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
            <CardDescription>Detailed breakdown by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(studentData.grades).map(([subject, grades]) => (
                <div key={subject} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-900">{subject}</h4>
                    <span className={`font-bold ${getGradeColor(grades.overall)}`}>
                      {grades.overall}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <p className="text-gray-500">Assignments</p>
                      <p className="font-medium">{grades.assignments}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500">Tests</p>
                      <p className="font-medium">{grades.tests}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500">Final</p>
                      <p className="font-medium">{grades.final}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Information */}
        <div className="space-y-6">
          {/* Fee Status */}
          <Card>
            <CardHeader>
              <CardTitle>Fee Status</CardTitle>
              <CardDescription>Your payment information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Amount</span>
                  <span className="text-sm font-medium">${studentData.fees.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Paid</span>
                  <span className="text-sm font-medium text-green-600">${studentData.fees.paid}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Pending</span>
                  <span className="text-sm font-medium text-red-600">${studentData.fees.pending}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Due Date</span>
                    <span className="text-sm font-medium">{new Date(studentData.fees.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
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
                  <div className="text-2xl mb-2">📚</div>
                  <div className="text-sm font-medium text-gray-900">View Assignments</div>
                </button>
                <button className="p-3 text-left bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="text-sm font-medium text-gray-900">Grade Report</div>
                </button>
                <button className="p-3 text-left bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <div className="text-2xl mb-2">📅</div>
                  <div className="text-sm font-medium text-gray-900">View Schedule</div>
                </button>
                <button className="p-3 text-left bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                  <div className="text-2xl mb-2">💰</div>
                  <div className="text-sm font-medium text-gray-900">Pay Fees</div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upcoming Assignments */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Assignments</CardTitle>
          <CardDescription>Assignments due in the coming week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingAssignments.slice(0, 3).map((assignment) => (
              <div key={assignment.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {assignment.subject}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{assignment.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </span>
                  <span className="text-xs font-medium">
                    {assignment.maxMarks} pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}