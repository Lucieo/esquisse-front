const millisToMinutesAndSeconds = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    if (!minutes) {
        return `${seconds} seconde${seconds > 1 ? 's' : ''}`;
    }
    if (seconds < 1) {
        return `${minutes}mn`;
    }
    return `${minutes}mn${(seconds < 10 ? '0' : '') + seconds}`;
}

export default millisToMinutesAndSeconds;
