describe('Purchase Order', () => {

    context('Workflow Demo', () => { 

        it('Open Purchase Menu', () => {
            cy.openMenu('Purchase','purchase.menu_purchase_root') 
            cy.wait(3000)
        })

        it('Create RFQ', () => { 
            cy.button('Create')
            cy.wait(3000)

            cy.dropDownSetValue('partner_id', 'Azure Interior')
            
            // insert product
            cy.changeTab('Products')
            cy.addProduct()
            cy.wait(1000)
            cy.dropDownSetValue('product_id', 'FURN_0006', undefined, 'o2m')
            cy.setValue('product_qty', '20', 'o2m')
            cy.setValue('price_unit', '10000', 'o2m')
            cy.addProduct()
            cy.wait(1000)
            cy.dropDownSetValue('product_id', 'FURN_0003', undefined, 'o2m')
            cy.setValue('product_qty', '35', 'o2m')
            cy.setValue('price_unit', '5000', 'o2m')
            cy.addProduct()
            cy.wait(1000)
            cy.dropDownSetValue('product_id', 'E-COM06', undefined, 'o2m')
            cy.setValue('product_qty', '40', 'o2m')
            cy.setValue('price_unit', '9000', 'o2m')

            // save data
            cy.button('Save')
            cy.wait(1000)
            // confirm RFQ
            cy.button('Confirm Order') 
            cy.wait(1000)

        })

        it('Inbound Process', () => {
            cy.button('Receipt') 
            cy.wait(1000)
            cy.button('Validate') 
            cy.button('Apply') 
            cy.wait(1000)
        })

    })
    
})