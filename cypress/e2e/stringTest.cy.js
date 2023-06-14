const circles = '.circles'

describe('string component works correctly', () => {
  before(() => {
    cy.visit('recursion');
  })

  it('disables add button when input is empty', () => {
    cy.get('input').clear();
    cy.contains('button', 'Развернуть').should('be.disabled');
  });

  const inputString = 'Hello';
  const reversedString = 'olleH';


  it('reverses the string correctly', () => {
    cy.visit('recursion');

    cy.get('input')
      .type(inputString)
      .should('have.value', inputString);

    cy.contains('button', 'Развернуть').click();

    cy.wait(1000)

    cy.get(circles).each((circle, index) => {
      const letter = reversedString.slice(index)

      const c = cy.wrap(circle)
      c.should('have.text', letter)
    })
  });

  it('animations works correctly', () => {
    cy.visit('recursion');

    cy.get('input')
      .type(inputString)
      .should('have.value', inputString);

    cy.contains('button', 'Развернуть').click();

    cy.wait(1000)

    cy.get(circles).children(0).should('have.class', 'changing')
    cy.get(circles).children(reversedString.length - 1).should('have.class', 'changing')

    cy.wait(1000)

    cy.get(circles).children(0).should('have.class', 'modified')
    cy.get(circles).children(reversedString.length - 1).should('have.class', 'modified')

    cy.get(circles).children(1).should('have.class', 'changing')
    cy.get(circles).children(reversedString.length - 2).should('have.class', 'changing')

    cy.wait(1000)

    cy.get(circles).children(1).should('have.class', 'modified')
    cy.get(circles).children(reversedString.length - 2).should('have.class', 'modified')

    cy.wait(1000)

    cy.get(circles).children(2).should('have.class', 'modified')
  })

  it ('algoritm finished correctly', () => {
    cy.visit('recursion');

    cy.get('input')
      .type(inputString)
      .should('have.value', inputString);

    cy.contains('button', 'Развернуть').click();

    cy.wait(1000 * reversedString.length).then(() => {

      cy.get(circles).children().each((circle, index) => {
        cy.wrap(circle).should('have.class', 'modified')
      })
    })
    
  })
})