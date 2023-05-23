import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import css from "./list-page.module.css";
import { LinkedList } from "./list";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../constants/delay";
import { randomArr } from "../../constants/randomArr";
import { ArrowIcon } from "../ui/icons/arrow-icon";

export const ListPage: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [indexString, setIndexString] = useState<string>("");

  const [isActive, setIsActive] = useState(false);
  const [btns, setBtns] = useState({
    addHead: false,
    addTail: false,
    addIndex: false,
    delHead: false,
    delTail: false,
    delIndex: false,
  });

  const [list, setList] = useState(new LinkedList<string>(4));
  const [arrStates, setArrStates] = useState<ElementStates[]>([]);
  const [miniCircles, setMiniCircles] = useState<(string | undefined)[]>([]);
  const [downMiniCircles, setDownMiniCircles] = useState<
    (string | undefined)[]
  >([]);

  const len = list.getElements().length;

  const listCircles = list.getElements().map((l, index) => {
    if (miniCircles[index]) {
      return (
        <div className={css.circle}>
          <Circle
            head={
              <Circle
                state={ElementStates.Changing}
                isSmall
                letter={miniCircles[index]}
                key={index}
              />
            }
            key={index}
            letter={l}
            index={index}
            state={arrStates[index]}
          />
          {len - 1 !== index ? <ArrowIcon /> : null}
        </div>
      );
    }
    if (downMiniCircles[index]) {
      return (
        <div className={css.circle}>
          <Circle
            tail={
              <Circle
                state={ElementStates.Changing}
                isSmall
                letter={downMiniCircles[index]}
                key={index}
              />
            }
            key={index}
            letter={""}
            index={index}
            state={arrStates[index]}
          />
          {len - 1 !== index ? <ArrowIcon /> : null}
        </div>
      );
    }

    if (list.getElements().length - 1 === index) {
      return (
        <div className={css.circle}>
          <Circle
            tail="tail"
            key={index}
            letter={l}
            state={arrStates[index]}
            index={index}
          />
          {len - 1 !== index ? <ArrowIcon /> : null}
        </div>
      );
    }
    if (list.getHead()) {
      if (list.getHead()?.index === index) {
        return (
          <div className={css.circle}>
            <Circle
              head={"head"}
              key={index}
              letter={l}
              state={arrStates[index]}
              index={index}
            />
            {len - 1 !== index ? <ArrowIcon /> : null}
          </div>
        );
      }
    }
    return (
      <div className={css.circle}>
        <Circle key={index} letter={l} state={arrStates[index]} index={index} />
        {len - 1 !== index ? <ArrowIcon /> : null}
      </div>
    );
  });

  const handleInputValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(event.target.value);
  };

  const handleInputIndexChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIndexString(event.target.value);
  };

  const getCircles = () => {
    randomArr(3, 6).map((n) => {
      list.addAtTail(`${n}`);
    });
    setArrStates([...arrStates]);
  };

  useEffect(() => {
    getCircles();
  }, []);

  const addToHead = async () => {
    setIsActive(true);
    setBtns({ ...btns, addHead: true });

    miniCircles[0] = value;
    setMiniCircles([...miniCircles]);

    await delay(500);

    list.addAtHead(value);

    arrStates[0] = ElementStates.Modified;
    setArrStates([...arrStates]);

    setMiniCircles([]);

    await delay(500);

    arrStates[0] = ElementStates.Default;
    setArrStates([...arrStates]);

    setIsActive(false);
    setBtns(btns);
    setValue("");
  };

  const addToTail = async () => {
    setIsActive(true);
    setBtns({ ...btns, addTail: true });

    miniCircles[len - 1] = value;
    setMiniCircles([...miniCircles]);

    await delay(500);

    arrStates[len - 1] = ElementStates.Modified;
    setArrStates([...arrStates]);

    setMiniCircles([]);

    list.addAtTail(value);

    await delay(500);

    arrStates[len - 1] = ElementStates.Default;
    setArrStates([...arrStates]);

    setIsActive(false);
    setBtns(btns);
    setValue("");
  };

  const addToIndex = async () => {
    setIsActive(true);
    setBtns({ ...btns, addIndex: true });

    setArrStates([...arrStates]);
    setMiniCircles([value]);

    let i = 0;
    let end = +indexString;
    const intervalId = setInterval(() => {
      if (i < end) {
        arrStates[i] = ElementStates.Changing;
        miniCircles[i + 1] = value;
        miniCircles[i] = undefined;
        setArrStates([...arrStates]);
        setMiniCircles([...miniCircles]);
        i++;
      } else {
        clearInterval(intervalId);
        setMiniCircles([]);
        list.addAtIndex(+indexString, value);
        setArrStates([]);
        arrStates[+indexString] = ElementStates.Modified;
        setArrStates([...arrStates]);
        setTimeout(() => {
          setArrStates([]);
          setIsActive(false);
          setBtns(btns);
        }, 500);
        //arrStates[+indexString] = ElementStates.Default;
      }
    }, 500);
    setValue("");
    setIndexString("");
  };

  const deleteToHead = async () => {
    setIsActive(true);
    setBtns({ ...btns, delHead: true });

    downMiniCircles[0] = list.getElements()[0];
    setDownMiniCircles([...downMiniCircles]);

    await delay(500);

    list.removeAtHead();

    setDownMiniCircles([]);

    setIsActive(false);
    setBtns(btns);
  };

  const deleteToTail = async () => {
    setIsActive(true);
    setBtns({ ...btns, delTail: true });

    downMiniCircles[len - 1] = list.getElements()[len - 1];
    setDownMiniCircles([...downMiniCircles]);

    await delay(500);

    list.removeAtTail();
    setDownMiniCircles([]);

    setIsActive(false);
    setBtns(btns);
  };

  const deleteToIndex = async () => {
    setIsActive(true);
    setBtns({ ...btns, addIndex: true });

    setArrStates([...arrStates]);
    setMiniCircles([value]);

    let i = 0;
    let end = +indexString;
    const intervalId = setInterval(() => {
      if (i <= end) {
        arrStates[i] = ElementStates.Changing;
        downMiniCircles[i] = undefined;
        setArrStates([...arrStates]);
        setDownMiniCircles([...downMiniCircles]);

        i++;
      } else {
        clearInterval(intervalId);

        downMiniCircles[i - 1] = list.getElements()[i - 1];
        setDownMiniCircles([...downMiniCircles]);

        arrStates[i - 1] = ElementStates.Default;
        setArrStates([...arrStates]);

        setTimeout(() => {
          list.removeAtIndex(+indexString);
          setDownMiniCircles([]);
          setArrStates([]);
        }, 500);

        setTimeout(() => {
          arrStates[+indexString] = ElementStates.Default;
          setIsActive(false);
          setBtns(btns);
        }, 1000);
        setValue("");
        setIndexString("");
      }
    }, 500);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={css.wrap}>
        <div className={css.menu}>
          <Input
            isLimitText={true}
            maxLength={4}
            value={value}
            placeholder="Введите значение"
            onChange={handleInputValueChange}
          />
          <Button
            disabled={isActive || indexString !== "" || value === ""}
            isLoader={btns.addHead}
            onClick={addToHead}
            text={"Добавить в head"}
          />
          <Button
            disabled={isActive || indexString !== "" || value === ""}
            isLoader={btns.addTail}
            onClick={addToTail}
            text={"Добавить в tail"}
          />
          <Button
            disabled={isActive || value !== "" || indexString !== ""}
            isLoader={btns.delHead}
            onClick={deleteToHead}
            text={"Удалить в head"}
          />
          <Button
            disabled={isActive || value !== "" || indexString !== ""}
            isLoader={btns.delTail}
            onClick={deleteToTail}
            text={"Удалить из tail"}
          />
          <Input
            onChange={handleInputIndexChange}
            placeholder="Введите индекс"
            value={indexString}
          />
          <Button
            onClick={addToIndex}
            isLoader={btns.addIndex}
            extraClass={css.addToIndex}
            text={"Добавить по индексу"}
            disabled={isActive || value === "" || indexString === ""}
          />
          <Button
            onClick={deleteToIndex}
            isLoader={btns.delIndex}
            extraClass={css.delToIndex}
            text={"Удалить по индексу"}
            disabled={isActive || value !== "" || indexString === ""}
          />
        </div>
        <div className={css.circles}>{listCircles}</div>
      </div>
    </SolutionLayout>
  );
};
