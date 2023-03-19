/// <reference types="cypress" />

import user from '../fixtures/example.json'
describe('API plugin', () => {


  it('First test', () => {
    cy.api("https://restful-booker.herokuapp.com/ping")
  })

  it('Get booking', () => {
    cy.api("https://restful-booker.herokuapp.com/booking")
    .then( ({ status }) => {
      expect(status).to.eq(200)
  })
})

it('Create Booking', () => {
  cy.api({
    method: 'POST',
    url: 'https://restful-booker.herokuapp.com/booking',
    failOnStatusCode: false,
    body: {    "firstname" : user.firstname,
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"}
}).then(({body}) => {
  expect(body['booking']["firstname"]).to.eq("Jim")
})

})


xit('Delete booking', () => {
  cy.api({
    method: 'DELETE',
    url: 'https://restful-booker.herokuapp.com/booking/',
    failOnStatusCode: false,
    'auth': {
      "username" : "admin",
      "password" : "password123"
    },
}).then( ({ status }) => {
  expect(status).to.eq(201)
})

})
})
