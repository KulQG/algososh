describe('app works correctly with routes', () => {
  before(() => {
    cy.visit('/');
  });

  it('should open main page by default', () => {
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('should navigate to the recursion page', () => {
    cy.visit('recursion');
    cy.contains('Строка');
  });

  it('should navigate to the fibonacci page', () => {
    cy.visit('fibonacci');
    cy.contains('Фибоначчи');
  });

  it('should navigate to the list page', () => {
    cy.visit('list');
    cy.contains('список');
  });

  it('should navigate to the queue page', () => {
    cy.visit('queue');
    cy.contains('Очередь');
  });

  it('should navigate to the sorting page', () => {
    cy.visit('sorting');
    cy.contains('Сортировка');
  });

  it('should navigate to the stack page', () => {
    cy.visit('stack');
    cy.contains('Стек');
  });

});