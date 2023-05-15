class TimeUtil {
    static ToUnix(date) {
        return Math.floor(date.getTime() / 1000)
    }

    static expiredTimestamp(exp) {
        return TimeUtil.ToUnix(new Date()) > exp;
    }
}

module.exports = new TimeUtil