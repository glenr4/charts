// EMA=Price(t)×k+EMA(y)×(1−k)
// where:
// t=today
// y=yesterday
// N=number of days in EMA
// k=2÷(N+1)

const CalcEma = (series: number[], n: number): number[] => {
    const ema: number[] = new Array(series.length).fill(0);
    const k = 2 / (n + 1);

    for (var i = 1; i < series.length; i++) {
        ema[i] = series[i] * k + ema[i - 1] * (1 - k);
    }

    return ema;
}
export default CalcEma;