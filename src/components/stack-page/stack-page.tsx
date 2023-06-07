import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import css from "./stack-page.module.css";
import { InputAndButton } from "../ui/inputAndButton/InputAndButton";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Stack } from "./stack";
import { delay } from "../../constants/delay";
import { Input } from "../ui/input/input";

export const StackPage: React.FC = () => {
  const [string, setString] = useState("");
  const [stack, setStack] = useState(new Stack<string>());
  const [arrStates, setArrStates] = useState<ElementStates[]>([]);

  const [isActive, setIsActive] = useState(false);
  const [isAddActive, setAddIsActive] = useState(false);
  const [isRemoveActive, setRemoveIsActive] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setString(event.target.value);
  };

  const handleAddBtn = async () => {
    setIsActive(true);
    setAddIsActive(true);

    stack.push(string);
    setStack(stack);
    setArrStates([...arrStates, ElementStates.Changing]);
    await delay(500);
    setArrStates([...arrStates, ElementStates.Default]);

    setString("");
    setIsActive(false);
    setAddIsActive(false);
  };

  const handleRemoveBtn = async () => {
    setRemoveIsActive(true);
    setIsActive(true);

    if (stack.getSize() === 0) {
      setRemoveIsActive(false);
      setIsActive(false);
      return;
    }

    const states = [...arrStates];
    states[stack.getElements().length - 1] = ElementStates.Changing;

    setArrStates([...states]);

    await delay(500);
    stack.pop();
    setStack(stack);
    setArrStates([...arrStates.slice(0, arrStates.length - 1)]);

    setRemoveIsActive(false);
    setIsActive(false);
  };

  const handleClearBtn = () => {
    const newStack = new Stack<string>();
    stack.clear();
    setStack(newStack);
  };

  const getCircles = () => {
    const stackArr = stack.getElements();
    const peakIndex = stack.getSize() - 1;

    if (stackArr.length < 1) return null;

    return stackArr.map((i, index) => {
      const k = index;
      if (peakIndex === index) {
        return (
          <Circle
            extraClass={`circle top ${arrStates[index]}`}
            tail={`${index}`}
            head={"top"}
            letter={i}
            key={k}
            state={arrStates[index]}
          />
        );
      }
      return (
        <Circle
          extraClass={`circle ${arrStates[index]}`}
          tail={`${index}`}
          letter={i}
          key={k}
          state={arrStates[index]}
        />
      );
    });
  };

  return (
    <SolutionLayout title="Стек">
      <div className={css.wrap}>
        <div className={css.menu}>
          <div className={css.main}>
            <Input
              placeholder="Введите текст"
              isLimitText={true}
              maxLength={4}
              onChange={handleInputChange}
              value={string}
            />
            <Button
              text="Добавить"
              type="button"
              isLoader={isAddActive}
              onClick={handleAddBtn}
              disabled={string === "" || isActive}
            />
            <Button
              isLoader={isRemoveActive}
              disabled={isActive || stack.getSize() === 0}
              text="Удалить"
              onClick={handleRemoveBtn}
            />
          </div>
          <Button
            disabled={isActive || stack.getSize() === 0}
            text="Очистить"
            onClick={handleClearBtn}
          />
        </div>
        <div className={`circles ${css.circles}`}>{getCircles()}</div>
      </div>
    </SolutionLayout>
  );
};
