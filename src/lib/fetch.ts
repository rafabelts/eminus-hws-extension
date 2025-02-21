import { ACTIVITIES_PATH, COURSES_PATH } from "./const";
import { mapActivities } from "./map/activity";
import {  Activity, Course } from "./types";

const baseRequest = async <T>(
  token: string,
  path: string
): Promise<Array<T> | null> => {
  try {
    const apiResponse = await fetch(`https://eminus.uv.mx/${path}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "GET",
    });

    const rawText = await apiResponse.text();

    // valida q no este vacia la respuesta para parsear
    if (!rawText.trim()) {
      throw new Error("Empty response");
    }

    return JSON.parse(rawText) as Array<T>;
  } catch (error) {
    return [];
  }
};

export const getCourses = async (token: string): Promise<Array<Course>> => {
  try {
    const courses = await baseRequest<Course>(token, COURSES_PATH);

    if (!courses || courses.length == 0) {
      throw new Error("No courses found");
    }

    const currentCourses = courses.filter(
      (course) =>
        new Date(course.curso.fechaTermino) > new Date() &&
        course.curso.archivado == 0
    );

    return currentCourses;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getCourseActivities = async (
  token: string,
  courseId: number
): Promise<Array<Activity>> => {
  try {
    const activities = await baseRequest<Activity>(
      token,
      `${ACTIVITIES_PATH}/${courseId}`
    );

    if (!activities || activities.length == 0) {
      throw new Error("No activities found");
    }

    const dueAssignments: Array<Activity> = activities.filter((activity) => {
      return new Date(activity.fechaTermino) > new Date();
    });

    return mapActivities(dueAssignments);
  } catch (error) {
    return [];
  }
};

export const getAllActivities = async (token: string) => {
  try {
    const courses = await getCourses(token);

    let activities: Array<Activity> = [];

    for (const course of courses) {
      const courseActivity = await getCourseActivities(
        token,
        course.curso.idCurso
      );

      const activityWithCourse = courseActivity.map((activity) => ({
        ...activity,
        course: course.curso.nombre,
      }));

      activities.push(...activityWithCourse);
    }

    return activities.sort(
      (a, b) =>
        new Date(a.fechaTermino).getTime() - new Date(b.fechaTermino).getTime()
    );
  } catch (error) {
    return [];
  }
};
