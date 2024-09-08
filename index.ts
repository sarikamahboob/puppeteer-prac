// const puppeteer = require("puppeteer");

// const url = "https://docs.barikoi.com/api";

// const main = async () => {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();
//   await page.goto(url);

//   const data = await page.evaluate(() => {
//     // Select all <pre> tags that contain .token and .string elements
//     const preTags = Array.from(document.querySelectorAll("pre"));

//     // Inside each <pre> tag, find elements with both 'token' and 'string' classes
//     return preTags.map((pre) => {
//       const tokens = Array.from(pre.querySelectorAll(".token.string"));
//       return tokens.map((token:any) => ({
//         text: token.innerText || "No text found",
//       }));
//     });
//   });

//   console.log(data);
//   await browser.close();
// };

// main();

const puppeteer = require("puppeteer");

const url = "https://docs.barikoi.com/api";

const main = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  // Extract the content inside the <code> tags
  const codeData = await page.evaluate(() => {
    const codeElements = Array.from(document.querySelectorAll("code"));
    return codeElements.map((code) => code.innerText);
  });

  // Clean up and try to parse JSON where applicable
  const formattedCodeData = codeData.map((data:any) => {
    try {
      // Attempt to parse as JSON and pretty print it
      const parsedData = JSON.parse(data);
      return JSON.stringify(parsedData, null, 2);
    } catch (error) {
      // If not JSON, return the data as-is
      return data;
    }
  });

  console.log("Formatted Code Data:", formattedCodeData.join("\n\n"));

  await browser.close();
};

main();


