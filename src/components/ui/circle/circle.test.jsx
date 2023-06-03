import React from "react";
import renderer from "react-test-renderer";

import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe('Circle', () => {
    it('the circle is rendered without errors (without text)', () => {
        const tree = renderer
            .create(<Circle />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('the circle is rendered without errors (with text)', () => {
        const tree = renderer
            .create(<Circle text='c4' />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('the circle is rendered without errors (head, tail) ', () => {
        const tree = renderer
            .create(<Circle head={'text'} tail={'text'} />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('the circle is rendered without errors (head, tail: components)', () => {
        const tree = renderer
            .create(<Circle head={<Circle isSmall />} tail={<Circle isSmall />} />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('the circle is rendered without errors (index)', () => {
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