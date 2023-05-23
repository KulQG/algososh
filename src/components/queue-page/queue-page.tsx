import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { InputAndButton } from "../ui/inputAndButton/InputAndButton";
import { Button } from "../ui/button/button";
import css from "./queue-page.module.css";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../constants/delay";

interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }

    this.container[this.tail % this.size] = item;
    this.tail = (this.tail + 1) % this.size;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    this.container[this.head % this.size] = null;
    this.head = (this.head + 1) % this.size;
    this.length--;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    return this.container[this.head % this.size];
  };

  getElements = () => this.container;

  getHead = (): number => {
    return this.head;
  };

  getTail = () => {
    if (this.tail === 0) return this.size;
    return this.tail;
  };

  clear = () => {
    this.container = [];
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };

  isEmpty = () => this.length === 0;
}

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
  const [string, setString] = useState(""); // строка
  const [queue, setQueue] = useState(new Queue<string>(7));
  const [arrStates, setArrStates] = useState<ElementStates[]>(initialArrStates);
  const [count, setCount] = useState(0);
  const [isEnqueue, setIsEnqueue] = useState(false);
  const [isDequeue, SetIsDequeue] = useState(false);
  const [isActive, setIsActive] = useState(false);

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
  };

  const handleRemoveBtn = async () => {
    SetIsDequeue(true);
    setIsActive(true);

    const arr = [...arrStates];
    const index = queue.getHead();
    arr[index] = ElementStates.Changing;
    setArrStates(arr);

    await delay(500);

    queue.dequeue();
    setArrStates(initialArrStates);

    SetIsDequeue(false);
    setIsActive(false);
  };

  const handleClearBtn = () => {
    queue.clear();
    setCount(count + 1);
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
          <InputAndButton
            placeholder="Введите значение"
            value={string}
            isLimit={true}
            maxLength={4}
            change={handleInputChange}
            click={handleAddButton}
            btnText="Добавить"
            loader={isEnqueue}
            disabled={isActive}
          >
            <Button
              text="Удалить"
              disabled={isActive}
              isLoader={isDequeue}
              onClick={handleRemoveBtn}
            />
          </InputAndButton>
          <Button
            text="Очистить"
            disabled={isActive}
            onClick={handleClearBtn}
          />
        </div>
        <div className={css.circles}>{getCircles()}</div>
      </div>
    </SolutionLayout>
  );
};
