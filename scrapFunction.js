const cheerio = require('cheerio');
const axios = require('axios');
const fetch = require('node-fetch')



const fetchData = async (url) => {
   const result = await axios.get(url);

  // const _result = await fetch(url);
   //const result = _result.json(); 
console.log(result);
    return cheerio.load(result);
}


const getResult = async (url) => {
    var result = [];

    const $ = await fetchData(url);


    $('article').each((i, e) => {

        let id = $(e).attr('id');
        //console.log(id)
        let pharmacy = {};

        pharmacy.name = $("#" + id + '> div.businessCapsule--mainRow > div.businessCapsule--mainContent > div.row > div.businessCapsule--titSpons > a > h2 > span').text().replace(/\n/g, "");

        let contact = [];
        $("#" + id + '> div.businessCapsule--mainRow > div.businessCapsule--mainContent > div.row > div.businessCapsule--ctas > a').each(
            (i, e) => {
                contact.push($(e).attr('href'))
            })


        pharmacy.website = $("#" + id + '> div.businessCapsule--mainRow > div.businessCapsule--mainContent > div.row > div.businessCapsule--ctas > a').attr('href');


        pharmacy.phone = $("#" + id + '> div.businessCapsule--mainRow > div.businessCapsule--mainContent > div.row > div.businessCapsule--ctas > div.expand--content > div > div.phoneOption > div.business--telephoneContent > span.business--telephoneNumber').text().replace(/\n/g, "");

        $("#" + id + '> div.businessCapsule--mainRow > div.businessCapsule--mainContent > div.row > a > span').each(
            (i, e) => {
                if (i == 2) { return pharmacy.address = $(e).text().replace(/\n/g, ""); }
            }
        )

        result.push(pharmacy);


    });


    return result;

}




module.exports = getResult;
