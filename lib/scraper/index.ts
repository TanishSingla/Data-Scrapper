import axios from 'axios';
import * as cheerio from 'cheerio';
import { extractCurrency, extractDescription, extractPrice } from './utils';

export async function scrapeAmazonProduct(url:string){

    if(!url)return;

    // BrightData proxy configuration
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;

    const options = {
        auth:{
            username: `${username}-session-${session_id}`,
            password,
        },
        host:'brd.superproxy.io',
        port,
        rejectUnauthorized:false
    }

    try{
        // Fetch The product page
        const resp = await axios.get(url,options);
        const $ = cheerio.load(resp.data);
        // console.log(resp.data);

        // Extracting product tittle
        const title = $('#productTitle').text().trim();
        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base'),
            $('.a-price.a-text-price')
        );
        const originalPrice = extractPrice(
            $('#priceblock_ourprice'),
            $('.a-price.a-text-price span.a-offscreen'),
            $('#listPrice'),
            $('#priceblock_dealprice'),
            $('.a-size-base.a-color-price')
          );

        const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailaible';

        const images = $('#imgBlkFront').attr('data-a-dynamic-image') || $('#landingImage').attr('data-a-dynamic-image') || '{}';
        const imageUrl = Object.keys(JSON.parse(images));

        const currency = extractCurrency($('.a-price-symbol'))
        const discountRate =  $('.savingsPercentage').text().replace(/[-%]/g,"");  

        // description
        const description = extractDescription($);

        const data = {
            url,
            currency:currency || 'Rs. ',
            image:imageUrl[0] || imageUrl[1],
            title,
            currentPrice:Number(currentPrice) || Number(originalPrice) || -1,
            originalPrice:Number(originalPrice) || Number(currentPrice) || -1,
            priceHistory:[],
            discountRate:Number(discountRate),
            category:'category',
            reviewsCount:100,
            stars:4.5,
            isOutOfStock:outOfStock,
            description,
            lowestPrice : Number(currentPrice) || Number(originalPrice) || -1,
            highestPrice : Number(originalPrice) || Number(currentPrice) || -1,
            averagePrice : Number(currentPrice) || Number(originalPrice)
        }
        // console.log(data);
        // console.log({title , currentPrice,originalPrice,outOfStock,images:imageUrl,currency,discountRate,description});
        return data;    
    }catch(e:any){
        throw new Error(`Failed to scrape product : ${e.message}`)
    }
}


// curl --proxy brd.superproxy.io:22225 
// --proxy-user brd-customer-hl_1de302ac-zone-unblocker:u088j9xzqb8f
//  -k https://lumtest.com/myip.json