import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import css from "./fibonacci-page.module.css";
import { InputAndButton } from "../ui/inputAndButton/InputAndButton";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";

export const FibonacciPage: React.FC = () => {
  const [string, setString] = useState("");
  const [isActive, setIsActive] = useState(false);
  // Стейт для хранения последовательности Фибоначчи
  const [fibonacci, setFibonacci] = useState<number[]>([]);
  // Стейт для хранения количества элементов последовательности, которые будут отображены
  const [numToShow, setNumToShow] = useState(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setString(event.target.value)
  };

  const handleBtn = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsActive(true);
    const n: number = +string;

    // Алгоритм для вычисления последовательности Фибоначчи
    const arr: number[] = [0, 1];
    for (let i = 2; i < n + 1; i++) {
      arr.push(arr[i - 2] + arr[i - 1]);
    }
    setFibonacci(arr);
    setNumToShow(0);
  };

  // Эффект для постепенного отображения элементов последовательности Фибоначчи
  useEffect(() => {
    // Проверяем, активен ли алгоритм и не отображены ли все элементы последовательности
    if (isActive && numToShow < fibonacci.length) {
      setTimeout(() => {
        // Увеличиваем количество элементов, которые будут отображены
        setNumToShow(numToShow + 1);
      }, 500); // задержка в 1 секунду между отображением элементов
    } else {
      // Если все элементы последовательности отображены, то отключаем выполнение алгоритма
      setIsActive(false);
    }
  }, [isActive, numToShow, fibonacci]);

  const getCircles = () => {
    return fibonacci.slice(0, numToShow).map((num, index) => {
      return <Circle key={index} letter={`${num}`} tail={`${index}`} />;
    });
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={css.main}>
        <div className={css.inputButton}>
          <Input
            type="number"
            placeholder="Введите число n"
            isLimitText={true}
            max={19}
            onChange={handleInputChange}
            value={string}
          />
          <Button
            text="Развернуть"
            type="button"
            isLoader={isActive}
            onClick={handleBtn}
            disabled={string === "" || +string > 19}
          />
        </div>
        <div className={css.circles}>{getCircles()}</div>
      </div>
    </SolutionLayout>
  );
};
