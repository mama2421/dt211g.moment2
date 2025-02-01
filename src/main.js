"use strict";

const url = "https://webbutveckling.miun.se/files/ramschema_ht24.json";
let courses = []; // Store all courses globally

window.onload = () => {
    loadCourses();
    setupSearch();
};

async function loadCourses() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        courses = await response.json(); // Store all courses
        displayCourses(courses); // Display all courses initially
    } catch (error) {
        console.error("Error fetching courses:", error);
    }
}

function displayCourses(coursesToDisplay) {
    const tableBody = document.getElementById("course-table").querySelector("tbody");

    // Clear any existing content in the table body
    tableBody.innerHTML = "";

    // Loop through the courses and create table rows
    coursesToDisplay.forEach(course => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${course.code}</td>
            <td>${course.coursename}</td>
            <td>${course.progression}</td>
        `;
        tableBody.appendChild(row);
    });
}

function setupSearch() {
    const searchInput = document.getElementById("search-input");

    // Add an event listener to the search input
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase(); // Get the search term
        const filteredCourses = courses.filter(course => {
            // Check if the course code, name, or progression matches the search term
            return (
                course.code.toLowerCase().includes(searchTerm) ||
                course.coursename.toLowerCase().includes(searchTerm) ||
                course.progression.toLowerCase().includes(searchTerm)
            );
        });
        displayCourses(filteredCourses); // Display the filtered courses
    });
}
