var request = require('request');
var cheerio = require('cheerio');
//ERROR WITH FS MODULE CANNOT FIND ETC
var fs = require('file-system');
// Fill array with searchable nouns
var nouns = fs.readFileSync('nouns.txt').toString().split("\n");

tempUrl = 'https://www.amazon.co.uk/Certified-Refurbished-Amazon-Echo-Black/dp/B01GAGVIKS/';

var price,priceTXT, pname, pnameTXT;

//request(tempUrl, dataScraper);
genProdUrl();

function dataScraper(error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        priceTXT = priceGrabber($);
        pname = $('#productTitle');
        pnameTXT = removeWhiteSpc(pname.text());
        console.log(pnameTXT + ' : ' + priceTXT);
    }else{
        console.log("ERROR: " + error + ", STATUS CODE:" + response.statusCode);
    }
}

function priceGrabber($){
     price = $('#priceblock_dealprice');
     priceTXT = price.text();
     if (priceTXT === ''){
         price = $('#priceblock_ourprice');
         priceTXT = price.text();
     }
     return priceTXT;
}

function genProdUrl(){
    var noun = nouns[randInt(0, nouns.length)];
    var rPgNum = randInt(1, 5);
    noun = removeWhiteSpc(noun);
    var searchUrl = 'https://www.amazon.com/s?url=search-alias%3Daps&field-keywords=' + noun + '&page=' + rPgNum;
    request(searchUrl, productScraper);
    console.log(searchUrl);
}


function productScraper(error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var resultIter = 0;  
        resultFound = false;
        while (resultFound === false) {
            resultIter++;
            //THE ID FOR THE LIST OF RESULTS IS ... HOWEVER POSSIBLY SEE THIS LINK FOR HOW TO USE WHOLE SECTION OF HTML AS VAIRIABLE https://github.com/cheeriojs/cheerio/issues/291 CURRENTLY ON GETS SINGLE ELEMENT AS OBJ 
            resultList = $('#s-results-list-atf');
            console.log(resultList);
            /*if (resultObj !== null) {
                resultFound = true;
            }*/
        }
    }else{
        console.log("ERROR: " + error + ", STATUS CODE:" + response.statusCode);
    }
}

function removeWhiteSpc(text){
    text = text.replace(/\s{2,}/g,' ').trim();
    return text; 
}
function randInt(min,max){
    var num = Math.floor((Math.random() * max) + min);
    return num;
}