import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from '@testing-library/react';
import { Button } from "./button";

describe('Button', () => {
  it("Кнопка рендерится без ошибок", () => {
    const tree = renderer
      .create(<Button />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Кнопка рендерится без ошибок", () => {
    const tree = renderer
      .create(<Button text="Кнопка" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Кнопка рендерится без ошибок", () => {
    const tree = renderer
      .create(<Button text="Кнопка" disabled />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Кнопка рендерится без ошибок", () => {
    const tree = renderer
      .create(<Button isLoader />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Коллбэк кнопки работает как надо', () => {
    const onClickMock = jest.fn()

    const { getByText } = render(<Button text="clickMe" onClick={onClickMock} />)
    const button = getByText('clickMe')

    fireEvent.click(button)
    expect(onClickMock).toHaveBeenCalledTimes(1);
  })

  test('Коллбек кнопки работает как надо', () => {
    const onClickMock = jest.fn()

    const { getByText } = render(<Button text="clickMe" onClick={onClickMock} />)
    const button = getByText('clickMe')

    fireEvent.click(button)
  })

  test('Тест вызова алерта', () => {
    const alertMock = jest.fn();
    window.alert = alertMock;

    const { getByText } = render(
      <Button onClick={() => window.alert('Button clicked!')} text="Click me" />
    );

    const button = getByText('Click me');
    fireEvent.click(button);

    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith('Button clicked!');

    window.alert = globalThis.alert;
  });
})

