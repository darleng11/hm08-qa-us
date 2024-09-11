module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    messageField: '//*[@id="comment"]',
    cardNumberField: '//*[@id="number"]',
    cardCodeField: '.card-code #code',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    paymentMethodButton: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[2]',
    addCardButton: '//*[@id="root"]/div/div[2]/div[2]/div[1]/div[2]/div[3]',
    supportivePlanButton: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[1]/div[5]',
    searchForCarButton: '//*[@id="root"]/div/div[3]/div[4]',
    blanketAndHandKerchiefsButton: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[1]/div/div[2]/div',
    blanketAndHandKerchiefStatus: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[1]/div/div[2]/div/input',
    iceCreamButton: 'div=+',
    businessPlanButton: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[1]/div[1]',
    cartIceCreamCount: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[2]',
    linkButton: '//*[@id="root"]/div/div[2]/div[2]/div[2]/form/div[3]/button[1]',
    // Modals
    phoneNumberModal: '.modal',
    carSearchModal: 'div=Car search',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    selectSupportivePlan: async function() {
        const supportivePlanButton = await $(this.supportivePlanButton);
        await supportivePlanButton.click();
        
    },
    openCreditCardModal: async function (cardNumber,codeNumber) {
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.click();

        const addCardButton = await $(this.addCardButton);
        await addCardButton.click();

        const cardNumberField = await $(this.cardNumberField);
        await cardNumberField.waitForDisplayed();
        await cardNumberField.setValue(cardNumber);
        
        const cardCodeField = await $(this.cardCodeField);
        await cardCodeField.waitForDisplayed();
        await cardCodeField.setValue(codeNumber);
    },
    
    writeMessageForDriver: async function(message) {
        const messageField = await $(this.messageField);
        await messageField.setValue(message);
        
    },
    orderBlanketAndHandkerchiefs: async function() {
        
        const blanketAnHandKerchiefsButton = await $(this.blanketAndHandKerchiefsButton);
        await blanketAnHandKerchiefsButton.waitForDisplayed();
        await blanketAnHandKerchiefsButton.click();
        
    },
    orderIceCreams: async function() {
        const iceCreamButton = await $(this.iceCreamButton);
        await iceCreamButton.waitForDisplayed();
        await iceCreamButton.click();
        await iceCreamButton.click();

    },
    searchForCar: async function(car) {
        const orderButton = await $(this.searchForCarButton);
        await orderButton.waitForDisplayed();
        await orderButton.click();
        
    },    
    selectBusinessPlan: async function() {
        const businessPlanButton = await $(this.businessPlanButton);
        await businessPlanButton.waitForDisplayed();
        await businessPlanButton.click();
        
    }
    
};