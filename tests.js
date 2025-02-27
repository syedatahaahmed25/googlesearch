const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

(async function googleSearch() {
    // Set Chrome options
    let options = new chrome.Options();
    
    // 🛑 Avoid bot detection
    options.addArguments("--disable-blink-features=AutomationControlled");

    // 🖥️ Run Chrome in normal mode (not headless)
    options.addArguments("--start-maximized");

    // 🕵️‍♂️ Change user-agent to appear like a real browser
    options.addArguments("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36");

    let driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();

    try {
        // Navigate to Google
        await driver.get("https://www.google.com");

        // Find the search bar, enter "QA careers", and press Enter
        let searchBox = await driver.findElement(By.name("q"));
        await searchBox.sendKeys("QA interview", Key.RETURN);

        // Wait until search results load
        let firstResult = await driver.wait(
            until.elementLocated(By.xpath("(//h3)[1]/parent::a")), 
            15000
        );

        // Click the first search result
        await firstResult.click();

        // Wait 5 seconds to observe the result
        await driver.sleep(5000);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        // Close the browser
        await driver.quit();
    }
})();