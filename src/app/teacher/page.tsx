'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/stat-card';
import { useAuth } from '@/hooks/use-auth';
import { mockStudents, mockClasses, mockAssignments, mockAttendance } from '@/lib/data';

export default function TeacherDashboard() {
  const { user } = useAuth();
  
  // Get teacher's classes and students
  const teacherClasses = mockClasses.filter(cls => cls.teacherId === user?.id);
  const teacherStudents = mockStudents.filter(student => 
    teacherClasses.some(cls => student.grade === cls.grade && student.section === cls.section)
  );
  
  const teacherAssignments = mockAssignments.filter(assignment => assignment.teacherId === user?.id);
  const todayAttendance = mockAttendance.filter(att => 
    att.date === new Date().toISOString().split('T')[0]
  );

  const presentToday = todayAttendance.filter(att => att.status === 'present').length;
  const totalStudentsToday = teacherStudents.length;
  
  const pendingSubmissions = teacherAssignments.reduce((acc, assignment) => {
    const totalStudents = teacherStudents.length;
    const submissions = assignment.submissions.length;
    return acc + (totalStudents - submissions);
  }, 0);

  const upcomingClasses = [
    { subject: 'Mathematics', class: '10th A', time: '09:00 AM', room: 'Room 101' },
    { subject: 'Statistics', class: '10th B', time: '10:30 AM', room: 'Room 102' },
    { subject: 'Mathematics', class: '11th A', time: '02:00 PM', room: 'Room 101' },
  ];

  const recentGrades = [
    { student: 'Alice Johnson', assignment: 'Quadratic Equations', grade: 'A', submitted: '2 hours ago' },
    { student: 'Bob Smith', assignment: 'Quadratic Equations', grade: 'A+', submitted: '3 hours ago' },
    { student: 'Carol Davis', assignment: 'Statistics Quiz', grade: 'B+', submitted: '1 day ago' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Here's an overview of your classes and students today.</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="My Classes"
          value={teacherClasses.length}
          icon="🏫"
          description="Active class sections"
        />
        
        <StatCard
          title="Total Students"
          value={teacherStudents.length}
          icon="👥"
          description="Students under my guidance"
        />
        
        <StatCard
          title="Attendance Today"
          value={`${presentToday}/${totalStudentsToday}`}
          change={{ value: 5, label: 'from yesterday', type: 'positive' }}
          icon="📅"
          description="Students present"
        />
        
        <StatCard
          title="Pending Reviews"
          value={pendingSubmissions}
          change={{ value: 2, label: 'from yesterday', type: 'negative' }}
          icon="📝"
          description="Assignments to grade"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your upcoming classes and activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((schedule, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">
                        {schedule.time.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{schedule.subject}</p>
                    <p className="text-xs text-gray-500">{schedule.class} • {schedule.room}</p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {schedule.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Grades */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>Latest student assignment submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentGrades.map((grade, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                      grade.grade.startsWith('A') ? 'bg-green-500' :
                      grade.grade.startsWith('B') ? 'bg-blue-500' :
                      grade.grade.startsWith('C') ? 'bg-orange-500' : 'bg-red-500'
                    }`}>
                      {grade.grade}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{grade.student}</p>
                    <p className="text-xs text-gray-500">{grade.assignment}</p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {grade.submitted}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Class Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Class Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Class Performance</CardTitle>
            <CardDescription>Average performance across your classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {teacherClasses.map((cls) => {
                const classStudents = mockStudents.filter(student => 
                  student.grade === cls.grade && student.section === cls.section
                );
                const avgGrade = 85; // Mock average
                
                return (
                  <div key={cls.id}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">{cls.name}</span>
                      <span className="text-sm text-gray-600">{classStudents.length} students</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-500">Average Grade</span>
                      <span className="text-xs font-semibold text-gray-700">{avgGrade}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${avgGrade}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used teaching tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 text-left bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="text-2xl mb-2">📝</div>
                <div className="text-sm font-medium text-gray-900">Take Attendance</div>
              </button>
              <button className="p-3 text-left bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <div className="text-2xl mb-2">📚</div>
                <div className="text-sm font-medium text-gray-900">Create Assignment</div>
              </button>
              <button className="p-3 text-left bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <div className="text-2xl mb-2">📊</div>
                <div className="text-sm font-medium text-gray-900">Grade Book</div>
              </button>
              <button className="p-3 text-left bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <div className="text-2xl mb-2">💬</div>
                <div className="text-sm font-medium text-gray-900">Message Parents</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle>Assignment Deadlines</CardTitle>
          <CardDescription>Upcoming assignment due dates and grading deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {teacherAssignments.slice(0, 3).map((assignment) => (
              <div key={assignment.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {assignment.subject}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{assignment.description}</p>
                <div className="text-xs text-gray-500">
                  Due: {new Date(assignment.dueDate).toLocaleDateString()}
                </div>
                <div className="mt-2 text-xs">
                  <span className="text-green-600">{assignment.submissions.length} submitted</span>
                  <span className="text-gray-400"> • </span>
                  <span className="text-orange-600">{teacherStudents.length - assignment.submissions.length} pending</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}