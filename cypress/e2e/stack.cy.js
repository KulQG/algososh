describe(('Stack testing'), () => {
    before(() => {
        cy.visit('http://localhost:3000/stack');
    })

    it('disables add button when input is empty', () => {
        cy.get('input').clear();
        cy.contains('button', 'Добавить').should('be.disabled');
        cy.contains('button', 'Удалить').should('be.disabled');
        cy.contains('button', 'Очистить').should('be.disabled');
    });

    it('add delete reset', () => {
        cy.visit('http://localhost:3000/stack');
        let circlesLength;

        //add

        for (let i = 0; i < 3; i++) {
            cy.get('input').type(`${i}`);
            cy.contains('button', 'Добавить').click();
            cy.get('.circles')
                .children()
                .its('length')
                .then(length => {
                    circlesLength = length;
                });

            cy.get('.circles').children().eq(i).should('have.class', 'changing')
            cy.wait(500)
            cy.get('.circles').children().eq(i).should('have.class', 'default')
            cy.get('.circles').children().eq(i).should('have.class', 'top')
            cy.get('.circles').children().should('have.length', i + 1)
        }

        //delete
        cy.get('.circles')
            .children()
            .its('length')
            .then(circlesLength => {
                cy.contains('button', 'Удалить').click();
                cy.get('.circles').children().eq(circlesLength - 1).should('have.class', 'changing')
                cy.wait(500)
                cy.get('.circles').children().should('have.length', circlesLength - 1);
            });

        //clear
        cy.contains('button', 'Очистить').click();
        cy.get('.circles').children().should('have.length', 0);
    })
})