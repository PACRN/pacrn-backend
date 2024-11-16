import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

async function launchPuppeteerWithRetries(retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            return await puppeteer.launch({
                executablePath: '/usr/bin/chromium-browser',
                headless: true,
                args: ['--disable-dev-shm-usage', '--disable-gpu', '--no-sandbox'],
                protocolTimeout: 180000,
            });
        } catch (error) {
            console.error(`Launch attempt ${i + 1} failed: ${error.message}`);
            if (i === retries - 1) throw error; // Throw error if final attempt fails
        }
    }
}


const ReviewScrape = async (url: string) => {
    const browser = await launchPuppeteerWithRetries();

    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(60000)
    await page.goto(url, { timeout: 60000, waitUntil: "networkidle2" });
    await page.waitForSelector(".kA9KIf")
    await page.waitForSelector(".hh2c6");
    const tabs = await page.$$(".hh2c6");
    if (tabs.length >= 2) {
        await tabs[1].click();
    } else {
        throw new Error("Not enough tabs found.");
    }
    await new Promise(resolve => setTimeout(resolve, 5000))
    await page.waitForSelector(".m6QErb ")
    await page.waitForSelector(".DxyBCb")
    await scrollPage(page, '.DxyBCb')
    const reviews = await getReviewsFromPage(page)
    await browser.close()
    return reviews
}

const scrollPage = async (page: any, scrollContainer: string) => {
    let lastHeight = await page.evaluate(`document.querySelector("${scrollContainer}").scrollHeight`)
    while (true) {
        await page.evaluate(`document.querySelector("${scrollContainer}").scrollTo(0, document.querySelector("${scrollContainer}").scrollHeight)`)
        await new Promise(resolve => setTimeout(resolve, 5000))
        let newHeight = await page.evaluate(`document.querySelector("${scrollContainer}").scrollHeight`);
        if (newHeight === lastHeight) {
            break;
        }
        lastHeight = newHeight
    }
}

const getReviewsFromPage = async (Page: any) => {
    const pageData = await Page.evaluate(async () => {
        // Get the total reviews and rating
        const clickMoreButtons = async () => {
            const moreButtons = Array.from(document.querySelectorAll('.w8nwRe.kyuRq'));
            for (let button of moreButtons) {
                if (button instanceof HTMLElement && button.getAttribute('aria-expanded') === 'false') {
                    button.click();
                    await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for content to load
                }
            }
        };

        await clickMoreButtons();

        const totalData = Array.from(document.querySelectorAll(".PPCwl")).map((el: HTMLElement) => {
            const starRatings = Array.from(el.querySelectorAll('.BHOKXe')).reduce((acc: any, e) => {
                const ratingText = e.getAttribute('aria-label');
                if (ratingText) {
                    const [stars, reviews] = ratingText.split(', ');
                    const key = stars.replace(' ', '');
                    const value = reviews.replace(' ', '');
                    acc[key] = value;
                }
                return acc;
            }, {});
            return {
                TotalRating: el.querySelector(".fontDisplayLarge")?.textContent,
                TotalReviews: el.querySelector('.fontBodySmall')?.textContent,
                starRatings: starRatings
            }
        });

        // Get the individual reviews
        let scrappedId = 1;
        const reviews = Array.from(document.querySelectorAll(".jftiEf")).map((el: HTMLElement) => {
            return {
                username: el.querySelector(".d4r55")?.textContent.trim(),
                userthumbnail: el.querySelector(".NBa7we")?.getAttribute("src"),
                rating: parseFloat(el.querySelector(".kvMYJc")?.getAttribute("aria-label")),
                date: el.querySelector(".rsqaWe")?.textContent.trim(),
                scrappedId: scrappedId++,
                review: el.querySelector(".MyEned")?.textContent.trim()
            }
        });

        return { totalData, reviews };
    });
    return pageData
}


export default ReviewScrape