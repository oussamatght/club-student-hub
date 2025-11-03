export interface Student {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  profilePicture?: string;
  fieldOfStudy: string;
  university: string;
  matricule: string;
}

export type Club = {
  id?: string;
  clubName: string;
  clubEmail: string;
  clubPassword?: string;
  clubLogo?: string;
  clubType: string;
  clubDescription: string;
  university: string;
  membersCount?: number;
};

export interface Event {
  id?: string;
  eventName: string;
  eventStartDate: string;
  eventEndDate: string;
  eventType: string;
  eventLocation: string;
  eventDescription: string;
  clubId?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  description: string;
  postType: string;
  numberOfLikes: number;
  numberOfComments: number;
  studentId?: string;
  eventId?: string;
}