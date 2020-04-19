import millisecondsToMinutesAndSeconds from '../millisToMinutesAndSeconds';

test('formate les millisecondes en minutes/secondes', () => {
    expect(millisecondsToMinutesAndSeconds(1000)).toEqual('1 seconde');
    expect(millisecondsToMinutesAndSeconds(2000)).toEqual('2 secondes');
    expect(millisecondsToMinutesAndSeconds(90000)).toEqual('1mn30');
    expect(millisecondsToMinutesAndSeconds(60000)).toEqual('1mn');
    expect(millisecondsToMinutesAndSeconds(120000)).toEqual('2mn');
})
