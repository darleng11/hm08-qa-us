const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const pnoneNumberModal = await $(page.phoneNumberModal);
        await expect(pnoneNumberModal).toBeExisting();
    })

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    it('should set the address and display call taxi button', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const callATaxiButton = await $(page.callATaxiButton);
        await expect(callATaxiButton).toBeDisplayed();
    });
    
    it('should select the Supportive plan', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        const supportivePlanButton = await $(page.supportivePlanButton);
        const buttonClass = await supportivePlanButton.getAttribute('class');
        expect(buttonClass).toContain('active');
        
    });
    
    it('should add a credit card', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.openCreditCardModal('123567789345', '12');
        await browser.keys('Tab');
        const linkButton = await $(page.linkButton);
        const isLinkButtonEnabled = await linkButton.isEnabled();
        expect(isLinkButtonEnabled).toBe(true);
    });


    it('should write a message for the driver', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const message = "Please be quick!";
        await page.writeMessageForDriver(message);
        const messageField = await $(page.messageField);
        const enteredMessage = await messageField.getValue();
        expect(enteredMessage).toBe(message);
    });
    
    it('should order a blanket and handkerchiefs', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        await page.orderBlanketAndHandkerchiefs();
        const blanketStatus = await $(page.blanketAndHandKerchiefStatus);
        expect(blanketStatus).toBeChecked();
    });
    
    it('should order 2 ice creams', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        await page.orderIceCreams();

        const cartIceCreamCount = await $(page.cartIceCreamCount);
        const itemCountText = await cartIceCreamCount.getText();
        expect(itemCountText).toBe('2');
        
    });
    
    it('should wait for car search modal to appear', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectBusinessPlan();
        await page.searchForCar();
        await expect($(`${page.carSearchModal}`)).toBeExisting();
    });

})

