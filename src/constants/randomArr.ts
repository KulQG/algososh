export function randomArr(minLen: number = 3, maxLen: number = 17): number[] {
  const len = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen; // определяем случайную длину массива
  const arr = new Array(len); // создаем массив указанной длины

  for (let i = 0; i < len; i++) {
    arr[i] = Math.floor(Math.random() * 101); // генерируем случайное число от 0 до 100
  }

  return arr;
}
