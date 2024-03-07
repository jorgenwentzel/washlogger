var activitySelect = document.getElementById('activitySelect');
var startStopBtn = document.getElementById('startStopBtn');
var statusLabel = document.getElementById('statusLabel');
var activityLog = document.getElementById('activityLog');

var currentActivity = null;
var activities = []; // Array to hold activities for the current session

startStopBtn.addEventListener('click', function() {
    if (currentActivity && currentActivity.startTime) {
        // Stop activity
        currentActivity.stopTime = new Date();
        updateLogRow(currentActivity); // Update the log row with the stop time
        resetActivity();
    } else {
        // Start activity
        if (activitySelect.value) {
            currentActivity = { startTime: new Date(), stopTime: null, name: activitySelect.value };
            activities.push(currentActivity); // Add to session-based activities array
            startStopBtn.textContent = 'Stop Activity';
            startStopBtn.classList.add('active');
            statusLabel.textContent = currentActivity.name + ' Ongoing';
            statusLabel.classList.add('status-active');
            insertLogRow(currentActivity); // This always creates a new row for a new activity
            startStopBtn.disabled = true;
            setTimeout(function() {
                startStopBtn.disabled = false;
            }, 1000);
        }
    }
});

function clearPreviousHighlights() {
    document.querySelectorAll('.highlight').forEach(function(row) {
        row.classList.remove('highlight');
    });
}

function insertLogRow(activity) {
    clearPreviousHighlights(); // Ensure no rows are highlighted before adding a new one
    var row = activityLog.insertRow();
    row.classList.add('highlight'); // Highlight the new row
    var startTimeCell = row.insertCell();
    startTimeCell.textContent = activity.startTime.toLocaleString();
    var stopTimeCell = row.insertCell();
    stopTimeCell.textContent = 'Ongoing...';
    var nameCell = row.insertCell();
    nameCell.textContent = activity.name;
}

function updateLogRow(activity) {
    var rows = activityLog.getElementsByTagName('tr');
    if (rows.length > 0) {
        var lastRow = rows[rows.length - 1];
        lastRow.cells[1].textContent = activity.stopTime.toLocaleString();
        lastRow.classList.remove('highlight');
    }
}

function resetActivity() {
    currentActivity = null;
    startStopBtn.textContent = 'Start Activity';
    startStopBtn.classList.remove('active');
    statusLabel.textContent = 'Activity Status: Idle';
    statusLabel.classList.remove('status-active');
}

// Removed the functions related to local storage and logActivity since they are not needed in this revised approach
