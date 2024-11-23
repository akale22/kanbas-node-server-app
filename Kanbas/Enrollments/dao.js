import Database from "../Database/index.js";

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  const enrollment = {
    _id: Date.now().toString(),
    user: userId,
    course: courseId,
  };
  enrollments.push(enrollment);
  return enrollment;
}

export function getEnrollmentsForUser(userId) {
  const { enrollments } = Database;
  return enrollments.filter((enrollment) => enrollment.user === userId);
}

export function deleteEnrollment(enrollmentId) {
  const { enrollments } = Database;
  Database.enrollments = enrollments.filter(
    (enrollment) => enrollment._id !== enrollmentId
  );
}
