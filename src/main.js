"use strict";

const url = "https://webbutveckling.miun.se/files/ramschema_ht24.json";
let courses = []; // Store all courses globally
let sortOrder = { code: 1, coursename: 1, progression: 1 }; // Track sorting order

window.onload = () => {
    loadCourses();
    setupSearch();
    setupSorting();
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

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredCourses = courses.filter(course =>
            course.code.toLowerCase().includes(searchTerm) ||
            course.coursename.toLowerCase().includes(searchTerm) ||
            course.progression.toLowerCase().includes(searchTerm)
        );
        displayCourses(filteredCourses);
    });
}

function setupSorting() {
    document.querySelectorAll("#course-table th").forEach((th, index) => {
        th.addEventListener("click", () => {
            let key = ["code", "coursename", "progression"][index]; // Determine sorting key
            sortOrder[key] *= -1; // Toggle sorting order
            courses.sort((a, b) => a[key].localeCompare(b[key]) * sortOrder[key]);
            displayCourses(courses);
        });
    });
}

