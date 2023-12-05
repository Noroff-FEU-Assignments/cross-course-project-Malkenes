/*
snippets copied from:
https://stackoverflow.com/questions/578406/what-is-the-ultimate-postal-code-and-zip-regex/7185241#7185241
*/
export const zipCodeList = [{
    country: "NO" ,
    regEx: /\d{4}/
},
{
    country: "SE" ,
    regEx: /\d{3}[ ]?\d{2}/
},
{
    country: "DK" ,
    regEx: /\d{4}/
},
{
    country: "GB" ,
    regEx: /GIR[ ]?0AA|((AB|AL|B|BA|BB|BD|BH|BL|BN|BR|BS|BT|CA|CB|CF|CH|CM|CO|CR|CT|CV|CW|DA|DD|DE|DG|DH|DL|DN|DT|DY|E|EC|EH|EN|EX|FK|FY|G|GL|GY|GU|HA|HD|HG|HP|HR|HS|HU|HX|IG|IM|IP|IV|JE|KA|KT|KW|KY|L|LA|LD|LE|LL|LN|LS|LU|M|ME|MK|ML|N|NE|NG|NN|NP|NR|NW|OL|OX|PA|PE|PH|PL|PO|PR|RG|RH|RM|S|SA|SE|SG|SK|SL|SM|SN|SO|SP|SR|SS|ST|SW|SY|TA|TD|TF|TN|TQ|TR|TS|TW|UB|W|WA|WC|WD|WF|WN|WR|WS|WV|YO|ZE)(\d[\dA-Z]?[ ]?\d[ABD-HJLN-UW-Z]{2}))|BFPO[ ]?\d{1,4}/
},
{
    country: "SA" ,
    regEx: /\d{5}/
},
{
    country: "US" ,
    regEx: /\d{5}([ \-]\d{4})?/
}]
/*
taken from:
https://www.regular-expressions.info/creditcard.html
*/
export const creditCardList = [{
    type: "visa",
    regEx: /^4[0-9]{12}(?:[0-9]{3})?$/
},
{
    type: "mastercard",
    regEx:  /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/
}]