document.getElementById("addRow").addEventListener("click", function () {
  var table = document.getElementById("inputTable");
  var row = table.insertRow(-1);
  row.insertCell(0).innerHTML = '<input type="text" class="name">';
  row.insertCell(1).innerHTML = '<input type="number" class="regularHours">';
  row.insertCell(2).innerHTML = '<input type="number" class="overtimeHours">';
  row.insertCell(3).innerHTML = '<input type="number" class="minutes">';
});

document.getElementById("calculate").addEventListener("click", function () {
  var names = document.getElementsByClassName("name");
  var regularHours = document.getElementsByClassName("regularHours");
  var overtimeHours = document.getElementsByClassName("overtimeHours");
  var minutes = document.getElementsByClassName("minutes");
  var output = "名前,所定内時間(h),時間外時間(h),所定内/時間外時間(m),手当\n";
  for (var i = 0; i < names.length; i++) {
    var totalHours =
      parseFloat(regularHours[i].value) + parseFloat(overtimeHours[i].value);
    var totalMinutes = parseFloat(minutes[i].value);
    var result = Math.round(totalHours * 50 + totalMinutes * 0.8333);
    output +=
      names[i].value +
      "," +
      regularHours[i].value +
      "," +
      overtimeHours[i].value +
      "," +
      minutes[i].value +
      "," +
      result +
      "\n";
  }
  document.getElementById("output").value = output;
  downloadCSV(output);
});

function downloadCSV(csv) {
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  var link = document.createElement("a");
  var url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "output.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function downloadCSV(csv) {
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  var link = document.createElement("a");
  var url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "output.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
document.getElementById("clear").addEventListener("click", function () {
  document.getElementById("output").value = "";

  var table = document.getElementById("inputTable");

  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
});
document.getElementById("fileInput").addEventListener("change", function (e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function (e) {
    var contents = e.target.result;
    var names = contents.split(",");
    for (var i = 0; i < names.length; i++) {
      addRow(names[i].trim());
    }
  };
  reader.readAsText(file);
});

function addRow(name) {
  var table = document.getElementById("inputTable");
  var row = table.insertRow(-1);
  row.insertCell(0).innerHTML =
    '<input type="text" class="name" value="' + name + '">';
  row.insertCell(1).innerHTML = '<input type="number" class="regularHours">';
  row.insertCell(2).innerHTML = '<input type="number" class="overtimeHours">';
  row.insertCell(3).innerHTML = '<input type="number" class="minutes">';
}
