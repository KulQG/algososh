import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import css from "./stack-page.module.css";
import { InputAndButton } from "../ui/inputAndButton/InputAndButton";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => void;
  getSize: () => number;
  getElements: () => T[];
  clear: () => void;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    if (this.container.length !== 0) {
      this.container.pop();
    }
  };

  peak = (): T | null => {
    if (this.container.length === 0) {
      return null;
    }
    return this.container[this.container.length - 1];
  };

  clear = (): void => {
    this.container = [];
  };

  getSize = (): number => this.container.length;

  getElements = () => this.container;
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const StackPage: React.FC = () => {
  const [string, setString] = useState("");
  const [stack, setStack] = useState(new Stack<string>());
  const [arrStates, setArrStates] = useState<ElementStates[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setString(event.target.value);
  };

  const handleAddBtn = async () => {
    stack.push(string);
    setStack(stack);
    setArrStates([...arrStates, ElementStates.Changing]);
    await delay(500);
    setArrStates([...arrStates, ElementStates.Default]);
    setString("");
  };

  const handleRemoveBtn = async () => {
    if (stack.getSize() === 0) {
      return;
    }

    setArrStates([
      ...arrStates.slice(0, arrStates.length - 1),
      ElementStates.Changing,
    ]);
    await delay(1000);
    stack.pop();
    setStack(stack);
    setArrStates([...arrStates.slice(0, arrStates.length - 1)]);
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
            tail={`${index}`}
            head={"top"}
            letter={i}
            key={k}
            state={arrStates[index]}
          />
        );
      }
      return (
        <Circle tail={`${index}`} letter={i} key={k} state={arrStates[index]} />
      );
    });
  };

  return (
    <SolutionLayout title="Стек">
      <div className={css.wrap}>
        <div className={css.menu}>
          <InputAndButton
            placeholder=""
            value={string}
            isLimit={true}
            maxLength={4}
            btnText="Добавить"
            change={handleInputChange}
            click={handleAddBtn}
          >
            <Button text="Удалить" onClick={handleRemoveBtn} />
          </InputAndButton>
          <Button text="Очистить" onClick={handleClearBtn} />
        </div>
        <div className={css.circles}>{getCircles()}</div>
      </div>
    </SolutionLayout>
  );
};
