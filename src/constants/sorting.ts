import { ElementStates } from "../types/element-states";
import { swap } from "./swap";

export type TCallBacks = {
  setIsActive: (b: boolean) => void;
  AscDeskSetSwitcher: (order: "asc" | "desc", boo: boolean) => void;
  setArrStates: (arr: ElementStates[]) => void;
  setRandomArray: (obj: { arr: number[] }) => void;
};

export const bubbleSort = async (
  order: "asc" | "desc",
  randomArray: { arr: number[] },
  cb?: TCallBacks
): Promise<void | number[]> => {
  if (randomArray.arr.length < 2) {
    return randomArray.arr;
  }

  if (cb) {
    // Код для функции обратного вызова, если она передана
    cb!.setIsActive(true);
    cb!.AscDeskSetSwitcher(order, true);

    const newColumns = [...randomArray.arr];

    let newStates: ElementStates[] = newColumns.map(
      () => ElementStates.Default
    );

    let i = 0;
    let j = newColumns.length - 1;

    const intervalId = setInterval(() => {
      if (i < j) {
        newStates[i] = ElementStates.Changing;
        newStates[i + 1] = ElementStates.Changing;

        const shouldSwap =
          order === "asc"
            ? newColumns[i] > newColumns[i + 1]
            : newColumns[i] < newColumns[i + 1];

        if (shouldSwap) {
          swap(newColumns, i, i + 1);

          cb!.setRandomArray({ arr: [...newColumns] });
          cb!.setArrStates([...newStates]);

          i++;
        } else {
          i++;
        }

        newStates[i - 1] = ElementStates.Default;
        newStates[i] = ElementStates.Modified;
      } else {
        clearInterval(intervalId);

        newStates = newColumns.map(() => ElementStates.Modified);

        cb!.setArrStates([...newStates]);
        cb!.setIsActive(false);
        cb!.AscDeskSetSwitcher(order, false);
      }

      if (i >= j) {
        i = 0;
        j--;
      }
    }, 250);
  } else {
    return new Promise<number[]>((resolve) => {
      const newColumns = [...randomArray.arr];

      let i = 0;
      let j = newColumns.length - 1;

      const intervalId = setInterval(() => {
        if (i < j) {
          const shouldSwap =
            order === "asc"
              ? newColumns[i] > newColumns[i + 1]
              : newColumns[i] < newColumns[i + 1];

          if (shouldSwap) {
            swap(newColumns, i, i + 1);

            i++;
          } else {
            i++;
          }
        } else {
          clearInterval(intervalId);
        }

        if (i >= j) {
          i = 0;
          j--;
        }

        if (i === 0 && j === 0) {
          resolve(newColumns);
        }
      }, 250);
    });
  }
};
