// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

before(() => {
    // log in only once before any of the tests run.
    // your app will likely set some sort of session cookie.
    // you'll need to know the name of the cookie(s), which you can find
    // in your Resources -> Cookies panel in the Chrome Dev Tools.
    cy.login()
});

beforeEach(() => {
    // before each test, we can automatically preserve the
    // 'session_id' and 'remember_token' cookies. this means they
    // will not be cleared before the NEXT test starts.
    //
    // the name of your cookies will likely be different
    // this is an example
    Cypress.Cookies.preserveOnce('session_id', 'remember_token') 
    // spy console.error in browser
    cy.window().then((win) => {
        if ((win.console.error).restore) {
            (win.console.error).restore();
        }
        cy.spy(win.console, 'error');
    });   
});

afterEach( () => {
    // assert console.error
    cy.window().then((win) => {
        expect(win.console.error).to.have.callCount(0);
    });
});

Cypress.on('window:before:load', (win) => {
    win.fetch = null;
});
