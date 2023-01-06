const fs = require('fs');
const r23 = r(1500, 3000);
const r15 = r(1000, 1500);


//random number function
function r(min, max) {
	return ~~(Math.random() * (max - min) + min);
}

//Function that logs timeStamp + data + \n
function log(data) {
	let date = new Date();
	let t = date.toLocaleTimeString(); // 2:22:09 PM
	let d = date.toLocaleDateString(); // 01/03/1984	
	fs.appendFile('K:/My Drive/log.txt', `${data}  `, () => {
		console.log(`${data} @${t}`);
	});
}


// pretends this is a phone not a desktop
const mobile = {
	name: 'iPhone 13 Pro Max',
	userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Mobile/15E148 Safari/604.1',
	viewport: {
		width: 428,
		height: 926,
		deviceScaleFactor: 3,
		isMobile: true,
		hasTouch: true,
		isLandscape: false,
	},
};

const desktop = {
	name: 'HP 24ec',
	userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
	viewport: {
		width: 1920,
		height: 1080,
	},
};

async function login() {
	async function checkCookie() {
		const cookies = JSON.parse(fs.readFileSync('cookies.json', 'utf8'));
		for (const cookie of cookies) {
			await page.setCookie(cookie);
		}
		const sessionCookie = await page.getCookie({ name: 'session' });
		if (sessionCookie) {
			// Check the expiration date of the cookie
			const now = new Date();
			if (sessionCookie.expires > now.getTime()) {
				console.log('Cookie is valid');


			} else {
				console.log('Cookie is expired');

			}
		} else {
			console.log('Cookie does not exist');
		}
	}
}

async function accessProtectedPage() {
	const cookies = JSON.parse(fs.readFileSync('cookies.json', 'utf8'));
	for (const cookie of cookies) {
		await page.setCookie(cookie);
	}
}




module.exports = { mobile, r, log, r15, r23, desktop, useLoginCookies, checkCookie }; //timeNow,timeFin,

/*Here is an example script using Puppeteer that will navigate to a website, login, and store the cookies so that you don't have to login again until the cookies expire:

const puppeteer = require('puppeteer');

async function login() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	// Navigate to login page
	await page.goto('https://example.com/login');

	// Enter username and password
	await page.type('#username', 'myusername');
	await page.type('#password', 'mypassword');

	// Click the login button
	await page.click('button[type=submit]');

	// Wait for the page to load
	await page.waitForNavigation();

	// Get the cookies
	const cookies = await page.cookies();

	// Store the cookies in a file
	const fs = require('fs');
	fs.writeFileSync('cookies.json', JSON.stringify(cookies));

	await browser.close();
}

login();
To use the stored cookies to avoid having to login again, you can read the cookies from the file and set them on the page using the setCookie method:


const puppeteer = require('puppeteer');

async function accessProtectedPage() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	// Read the cookies from the file
	const fs = require('fs');
	const cookies = JSON.parse(fs.readFileSync('cookies.json', 'utf8'));

	// Set the cookies on the page
	for (const cookie of cookies) {
		await page.setCookie(cookie);
	}

	// Navigate to a protected page
	await page.goto('https://example.com/protected');

	// Do something with the page

	await browser.close();
}

accessProtectedPage();

This script will use the stored cookies to automatically log in to the website and access a protected page without requiring you to enter your login credentials again.The cookies will be valid until they expire, at which point you will need to login again to obtain new cookies.


Here is an example of how you can check if a cookie is current and valid:

const puppeteer = require('puppeteer');

async function checkCookie() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	// Read the cookies from the file
	const fs = require('fs');
	const cookies = JSON.parse(fs.readFileSync('cookies.json', 'utf8'));

	// Set the cookies on the page
	for (const cookie of cookies) {
		await page.setCookie(cookie);
	}

	// Check the value of the "session" cookie
	const sessionCookie = await page.getCookie({ name: 'session' });
	if (sessionCookie) {
		// Check the expiration date of the cookie
		const now = new Date();
		if (sessionCookie.expires > now.getTime()) {
			console.log('Cookie is current and valid');
		} else {
			console.log('Cookie is expired');
		}
	} else {
		console.log('Cookie does not exist');
	}

	await browser.close();
}

checkCookie();


In this example, we retrieve the value of the "session" cookie and check its expiration date using the expires property.If the expiration date is in the future, the cookie is considered current and valid.If the expiration date is in the past, the cookie is considered expired.

Keep in mind that the expiration date of a cookie is set by the server when the cookie is first sent to the client, so it may not always be accurate.Some servers may also use other methods to invalidate cookies, such as changing the value of the cookie or using a different cookie for each session.*/
