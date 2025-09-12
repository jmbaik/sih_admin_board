export function tryParseInt(value: string | undefined, radix: number = 10, defaultValue: number = 0): number {
  if (value === undefined || value.trim() === "") {
    return defaultValue; // 빈 문자열이나 undefined인 경우 기본값 반환
  }

  const parsedValue = parseInt(value, radix);

  if (isNaN(parsedValue)) {
    return defaultValue; // 파싱 실패 시 기본값 반환
  } else {
    return parsedValue; // 파싱 성공 시 파싱된 값 반환
  }
}

export function parseYouTubeDuration(duration: string): number {
  let seconds = 0;
  const part = duration.match(/P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (part) {
    seconds += part[1] ? parseInt(part[1]) * 24 * 60 * 60 : 0; // 일
    seconds += part[2] ? parseInt(part[2]) * 60 * 60 : 0; // 시간
    seconds += part[3] ? parseInt(part[3]) * 60 : 0; // 분
    seconds += part[4] ? parseInt(part[4]) : 0; // 초
  }
  return seconds;
}

// const durationString = "PT15M33S";
// const totalSeconds = parseYouTubeDuration(durationString); // 결과: 933 (15 * 60 + 33)
// console.log(totalSeconds);

export function secondToTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // 두 자릿수로 표시하기 위해 앞자리에 '0'을 붙입니다.
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// console.log(secondToTime(3662)); // 출력: "01:01:02"
// console.log(secondToTime(7200)); // 출력: "02:00:00"

export function arraySplit50(arr: string[]): string[][] {
  let result: Array<string[]> = [];
  const total = arr.length;
  if (arr.length <= 50) {
    return [arr];
  }
  // 나머지 구함
  let tmp: string[] = [];
  for (let idx = 0; idx < arr.length; idx++) {
    const item = arr[idx];
    const remains = total - (idx + 1);
    if (idx === 0) tmp.push(item);
    if (idx !== 0) {
      tmp.push(item);
      if (remains === 0) {
        result.push(tmp);
      } else if ((idx + 1) % 50 === 0) {
        result.push(tmp);
        tmp = [];
      }
    }
  }
  return result;
}
