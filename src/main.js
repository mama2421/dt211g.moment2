"use strict";

const url = "https://webbutveckling.miun.se/files/ramschema_ht24.json";

window.onload = () => {
    loadCourses();
};

async function loadCourses() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const courses = await response.json();
        displayCourses(courses); // Pass the data to the display function
    } catch (error) {
        console.error("Error fetching courses:", error);
    }
}

function displayCourses(courses) {
    const courseList = document.getElementById("course-list");

    // Clear any existing content in the list
    courseList.innerHTML = "";

    // Loop through the courses and create list items
    courses.forEach(course => {
        const listItem = document.createElement("li");
        listItem.classList.add("course-item"); // Add a class for styling
        listItem.innerHTML = `
            <div><strong>Kurskod:</strong> ${course.code}</div>
            <div><strong>Namn:</strong> ${course.coursename}</div>
            <div><strong>Progression:</strong> ${course.progression}</div>
        `;
        courseList.appendChild(listItem);
    });
}