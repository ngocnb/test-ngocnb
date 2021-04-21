require("dotenv").config();

const { When, Then, After, setDefaultTimeout } = require("@cucumber/cucumber");
const assert = require("assert");
const { Builder, By, until } = require("selenium-webdriver");

setDefaultTimeout(60 * 1000);

When("we request the home page", async function () {
  this.driver = new Builder().forBrowser("chrome").build();

  await this.driver.get(process.env.FRONTEND_URL);
});

Then("we should receive facebook log in button", async function () {
  // verify that the facebook login button is displayed
  let btnExists = await this.driver
    .findElements(By.className("kep-login-facebook"))
    .then((found) => !!found.length);
  assert.equal(btnExists, true);
});

Then("we click on facebook log in button", async function () {
  let email = process.env.FACEBOOK_EMAIL;
  let password = process.env.FACEBOOK_PASSWORD;
  // store the ID of the original window
  const originalWindow = await this.driver.getWindowHandle();
  await this.driver.findElement(By.className("kep-login-facebook")).click();

  // wait for the popup window
  await this.driver.wait(
    async () => (await this.driver.getAllWindowHandles()).length === 2,
    10000
  );
  const windows = await this.driver.getAllWindowHandles();
  // change window
  windows.forEach(async (handle) => {
    if (handle !== originalWindow) {
      await this.driver.switchTo().window(handle);
    }
  });
  // wait for the window page to load
  await this.driver.wait(until.titleIs("Facebook"), 10000);
  // type email, password then log in
  await this.driver.findElement(By.id("email")).sendKeys(email);
  await this.driver.findElement(By.id("pass")).sendKeys(password);
  await this.driver.findElement(By.name("login")).click();

  // wait for user data to be fetched
  await this.driver.switchTo().window(originalWindow);
  await this.driver.wait(until.elementLocated(By.id("emailHere")), 20 * 1000);
  // assert email
  let actualEmail = await this.driver.findElement(By.id("emailHere")).getText();
  assert.equal(email, actualEmail);
});

After(async function () {
  this.driver.close();
});
