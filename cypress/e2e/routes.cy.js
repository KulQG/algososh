describe('app works correctly with routes', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });

  it('should open main page by default', function () {
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('should navigate to the recursion page', function () {
    cy.visit('http://localhost:3000/recursion');
    cy.contains('Строка');
  });

  it('should navigate to the fibonacci page', function () {
    cy.visit('http://localhost:3000/fibonacci');
    cy.contains('Фибоначчи');
  });

  it('should navigate to the list page', function () {
    cy.visit('http://localhost:3000/list');
    cy.contains('список');
  });

  it('should navigate to the queue page', function () {
    cy.visit('http://localhost:3000/queue');
    cy.contains('Очередь');
  });

  it('should navigate to the sorting page', function () {
    cy.visit('http://localhost:3000/sorting');
    cy.contains('Сортировка');
  });

  it('should navigate to the stack page', function () {
    cy.visit('http://localhost:3000/stack');
    cy.contains('Стек');
  });

});