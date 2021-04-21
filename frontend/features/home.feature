Feature: Home page

    Scenario: Load the home page
        When we request the home page
        Then we should receive facebook log in button

	Scenario: Log in using facebook
        When we request the home page
        Then we should receive facebook log in button
        Then we click on facebook log in button
