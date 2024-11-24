function approxDateConvertor(relativeTime: string): Date {
    const now = new Date();

    const timeUnits: { [key: string]: number } = {
        second: 1000, // milliseconds in a second
        minute: 60 * 1000, // milliseconds in a minute
        hour: 60 * 60 * 1000, // milliseconds in an hour
        day: 24 * 60 * 60 * 1000, // milliseconds in a day
        week: 7 * 24 * 60 * 60 * 1000, // milliseconds in a week
        month: 30 * 24 * 60 * 60 * 1000, // approx. milliseconds in a month
        year: 365 * 24 * 60 * 60 * 1000, // approx. milliseconds in a year
    };

    const match = relativeTime.match(/(\d+|a|an)?\s*(second|minute|hour|day|week|month|year)s?\s*ago/i);
    if (!match) {
        throw new Error(`Cannot parse relative time: "${relativeTime}"`)
    }

    const value = match[1] === 'a' || match[1] === 'an' ? 1 : parseInt(match[1], 10);
    const unit = match[2].toLowerCase();

    const elapsedMilliseconds = timeUnits[unit] * value;

    const resultDate = new Date(now.getTime() - elapsedMilliseconds);

    return resultDate;
}

export default approxDateConvertor;