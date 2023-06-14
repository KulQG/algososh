const circles = '.circles'
const circle = '.circle'

describe('fibonacci component works correctly', () => {
  before(() => {
    cy.visit('fibonacci');
  })

  it('disables add button when input is empty', () => {
    cy.get('input').clear();
    cy.contains('button', 'Рассчитать').should('be.disabled');
  });

  it('calculates Fibonacci sequence correctly', () => {
    cy.visit('fibonacci');
    cy.get('input').type('6');
    cy.contains('button', 'Рассчитать').click();

    for (let i = 1; i < 6; i++) {
      cy.get(circles).children().should('have.length', i);
      cy.wait(500)
    }
    
    cy.get(circles).children(circle).eq(0).should('contain', '0');
    cy.get(circles).children(circle).eq(1).should('contain', '1');
    cy.get(circles).children(circle).eq(2).should('contain', '1');
    cy.get(circles).children(circle).eq(3).should('contain', '2');
    cy.get(circles).children(circle).eq(4).should('contain', '3');
    cy.get(circles).children(circle).eq(5).should('contain', '5');
    cy.get(circles).children(circle).eq(6).should('contain', '8');
  });
})