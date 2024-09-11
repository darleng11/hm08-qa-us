## Project 8's Objetive
 
This project involves writing automated tests for the "Urban Routes" application. The tests aim to ensure that users can complete the full process of ordering a taxi with several functionalities, including adding a credit card, ordering items, and verifying UI elements.

## Project Overview

The tests focus on ensuring that the Urban Routes system works as expected by covering critical functionalities in an end-to-end testing scenario. You will use tools like WebdriverIO and Node.js to automate these tasks.

## Installation

- Clone the repository:
   git clone git@github.com:username/hm08-qa-us.git

- Navigate to the project folder:
   cd hm08-qa-us

- Install dependencies:
   npm install

## Running the Tests

To execute the tests, use the following command:

npm run wdio

## Technologies and Techniques Used
- **WebDriverIO**: A testing automation framework that allows interaction with web applications through a browser.
- **Mocha**: A testing framework used to structure and execute the tests.
- **Chai**: An assertion library used with Mocha to validate test outcomes.
- **JavaScript**: The programming language used to write the tests.
- **Node.js**: The JavaScript runtime environment used to set up and run WebDriverIO.
- **npm**: A package manager used to install dependencies and run scripts.

## Test Coverage

The tests include the following scenarios:

- Setting the Address: Ensures that the user can set pickup and drop-off addresses.
- Selecting the Supportive Plan: Confirms that the user can select the 'Supportive' plan.
- Filling in the Phone Number: Verifies that the user can enter a valid phone number.
- Adding a Credit Card: Simulates adding a card to the system.
   Note: The “link” button in the modal becomes active only when the card CVV field loses focus. This can be simulated by pressing the TAB key or clicking outside the field.
- Writing a Message for the Driver: Ensures that the user can leave a note for the driver.
- Ordering a Blanket and Handkerchiefs: Verifies that the user can add these items to their order.
- Ordering 2 Ice Creams: Confirms that the user can successfully order multiple items.
- Car Search Modal: Verifies that the modal for searching for a car appears as expected.
