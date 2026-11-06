const WEEKDAYS = [
  ["S", "Sunday"],
  ["M", "Monday"],
  ["T", "Tuesday"],
  ["W", "Wednesday"],
  ["T", "Thursday"],
  ["F", "Friday"],
  ["S", "Saturday"],
] as const;

// April 2027 starts on a Thursday and has 30 days.
const FIRST_WEEKDAY = 4;
const DAYS_IN_MONTH = 30;
const WEDDING_DAY = 26;

function weeks() {
  const cells: (number | null)[] = [
    ...Array<null>(FIRST_WEEKDAY).fill(null),
    ...Array.from({ length: DAYS_IN_MONTH }, (_, i) => i + 1),
  ];
  while (cells.length % 7) cells.push(null);
  return Array.from({ length: cells.length / 7 }, (_, w) => cells.slice(w * 7, w * 7 + 7));
}

export function MonthCalendar() {
  return (
    <table className="month">
      <caption className="month__caption caps">April 2027</caption>
      <thead>
        <tr>
          {WEEKDAYS.map(([short, long]) => (
            <th key={long} scope="col">
              <abbr title={long}>{short}</abbr>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weeks().map((week, w) => (
          <tr key={w}>
            {week.map((day, d) =>
              day === WEDDING_DAY ? (
                <td key={d} className="month__day month__day--wedding">
                  <span aria-label="26, the wedding day">{day}</span>
                  <svg className="month__ring" viewBox="0 0 64 56" aria-hidden="true" focusable="false">
                    <path
                      pathLength={1}
                      d="M37 6c-14-2-29 5-31 19-2 13 10 24 25 24s27-9 27-22C58 14 46 5 31 7 22 8 15 12 12 17"
                    />
                  </svg>
                </td>
              ) : (
                <td key={d} className="month__day">
                  {day}
                </td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
