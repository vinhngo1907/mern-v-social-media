const moment = require("moment-timezone");
class TimeUtil {
    static ToUnix(date) {
        return Math.floor(date.getTime() / 1000)
    }

    static expiredTimestamp(exp) {
        return TimeUtil.ToUnix(new Date()) > exp;
    }

    static getMinute(time) {
        const options = {
            timeZone: 'Asia/Ho_Chi_Minh'
        }
        const d = new Date(time).toLocaleString('vi-VN', options).split(":")
        const minute = Number(d[1])
        return minute
    }

    static getHours(time) {
        const options = {
            timeZone: 'Asia/Ho_Chi_Minh'
        }
        const d = new Date(time).toLocaleString('vi-VN', options).split(":")
        const hours = Number(d[0])

        return hours
    }
    static timeConverter = (date_start, time_start, type = 'no') => {
        const year = new Date(date_start * 1000).getFullYear();
        const month = new Date(date_start * 1000).getMonth();
        let day = new Date(date_start * 1000).getUTCDate();
        if (type == 'every_day') day = new Date(date_start * 1000).getDate() + 1;
        const hours = new Date(time_start * 1000).getHours();
        const minute = new Date(time_start * 1000).getMinutes();

        if (Number(hours) >= 16) {
            day = Number(day - 1)
        }

        const date = new Date(year, month, day, hours, minute);

        return this.formatTimeByTimeZone(date);
    };

    static formatTimeByTimeZone(date) {
        // const d = new Date();
        // const timeZone = d.getTimezoneOffset();

        // return date.getTime() + timeZone * 60 * 1000;
        return date.getTime();
    }

}

module.exports = new TimeUtil