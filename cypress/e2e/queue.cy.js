const circles = '.circles'

describe(('Queue testing'), () => {
    before(() => {
        cy.visit('queue');
    })

    it('disables add button when input is empty', () => {
        cy.get('input').clear();
        cy.contains('button', 'Добавить').should('be.disabled');
        cy.contains('button', 'Удалить').should('be.disabled');
        cy.contains('button', 'Очистить').should('be.disabled');
    });

    it('add delete reset', () => {
        cy.visit('queue');

        //add
        for (let i = 0; i < 3; i++) {
            cy.get('input').type(`${i}`);
            cy.contains('button', 'Добавить').click();

            cy.get(circles).children().eq(i).should('contain', `${i}`)
            cy.get(circles).children().eq(i).should('have.class', 'changing')
            cy.get(circles).children().eq(0).should('have.class', 'head')
            cy.get(circles).children().eq(i).should('have.class', 'tail')
            cy.wait(500)
        }

        //delete
        cy.contains('button', 'Удалить').click()
        cy.get(circles).children().eq(0).should('have.class', 'changing')
        cy.get(circles).children().eq(1).should('have.class', 'head')
        cy.get(circles).children().eq(2).should('have.class', 'tail')

        cy.wait(500)

        cy.get(circles).children().eq(0).should('have.class', 'default')
        cy.get(circles).children().eq(0).should('contain', '')

        //clean
        cy.contains('button', 'Очистить').click()
        cy.get(circles).children().each((circle) => {
            cy.wrap(circle).should('contain', '')
        })
    })
})