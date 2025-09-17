
const moment = require('moment');
module.exports = {

    formatDateTime: (date = null, fromDate = null, toDate = null) => {
        //type : date,hour
        let diffDay;
        if (fromDate) {
            fromDate = moment(fromDate).format('YYYY-MM-DD HH:mm:ss');
        }
        if (toDate) {
            toDate = moment(toDate).format('YYYY-MM-DD HH:mm:ss');
        }
        if (toDate && fromDate) {
            const timeEndAndHour = (new Date(toDate)).getTime()
            const timeStartAndHour = (new Date(fromDate)).getTime()
            diffDay = Math.floor(((timeEndAndHour - timeStartAndHour) / 86400000) + 1);
        }
        let newDateTime = moment(date).format('YYYY/MM/DD HH:mm:ss');

        if (diffDay && diffDay > 1) {
            newDateTime = moment(date).format('DD/MM/YYYY');
        }
        // else {
        //     newDateTime = moment(date).format('HH:mm');
        // }
        return newDateTime;

    },
    calculatorWorkingTime: (startDate, endDate, includeWeekends = false) => {
        // Store minutes worked
        let minutesWorked = 0;

        startDate = new Date(startDate);
        endDate = new Date(endDate);
        // Validate input
        if (endDate < startDate) { return 0; }

        const configWorkingHours = [
            { hour: 9, minute: { start: 0,  end: 60 } },
            { hour: 10, minute: { start: 0,  end: 60 } },
            { hour: 11, minute: { start: 0,  end: 60 } },
            { hour: 12, minute: { start: 0,  end: 30 } },
            { hour: 13, minute: { start: 30,  end: 60 } },
            { hour: 14, minute: { start: 0,  end: 60 } },
            { hour: 15, minute: { start: 0,  end: 60 } },
            { hour: 16, minute: { start: 0,  end: 60 } },
            { hour: 17, minute: { start: 0,  end: 60 } }
        ];

        // Loop from your Start to End dates (by hour)
        let current = startDate;

        // Define work range
        let workHoursStart = configWorkingHours[0].hour,
            workHoursEnd = configWorkingHours[configWorkingHours.length - 1].hour;

        // Loop while currentDate is less than end Date (by minutes)
        while (current <= endDate) {
            let currentHour = current.getHours(),
                currentMinute = current.getMinutes();
            let workingHour = configWorkingHours.find((e) => e.hour === currentHour);
            if (typeof workingHour !== "undefined") {

                // Store the current time (with minutes adjusted)
                let currentTime = current.getHours() + (current.getMinutes() / 60);

                // Is the current time within a work day (and if it occurs on a weekend or not)
                if (currentTime >= workHoursStart && currentTime < workHoursEnd &&
                    (currentMinute >= workingHour.minute.start && currentMinute < workingHour.minute.end) &&
                    (includeWeekends ? current.getDay() !== 0 && current.getDay() !== 6 : true)) {
                    minutesWorked++;
                }
                // minutesWorked++;
                // Increment current time
            }
            current.setTime(current.getTime() + 1000 * 60);
        }

        return minutesWorked;
    }
}
