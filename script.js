let postsWithDates = [];

function getRandomDate() {
  const start = new Date(2023, 0, 1);
  const end = new Date(2023, 11, 31);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function fetchData() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(data => {
      postsWithDates = data.map(post => {
        return {
          ...post,
          date: getRandomDate()
        };
      });
      displayData(postsWithDates);
    });
}

function displayData(dataArray) {
  const tbody = document.getElementById("dataBody");
  tbody.innerHTML = "";

  dataArray.forEach(post => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${post.id}</td>
      <td>${post.title}</td>
      <td>${formatDate(post.date)}</td>
    `;
    tbody.appendChild(tr);
  });
}

function filterByDate() {
  const start = new Date(document.getElementById("startDate").value);
  const end = new Date(document.getElementById("endDate").value);

  const filtered = postsWithDates.filter(post => {
    return post.date >= start && post.date <= end;
  });

  displayData(filtered);
}

fetchData();
