let pieChart, barChart, lineChart, histChart;

function generatePlan() {

    let sleep = +document.getElementById("sleep").value;
    let rest = +document.getElementById("rest").value;
    let play = +document.getElementById("play").value;
    let subjectsInput = document.getElementById("subjects").value;

    if (!subjectsInput) {
        alert("Enter subjects");
        return;
    }

    if (isNaN(sleep) || isNaN(rest) || isNaN(play)) {
        alert("Enter valid numbers");
        return;
    }

    let total = 24;
    let study = total - sleep - rest - play;

    if (study <= 0) {
        alert("Not enough time for study");
        return;
    }

    let subjects = subjectsInput.split(",");
    let perSubject = study / subjects.length;

    let labels = ["Sleep", "Rest", "Play"];
    let data = [sleep, rest, play];

    // TABLE
    let table = "<table><tr><th>Activity</th><th>Hours</th></tr>";

    subjects.forEach(s => {
        let sub = s.trim();
        labels.push(sub);
        data.push(perSubject);

        table += `<tr><td>${sub}</td><td>${perSubject.toFixed(2)}</td></tr>`;
    });

    table += `<tr><td>Sleep</td><td>${sleep}</td></tr>`;
    table += `<tr><td>Rest</td><td>${rest}</td></tr>`;
    table += `<tr><td>Play</td><td>${play}</td></tr>`;
    table += `<tr><td><b>Total Study</b></td><td><b>${study.toFixed(2)}</b></td></tr>`;
    table += "</table>";

    document.getElementById("tableOutput").innerHTML = table;

    // Destroy old charts
    if (pieChart) pieChart.destroy();
    if (barChart) barChart.destroy();
    if (lineChart) lineChart.destroy();
    if (histChart) histChart.destroy();

    // PIE
    pieChart = new Chart(document.getElementById("pieChart"), {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{ data: data }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // BAR
    barChart = new Chart(document.getElementById("barChart"), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{ label: "Hours", data: data }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // LINE
    lineChart = new Chart(document.getElementById("lineChart"), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{ label: "Trend", data: data }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // HISTOGRAM (bar-style)
    histChart = new Chart(document.getElementById("histChart"), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{ label: "Distribution", data: data }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}