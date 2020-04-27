// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

/*-----------------------------------------------------------------
Login 
Login to odoo using user/ password
EX: cy.login()
-----------------------------------------------------------------*/

const user = Cypress.env("user")
const password = Cypress.env("password")
const path = "web/login"

Cypress.Commands.add("login", () => { 
    cy.visit(path)
    cy.wait(3000);
    cy.get('#login')
        .type(user)
    cy.get('#password')
        .type(password)
    cy.get('form').submit()
    cy.wait(5000);
})
  
/*-----------------------------------------------------------------
Logout 
EX: cy.Logout()
  -----------------------------------------------------------------*/
Cypress.Commands.add('logout', () => {
    cy.visit('web/session/logout')
})

/*-----------------------------------------------------------------
OpenMenu
Click to menu using Name and XML_ID for this menu
EX: cy.openMenu('Orders','sale.menu_sale_order')
-----------------------------------------------------------------*/
Cypress.Commands.add('openMenu', (menuName, xmlId) => {
    cy.get('[data-menu-xmlid="' + xmlId + '"]')
        .contains(menuName)
        .click({ force: true })
    cy.wait(4000)
})
  
/*-----------------------------------------------------------------
Button
Click to Button using button Name.
EX: cy.button('Create')
-----------------------------------------------------------------*/
Cypress.Commands.add('button', (buttonName) => {
    cy.contains('button', buttonName)
        .click({ force: true })
    cy.wait(1000)
})

/*-----------------------------------------------------------------
setValue
Set value for  field  (Fields : Char, Integer, Float,..)
EX: cy.setValue('name','Borni')
-----------------------------------------------------------------*/
Cypress.Commands.add('setValue', (fieldName, val, type) => {
    if (type == 'o2m') {
        cy.get('table.o_list_table').within(($listView) => {
            cy.get('input[name="' + fieldName + '"]')
                .should('have.attr', 'name', fieldName)
                .clear()
                .type(val)
                .should('have.value', val)
        })
    } else if (type === undefined) {
        cy.get('input[name="' + fieldName + '"]')
            .should('have.attr', 'name', fieldName)
            .clear()
            .type(val)
            .should('have.value', val)
    }
})

/*-----------------------------------------------------------------
dropDownSetValue
Set value for Many2one field  
params - field_name : name of field m2o
       - val : value of record you want select it
cy.dropDownSetValue('partner_id','Agrolait')
-----------------------------------------------------------------*/
Cypress.Commands.add('dropDownSetValue', (fieldName, val, output = val, type) => {
    cy.server()
    if (type == 'o2m') {
        cy.get('table.o_list_table').within(($listView) => {
            cy.get('div[name="' + fieldName + '"]')
                .find('input')
                .first()
                .type(val)
                .should('have.value', val)
        })
    } else if (type === undefined) {
        cy.get('div[name="' + fieldName + '"]')
            .find('input')
            .first()
            .type(val)
            .should('have.value', val)
    }
    cy.route('POST', '**name_search')
        .as(fieldName)
    cy.wait(`@${fieldName}`)
    cy.get('.ui-autocomplete>li.ui-menu-item')
        .should('be.visible')
        .contains(output)
        .click({ force: true }) //--> must seach a visible autocomplete
    cy.wait(500)
})
  
/*-----------------------------------------------------------------
Change Tab
Change tab using click to tab.
EX: cy.changeTab('Invoicing')
-----------------------------------------------------------------*/
Cypress.Commands.add('changeTab', (tabName) => {
    cy.get('.nav-tabs').within((tabs) => {
        cy.contains('a', tabName)
            .click({ force: true })
        cy.wait(500)
    })
})

/*-----------------------------------------------------------------
Add a product One2many Field
EX: cy.addProduct()
-----------------------------------------------------------------*/
Cypress.Commands.add('addProduct', () => {
    cy.server()
    cy.route('POST', '**default_get')
      .as('addProduct')
    cy.contains('a', 'Add a product')
      .click({ force: true })
    cy.wait('@addProduct')
})

/*-----------------------------------------------------------------
Preview Button
Click to Preview Button using button Name.
EX: cy.previewButton('Customer')
-----------------------------------------------------------------*/
Cypress.Commands.add('previewButton', (buttonName) => {
    cy.get('.o_stat_text')
        .contains(buttonName)
        .parent()
        .parent()
        .click({ force: true })
    cy.wait(1000)
})