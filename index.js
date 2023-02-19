const puppeteer = require('puppeteer-extra')
const pluginStealth = require('puppeteer-extra-plugin-stealth')
const { executablePath } = require('puppeteer')
const axios = require('axios');
const { Agent } = require('https');

puppeteer.use(pluginStealth());

function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
}
const ciphers = [
      'TLS_CHACHA20_POLY1305_SHA256',
      'TLS_AES_128_GCM_SHA256',
      'TLS_AES_256_GCM_SHA384',
      'TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256'
  ];
const agent = new Agent({ ciphers: ciphers.join(':'), honorCipherOrder: true, minVersion: 'TLSv1.2' });


(async () => {
      const hekt = 'C:\\Users\\DELL\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\bpfdbfnkjelhloljelooneehdalcmljb\\0.1.3_0';
      const browser = await puppeteer.launch({
            ignoreHTTPSErrors: true,
            headless: false,
            ignoreDefaultArgs: [`--disable-extensions-except=${hekt}`, "--enable-automation"],
            args: [
                  `--window-size=1920,1080`,
                  "--window-position=000,000",
                  "--disable-dev-shm-usage",
                  "--no-sandbox",
                  '--user-data-dir="/tmp/chromium"',
                  "--disable-web-security",
                  "--disable-features=site-per-process",
                  `--disable-extensions-except=${hekt}`,
                  `--load-extension=${hekt}`,
                  '--enable-automation'
            ],
            executablePath: executablePath(),
            defaultViewport: { width: 1920, height: 1080 }
      });

      //info
      var email = "test@gmail.com";
      var password = "zxcv123123@";
      var username = "namehere";


      for (var i = 0; i < 100; i++) {
            const page = await browser.newPage();
            const url = 'https://auth.riotgames.com/login#client_id=prod-xsso-playvalorant&code_challenge=NmhffzEjsMekbESp_gPiKbhaR7TjOP8BRqjo36g6kCo&code_challenge_method=S256&prompt=signup&redirect_uri=https%3A%2F%2Fxsso.playvalorant.com%2Fredirect&response_type=code&scope=openid%20account&show_region=true&state=b3d038fe1fe537c07f282d648a&uri=https%3A%2F%2Fplayvalorant.com%2Fvi-vn%2Fdownload';
            await page.goto(url);


            await page.waitForSelector('input[name=email]');
            await page.type('input[name=email]', email);

            await page.waitForSelector('button[type=submit]:not([disabled])');
            await page.click('button[type=submit]');

            await page.waitForSelector('input[name=date_of_birth_day]');
            await page.type('input[name=date_of_birth_day]', '03');

            await page.waitForSelector('input[name=date_of_birth_month]');
            await page.type('input[name=date_of_birth_month]', '09');

            await page.waitForSelector('input[name=date_of_birth_year]');
            await page.type('input[name=date_of_birth_year]', '1998');

            await page.waitForSelector('button[type=submit]:not([disabled])');
            await page.click('button[type=submit]');

            await page.waitForSelector('input[name=username]');
            await page.type('input[name=username]', `${username}${i}`);
            await sleep(1000);

            await page.waitForSelector('button[type=submit]');
            await page.click('button[type=submit]');

            await page.waitForSelector('input[name=password]');
            await page.type('input[name=password]', password);
            await page.type('input[name=confirm_password]', password);
            await page.waitForSelector('button[type=submit]:not([disabled])');
            let accountSuccess = 0;
            while (await page.$('div[aria-hidden=true]')) {
                  await console.log('click');
                  await page.click('button[type=submit]');
                  await sleep(30000);

                  if (await page.$('p[data-testid=message-error]')) {
                        await console.log('error');
                        break;
                  } else if (await page.$('div[aria-hidden=true]')) {
                        continue;
                  } else {
                        accountSuccess++;
                        console.log(accountSuccess);
                        break;
                  }
            }


            if (accountSuccess != 0) {
                  console.log('check NM');
                  break;
            } else {
                  console.log('re-signup');
                  await page.close();
                  continue;
            }
      }

      await browser.close();
})();