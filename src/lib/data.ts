import { Student, Teacher, Parent, Admin, Class, Subject, Assignment, Attendance, Fee, Event, Notification } from './types';

// Mock Users
export const mockStudents: Student[] = [
  {
    id: 'student1',
    name: 'Alice Johnson',
    email: 'alice.johnson@school.edu',
    role: 'student',
    studentId: 'STU001',
    grade: '10th',
    section: 'A',
    rollNumber: 1,
    parentId: 'parent1',
    dateOfBirth: '2008-03-15',
    dateJoined: '2020-04-01',
    bloodGroup: 'O+',
    phone: '+1234567890',
    address: '123 Oak Street, Springfield',
    emergencyContact: '+1234567891',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8cef4d7f-4ed2-409b-8a62-3077f4c69ee6.png',
    fees: {
      total: 5000,
      paid: 3500,
      pending: 1500,
      dueDate: '2024-02-15'
    },
    attendance: {
      present: 180,
      absent: 20,
      total: 200,
      percentage: 90
    },
    grades: {
      'Mathematics': { assignments: 85, tests: 88, final: 87, overall: 'A' },
      'English': { assignments: 92, tests: 89, final: 90, overall: 'A' },
      'Science': { assignments: 78, tests: 82, final: 80, overall: 'B+' },
      'History': { assignments: 88, tests: 85, final: 86, overall: 'A-' }
    }
  },
  {
    id: 'student2',
    name: 'Bob Smith',
    email: 'bob.smith@school.edu',
    role: 'student',
    studentId: 'STU002',
    grade: '10th',
    section: 'A',
    rollNumber: 2,
    parentId: 'parent2',
    dateOfBirth: '2008-07-22',
    dateJoined: '2020-04-01',
    bloodGroup: 'A+',
    phone: '+1234567892',
    address: '456 Pine Avenue, Springfield',
    emergencyContact: '+1234567893',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5caea2f1-83c0-44d8-b88e-b4dc658c3a88.png',
    fees: {
      total: 5000,
      paid: 5000,
      pending: 0,
      dueDate: '2024-02-15'
    },
    attendance: {
      present: 195,
      absent: 5,
      total: 200,
      percentage: 97.5
    },
    grades: {
      'Mathematics': { assignments: 95, tests: 92, final: 94, overall: 'A+' },
      'English': { assignments: 88, tests: 90, final: 89, overall: 'A' },
      'Science': { assignments: 91, tests: 94, final: 93, overall: 'A+' },
      'History': { assignments: 87, tests: 89, final: 88, overall: 'A' }
    }
  },
  {
    id: 'student3',
    name: 'Carol Davis',
    email: 'carol.davis@school.edu',
    role: 'student',
    studentId: 'STU003',
    grade: '9th',
    section: 'B',
    rollNumber: 15,
    parentId: 'parent3',
    dateOfBirth: '2009-01-10',
    dateJoined: '2021-04-01',
    bloodGroup: 'B+',
    phone: '+1234567894',
    address: '789 Elm Road, Springfield',
    emergencyContact: '+1234567895',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/561d1596-1765-4c49-8916-99c8effc98e8.png',
    fees: {
      total: 4500,
      paid: 2000,
      pending: 2500,
      dueDate: '2024-01-30'
    },
    attendance: {
      present: 175,
      absent: 25,
      total: 200,
      percentage: 87.5
    },
    grades: {
      'Mathematics': { assignments: 82, tests: 85, final: 84, overall: 'B+' },
      'English': { assignments: 90, tests: 88, final: 89, overall: 'A' },
      'Science': { assignments: 79, tests: 81, final: 80, overall: 'B+' },
      'History': { assignments: 85, tests: 87, final: 86, overall: 'A-' }
    }
  }
];

export const mockTeachers: Teacher[] = [
  {
    id: 'teacher1',
    name: 'Dr. Sarah Williams',
    email: 'sarah.williams@school.edu',
    role: 'teacher',
    teacherId: 'TCH001',
    subjects: ['Mathematics', 'Statistics'],
    classes: ['10th A', '10th B', '11th A'],
    qualifications: ['Ph.D. Mathematics', 'M.Sc. Statistics'],
    experience: 12,
    salary: 85000,
    joiningDate: '2012-08-15',
    dateJoined: '2012-08-15',
    phone: '+1234567896',
    address: '321 University Drive, Springfield',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ea11c0e1-7672-490a-a44b-e0ceabb05017.png'
  },
  {
    id: 'teacher2',
    name: 'Mr. James Anderson',
    email: 'james.anderson@school.edu',
    role: 'teacher',
    teacherId: 'TCH002',
    subjects: ['English Literature', 'Creative Writing'],
    classes: ['9th A', '9th B', '10th A'],
    qualifications: ['M.A. English Literature', 'B.Ed.'],
    experience: 8,
    salary: 72000,
    joiningDate: '2016-06-01',
    dateJoined: '2016-06-01',
    phone: '+1234567897',
    address: '654 Literary Lane, Springfield',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d656cf86-2f8e-4267-bcef-5cc84751c752.png'
  },
  {
    id: 'teacher3',
    name: 'Ms. Maria Rodriguez',
    email: 'maria.rodriguez@school.edu',
    role: 'teacher',
    teacherId: 'TCH003',
    subjects: ['Physics', 'Chemistry'],
    classes: ['10th A', '11th B', '12th A'],
    qualifications: ['M.Sc. Physics', 'B.Sc. Chemistry'],
    experience: 6,
    salary: 68000,
    joiningDate: '2018-08-20',
    dateJoined: '2018-08-20',
    phone: '+1234567898',
    address: '987 Science Boulevard, Springfield',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/62456249-2124-4272-9a08-7f90b55847f8.png'
  }
];

export const mockParents: Parent[] = [
  {
    id: 'parent1',
    name: 'Michael Johnson',
    email: 'michael.johnson@email.com',
    role: 'parent',
    parentId: 'PAR001',
    children: ['student1'],
    occupation: 'Software Engineer',
    relationship: 'Father',
    dateJoined: '2020-04-01',
    phone: '+1234567891',
    address: '123 Oak Street, Springfield',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/be246cc6-c12e-456a-8715-f74c53066e90.png'
  },
  {
    id: 'parent2',
    name: 'Jennifer Smith',
    email: 'jennifer.smith@email.com',
    role: 'parent',
    parentId: 'PAR002',
    children: ['student2'],
    occupation: 'Doctor',
    relationship: 'Mother',
    dateJoined: '2020-04-01',
    phone: '+1234567893',
    address: '456 Pine Avenue, Springfield',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/020c0fdc-229b-48b3-b056-a2e6b4937649.png'
  },
  {
    id: 'parent3',
    name: 'Robert Davis',
    email: 'robert.davis@email.com',
    role: 'parent',
    parentId: 'PAR003',
    children: ['student3'],
    occupation: 'Business Owner',
    relationship: 'Father',
    dateJoined: '2021-04-01',
    phone: '+1234567895',
    address: '789 Elm Road, Springfield',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e75d601c-f3c2-4695-a042-4df1c9fba436.png'
  }
];

export const mockAdmins: Admin[] = [
  {
    id: 'admin1',
    name: 'Principal Helen Carter',
    email: 'principal@school.edu',
    role: 'admin',
    adminId: 'ADM001',
    permissions: ['all'],
    lastLogin: '2024-01-15T08:30:00Z',
    dateJoined: '2010-01-01',
    phone: '+1234567899',
    address: '100 Education Center, Springfield',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9ddc647a-1418-4f3d-b168-986e0825cf42.png'
  }
];

export const mockClasses: Class[] = [
  {
    id: 'class1',
    name: '10th Grade Section A',
    grade: '10th',
    section: 'A',
    teacherId: 'teacher1',
    teacherName: 'Dr. Sarah Williams',
    students: 28,
    subjects: ['Mathematics', 'English', 'Science', 'History', 'Geography'],
    schedule: {
      Monday: [
        { subject: 'Mathematics', time: '09:00', duration: 45 },
        { subject: 'English', time: '09:50', duration: 45 },
        { subject: 'Science', time: '10:40', duration: 45 },
        { subject: 'History', time: '11:30', duration: 45 }
      ],
      Tuesday: [
        { subject: 'English', time: '09:00', duration: 45 },
        { subject: 'Mathematics', time: '09:50', duration: 45 },
        { subject: 'Geography', time: '10:40', duration: 45 },
        { subject: 'Science', time: '11:30', duration: 45 }
      ]
    }
  },
  {
    id: 'class2',
    name: '9th Grade Section B',
    grade: '9th',
    section: 'B',
    teacherId: 'teacher2',
    teacherName: 'Mr. James Anderson',
    students: 25,
    subjects: ['Mathematics', 'English', 'Science', 'History', 'Geography'],
    schedule: {
      Monday: [
        { subject: 'English', time: '09:00', duration: 45 },
        { subject: 'Mathematics', time: '09:50', duration: 45 },
        { subject: 'Science', time: '10:40', duration: 45 },
        { subject: 'Geography', time: '11:30', duration: 45 }
      ],
      Tuesday: [
        { subject: 'Mathematics', time: '09:00', duration: 45 },
        { subject: 'English', time: '09:50', duration: 45 },
        { subject: 'History', time: '10:40', duration: 45 },
        { subject: 'Science', time: '11:30', duration: 45 }
      ]
    }
  }
];

export const mockSubjects: Subject[] = [
  {
    id: 'subject1',
    name: 'Mathematics',
    code: 'MATH101',
    grade: '10th',
    teacherId: 'teacher1',
    teacherName: 'Dr. Sarah Williams',
    credits: 4,
    description: 'Advanced mathematics covering algebra, geometry, and basic calculus'
  },
  {
    id: 'subject2',
    name: 'English Literature',
    code: 'ENG101',
    grade: '10th',
    teacherId: 'teacher2',
    teacherName: 'Mr. James Anderson',
    credits: 3,
    description: 'Classical and modern literature with focus on critical analysis'
  },
  {
    id: 'subject3',
    name: 'Physics',
    code: 'PHY101',
    grade: '10th',
    teacherId: 'teacher3',
    teacherName: 'Ms. Maria Rodriguez',
    credits: 4,
    description: 'Fundamental physics concepts including mechanics and thermodynamics'
  }
];

export const mockAssignments: Assignment[] = [
  {
    id: 'assignment1',
    title: 'Quadratic Equations Practice',
    subject: 'Mathematics',
    teacherId: 'teacher1',
    classId: 'class1',
    dueDate: '2024-01-25',
    maxMarks: 100,
    description: 'Solve 20 quadratic equations using different methods',
    submissions: [
      { studentId: 'student1', submittedAt: '2024-01-20T10:30:00Z', marks: 85, feedback: 'Good work, minor calculation errors' },
      { studentId: 'student2', submittedAt: '2024-01-22T14:15:00Z', marks: 95, feedback: 'Excellent understanding of concepts' }
    ]
  },
  {
    id: 'assignment2',
    title: 'Shakespeare Essay Analysis',
    subject: 'English Literature',
    teacherId: 'teacher2',
    classId: 'class1',
    dueDate: '2024-01-28',
    maxMarks: 100,
    description: 'Write a 1000-word analysis of Hamlet Act III',
    submissions: [
      { studentId: 'student1', submittedAt: '2024-01-26T16:45:00Z', marks: 92, feedback: 'Insightful analysis with strong arguments' }
    ]
  }
];

export const mockAttendance: Attendance[] = [
  {
    id: 'att1',
    studentId: 'student1',
    classId: 'class1',
    date: '2024-01-15',
    status: 'present'
  },
  {
    id: 'att2',
    studentId: 'student2',
    classId: 'class1',
    date: '2024-01-15',
    status: 'present'
  },
  {
    id: 'att3',
    studentId: 'student1',
    classId: 'class1',
    date: '2024-01-16',
    status: 'absent',
    remarks: 'Sick leave'
  }
];

export const mockFees: Fee[] = [
  {
    id: 'fee1',
    studentId: 'student1',
    amount: 1500,
    type: 'tuition',
    dueDate: '2024-02-15',
    status: 'pending',
    description: 'Quarter 1 Tuition Fee'
  },
  {
    id: 'fee2',
    studentId: 'student2',
    amount: 5000,
    type: 'tuition',
    dueDate: '2024-02-15',
    paidDate: '2024-01-10',
    status: 'paid',
    description: 'Annual Tuition Fee'
  }
];

export const mockEvents: Event[] = [
  {
    id: 'event1',
    title: 'Annual Science Fair',
    description: 'Student science project exhibition and competition',
    date: '2024-03-15',
    time: '10:00 AM',
    type: 'academic',
    audience: ['student', 'teacher', 'parent']
  },
  {
    id: 'event2',
    title: 'Parent-Teacher Meeting',
    description: 'Quarterly academic progress discussion',
    date: '2024-02-20',
    time: '02:00 PM',
    type: 'academic',
    audience: ['teacher', 'parent']
  },
  {
    id: 'event3',
    title: 'Sports Day',
    description: 'Annual athletics and sports competition',
    date: '2024-04-10',
    time: '09:00 AM',
    type: 'sports',
    audience: ['student', 'teacher', 'parent', 'admin']
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    title: 'Fee Payment Reminder',
    message: 'Quarter 1 fees are due by February 15, 2024',
    type: 'warning',
    recipient: 'student',
    date: '2024-01-15T09:00:00Z',
    read: false
  },
  {
    id: 'notif2',
    title: 'New Assignment Posted',
    message: 'Mathematics assignment on Quadratic Equations has been posted',
    type: 'info',
    recipient: 'student',
    date: '2024-01-14T14:30:00Z',
    read: true
  },
  {
    id: 'notif3',
    title: 'Attendance Alert',
    message: 'Your child was absent today. Please contact the school if this is incorrect.',
    type: 'warning',
    recipient: 'parent',
    date: '2024-01-16T15:00:00Z',
    read: false
  }
];

// Helper functions to get data
export const getAllUsers = () => [
  ...mockStudents,
  ...mockTeachers,
  ...mockParents,
  ...mockAdmins
];

export const getUserById = (id: string) => {
  return getAllUsers().find(user => user.id === id);
};

export const getUserByEmail = (email: string) => {
  return getAllUsers().find(user => user.email === email);
};

export const getStudentsByGrade = (grade: string) => {
  return mockStudents.filter(student => student.grade === grade);
};

export const getClassesByTeacher = (teacherId: string) => {
  return mockClasses.filter(cls => cls.teacherId === teacherId);
};

export const getChildrenByParent = (parentId: string) => {
  const parent = mockParents.find(p => p.id === parentId);
  if (!parent) return [];
  return mockStudents.filter(student => parent.children.includes(student.id));
};