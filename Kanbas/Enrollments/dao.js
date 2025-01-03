import model from "./model.js";

export function enrollUserInCourse(user, course) {
  return model.create({ user, course });
}
export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}
export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}
export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}
export async function removeEnrollmentsForCourse(courseId) {
  return model.deleteMany({ course: courseId });
}
export async function removeEnrollmentsForUser(userId) {
  return model.deleteMany({ user: userId });
}