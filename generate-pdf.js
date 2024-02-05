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
    const payload = {
        "height": 1123,
        "width": 794,
        "ssr_id": null,
        "content": "<html lang=\"en\"><head>\n    <title>Arrivy - Forms Experience</title>\n    <meta name=\"description\" content=\"Arrivy connects enterprise service businesses and their customers in real-time and engages them through the last mile.\">\n    <meta property=\"fb:app_id\" content=\"1970943719793428\">\n    <meta property=\"og:type\" content=\"website\">\n    <meta property=\"og:locale\" content=\"en_US\">\n    <meta property=\"og:site_name\" content=\"Arrivy - Deliver Perfect Customer Experiences - Connect your office, crew and customers\">\n    <meta charset=\"utf-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <link rel=\"shortcut icon\" href=\"https://test-forms-ssr-dot-arrivy-sandbox.uc.r.appspot.com/images/logo-icon.png\" type=\"image/x-icon\">\n    <link media=\"screen\" rel=\"stylesheet\" type=\"text/css\" href=\"https://test-forms-ssr-dot-arrivy-sandbox.uc.r.appspot.com/dist/gen/document-app.css\">\n    <script id=\"engageWebViewClient\" type=\"text/javascript\" src=\"https://test-forms-ssr-dot-arrivy-sandbox.uc.r.appspot.com/dist/js/setUpWebviewClient.js\"></script>\n    <style data-emotion=\"css\"></style>\n  </head>\n  <body class=\"documentEditorBody___3m9Am hide-intercom\" data-react-helmet=\"class\">\n    <div id=\"app-container\">\n      <div class=\"documentEditor___3y1-j\">\n        <div class=\"editorWrapper___1Hzci\">\n          <div class=\"editorWrapperInner___E-b6-\">\n            <div class=\"editor___2IT8C fillingMode___1TD8k\">\n              <div class=\"editorContent___y05ot disable___2H3jA pdfMinWidth___3Vsb- pdf-content\">\n                <div class=\"inner___3CQrT\">\n                  <div class=\"react-grid-layout layout layoutContainer___1Kdts fillingMode___gfjLB saveAsPdf___1OxU8\">\n                    <div class=\"react-grid-item documentTitle___2evm_ react-resizable-hide react-resizable\" style=\"\n                        top: 10px;\n                        left: 10px;\n                        width: 740px;\n                        height: 35px;\n                        position: absolute;\n                      \">\n                      <div class=\"title___3_50B\">SSR Form 1</div>\n                      <span class=\"react-resizable-handle react-resizable-handle-se\"></span>\n                    </div>\n                    <div id=\"ScreenBreakComponent130\" class=\"react-grid-item componentContainer___2cHvr react-resizable-hide react-resizable\" style=\"\n                        top: 55px;\n                        left: 10px;\n                        width: 740px;\n                        height: 65px;\n                        position: absolute;\n                      \">\n                      <div class=\"component___3xY2q\">\n                        <div class=\"documentTitle___3orXR\">\n                          <div class=\"title___1K0ik\">Page 1</div>\n                        </div>\n                      </div>\n                      <span class=\"react-resizable-handle react-resizable-handle-se\"></span>\n                    </div>\n                    <div id=\"TextComponent68\" class=\"react-grid-item componentContainer___2cHvr react-resizable-hide react-resizable\" style=\"\n                        top: 130px;\n                        left: 10px;\n                        width: 740px;\n                        height: 50px;\n                        position: absolute;\n                      \">\n                      <div class=\"component___3xY2q TextComponent___1rioI\">\n                        <div class=\"textViewer___1t6Z4\">Empty Text</div>\n                      </div>\n                      <span class=\"react-resizable-handle react-resizable-handle-se\"></span>\n                    </div>\n                    <div id=\"TextInputComponent72\" class=\"react-grid-item componentContainer___2cHvr react-resizable-hide react-resizable\" style=\"\n                        top: 190px;\n                        left: 10px;\n                        width: 740px;\n                        height: 80px;\n                        position: absolute;\n                      \">\n                      <div class=\"component___3xY2q\">\n                        <div>\n                          <div class=\"fill-area form-group\">\n                            <label class=\"control-label___2umU0 control-label\">this is text input...</label>\n                            <p>this is text input...</p>\n                          </div>\n                        </div>\n                      </div>\n                      <span class=\"react-resizable-handle react-resizable-handle-se\"></span>\n                    </div>\n                    <div id=\"NumberComponent78\" class=\"react-grid-item componentContainer___2cHvr react-resizable-hide react-resizable\" style=\"\n                        top: 280px;\n                        left: 10px;\n                        width: 740px;\n                        height: 80px;\n                        position: absolute;\n                      \">\n                      <div class=\"component___3xY2q\">\n                        <div>\n                          <div class=\"fill-area form-group\">\n                            <label class=\"control-label___2wONr control-label\">this is number...</label>\n                            <div class=\"numberControl___26Ft9\">\n                              <p>12121</p>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                      <span class=\"react-resizable-handle react-resizable-handle-se\"></span>\n                    </div>\n                    <div id=\"DateComponent84\" class=\"react-grid-item componentContainer___2cHvr react-resizable-hide react-resizable\" style=\"\n                        top: 370px;\n                        left: 10px;\n                        width: 740px;\n                        height: 80px;\n                        position: absolute;\n                      \">\n                      <div class=\"component___3xY2q\">\n                        <div>\n                          <div class=\"fill-area form-group\">\n                            <label class=\"control-label___3G_QT control-label\">this is date...</label>\n                            <p>2024-01-16</p>\n                          </div>\n                        </div>\n                      </div>\n                      <span class=\"react-resizable-handle react-resizable-handle-se\"></span>\n                    </div>\n                    <div id=\"TimeComponent90\" class=\"react-grid-item componentContainer___2cHvr react-resizable-hide react-resizable\" style=\"\n                        top: 460px;\n                        left: 10px;\n                        width: 740px;\n                        height: 80px;\n                        position: absolute;\n                      \">\n                      <div class=\"component___3xY2q\">\n                        <div>\n                          <div class=\"fill-area form-group\">\n                            <label class=\"control-label___3n2iB control-label\">this is time...</label>\n                            <p>12:00 PM</p>\n                          </div>\n                        </div>\n                      </div>\n                      <span class=\"react-resizable-handle react-resizable-handle-se\"></span>\n                    </div>\n                    <div id=\"CalculationComponent96\" class=\"react-grid-item componentContainer___2cHvr react-resizable-hide react-resizable\" style=\"\n                        top: 550px;\n                        left: 10px;\n                        width: 740px;\n                        height: 80px;\n                        position: absolute;\n                      \">\n                      <div class=\"component___3xY2q\">\n                        <div>\n                          <div class=\"fill-area form-group\">\n                            <label class=\"control-label___2OqQC control-label\">this is calculation...</label>\n                            <p></p>\n                          </div>\n                        </div>\n                      </div>\n                      <span class=\"react-resizable-handle react-resizable-handle-se\"></span>\n                    </div>\n                    <div id=\"ImageComponent102\" class=\"react-grid-item componentContainer___2cHvr react-resizable-hide react-resizable\" style=\"\n                        top: 640px;\n                        left: 10px;\n                        width: 740px;\n                        height: 320px;\n                        position: absolute;\n                      \">\n                      <div class=\"component___3xY2q ImageComponent___1m1rQ\">\n                        <div>\n                          <label class=\"control-label___3k-30 control-label\">this is image...</label>\n                          <div class=\"imageContainer___1iWst\" style=\"justify-content: center\">\n                            <div class=\"pdfImage___3kNUi\" style=\"\n                                width: 100%;\n                                height: 120px;\n                                background-image: url('https://test-forms-ssr-dot-arrivy-sandbox.uc.r.appspot.com/api/files/AMIfv97PPdxXwPzyx_1byNqx9eLvSaUBstpXfoS6ATEyWz0D227yIkqEgfjtQbu0kY61NVVh6SHM9inFpOHYnWLuzTGsW-DQYniw4WkeScYffuae-z2Q5pUJbj7b2Lf-86fvbeoShZvgXmfPiEB7KwoQdOvVdt_UyFiFCQBW6Evv_jmKJmUCttumJ1VoSTi1jotQNnnmjWmfQ_KB7IB0pcGm3NZEzLNItDf3coHJNi8TXKucTtCLdl6sxovuUaRtAiXpwIaH-UqrlxIxLu-48GEqJ6Dva-htplgEm9JKHP-DQNI_fUtpHbp39U-iiuDA9i710aMFTizLTcpEnMlvpW2zEFKJOTwVOA');\n                              \"></div>\n                          </div>\n                        </div>\n                      </div>\n                      <span class=\"react-resizable-handle react-resizable-handle-se\"></span>\n                    </div>\n                    <div class=\"react-grid-item componentContainer___2cHvr react-resizable-hide react-resizable\">\n                      <div class=\"component___3xY2q\">\n                        <div>\n                          <label class=\"control-label___1ekK5 control-label\">this is files upload...</label>\n                          <div class=\"imageContainer___2cvhJ\">\n                            <div class=\"actualDropZone___1aWGK hidden\" id=\"dropzone1\" aria-disabled=\"false\">\n                              <div class=\"dropMsg___3_nCz\">\n                                drop files or<span>&nbsp;browse</span>\n                              </div>\n                              <input type=\"file\" multiple=\"\" autocomplete=\"off\" style=\"display: none\">\n                            </div>\n                            <div id=\"uploadFile\" class=\"fileUploaderMobile___2XmoS\">\n                              <div class=\"form-group fileUploaderMobileBtn___R1DiJ hidden\">\n                                <label>Take Photos (or Attach)</label><input type=\"file\" multiple=\"\" class=\"form-control\">\n                              </div>\n                              <div class=\"dropMsg___3_nCz\"></div>\n                            </div>\n                          </div>\n                          <div class=\"uploadFilesContainer___3yaxg\">\n                            <div class=\"uploadFilesPreviews___QRTA2 fullPdfWidth___Qj30a\">\n                              <div class=\"imagePreviewContainer___1e8Ql width25___3kRmm\" style=\"max-width: 25%\">\n                                <div>\n                                  <div data-fancybox=\"pictures\" data-src=\"https://test-forms-ssr-dot-arrivy-sandbox.uc.r.appspot.com/api/files/AMIfv969Dag3cmX7PCWKiy_oJ5s-oIRBNsbIXuK3mlEbeMlZRPTmNdBxBh1chIVr74igq8Dm8qzIT_FuSNUs4qZ3uKP89PGBZ1XAZofW0fVMeFpGvkIH8smyoDc2rA0TRqzZ_xhDNydDjzBK2CYYTkk1oOLqJ75ThGv5vp956juLcgx9ty_PbFReLyxnLtkgQ-g_ecD4t7fYh0T4hda0dyzEMjVHumphTxJUQVij6NEbbkVCuXe9RXigoH0h7tXGIhIhznRM-TicB3fnSENBWVuwNpMs7CPYMpFnUeUanwiqOqO6zHpNm5j27gdRVpPSwVeYp6UOc_9YLDFuBDPRVClh3XqRQAIp9Q-F0F0Fk3HiweQDATybqng\" class=\"pdfImage___1iX0J\" style=\"\n                                      height: 150px;\n                                      background-image: url('https://test-forms-ssr-dot-arrivy-sandbox.uc.r.appspot.com/api/files/AMIfv969Dag3cmX7PCWKiy_oJ5s-oIRBNsbIXuK3mlEbeMlZRPTmNdBxBh1chIVr74igq8Dm8qzIT_FuSNUs4qZ3uKP89PGBZ1XAZofW0fVMeFpGvkIH8smyoDc2rA0TRqzZ_xhDNydDjzBK2CYYTkk1oOLqJ75ThGv5vp956juLcgx9ty_PbFReLyxnLtkgQ-g_ecD4t7fYh0T4hda0dyzEMjVHumphTxJUQVij6NEbbkVCuXe9RXigoH0h7tXGIhIhznRM-TicB3fnSENBWVuwNpMs7CPYMpFnUeUanwiqOqO6zHpNm5j27gdRVpPSwVeYp6UOc_9YLDFuBDPRVClh3XqRQAIp9Q-F0F0Fk3HiweQDATybqng');\n                                    \"></div>\n                                </div>\n                                <div class=\"images-quantity___3vAxZ\">\n                                  <span>\n                                    this is files upload... - image\n                                    (1).png</span>\n                                  <div class=\"crop-icon___SPFdW\"></div>\n                                </div>\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                    <div id=\"SignatureComponent116\" class=\"react-grid-item componentContainer___2cHvr react-resizable-hide react-resizable\" style=\"\n                        top: 1405px;\n                        left: 10px;\n                        width: 740px;\n                        height: 215px;\n                        position: absolute;\n                      \">\n                      <div class=\"component___3xY2q\">\n                        <canvas class=\"hidden\"></canvas>\n                        <div>\n                          <div class=\"form-group\">\n                            <label class=\"control-label___3h6dQ control-label\">this is signature...</label>\n                            <div class=\"signatureCanvas___1ysX3\" style=\"height: 120px\">\n                              <div class=\"pdfSignature___2qpTw\" style=\"\n                                  height: 118px;\n                                  background-image: url('https://test-forms-ssr-dot-arrivy-sandbox.uc.r.appspot.com/api/files/AMIfv96koWT5k--0rjRMoJslDv2oge-PhFNMupTnojfaewDzdfmkuRghNmfV6NitAIcL6kYzWpdnxWju_WtQuAdRikHI_ARvhEthUbOZJMrE2L3U4-gtR07yYWhkH1caUcLFdi_9S_c1SzmfNoQjxCmkqRUsavLyBqy2s2tmXkR5BbTCJEyX6glRhkOQV2V0HR_9MPfoCfJYJqDrd1xh-zWpKMcLV-fHqRE0Xa9WCan0Q2nbADowJZlpsrH4WUAASyU-T8I8aMDDel6IM8tPBuFafUk5Pale1BQLO-zHeAX0nohPe4XSrgNMlQL91Yq1Bisa7m5Bw97dVPCGzZp8oTW3hb9-x5slBgIw4FRs-Cv2oiEvhBwbMy4');\n                                \"></div>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                      <span class=\"react-resizable-handle react-resizable-handle-se\"></span>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <!-- <script\n      type=\"text/javascript\"\n      src=\"https://test-forms-ssr-dot-arrivy-sandbox.uc.r.appspot.com/dist/gen/document-app.js\"\n    ></script> -->\n  \n\n</body></html>",
        "maintain_pages": false,
        "page_identifier_selector": null
    }

    console.log('launching browser...')
    // Launch a headless browser
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });


    const page = await browser.newPage();
    await page.setViewport({ width: parseInt(payload.width), height: parseInt(payload.height) });
    await page.setContent(payload.content, { waitUntil: 'networkidle2', timeout: 60_000 });

    const result = await page.evaluate(async () => {
        await new Promise(resolve => setTimeout(resolve, 3000));

        /* Remove light blue background */
        const backgroundElements = document.querySelectorAll('div[class^="pdf-wrapper___"], div[class^="editorWrapper___"]');
        for (let i = 0; i < backgroundElements.length; i++) {
            backgroundElements[i].style.background = 'none';
        }
        return { pageHeight: document.body.scrollHeight, newContent: document.documentElement.outerHTML }
    });

    console.log(result)

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



    // Navigate to the desired page
    // await page.goto('https://test-pdf-annotations-dot-arrivy-sandbox.uc.r.appspot.com/api/files/AMIfv948I5OLugRy12IMuxzWqLEA7JqBSCBXnKg7lEObICWYS7tVOWj9_5595Of9gmGgWpJ1ZNjQgjC9ZuzBOxcD5evEuuBP8NH46rfx7kaPH60oEFarpwX7LeV7pv8JqGMDt0mtEqHEI0lXv2f7gXb1SNcYYfdkeXHg3ccKWHa5iN6ozkNGc0lNXZMs_4SpzNkikzJZbc5Lje-zSMnnImJ6y3SE3IV6lMBCdW0AYRtHrWrJW_WM6GycYvvCpdSD7BZrBRH9cOzpGd7skyna1KcdPSSJ3bEDFIpg8kg-me8omvxj9Dm2HTMALk3DzXQAvPu7osadjnenzVsL2KnRB20X-xvWkW9h2i_hle1FFbbH0puCfINCDsBInYpu254R8g9CuHZZ5gek', { "waitUntil": "networkidle2" });
    // await page.goto('https://ali-zaidi-arrivy.github.io/ssr/htmls/form.html', { "waitUntil": "networkidle0" });
    // await page.goto('https://ali-zaidi-arrivy.github.io/ssr/htmls/forms-v2-p1.html', { "waitUntil": "networkidle0" });
    // await page.goto('https://ali-zaidi-arrivy.github.io/ssr/htmls/forms-v2-p2.html', { "waitUntil": "networkidle0" });
    // await page.goto('http://localhost:7001/sign-pdf?task_id=5040161301725184&file_id=5603111255146496&isSSR=true&pdf_annotation_token=5d5b0fa4-aa4c-4a71-8438-bdb746424aa3&company_id=5629499534213120&payload_dump_id=5400f201-db75-4ccf-8847-44dd1ffa024c', { "waitUntil": "networkidle0", timeout: 60_000 });



    // await page.emulateMediaType('screen');

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

    // // Set up options for generating the PDF
    // const pdfOptions = {
    //     path: 'output.pdf', // Change this to your desired output path
    //     format: 'A4', // Page format
    //     printBackground: true, // Include background colors/images
    // };

    // // // Generate the PDF
    // await page.pdf(pdfOptions);

    // // // Close the browser
    // await browser.close();
})();
