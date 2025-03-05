export interface Course {
  payment_percentage: any;
  payment_goal: any;
  payment: any;
  attendance_percentage: any;
  id: string;
  name: string;
  instructor: string;
  startDate: string;
  endDate: string;
  finishedAt: string | null;
  finished_at: string | null;
  studentCount: number;
  student_count: number;
  sessionsCount: number;
  attendanceRate: number;
  collectedAmount: number;
  expectedAmount: number;
  paymentRate: number;
  alert: string | null;
  date: string;
  end_date: string;
  center: string;
  mode_of_instruction: string;
}
