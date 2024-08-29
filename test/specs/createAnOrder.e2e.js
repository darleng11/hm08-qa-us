const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should open phone number modal', async () => {
        console.log('Running test: should open phone number modal');
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

    it('should add a credit card', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.openCreditCardModal();

        const cardDetails = {
            number: '4111111111111111',
            expiry: '12/24',
            cvv: '123'
        };

        await page.fillCreditCardForm(cardDetails);
        await page.blurCardCvv();

        const linkButton = await $(page.linkButton);
        await expect(linkButton).toBeClickable();
        await linkButton.click();
    });

    it('should order a blanket and handkerchiefs', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.orderBlanketAndHandkerchiefs();

        const blanketSelected = await $(page.blanketSelected);
        await expect(blanketSelected).toBeSelected();

        const handkerchiefsSelected = await $(page.handkerchiefsSelected);
        await expect(handkerchiefsSelected).toBeSelected();
    });

    it('should order 2 ice creams', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.orderIceCreams(2);

        const iceCreamQuantity = await $(page.iceCreamQuantity);
        await expect(iceCreamQuantity).toHaveValue('2');
    });

    it('should wait for car search modal to appear', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.searchForCar();

        const carSearchModal = await $(page.carSearchModal);
        await carSearchModal.waitForDisplayed();

        // Optional: wait for driver info
        const driverInfo = await $(page.driverInfo);
        await driverInfo.waitForDisplayed();
    });

})

