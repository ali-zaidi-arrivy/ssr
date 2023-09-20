const puppeteer = require('puppeteer');

(async () => {

    console.log('launching browser...')
    // Launch a headless browser
    const browser = await puppeteer.launch();

    // Create a new page
    const page = await browser.newPage();

    // Navigate to the desired page
    // await page.goto('https://ali-zaidi-arrivy.github.io/ssr/htmls/form.html', { "waitUntil": "networkidle0" });
    await page.goto('https://ali-zaidi-arrivy.github.io/ssr/htmls/pdf-annotation', { "waitUntil": "networkidle0" });

    await page.emulateMediaType('screen');

    // Wait for any asynchronous content to load (if needed)
    // await page.waitForSelector('.btn___yuS3n');

    // Optionally, you can modify the page before generating PDF
    // For example, you can add custom CSS to style the page
    // await page.addStyleTag({ content: 'YOUR_CUSTOM_CSS_HERE' });
    await page.addStyleTag({ content: '@page { size: auto; }' })

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
