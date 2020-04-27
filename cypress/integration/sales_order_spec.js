describe('Sales Order', () => {

    context('Workflow Demo', () => { 

        it('Open Sales Menu', () => {
            cy.openMenu('Sales','sale.sale_menu_root') 
            cy.wait(3000)
        })

        it('Create Quotation', () => { 
            cy.button('Create')
            cy.wait(3000)

            cy.dropDownSetValue('partner_id', 'Azure Interior')
            
            // insert product
            cy.changeTab('Order Lines')
            cy.addProduct()
            cy.wait(1000)
            cy.dropDownSetValue('product_id', 'FURN_0006', undefined, 'o2m')
            cy.setValue('product_uom_qty', '10', 'o2m')
            cy.setValue('price_unit', '1000', 'o2m')
            cy.addProduct()
            cy.wait(1000)
            cy.dropDownSetValue('product_id', 'FURN_0003', undefined, 'o2m')
            cy.setValue('product_uom_qty', '10', 'o2m')
            cy.setValue('price_unit', '500', 'o2m')
            cy.addProduct()
            cy.wait(1000)
            cy.dropDownSetValue('product_id', 'E-COM06', undefined, 'o2m')
            cy.setValue('product_uom_qty', '10', 'o2m')
            cy.setValue('price_unit', '900', 'o2m')

            // save data
            cy.button('Save')
            cy.wait(1000)

        })

        it('Confirm Sales', () => {
            cy.button('Confirm') 
            cy.wait(1000)
        })

    })
    
})