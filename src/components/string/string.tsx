import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import css from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { InputAndButton } from "../ui/inputAndButton/InputAndButton";
import { swap } from "../../constants/swap";

export const StringComponent: React.FC = () => {
  const [string, setString] = useState(""); // Строка введенная пользователем
  const [isActive, setIsActive] = useState(false); // Состояние разворота
  const [arrStr, setArrStr] = useState<string[]>([]); // Массив из входных символов
  const [arrStates, setArrStates] = useState<ElementStates[]>([]);

  // принимает данные из инпута
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setString(event.target.value);
  };

  // нажатие на кнопку
  const handleBtn = async () => {
    setIsActive(true);
    const newCircles = [...arrStr];

    let newStates: ElementStates[] = newCircles.map(
      () => ElementStates.Default
    ); // создаем массив состояний элементов массива, изначально все элементы имеют состояние Default

    let i = 0;
    let j = newCircles.length - 1;

    const intervalId = setInterval(() => {
      newStates[i] = ElementStates.Default;
      newStates[j] = ElementStates.Default;
      if (i < j) {
        swap(newCircles, i, j);

        newStates[i] = ElementStates.Changing;
        newStates[j] = ElementStates.Changing;

        setArrStr([...newCircles]); // Обновляем состояние массива arrStr с новым порядком элементов
        setArrStates([...newStates]); // Обновляем состояние массива arrStates с новыми состояниями элементов

        i++;
        j--;

        newStates[i - 1] = ElementStates.Modified;
        newStates[j + 1] = ElementStates.Modified;
      } else {
        clearInterval(intervalId);
        newStates = newCircles.map(() => ElementStates.Modified); // установим состояние Modified для всех элементов массива после завершения сортировки
        setArrStates([...newStates]); // Обновляем состояние массива arrStates с новыми состояниями элементов
        setIsActive(false);
      }
    }, 1000);
  };

  useEffect(() => {
    setArrStr(string.split("")); // Обновляем состояние массива arrStr с входными символами, разбитыми на массив
  }, [string]);

  const getCircles = (arr: string[]) => {
    return arr.map((l, index) => {
      const k = index;
      return <Circle state={arrStates[index]} key={k} letter={l} />;
    });
  };

  return (
    <SolutionLayout title="Строка">
      <div className={css.wrap}>
        <InputAndButton
          placeholder="Введите текст"
          isLimit={true}
          maxLength={11}
          btnText="Развернуть"
          loader={isActive}
          change={handleInputChange}
          click={handleBtn}
        />
        <div className={css.circles}>{getCircles(arrStr)}</div>
      </div>
    </SolutionLayout>
  );
};
