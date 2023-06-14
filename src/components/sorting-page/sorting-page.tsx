import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import css from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { swap } from "../../constants/swap";
import { randomArr } from "../../constants/randomArr";
import { TCallBacks, bubbleSort } from "../../constants/sorting";

export const SortingPage: React.FC = () => {
  const [randomArray, setRandomArray] = useState<{ arr: number[] }>({
    arr: [],
  });
  const [showColumns, setShowColumns] = useState(false);
  const [method, setMethod] = useState<'selection' | 'bubble'>("selection");
  const [arrStates, setArrStates] = useState<ElementStates[]>([]);
  const [isActiveAsc, setIsActiveAsc] = useState(false);
  const [isActiveDesc, setIsActiveDesc] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isArray, setIsArray] = useState(false)

  const getColumns = () => {
    if (!showColumns) {
      return null;
    }

    return randomArray.arr.map((num, index) => {
      return <Column key={index} index={num} state={arrStates[index]} />;
    });
  };

  useEffect(() => {
    setShowColumns(true);
  }, [randomArray]);

  useEffect(() => {
    handleNewArray()
  }, [])

  const handleNewArray = () => {
    const newArr = randomArr();
    setRandomArray({ arr: newArr });
    setArrStates([]);
    setIsArray(true)
  };

  function AscDeskSetSwitcher(order: "asc" | "desc", boo: boolean) {
    order === "asc" ? setIsActiveAsc(boo) : setIsActiveDesc(boo);
  }

  const callBacks: TCallBacks = {
    setIsActive,
    AscDeskSetSwitcher,
    setArrStates,
    setRandomArray
  }

  const bubbleSorty = (order: 'asc' | 'desc') => {
    bubbleSort(order, randomArray, callBacks)
  }

  // const bubbleSorty = (order: "asc" | "desc") => {
  //   setIsActive(true);
  //   AscDeskSetSwitcher(order, true);

  //   const newColumns = [...randomArray.arr];

  //   let newStates: ElementStates[] = newColumns.map(
  //     () => ElementStates.Default
  //   );

  //   let i = 0;
  //   let j = newColumns.length - 1;

  //   const intervalId = setInterval(() => {
  //     if (i < j) {
  //       newStates[i] = ElementStates.Changing;
  //       newStates[i + 1] = ElementStates.Changing;

  //       const shouldSwap =
  //         order === "asc"
  //           ? newColumns[i] > newColumns[i + 1]
  //           : newColumns[i] < newColumns[i + 1];

  //       if (shouldSwap) {
  //         swap(newColumns, i, i + 1);

  //         setRandomArray({ arr: [...newColumns] });
  //         setArrStates([...newStates]);

  //         i++;
  //       } else {
  //         i++;
  //       }

  //       newStates[i - 1] = ElementStates.Default;
  //       newStates[i] = ElementStates.Modified;
  //     } else {
  //       clearInterval(intervalId);

  //       newStates = newColumns.map(() => ElementStates.Modified);

  //       setArrStates([...newStates]);
  //       setIsActive(false);
  //       AscDeskSetSwitcher(order, false);
  //     }

  //     if (i >= j) {
  //       i = 0;
  //       j--;
  //     }
  //   }, 250);
  // };

  const selectionSort = (order: "asc" | "desc") => {
    setIsActive(true);
    AscDeskSetSwitcher(order, true);

    const newColumns = [...randomArray.arr];
    let newStates: ElementStates[] = newColumns.map(
      () => ElementStates.Default
    );

    let i = 0;
    let j = 0;
    let current = 0;

    newStates[i] = ElementStates.Changing;
    setArrStates([...newStates]);

    const intervalId = setInterval(() => {
      if (j >= newColumns.length - 1) {
        if (
          order === "asc"
            ? newColumns[j] < newColumns[current]
            : newColumns[j] > newColumns[current]
        ) {
          newStates[current] = ElementStates.Default;
          current = j;
          setArrStates([...newStates]);
        }

        if (
          order === "asc"
            ? newColumns[current] < newColumns[i]
            : newColumns[current] > newColumns[i]
        ) {
          swap(newColumns, i, current);

          setRandomArray({ arr: [...newColumns] });
        }

        newStates[current] = ElementStates.Default;
        newStates[newColumns.length - 1] = ElementStates.Default;
        newStates[i] = ElementStates.Modified;

        i++;
        j = i;
        current = i;

        newStates[i] = ElementStates.Changing;
        setArrStates([...newStates]);
      } else if (
        order === "asc"
          ? newColumns[current] > newColumns[j]
          : newColumns[current] < newColumns[j]
      ) {
        if (j !== i) {
          newStates[j] = ElementStates.Default;
        }

        current = j;
        j++;

        newStates[j] = ElementStates.Changing;

        setArrStates([...newStates]);
      } else {
        if (j !== i) {
          newStates[j] = ElementStates.Default;
        }

        j++;

        newStates[j] = ElementStates.Changing;
        setArrStates([...newStates]);
      }

      if (i >= newColumns.length - 1) {
        newColumns[i] > newColumns[i + 1] && swap(newColumns, i, j);

        newStates[i] = ElementStates.Modified;
        newStates[i + 1] = ElementStates.Modified;

        setArrStates([...newStates]);

        setRandomArray({ arr: [...newColumns] });
        clearInterval(intervalId);

        setIsActive(false);
        AscDeskSetSwitcher(order, false);
      }
    }, 500);
  };

  const sorting = (comparison: "asc" | "desc") => {
    if (method === "bubble") {
      bubbleSorty(comparison);
    } else {
      selectionSort(comparison);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={css.wrap}>
        <div className={css.menu}>
          <div className={css.radio}>
            <RadioInput
              checked={method === "selection"}
              onClick={() => setMethod("selection")}
              label="Выбор"
              disabled={isActive || !isArray}
            />
            <RadioInput
              checked={method === "bubble"}
              onClick={() => setMethod("bubble")}
              label="Пузырек"
              disabled={isActive || !isArray}
            />
          </div>
          <div className={css.sortBtns}>
            <Button
              text="По возрастанию"
              onClick={() => sorting("asc")}
              sorting={Direction.Ascending}
              disabled={isActive || !isArray}
              isLoader={isActiveAsc}
            />
            <Button
              text="По убыванию"
              onClick={() => sorting("desc")}
              sorting={Direction.Descending}
              disabled={isActive || !isArray}
              isLoader={isActiveDesc}
            />
          </div>
          <Button
            extraClass={css.newArray}
            text="Новый массив"
            onClick={handleNewArray}
            disabled={isActive}
          />
        </div>
        <div className={css.columns}>{getColumns()}</div>
      </div>
    </SolutionLayout>
  );
};
