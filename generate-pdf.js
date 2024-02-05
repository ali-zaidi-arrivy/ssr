const puppeteer = require('puppeteer');
const axios = require('axios')
const { AxiosError } = require('axios')


const isNetworkError = (error) => {
    if (axios.isAxiosError(error)) {
        // It's an Axios-related error, so it could be a network error
        if (error.response) {
            // The request was made, but the server responded with a non-2xx status code
            console.error('API error:', error.response.data);
        } else if (error.request) {
            // The request was made, but no response was received
            console.error('Network error:', error.message);
        } else {
            // Something went wrong in setting up the request
            console.error('Request error:', error.message);
        }
        return true
    } else {
        // It's a non-Axios error, handle it accordingly
        console.error('Non-Axios error:', error.message);
        return false
    }
}


const getNetworkErrorInfo = (error) => {
    let status = null, data = null
    if (error.response?.status !== undefined)
        status = error.response?.status
    if (error.response?.data !== undefined)
        data = error.response?.data

    return { status, data }
}

const createAxiosError = async (response) => {
    const error = new AxiosError();
    const data = await response.json()
    error.response = { data, status: response.status() };
    error.request = {}; // You might want to provide a proper request object if needed
    return error;
};



const handleException = async (error, request, step = null) => {
    let shouldResolve = false, shouldReject = false, rejectionError = null, resolutionPayload = null
    if (isNetworkError(error)) {
        const { status, data } = getNetworkErrorInfo(error)
        if ([400, 404, 401].indexOf(status)) {
            console.error('Un-recoverable bad request error received, marking job as failed')
            console.error(status, data)
            // request = await markJobAsFailed(request, { status: status, data: data })
            shouldResolve = true
        } else {
            console.error('Un-handled network exception, will retry if can')
            console.error(status, data)
            shouldReject = true
            rejectionError = error
        }
    } else {
        console.error('Non-network exception, will rety if can')
        // console.error(error)
        shouldReject = true
        rejectionError = error
    }

    return {
        shouldResolve, shouldReject, rejectionError, resolutionPayload
    }
}




(async () => {


    // console.log('launching browser...')
    // // Launch a headless browser
    // const browser = await puppeteer.launch({
    //     headless: false,
    //     args: ['--no-sandbox', '--disable-setuid-sandbox'],
    // });


    // const page = await browser.newPage();
    // await page.setViewport({ width: parseInt(payload.width), height: parseInt(payload.height) });
    // await page.setContent(payload.content, { waitUntil: 'networkidle2', timeout: 60_000 });

    // const result = await page.evaluate(async () => {
    //     await new Promise(resolve => setTimeout(resolve, 3000));

    //     /* Remove light blue background */
    //     const backgroundElements = document.querySelectorAll('div[class^="pdf-wrapper___"], div[class^="editorWrapper___"]');
    //     for (let i = 0; i < backgroundElements.length; i++) {
    //         backgroundElements[i].style.background = 'none';
    //     }
    //     return { pageHeight: document.body.scrollHeight, newContent: document.documentElement.outerHTML }
    // });

    // console.log(result)

    // Create a new page
    // const page = await browser.newPage();

    // await page.exposeFunction('sendSignalToNode', (data) => {
    //     console.log('Received signal from page:', data);
    //     return "okokok"
    // });

    // page
    //     .on('console', message =>
    //         console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`))
    //     // .on('pageerror', ({ message }) => console.log(message))
    //     .on('response', async (response) => {
    //         // console.log(response)
    //         // console.log(`${response.status()} ${response.url()}`)

    //         if (!(response.status() >= 200 && response.status() <= 206)) {
    //             const url = new URL(response.url());
    //             const path = url.pathname;
    //             const mandatoryUrls = ['/api/tasks/', '/api/users/profile', '/api/company/profile', '/html2pdf/payload-dumps/']
    //             if (mandatoryUrls.some(u => path.startsWith(u))) {
    //                 console.error('error, can not proceed...', response.status())
    //                 console.log(path);
    //                 // const json = await response.json()
    //                 // console.log(json)
    //                 handleException(await createAxiosError(response))
    //             }
    //         }

    //     })
    // .on('requestfailed', (request) => {
    //     // console.log(request)
    //     console.log(`${request.failure().status} ${request.failure().errorText} ${request.url()}`)
    // })


    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });



    const page = await browser.newPage();


    // Navigate to the desired page
    // await page.goto('https://test-pdf-annotations-dot-arrivy-sandbox.uc.r.appspot.com/api/files/AMIfv948I5OLugRy12IMuxzWqLEA7JqBSCBXnKg7lEObICWYS7tVOWj9_5595Of9gmGgWpJ1ZNjQgjC9ZuzBOxcD5evEuuBP8NH46rfx7kaPH60oEFarpwX7LeV7pv8JqGMDt0mtEqHEI0lXv2f7gXb1SNcYYfdkeXHg3ccKWHa5iN6ozkNGc0lNXZMs_4SpzNkikzJZbc5Lje-zSMnnImJ6y3SE3IV6lMBCdW0AYRtHrWrJW_WM6GycYvvCpdSD7BZrBRH9cOzpGd7skyna1KcdPSSJ3bEDFIpg8kg-me8omvxj9Dm2HTMALk3DzXQAvPu7osadjnenzVsL2KnRB20X-xvWkW9h2i_hle1FFbbH0puCfINCDsBInYpu254R8g9CuHZZ5gek', { "waitUntil": "networkidle2" });
    // await page.goto('https://ali-zaidi-arrivy.github.io/ssr/htmls/form.html', { "waitUntil": "networkidle0" });
    // await page.goto('https://ali-zaidi-arrivy.github.io/ssr/htmls/forms-v2-p1.html', { "waitUntil": "networkidle0" });
    // await page.goto('https://ali-zaidi-arrivy.github.io/ssr/htmls/forms-v2-p2.html', { "waitUntil": "networkidle0" });

    // await page.goto('http://localhost:7001/sign-pdf?task_id=5040161301725184&file_id=5603111255146496&isSSR=true&pdf_annotation_token=5d5b0fa4-aa4c-4a71-8438-bdb746424aa3&company_id=5629499534213120&payload_dump_id=5400f201-db75-4ccf-8847-44dd1ffa024c', { "waitUntil": "networkidle0", timeout: 60_000 });


    // await page.evaluate(() => {
    //     console.log('ininin');
    //     console.log(window.func('1'));
    // });

    // const callDownloadGeneratedPdfAndMarkStatus = async (final_url) => {
    //     page.evaluate((url) => {
    //         window.func(url)
    //     }, final_url);
    // }

    // await callDownloadGeneratedPdfAndMarkStatus('test')

    // Wait for any asynchronous content to load (if needed)
    // await page.waitForSelector('.btn___yuS3n');

    // Optionally, you can modify the page before generating PDF
    // For example, you can add custom CSS to style the page
    // await page.addStyleTag({ content: 'YOUR_CUSTOM_CSS_HERE' });
    // await page.addStyleTag({ content: '@page { size: auto; }' })

    // Set up options for generating the PDF
    await page.exposeFunction('onBodyLoaded', async () => {
        await page.emulateMediaType('screen');
        await new Promise(resolve => setTimeout(resolve, 20000));
        const pdfOptions = {
            path: 'output.pdf', // Change this to your desired output path
            printBackground: true, // Include background colors/images
            width: 794,
            height: 1123,
            margin: {
                left: 0,
                top: 10,
                right: 0,
                bottom: 10
            }
        };

        // // Generate the PDF
        await page.pdf(pdfOptions);

        // // Close the browser
        await browser.close();
    })
    // page.setContent(data.content, { waitUntil: 'networkidle2', timeout: 60_000 })
    await page.goto('https://ali-zaidi-arrivy.github.io/ssr/htmls/forms-v2-p1.html', { "waitUntil": "networkidle0" });




})();
