export interface Subject {
  id: string;
  name: string;
  professor: string;
  schedule: string;
  totalClasses: number;
  attendedClasses: number;
  color: string;
  requiredClasses: number;
}

export interface SubjectFormData {
  name: string;
  professor: string;
  schedule: string;
  totalClasses: number;
}