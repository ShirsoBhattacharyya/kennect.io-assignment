// Function to check if a number is prime
function isPrime(num) {
  delayTime();
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// Function to get prime numbers in a given range
function getPrimesInRange(start, end) {
  const primes = [];
  for (let num = start; num <= end; num++) {
    let start = Date.now();
    if (isPrime(num)) {
      let end = Date.now();
      let time = parseInt(end) - parseInt(start);
      primes.push({ num, time });
    }
  }
  return primes;
}

// Using this function to delay time to show proper results
function delayTime() {
  for (let i = 0; i < 10000000; i++) {}
}

function calculatePrimes() {
  const startTime = Date.now();
  const from = parseInt(document.getElementById("from").value);
  const to = parseInt(document.getElementById("to").value);
  const range = to + 1 - from;
  const primes = getPrimesInRange(from, to);
  const endTime = Date.now();
  const results = [];
  for (let num = from; num <= to; num++) {
    const primeCheckStartTime = Date.now();
    const isPrimeResult = isPrime(num);
    const primeCheckEndTime = Date.now();
    const primeCheckTime =
      parseInt(primeCheckEndTime) - parseInt(primeCheckStartTime);
    const result = {
      number: num,
      type: isPrimeResult ? "Prime" : "Normal",
      time: primeCheckTime,
    };
    results.push(result);
  }
  const timeToRun = parseInt(endTime) - parseInt(startTime);
  const avgTimePerNumber = timeToRun / range;

  document.getElementById("time-to-run").textContent =
    timeToRun.toFixed(2) + " ms";
  document.getElementById("avg-time-per-number").textContent =
    avgTimePerNumber.toFixed(4) + " ms";

  // Storing primes and results in a global variable accessible to the "Details" button.
  // PS: I could have used sessionStorage or localStorage as well but felt like using this.
  window.calculatedResults = results;
  window.calculatedPrimes = primes;
}

function createTablesForDetails() {
  const results = window?.calculatedResults || [];
  const primes = window?.calculatedPrimes || [];
  const from = parseInt(document.getElementById("from").value);
  const to = parseInt(document.getElementById("to").value);
  // Creating tables for details
  const detailsTable2b = createTable(
    ["Number", "Result", "Time(in ms)"],
    "Table 2B"
  );
  detailsTable2b.id = "details-table-2b";
  document.getElementById("details-popup").appendChild(detailsTable2b);

  const detailsTable2c = createTable(["Number", "Time(in ms)"], "Table 2C");
  detailsTable2c.id = "details-table-2c";
  document.getElementById("details-popup").appendChild(detailsTable2c);

  // Populating 2b table with existing data (2a and 2d are not recalculated)
  for (const result of results) {
    // For 2b table
    const row2b = detailsTable2b.insertRow();
    const cell2b1 = document.createElement("td");
    const cell2b2 = document.createElement("td");
    const cell2b3 = document.createElement("td");

    cell2b1.textContent = result?.number;
    cell2b2.textContent = result?.type;
    cell2b3.textContent = result?.time?.toFixed(2) + " ms";

    row2b.append(cell2b1, cell2b2, cell2b3);
  }

  // Populate 2c table with prime numbers and their respective times
  for (const prime of primes) {
    // For 2c table
    const row2c = detailsTable2c.insertRow();
    const cell2c1 = document.createElement("td");
    const cell2c2 = document.createElement("td");

    cell2c1.textContent = prime?.num;
    cell2c2.textContent = prime?.time?.toFixed(2) + " ms"; // Adjusting this based on the correct property name of time for prime numbers

    row2c.append(cell2c1, cell2c2);
  }

  applyTableStyles(detailsTable2b);
  applyTableStyles(detailsTable2c);
  // Showing the details popup
  document.getElementById("details-popup").style.display = "block";
}

function createTable(arr, title) {
  const table = document.createElement("table");
  const titleElem = document.createElement("h2");
  titleElem.textContent = title;
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  for (let item = 0; item < arr.length; item++) {
    const th = document.createElement("th");
    th.textContent = arr[item];
    headerRow.appendChild(th);
  }
  table.append(titleElem, headerRow, thead);

  return table;
}

function applyTableStyles(table) {
  // Applying dynamic styles to the table
  table.style.borderCollapse = "collapse";
  table.style.width = "80%";
  table.style.margin = "1rem auto";

  // Applying styles to header cells (th)
  const thElements = table.querySelectorAll("th");
  thElements.forEach((th) => {
    th.style.border = "1px solid #ddd";
    th.style.padding = "8px";
    th.style.textAlign = "left";
    th.style.backgroundColor = "#f2f2f2";
  });

  // Applying styles to data cells (td)
  const tdElements = table.querySelectorAll("td");
  tdElements.forEach((td) => {
    td.style.border = "1px solid #ddd";
    td.style.padding = "8px";
    td.style.textAlign = "left";
  });

  // Applying styles to rows
  const rowElements = table.getElementsByTagName("tr");
  for (let i = 0; i < rowElements.length; i++) {
    const row = rowElements[i];
    row.style.border = "1px solid #ddd";
  }
}

// Event listener for "Calculate" button
document
  .getElementById("calculate-button")
  .addEventListener("click", calculatePrimes);

// Event listener for "Details" button
document
  .getElementById("details-button")
  .addEventListener("click", createTablesForDetails);

// Event listener for "Close" button in the popup
document
  .getElementById("close-popup-button")
  .addEventListener("click", function () {
    document.getElementById("details-popup").style.display = "none";
    window.location.reload();
  });
