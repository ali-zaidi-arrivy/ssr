const puppeteer = require('puppeteer');

(async () => {

    console.log('launching browser...')
    // Launch a headless browser
    const browser = await puppeteer.launch();

    // Create a new page
    const page = await browser.newPage();

    // Navigate to the desired page
    await page.goto('https://sandbox.arrivy.com/live/track/ahBzfmFycml2eS1zYW5kYm94ciILEgRVc2VyGICAgOTp3pAJDAsSBFRhc2sYgICggI7mrgoM/forms/4932333059702784?hash=7epi8ssn2w9', { "waitUntil": "networkidle0" });

    // Wait for any asynchronous content to load (if needed)
    await page.waitForSelector('.btn___yuS3n');

    // Optionally, you can modify the page before generating PDF
    // For example, you can add custom CSS to style the page
    // await page.addStyleTag({ content: 'YOUR_CUSTOM_CSS_HERE' });

    // Set up options for generating the PDF
    const pdfOptions = {
        path: 'output.pdf', // Change this to your desired output path
        format: 'A4', // Page format
        printBackground: true, // Include background colors/images
    }; ``

    // Generate the PDF
    await page.pdf(pdfOptions);

    // Close the browser
    await browser.close();
})();
