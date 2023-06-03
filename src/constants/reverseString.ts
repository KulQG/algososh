import { ElementStates } from "../types/element-states";
import { swap } from "./swap";

const reverseString = (arr: string[]) => {
  let i = 0;
  let j = arr.length - 1;

  while (i < j) {
    swap(arr, i, j);

    i++;
    j--;
  }

  return arr;
};

const reverseAlg = async (
  arr: string[],
  states: ElementStates[],
  setArrStates: (states: ElementStates[]) => void,
  setArrStr: (arr: string[]) => void,
  setIsActive: (b: boolean) => void
) => {
  if (arr.length < 1) {
    return arr;
  }

  let i = 0;
  let j = arr.length - 1;

  if (states) {
    const intervalId = setInterval(() => {
      states[i] = ElementStates.Default;
      states[j] = ElementStates.Default;
      if (i < j) {
        swap(arr, i, j);

        states[i] = ElementStates.Changing;
        states[j] = ElementStates.Changing;

        setArrStr([...arr]); // Обновляем состояние массива arrStr с новым порядком элементов
        setArrStates([...states]); // Обновляем состояние массива arrStates с новыми состояниями элементов

        i++;
        j--;

        states[i - 1] = ElementStates.Modified;
        states[j + 1] = ElementStates.Modified;
      } else {
        clearInterval(intervalId);
        states = arr.map(() => ElementStates.Modified); // установим состояние Modified для всех элементов массива после завершения сортировки
        setArrStates([...states]); // Обновляем состояние массива arrStates с новыми состояниями элементов
        setIsActive(false);
      }
    }, 1000);
  } else {
    reverseString(arr)
  }
};
