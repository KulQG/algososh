import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import css from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { swap } from "../../constants/swap";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { reverseAlg } from "../../constants/reverseString";

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

    reverseAlg(
      string.split(""),
      newStates,
      setArrStates,
      setArrStr,
      setIsActive
    );
    setString("");
  };

  useEffect(() => {
    setArrStr(string.split("")); // Обновляем состояние массива arrStr с входными символами, разбитыми на массив
  }, [string]);

  const getCircles = (arr: string[]) => {
    return arr.map((l, index) => {
      const k = index;
      return (
        <Circle
          extraClass={`${arrStates[index]}`}
          state={arrStates[index]}
          key={k}
          letter={l}
        />
      );
    });
  };

  return (
    <SolutionLayout title="Строка">
      <div className={css.wrap}>
        <div className={css.main}>
          <Input
            placeholder="Введите текст"
            isLimitText={true}
            maxLength={11}
            onChange={handleInputChange}
            value={string}
          />
          <Button
            text="Развернуть"
            type="button"
            isLoader={isActive}
            onClick={handleBtn}
            disabled={string === ""}
          />
        </div>
        <div className={`circles ${css.circles}`}>{getCircles(arrStr)}</div>
      </div>
    </SolutionLayout>
  );
};
