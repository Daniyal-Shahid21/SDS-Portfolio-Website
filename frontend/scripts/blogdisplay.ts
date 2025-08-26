import { createBlogPostHTML, BlogPost } from "./blogTemplate.js";

let yearMonthMap: { [key: string]: string[] } = {};

document.addEventListener("DOMContentLoaded", () => {
    const containerM = document.getElementById("months") as HTMLSelectElement;
    const containerY = document.getElementById("years") as HTMLSelectElement;

    if (!containerM || !containerY) return;

    // Reset dropdowns when document reloads
    containerM.innerHTML = "";
    containerY.innerHTML = "";
    localStorage.removeItem("selectedYear");
    localStorage.removeItem("selectedMonth");

    // Create default placeholder options
    const defaultYear = document.createElement("option");
    defaultYear.value = "";
    defaultYear.textContent = "Select Year";
    defaultYear.disabled = true;
    defaultYear.selected = true;
    containerY.appendChild(defaultYear);

    const defaultMonth = document.createElement("option");
    defaultMonth.value = "";
    defaultMonth.textContent = "Select Month";
    defaultMonth.disabled = true;
    defaultMonth.selected = true;
    containerM.appendChild(defaultMonth);

    // Fetch available files and folders (Months and years)
    fetch('/JSONDir')
        .then(res => res.json())
        .then((data: { [year: string]: string[] }) => {
            yearMonthMap = data;

            // Populate years dropdown
            Object.keys(data).forEach((year) => {
                const option = document.createElement("option");
                option.value = year;
                option.textContent = year;
                containerY.appendChild(option);
            });

            // Once year is selected nested function
            containerY.addEventListener("change", () => {
                const selectedYear = containerY.value;
                localStorage.setItem("selectedYear", selectedYear);

                // Reset months dropdown
                containerM.innerHTML = "";

                const defaultMonth = document.createElement("option");
                defaultMonth.value = "";
                defaultMonth.textContent = "Select Month";
                defaultMonth.disabled = true;
                defaultMonth.selected = true;
                containerM.appendChild(defaultMonth);

                const months = yearMonthMap[selectedYear] || [];
                months.forEach((month) => {
                    const option = document.createElement("option");
                    option.value = month;
                    option.textContent = month;
                    containerM.appendChild(option);
                });
            });

            // Display content once month selected
            containerM.addEventListener("change", () => {
                const selectedMonth = containerM.value;
                const selectedYear = containerY.value;

                localStorage.setItem("selectedMonth", selectedMonth);

                if (!selectedMonth || !selectedYear) return;

                // Fetch blog post data
                fetch(`./scripts/blogData/${selectedYear}/${selectedMonth}.json`)
                    .then(res => res.json())
                    .then(data => {
                        const container = document.getElementById("blogContainer");
                        if (!container || !data.posts) return;

                        container.innerHTML = "";
                        data.posts.forEach((post: BlogPost) => {
                            container.innerHTML += createBlogPostHTML(post);
                        });
                    });
            });
        });
});
