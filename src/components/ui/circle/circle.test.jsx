import React from "react";
import renderer from "react-test-renderer";

import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe('Circle', () => {
    it('without text)', () => {
        const tree = renderer
            .create(<Circle />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('with text', () => {
        const tree = renderer
            .create(<Circle text='c4' />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('head, tail', () => {
        const tree = renderer
            .create(<Circle head={'text'} tail={'text'} />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('head, tail: components, isSmall', () => {
        const tree = renderer
            .create(<Circle head={<Circle isSmall />} tail={<Circle isSmall />} />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('index', () => {
        const tree = renderer
            .create(<Circle index={0} />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('the circle is rendered with correct state', () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Changing} />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('the circle is rendered with correct state', () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Default} />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('the circle is rendered with correct state', () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Modified} />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})