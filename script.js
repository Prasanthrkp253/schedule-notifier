const schedule = [
    { time: '6:00 AM', activity: 'Wake Up' },
    { time: '6:15 AM', activity: 'Coffee Break' },
    { time: '6:30 AM', activity: 'Exercise' },
    { time: '7:00 AM', activity: 'Shower and Get Ready' },
    { time: '7:30 AM', activity: 'Breakfast' },
    // Add the rest of your schedule here
];

function displaySchedule() {
    const scheduleDiv = document.getElementById('schedule');
    schedule.forEach(item => {
        const div = document.createElement('div');
        div.className = 'schedule-item';
        div.innerHTML = `<strong>${item.time}</strong> - ${item.activity}`;
        scheduleDiv.appendChild(div);
    });
}

function notifyMe(activity) {
    if (Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification('Schedule Reminder', {
                    body: activity,
                });
            }
        });
    } else {
        new Notification('Schedule Reminder', {
            body: activity,
        });
    }
}

function scheduleNotifications() {
    schedule.forEach(item => {
        const now = new Date();
        const timeParts = item.time.split(' ');
        const hourMinute = timeParts[0].split(':');
        let hour = parseInt(hourMinute[0]);
        const minute = parseInt(hourMinute[1]);

        if (timeParts[1] === 'PM' && hour !== 12) {
            hour += 12;
        } else if (timeParts[1] === 'AM' && hour === 12) {
            hour = 0;
        }

        const notificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);
        const timeout = notificationTime.getTime() - now.getTime();

        if (timeout > 0) {
            setTimeout(() => notifyMe(item.activity), timeout);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displaySchedule();
    if ('Notification' in window) {
        scheduleNotifications();
    } else {
        alert('This browser does not support notifications.');
    }
});
