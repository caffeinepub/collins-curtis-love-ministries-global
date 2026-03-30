import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MentorshipApplication {
    sessionType: Variant_free_paid;
    name: string;
    email: string;
    goals: string;
    timestamp: Time;
}
export interface VolunteerApplication {
    interests: string;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export type Time = bigint;
export interface ContactMessage {
    subject: string;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface PartnerInquiry {
    partnerType: string;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    organization: string;
}
export interface Submission {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_free_paid {
    free = "free",
    paid = "paid"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllContactMessages(): Promise<Array<ContactMessage>>;
    getAllMentorshipApplications(): Promise<Array<MentorshipApplication>>;
    getAllPartnerInquiries(): Promise<Array<PartnerInquiry>>;
    getAllPrayerRequests(): Promise<Array<Submission>>;
    getAllVolunteerApplications(): Promise<Array<VolunteerApplication>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactMessage(name: string, email: string, subject: string, message: string): Promise<void>;
    submitMentorshipApplication(name: string, email: string, sessionType: Variant_free_paid, goals: string): Promise<void>;
    submitPartnerInquiry(name: string, organization: string, email: string, partnerType: string, message: string): Promise<void>;
    submitPrayerRequest(name: string, email: string, message: string): Promise<void>;
    submitVolunteerApplication(name: string, email: string, interests: string, message: string): Promise<void>;
}
