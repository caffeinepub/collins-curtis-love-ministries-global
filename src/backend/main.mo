import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Order "mo:core/Order";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  type Submission = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type PartnerInquiry = {
    name : Text;
    organization : Text;
    email : Text;
    partnerType : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type VolunteerApplication = {
    name : Text;
    email : Text;
    interests : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type ContactMessage = {
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type MentorshipApplication = {
    name : Text;
    email : Text;
    sessionType : {
      #free;
      #paid;
    };
    goals : Text;
    timestamp : Time.Time;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let prayerRequests = Map.empty<Text, Submission>();
  let partnerInquiries = Map.empty<Text, PartnerInquiry>();
  let volunteerApplications = Map.empty<Text, VolunteerApplication>();
  let contactMessages = Map.empty<Text, ContactMessage>();
  let mentorshipApplications = Map.empty<Text, MentorshipApplication>();

  module Submission {
    public func compare(a : Submission, b : Submission) : Order.Order {
      switch (Text.compare(a.name, b.name)) {
        case (#equal) { Int.compare(a.timestamp, b.timestamp) };
        case (order) { order };
      };
    };
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func submitPrayerRequest(name : Text, email : Text, message : Text) : async () {
    let submission : Submission = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    prayerRequests.add(name.concat(Time.now().toText()), submission);
  };

  public shared ({ caller }) func submitPartnerInquiry(name : Text, organization : Text, email : Text, partnerType : Text, message : Text) : async () {
    let inquiry : PartnerInquiry = {
      name;
      organization;
      email;
      partnerType;
      message;
      timestamp = Time.now();
    };
    partnerInquiries.add(name.concat(Time.now().toText()), inquiry);
  };

  public shared ({ caller }) func submitVolunteerApplication(name : Text, email : Text, interests : Text, message : Text) : async () {
    let application : VolunteerApplication = {
      name;
      email;
      interests;
      message;
      timestamp = Time.now();
    };
    volunteerApplications.add(name.concat(Time.now().toText()), application);
  };

  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, subject : Text, message : Text) : async () {
    let contact : ContactMessage = {
      name;
      email;
      subject;
      message;
      timestamp = Time.now();
    };
    contactMessages.add(name.concat(Time.now().toText()), contact);
  };

  public shared ({ caller }) func submitMentorshipApplication(name : Text, email : Text, sessionType : { #free; #paid }, goals : Text) : async () {
    let application : MentorshipApplication = {
      name;
      email;
      sessionType;
      goals;
      timestamp = Time.now();
    };
    mentorshipApplications.add(name.concat(Time.now().toText()), application);
  };

  public query ({ caller }) func getAllPrayerRequests() : async [Submission] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can access all prayer requests");
    };
    prayerRequests.values().toArray().sort();
  };

  public query ({ caller }) func getAllPartnerInquiries() : async [PartnerInquiry] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can access all partner inquiries");
    };
    partnerInquiries.values().toArray();
  };

  public query ({ caller }) func getAllVolunteerApplications() : async [VolunteerApplication] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can access all volunteer applications");
    };
    volunteerApplications.values().toArray();
  };

  public query ({ caller }) func getAllContactMessages() : async [ContactMessage] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can access all contact messages");
    };
    contactMessages.values().toArray();
  };

  public query ({ caller }) func getAllMentorshipApplications() : async [MentorshipApplication] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can access all mentorship applications");
    };
    mentorshipApplications.values().toArray();
  };
};
