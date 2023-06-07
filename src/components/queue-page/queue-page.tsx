import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InputAndButton } from "../ui/inputAndButton/InputAndButton";
import { Button } from "../ui/button/button";
import css from "./queue-page.module.css";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../constants/delay";
import { Queue } from "./queue";
import { Input } from "../ui/input/input";

const initialArrStates = [
  ElementStates.Default,
  ElementStates.Default,
  ElementStates.Default,
  ElementStates.Default,
  ElementStates.Default,
  ElementStates.Default,
  ElementStates.Default,
];

export const QueuePage: React.FC = () => {
  const [string, setString] = useState("");
  const [queue, setQueue] = useState(new Queue<string>(7));
  const [arrStates, setArrStates] = useState<ElementStates[]>(initialArrStates);

  const [isEnqueue, setIsEnqueue] = useState(false);
  const [isDequeue, setIsDequeue] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const [counter, setCounter] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setString(event.target.value);
  };

  const handleAddButton = async () => {
    setIsEnqueue(true);
    setIsActive(true);

    const arr = [...arrStates];
    const index = queue.getTail();
    queue.enqueue(string);
    arr[index] = ElementStates.Changing;
    setArrStates(arr);

    await delay(500);

    setArrStates(initialArrStates);
    setString("");

    setIsEnqueue(false);
    setIsActive(false);
    setCounter(counter + 1);
  };

  const handleRemoveBtn = async () => {
    setIsDequeue(true);
    setIsActive(true);

    const arr = [...arrStates];
    const index = queue.getHead();
    arr[index] = ElementStates.Changing;
    setArrStates(arr);

    await delay(500);

    queue.dequeue();
    setArrStates(initialArrStates);

    setIsDequeue(false);
    setIsActive(false);
    setCounter(counter - 1);
  };

  const handleClearBtn = () => {
    queue.clear();
    setCounter(0);
  };

  const getCircles = () => {
    const queueArr = queue.getElements();
    const headIndex = queue.getHead();
    const tailIndex = queue.getTail() - 1;

    const circles = Array.from({ length: 7 }, (_, index) => {
      const item = queueArr[index];
      const key = index;

      if (item) {
        if (index === headIndex && index !== tailIndex) {
          return (
            <Circle
              letter={item}
              head={"head"}
              key={key}
              index={index}
              state={arrStates[index]}
            />
          );
        } else if (index === tailIndex && index !== headIndex) {
          return (
            <Circle
              letter={item}
              key={key}
              tail={`tail`}
              index={index}
              state={arrStates[index]}
            />
          );
        } else if (index === tailIndex && index === headIndex) {
          return (
            <Circle
              letter={item}
              head={"head"}
              key={key}
              tail={`tail`}
              index={index}
              state={arrStates[index]}
            />
          );
        } else {
          return (
            <Circle
              letter={item}
              key={key}
              index={index}
              state={arrStates[index]}
            />
          );
        }
      } else {
        return <Circle key={key} tail={`${index}`} />;
      }
    });

    return circles;
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={css.wrap}>
        <div className={css.menu}>
          <div className={css.main}>
            <Input
              placeholder="Введите значение"
              isLimitText={true}
              maxLength={4}
              onChange={handleInputChange}
              value={string}
            />
            <Button
              text="Добавить"
              type="button"
              isLoader={isEnqueue}
              onClick={handleAddButton}
              disabled={string === "" || isActive}
            />
            <Button
              text="Удалить"
              disabled={isActive || counter < 1}
              isLoader={isDequeue}
              onClick={handleRemoveBtn}
            />
          </div>
          <Button
            text="Очистить"
            disabled={isActive || counter < 1}
            onClick={handleClearBtn}
          />
        </div>
        <div className={css.circles}>{getCircles()}</div>
      </div>
    </SolutionLayout>
  );
};
