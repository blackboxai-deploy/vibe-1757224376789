export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  address?: string;
  dateJoined: string;
}

export interface Student extends User {
  role: 'student';
  studentId: string;
  grade: string;
  section: string;
  rollNumber: number;
  parentId?: string;
  dateOfBirth: string;
  bloodGroup?: string;
  emergencyContact?: string;
  fees: {
    total: number;
    paid: number;
    pending: number;
    dueDate: string;
  };
  attendance: {
    present: number;
    absent: number;
    total: number;
    percentage: number;
  };
  grades: {
    [subject: string]: {
      assignments: number;
      tests: number;
      final: number;
      overall: string;
    };
  };
}

export interface Teacher extends User {
  role: 'teacher';
  teacherId: string;
  subjects: string[];
  classes: string[];
  qualifications: string[];
  experience: number;
  salary?: number;
  joiningDate: string;
}

export interface Parent extends User {
  role: 'parent';
  parentId: string;
  children: string[]; // Student IDs
  occupation?: string;
  relationship: 'Father' | 'Mother' | 'Guardian';
}

export interface Admin extends User {
  role: 'admin';
  adminId: string;
  permissions: string[];
  lastLogin: string;
}

export interface Class {
  id: string;
  name: string;
  grade: string;
  section: string;
  teacherId: string;
  teacherName: string;
  students: number;
  subjects: string[];
  schedule: {
    [day: string]: {
      subject: string;
      time: string;
      duration: number;
    }[];
  };
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  grade: string;
  teacherId: string;
  teacherName: string;
  credits: number;
  description?: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  teacherId: string;
  classId: string;
  dueDate: string;
  maxMarks: number;
  description: string;
  submissions: {
    studentId: string;
    submittedAt?: string;
    marks?: number;
    feedback?: string;
  }[];
}

export interface Attendance {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  remarks?: string;
}

export interface Fee {
  id: string;
  studentId: string;
  amount: number;
  type: 'tuition' | 'transport' | 'library' | 'laboratory' | 'other';
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue';
  description?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'academic' | 'sports' | 'cultural' | 'exam' | 'holiday';
  audience: UserRole[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  recipient: UserRole | 'all';
  date: string;
  read: boolean;
}