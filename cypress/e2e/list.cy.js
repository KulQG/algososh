const circles = '.circles'
const headElement = 'headElement'
const tailElement = 'tailElement'
const circleText = '.text_type_circle'

describe(('List testing'), () => {
    before(() => {
        cy.visit('list');
    })

    it('disables add button when input is empty', () => {
        cy.get('[placeholder="Введите значение"]').clear();
        cy.get('[placeholder="Введите индекс"]').clear();
        cy.contains('button', 'Добавить в head').should('be.disabled');
        cy.contains('button', 'Удалить из tail').should('not.be.disabled');
        cy.contains('button', 'Удалить из head').should('not.be.disabled');
        cy.contains('button', 'Добавить по индексу').should('be.disabled');
        cy.contains('button', 'Удалить по индексу').should('be.disabled');

        cy.get('[placeholder="Введите значение"]').type('0');
        cy.contains('button', 'Добавить в head').should('not.be.disabled');
        cy.contains('button', 'Удалить из tail').should('not.be.disabled');

        cy.get('[placeholder="Введите значение"]').clear();
        cy.get('[placeholder="Введите индекс"]').type('1')
        cy.contains('button', 'Удалить по индексу').should('not.be.disabled');

        cy.get('[placeholder="Введите значение"]').type('0');
        cy.contains('button', 'Добавить по индексу').should('not.be.disabled');
    });

    it('default list', () => {
        cy.visit('list');

        cy.get(circles).children().should('have.length.within', 3, 6)

        let circlesLength;

        cy.get(circles)
            .children()
            .its('length')
            .then(length => {
                circlesLength = length;
            });

        cy.get(circles).children().each((circle, index) => {
            index === 0
                ? cy.wrap(circle).should('have.class', 'head')
                : cy.wrap(circle).should('not.have.class', 'head')

            index === circlesLength - 1
                ? cy.wrap(circle).should('have.class', 'tail')
                : cy.wrap(circle).should('not.have.class', 'tail')
        })
    })

    it('add to head', () => {
        cy.visit('list');

        cy.get(circles)
            .children()
            .its('length')
            .then(circlesLength => {
                cy.get('[placeholder="Введите значение"]').type('0');
                cy.contains('button', 'Добавить в head').click();

                cy.get(circles).children().eq(0).should('have.class', headElement);
                cy.wait(500);

                const expectedLength = circlesLength + 1;
                cy.get(circles).children().should('have.length', expectedLength);
                cy.get(circles).children().eq(0).should('not.have.class', headElement);
                cy.get(circleText).eq(0).should('have.text', '0');
            });
    });

    it('add to tail', () => {
        cy.visit('list');

        cy.get(circles)
            .children()
            .its('length')
            .then(circlesLength => {
                cy.get('[placeholder="Введите значение"]').type('0');
                cy.contains('button', 'Добавить в tail').click();

                cy.get(circles).children().eq(circlesLength - 1).should('have.class', headElement);
                cy.wait(500);

                const expectedLength = circlesLength + 1;
                cy.get(circles).children().should('have.length', expectedLength);
                cy.get(circles).children().eq(circlesLength - 1).should('not.have.class', headElement);
                cy.get(circleText).eq(circlesLength).should('have.text', '0');
            });
    });

    it('delete from tail', () => {
        cy.visit('list');

        cy.get(circles)
            .children()
            .its('length')
            .then(circlesLength => {
                cy.contains('button', 'Удалить из tail').click();

                cy.get(circles).children().eq(circlesLength - 1).should('have.class', tailElement);
                cy.wait(500);

                const expectedLength = circlesLength - 1;
                cy.get(circles).children().should('have.length', expectedLength);
                cy.get(circles).children().eq(circlesLength - 2).should('not.have.class', tailElement);
            });
    });

    it('delete from head', () => {
        cy.visit('list');

        cy.get(circles)
            .children()
            .its('length')
            .then(circlesLength => {
                cy.contains('button', 'Удалить из head').click();

                cy.get(circles).children().eq(0).should('have.class', tailElement);
                cy.wait(500);

                const expectedLength = circlesLength - 1;
                cy.get(circles).children().should('have.length', expectedLength);
                cy.get(circles).children().eq(0).should('not.have.class', tailElement);
            });
    });

    it('add to index', () => {
        cy.visit('list');

        cy.get(circles)
            .children()
            .its('length')
            .then(circlesLength => {
                cy.get('[placeholder="Введите значение"]').type('0');
                cy.get('[placeholder="Введите индекс"]').type(2)
                cy.contains('button', 'Добавить по индексу').click();

                for (let i = 0; i < 2; i++) {
                    cy.get(circles).children().eq(i).should('have.class', headElement);
                    cy.wait(500);
                    cy.get(circles).children().eq(i).should('not.have.class', headElement);
                }

                const expectedLength = circlesLength + 1;
                cy.get(circles).children().should('have.length', expectedLength);
                cy.get(circleText).eq(2).should('have.text', '0');
            });
    });

    it('delete to index', () => {
        cy.visit('list');

        cy.get(circles)
            .children()
            .its('length')
            .then(circlesLength => {
                cy.get('[placeholder="Введите индекс"]').type(2)
                cy.contains('button', 'Удалить по индексу').click();

                for (let i = 0; i < 2; i++) {
                    cy.get(circles).children().eq(i).should('have.class', 'changing')
                    cy.wait(500)
                }

                cy.get(circles).children().eq(2).should('have.class', tailElement);
                cy.wait(500);

                cy.get(circles).children().eq(2).should('not.have.class', tailElement);
                cy.get(circles).children().each((circle) => {
                    cy.wrap(circle).should('not.have.class', 'changing')
                })
                const expectedLength = circlesLength - 1;
                cy.get(circles).children().should('have.length', expectedLength);
            });
    });
})