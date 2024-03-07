var activitySelect = document.getElementById('activitySelect');
var startStopBtn = document.getElementById('startStopBtn');
var statusLabel = document.getElementById('statusLabel');
var activityLog = document.getElementById('activityLog');

var currentActivity = null;
var currentLogRow = null; // Store the current log row being added

startStopBtn.addEventListener('click', function() {
    if (currentActivity && currentActivity.startTime) {
        // Stop activity
        currentActivity.stopTime = new Date();
        updateLogRow(currentActivity); // Update the log row with the stop time
        saveLogsToLocalStorage(currentActivity); // Save the updated activity to Local Storage
        resetActivity();
        currentLogRow = null; // Reset the currentLogRow for the next activity
    } else {
        // Start activity
        if (activitySelect.value) {
            currentActivity = { startTime: new Date(), stopTime: null, name: activitySelect.value };
            startStopBtn.textContent = 'Stop Activity';
            startStopBtn.classList.add('active');
            statusLabel.textContent = currentActivity.name + ' Ongoing';
            statusLabel.classList.add('status-active');
            currentLogRow = insertLogRow(currentActivity); // This always creates a new row for a new activity
            startStopBtn.disabled = true;
            setTimeout(function() {
                startStopBtn.disabled = false;
            }, 1000);
        }
    }
});

function clearPreviousHighlights() {
    console.log('Current log row has highlight:', currentLogRow.classList.contains('highlight'));
    console.log('Clearing previous highlights...');
    // Query all highlighted rows and remove the highlight class from each
    document.querySelectorAll('.highlight').forEach(function(row) {
        row.classList.remove('highlight');
    });
}

function saveLogsToLocalStorage(activity) {
    var storedLogs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
    storedLogs.push(activity);
    localStorage.setItem('activityLogs', JSON.stringify(storedLogs));
}

function insertLogRow(activity) {
    clearPreviousHighlights(); // Ensure no rows are highlighted before adding a new one
    console.log('Inserting new log row and adding highlight...');
    var row = activityLog.insertRow();
    row.classList.add('highlight'); // Highlight the new row
    console.log('New log row highlight added:', row.classList.contains('highlight'));
    var startTimeCell = row.insertCell();
    startTimeCell.textContent = activity.startTime.toLocaleString();
    var stopTimeCell = row.insertCell();
    stopTimeCell.textContent = 'Ongoing...';
    var nameCell = row.insertCell();
    nameCell.textContent = activity.name;
    return row; // Keep track of the current highlighted row
}

function updateLogRow(activity) {
    if (currentLogRow) {
        console.log('Updating log row, removing highlight...');
        currentLogRow.cells[1].textContent = activity.stopTime.toLocaleString();
        currentLogRow.classList.remove('highlight'); // Ensure to remove highlight when activity stops
    } else {
        console.log('No current log row to update.');
    }
}


function logActivity(activity) {
    var row = activityLog.insertRow();
    var startTimeCell = row.insertCell();
    startTimeCell.textContent = activity.startTime.toLocaleString();
    var stopTimeCell = row.insertCell();
    stopTimeCell.textContent = activity.stopTime ? activity.stopTime.toLocaleString() : '';
    var nameCell = row.insertCell();
    nameCell.textContent = activity.name;
}

function resetActivity() {
    currentActivity = null;
    startStopBtn.textContent = 'Start Activity';
    startStopBtn.classList.remove('active');
    statusLabel.textContent = 'Activity Status: Idle';
    statusLabel.classList.remove('status-active'); // Reset the status text style
}



document.addEventListener('DOMContentLoaded', function() {
    loadInitialLogs(); // Call this if you're implementing log retrieval on load
});
