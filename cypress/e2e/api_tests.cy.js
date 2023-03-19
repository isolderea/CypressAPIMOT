/// <reference types="cypress" />
describe('template spec', () => {
  xit('passes', () => {
    cy.visit('https://restful-booker.herokuapp.com/ping')
  })

  it('First test', () => {
    cy.request("https://restful-booker.herokuapp.com/ping")
  })

  it('Get booking', () => {
    cy.request("https://restful-booker.herokuapp.com/booking").its('status').should('equal',200)
  })

  it('Create Booking', () => {
    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/booking',
      failOnStatusCode: false,
      body: {    "firstname" : "Jim",
      "lastname" : "Brown",
      "totalprice" : 111,
      "depositpaid" : true,
      "bookingdates" : {
          "checkin" : "2018-01-01",
          "checkout" : "2019-01-01"
      },
      "additionalneeds" : "Breakfast"}
  }).as('booking')
  //Validate status code
  cy.get('@booking').its('status').should('eq', 200)
  cy.get('@booking').then((response) => {
      cy.log(JSON.stringify(response.body))
  })
  })

  it('Delete booking', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://restful-booker.herokuapp.com/booking/1252',
      failOnStatusCode: false,
      'auth': {
        "username" : "admin",
        "password" : "password123"
      },
  }).as('details')
  //Validate response code
  cy.get('@details').its('status').should('eq', 201)
  cy.get('@details').then((response) => {
      cy.log(JSON.stringify(response.body))
  })

  })
})
