// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['The Haunting of Bly Manor', 'You', 'Stranger Things', 'Friends'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

async function showMessage() {
  const responseFromServer = await fetch('/hello');
  const myObject = await responseFromServer.json();
  const randomFact = myObject[Math.floor(Math.random() * myObject.length)];
  const helloWorldContainer = document.getElementById('hello-world-container');
  helloWorldContainer.innerText = randomFact;
}

/** Week 3: Fetches coronavirus statistics and uses it to create a bar chart. */
function drawChart() {
  fetch('/coronavirus-data').then(response => response.json())
  .then((coronavirusData) => {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Industry');
    data.addColumn('number', 'Percent change in time spent per user session');
    Object.keys(coronavirusData).forEach((industry) => {
      data.addRow([industry, coronavirusData[industry]]);
    });

    const options = {
      'title': 'Coronavirus Impact on Time Spent Per Online User Session in Selected Industries Worldwide in Week Ending April 26, 2020',
      'width':600,
      'height':500
    };

    const chart = new google.visualization.BarChart(
        document.getElementById('chart-container'));
    chart.draw(data, options);
  });
}