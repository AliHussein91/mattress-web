import { Injectable } from '@angular/core';
import { Country } from '../types/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  countries: Country[] = [
    {
        "english_name": "Saudi Arabia",
        "arabic_name": "السعودية",
        "alpha2_code": "SA",
        "alpha3_code": "SAU",
        "phone_code": "+966",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/320px-Flag_of_Saudi_Arabia.svg.png "
    },
    {
        "english_name": "Taiwan",
        "arabic_name": "تايوان",
        "alpha2_code": "TW",
        "alpha3_code": "TWN",
        "phone_code": "+886",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/7/72/Flag_of_the_Republic_of_China.svg/320px-Flag_of_the_Republic_of_China.svg.png "
    },
    {
        "english_name": "Western Sahara",
        "arabic_name": "الصحراء الغربية",
        "alpha2_code": "EH",
        "alpha3_code": "ESH",
        "phone_code": "+212",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/2/26/Flag_of_the_Sahrawi_Arab_Democratic_Republic.svg/320px-Flag_of_the_Sahrawi_Arab_Democratic_Republic.svg.png "
    },
    {
        "english_name": "Namibia",
        "arabic_name": "ناميبيا",
        "alpha2_code": "NA",
        "alpha3_code": "NAM",
        "phone_code": "+264",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_Namibia.svg/320px-Flag_of_Namibia.svg.png "
    },
    {
        "english_name": "Palestine",
        "arabic_name": "فلسطين",
        "alpha2_code": "PS",
        "alpha3_code": "PSE",
        "phone_code": "+970",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_Palestine.svg/320px-Flag_of_Palestine.svg.png "
    },
    {
        "english_name": "Vatican City",
        "arabic_name": "مدينة الفاتيكان",
        "alpha2_code": "VA",
        "alpha3_code": "VAT",
        "phone_code": "+379",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_the_Vatican_City.svg/320px-Flag_of_the_Vatican_City.svg.png "
    },
    {
        "english_name": "Guinea-Bissau",
        "arabic_name": "غينيا بيساو",
        "alpha2_code": "GW",
        "alpha3_code": "GNB",
        "phone_code": "+245",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Guinea-Bissau.svg/320px-Flag_of_Guinea-Bissau.svg.png "
    },
    {
        "english_name": "Niue",
        "arabic_name": "نييوي",
        "alpha2_code": "NU",
        "alpha3_code": "NIU",
        "phone_code": "+683",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Niue.svg/320px-Flag_of_Niue.svg.png "
    },
    {
        "english_name": "Sudan",
        "arabic_name": "السودان",
        "alpha2_code": "SD",
        "alpha3_code": "SDN",
        "phone_code": "+249",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Sudan.svg/320px-Flag_of_Sudan.svg.png "
    },
    {
        "english_name": "Gibraltar",
        "arabic_name": "جبل طارق",
        "alpha2_code": "GI",
        "alpha3_code": "GIB",
        "phone_code": "+350",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/0/02/Flag_of_Gibraltar.svg/320px-Flag_of_Gibraltar.svg.png "
    },
    {
        "english_name": "Gabon",
        "arabic_name": "الجابون",
        "alpha2_code": "GA",
        "alpha3_code": "GAB",
        "phone_code": "+241",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/0/04/Flag_of_Gabon.svg/320px-Flag_of_Gabon.svg.png "
    },
    {
        "english_name": "Libya",
        "arabic_name": "ليبيا",
        "alpha2_code": "LY",
        "alpha3_code": "LBY",
        "phone_code": "+218",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Libya.svg/320px-Flag_of_Libya.svg.png "
    },
    {
        "english_name": "Venezuela",
        "arabic_name": "فنزويلا",
        "alpha2_code": "VE",
        "alpha3_code": "VEN",
        "phone_code": "+58",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/0/06/Flag_of_Venezuela.svg/320px-Flag_of_Venezuela.svg.png "
    },
    {
        "english_name": "Zambia",
        "arabic_name": "زامبيا",
        "alpha2_code": "ZM",
        "alpha3_code": "ZMB",
        "phone_code": "+260",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/0/06/Flag_of_Zambia.svg/320px-Flag_of_Zambia.svg.png "
    },
    {
        "english_name": "Guam",
        "arabic_name": "غوام",
        "alpha2_code": "GU",
        "alpha3_code": "GUM",
        "phone_code": "+1",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/0/07/Flag_of_Guam.svg/320px-Flag_of_Guam.svg.png "
    },
    {
        "english_name": "Greenland",
        "arabic_name": "جرينلاند",
        "alpha2_code": "GL",
        "alpha3_code": "GRL",
        "phone_code": "+299",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_Greenland.svg/320px-Flag_of_Greenland.svg.png "
    },
    {
        "english_name": "South Korea",
        "arabic_name": "كوريا الجنوبية",
        "alpha2_code": "KR",
        "alpha3_code": "KOR",
        "phone_code": "+82",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/320px-Flag_of_South_Korea.svg.png "
    },
    {
        "english_name": "Benin",
        "arabic_name": "بنين",
        "alpha2_code": "BJ",
        "alpha3_code": "BEN",
        "phone_code": "+229",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Flag_of_Benin.svg/320px-Flag_of_Benin.svg.png "
    },
    {
        "english_name": "Jamaica",
        "arabic_name": "جامايكا",
        "alpha2_code": "JM",
        "alpha3_code": "JAM",
        "phone_code": "+1876",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Flag_of_Jamaica.svg/320px-Flag_of_Jamaica.svg.png "
    },
    {
        "english_name": "New Caledonia",
        "arabic_name": "كاليدونيا الجديدة",
        "alpha2_code": "NC",
        "alpha3_code": "NCL",
        "phone_code": "+687",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Drapeau_de_Nouvelle-Cal%C3%A9donie.png/320px-Drapeau_de_Nouvelle-Cal%C3%A9donie.png.png "
    },
    {
        "english_name": "Georgia",
        "arabic_name": "‫جورجيا",
        "alpha2_code": "GE",
        "alpha3_code": "GEO",
        "phone_code": "+995",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flag_of_Georgia.svg/320px-Flag_of_Georgia.svg.png "
    },
    {
        "english_name": "Maldives",
        "arabic_name": "المالديف",
        "alpha2_code": "MV",
        "alpha3_code": "MDV",
        "phone_code": "+960",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flag_of_Maldives.svg/320px-Flag_of_Maldives.svg.png "
    },
    {
        "english_name": "Cayman Islands",
        "arabic_name": "جزر كايمان",
        "alpha2_code": "KY",
        "alpha3_code": "CYM",
        "phone_code": "+1345",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flag_of_the_Cayman_Islands.svg/320px-Flag_of_the_Cayman_Islands.svg.png "
    },
    {
        "english_name": "Lithuania",
        "arabic_name": "ليتوانيا",
        "alpha2_code": "LT",
        "alpha3_code": "LTU",
        "phone_code": "+370",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/1/11/Flag_of_Lithuania.svg/320px-Flag_of_Lithuania.svg.png "
    },
    {
        "english_name": "Sri Lanka",
        "arabic_name": "سريلانكا",
        "alpha2_code": "LK",
        "alpha3_code": "LKA",
        "phone_code": "+94",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/1/11/Flag_of_Sri_Lanka.svg/320px-Flag_of_Sri_Lanka.svg.png "
    },
    {
        "english_name": "Rwanda",
        "arabic_name": "رواندا",
        "alpha2_code": "RW",
        "alpha3_code": "RWA",
        "phone_code": "+250",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/1/17/Flag_of_Rwanda.svg/320px-Flag_of_Rwanda.svg.png "
    },
    {
        "english_name": "Sierra Leone",
        "arabic_name": "سيراليون",
        "alpha2_code": "SL",
        "alpha3_code": "SLE",
        "phone_code": "+232",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/1/17/Flag_of_Sierra_Leone.svg/320px-Flag_of_Sierra_Leone.svg.png "
    },
    {
        "english_name": "Andorra",
        "arabic_name": "أندورا",
        "alpha2_code": "AD",
        "alpha3_code": "AND",
        "phone_code": "+376",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Andorra.svg/320px-Flag_of_Andorra.svg.png "
    },
    {
        "english_name": "Ghana",
        "arabic_name": "غانا",
        "alpha2_code": "GH",
        "alpha3_code": "GHA",
        "phone_code": "+233",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Ghana.svg/320px-Flag_of_Ghana.svg.png "
    },
    {
        "english_name": "Nicaragua",
        "arabic_name": "نيكاراغوا",
        "alpha2_code": "NI",
        "alpha3_code": "NIC",
        "phone_code": "+505",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Nicaragua.svg/320px-Flag_of_Nicaragua.svg.png "
    },
    {
        "english_name": "Argentina",
        "arabic_name": "الأرجنتين",
        "alpha2_code": "AR",
        "alpha3_code": "ARG",
        "phone_code": "+54",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/320px-Flag_of_Argentina.svg.png "
    },
    {
        "english_name": "Croatia",
        "arabic_name": "كرواتيا",
        "alpha2_code": "HR",
        "alpha3_code": "HRV",
        "phone_code": "+385",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_Croatia.svg/320px-Flag_of_Croatia.svg.png "
    },
    {
        "english_name": "Turkmenistan",
        "arabic_name": "تركمانستان",
        "alpha2_code": "TM",
        "alpha3_code": "TKM",
        "phone_code": "+993",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_Turkmenistan.svg/320px-Flag_of_Turkmenistan.svg.png "
    },
    {
        "english_name": "Jersey",
        "arabic_name": "جيرسي",
        "alpha2_code": "JE",
        "alpha3_code": "JEY",
        "phone_code": "+44",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Flag_of_Jersey.svg/320px-Flag_of_Jersey.svg.png "
    },
    {
        "english_name": "Caribbean Netherlands",
        "arabic_name": "الجزر الكاريبية الهولندية",
        "alpha2_code": "BQ",
        "alpha3_code": "BES",
        "phone_code": "+599",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/320px-Flag_of_the_Netherlands.svg.png "
    },
    {
        "english_name": "Netherlands",
        "arabic_name": "هولندا",
        "alpha2_code": "NL",
        "alpha3_code": "NLD",
        "phone_code": "+31",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/320px-Flag_of_the_Netherlands.svg.png "
    },
    {
        "english_name": "Colombia",
        "arabic_name": "كولومبيا",
        "alpha2_code": "CO",
        "alpha3_code": "COL",
        "phone_code": "+57",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colombia.svg/320px-Flag_of_Colombia.svg.png "
    },
    {
        "english_name": "Vietnam",
        "arabic_name": "فيتنام",
        "alpha2_code": "VN",
        "alpha3_code": "VNM",
        "phone_code": "+84",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/320px-Flag_of_Vietnam.svg.png "
    },
    {
        "english_name": "Timor-Leste",
        "arabic_name": "تيمور الشرقية",
        "alpha2_code": "TL",
        "alpha3_code": "TLS",
        "phone_code": "+670",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/2/26/Flag_of_East_Timor.svg/320px-Flag_of_East_Timor.svg.png "
    },
    {
        "english_name": "Moldova",
        "arabic_name": "مولدوفا",
        "alpha2_code": "MD",
        "alpha3_code": "MDA",
        "phone_code": "+373",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/2/27/Flag_of_Moldova.svg/320px-Flag_of_Moldova.svg.png "
    },
    {
        "english_name": "Paraguay",
        "arabic_name": "باراغواي",
        "alpha2_code": "PY",
        "alpha3_code": "PRY",
        "phone_code": "+595",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/2/27/Flag_of_Paraguay.svg/320px-Flag_of_Paraguay.svg.png "
    },
    {
        "english_name": "Puerto Rico",
        "arabic_name": "بورتوريكو",
        "alpha2_code": "PR",
        "alpha3_code": "PRI",
        "phone_code": "+1787",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/2/28/Flag_of_Puerto_Rico.svg/320px-Flag_of_Puerto_Rico.svg.png "
    },
    {
        "english_name": "Eritrea",
        "arabic_name": "إريتريا",
        "alpha2_code": "ER",
        "alpha3_code": "ERI",
        "phone_code": "+291",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/2/29/Flag_of_Eritrea.svg/320px-Flag_of_Eritrea.svg.png "
    },
    {
        "english_name": "Bahrain",
        "arabic_name": "البحرين",
        "alpha2_code": "BH",
        "alpha3_code": "BHR",
        "phone_code": "+973",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Bahrain.svg/320px-Flag_of_Bahrain.svg.png "
    },
    {
        "english_name": "Morocco",
        "arabic_name": "المغرب",
        "alpha2_code": "MA",
        "alpha3_code": "MAR",
        "phone_code": "+212",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Morocco.svg/320px-Flag_of_Morocco.svg.png "
    },
    {
        "english_name": "Marshall Islands",
        "arabic_name": "جزر مارشال",
        "alpha2_code": "MH",
        "alpha3_code": "MHL",
        "phone_code": "+692",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Flag_of_the_Marshall_Islands.svg/320px-Flag_of_the_Marshall_Islands.svg.png "
    },
    {
        "english_name": "Armenia",
        "arabic_name": "أرمينيا",
        "alpha2_code": "AM",
        "alpha3_code": "ARM",
        "phone_code": "+374",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_Armenia.svg/320px-Flag_of_Armenia.svg.png "
    },
    {
        "english_name": "Nauru",
        "arabic_name": "ناورو",
        "alpha2_code": "NR",
        "alpha3_code": "NRU",
        "phone_code": "+674",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/3/30/Flag_of_Nauru.svg/320px-Flag_of_Nauru.svg.png "
    },
    {
        "english_name": "Burkina Faso",
        "arabic_name": "بوركينا فاسو",
        "alpha2_code": "BF",
        "alpha3_code": "BFA",
        "phone_code": "+226",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/3/31/Flag_of_Burkina_Faso.svg/320px-Flag_of_Burkina_Faso.svg.png "
    },
    {
        "english_name": "Equatorial Guinea",
        "arabic_name": "غينيا الاستوائية",
        "alpha2_code": "GQ",
        "alpha3_code": "GNQ",
        "phone_code": "+240",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/3/31/Flag_of_Equatorial_Guinea.svg/320px-Flag_of_Equatorial_Guinea.svg.png "
    },
    {
        "english_name": "Samoa",
        "arabic_name": "ساموا",
        "alpha2_code": "WS",
        "alpha3_code": "WSM",
        "phone_code": "+685",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/3/31/Flag_of_Samoa.svg/320px-Flag_of_Samoa.svg.png "
    },
    {
        "english_name": "Pakistan",
        "arabic_name": "باكستان",
        "alpha2_code": "PK",
        "alpha3_code": "PAK",
        "phone_code": "+92",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Pakistan.svg/320px-Flag_of_Pakistan.svg.png "
    },
    {
        "english_name": "Djibouti",
        "arabic_name": "جيبوتي",
        "alpha2_code": "DJ",
        "alpha3_code": "DJI",
        "phone_code": "+253",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/3/34/Flag_of_Djibouti.svg/320px-Flag_of_Djibouti.svg.png "
    },
    {
        "english_name": "El Salvador",
        "arabic_name": "السلفادور",
        "alpha2_code": "SV",
        "alpha3_code": "SLV",
        "phone_code": "+503",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/3/34/Flag_of_El_Salvador.svg/320px-Flag_of_El_Salvador.svg.png "
    },
    {
        "english_name": "Cook Islands",
        "arabic_name": "جزر كوك",
        "alpha2_code": "CK",
        "alpha3_code": "COK",
        "phone_code": "+682",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/3/35/Flag_of_the_Cook_Islands.svg/320px-Flag_of_the_Cook_Islands.svg.png "
    },
    {
        "english_name": "Albania",
        "arabic_name": "ألبانيا",
        "alpha2_code": "AL",
        "alpha3_code": "ALB",
        "phone_code": "+355",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/3/36/Flag_of_Albania.svg/320px-Flag_of_Albania.svg.png "
    },
    {
        "english_name": "Cabo Verde",
        "arabic_name": "كابو فيردي",
        "alpha2_code": "CV",
        "alpha3_code": "CPV",
        "phone_code": "+238",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/3/38/Flag_of_Cape_Verde.svg/320px-Flag_of_Cape_Verde.svg.png "
    },
    {
        "english_name": "Tanzania",
        "arabic_name": "تنزانيا",
        "alpha2_code": "TZ",
        "alpha3_code": "TZA",
        "phone_code": "+255",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/3/38/Flag_of_Tanzania.svg/320px-Flag_of_Tanzania.svg.png "
    },
    {
        "english_name": "Tuvalu",
        "arabic_name": "توفالو",
        "alpha2_code": "TV",
        "alpha3_code": "TUV",
        "phone_code": "+688",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/3/38/Flag_of_Tuvalu.svg/320px-Flag_of_Tuvalu.svg.png "
    },
    {
        "english_name": "Faroe Islands",
        "arabic_name": "جزر فارو",
        "alpha2_code": "FO",
        "alpha3_code": "FRO",
        "phone_code": "+298",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Flag_of_the_Faroe_Islands.svg/320px-Flag_of_the_Faroe_Islands.svg.png "
    },
    {
        "english_name": "New Zealand",
        "arabic_name": "نيوزيلندا",
        "alpha2_code": "NZ",
        "alpha3_code": "NZL",
        "phone_code": "+64",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Flag_of_New_Zealand.svg/320px-Flag_of_New_Zealand.svg.png "
    },
    {
        "english_name": "Austria",
        "arabic_name": "النمسا",
        "alpha2_code": "AT",
        "alpha3_code": "AUT",
        "phone_code": "+43",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Austria.svg/320px-Flag_of_Austria.svg.png "
    },
    {
        "english_name": "British Virgin Islands",
        "arabic_name": "جزر العذراء البريطانية",
        "alpha2_code": "VG",
        "alpha3_code": "VGB",
        "phone_code": "+1",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/4/42/Flag_of_the_British_Virgin_Islands.svg/320px-Flag_of_the_British_Virgin_Islands.svg.png "
    },
    {
        "english_name": "Mauritania",
        "arabic_name": "موريتانيا",
        "alpha2_code": "MR",
        "alpha3_code": "MRT",
        "phone_code": "+222",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/4/43/Flag_of_Mauritania.svg/320px-Flag_of_Mauritania.svg.png "
    },
    {
        "english_name": "Ireland",
        "arabic_name": "أيرلندا",
        "alpha2_code": "IE",
        "alpha3_code": "IRL",
        "phone_code": "+353",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/4/45/Flag_of_Ireland.svg/320px-Flag_of_Ireland.svg.png "
    },
    {
        "english_name": "Liechtenstein",
        "arabic_name": "ليختنشتاين",
        "alpha2_code": "LI",
        "alpha3_code": "LIE",
        "phone_code": "+423",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/4/47/Flag_of_Liechtenstein.svg/320px-Flag_of_Liechtenstein.svg.png "
    },
    {
        "english_name": "Norfolk Island",
        "arabic_name": "جزيرة نورفولك",
        "alpha2_code": "NF",
        "alpha3_code": "NFK",
        "phone_code": "+6723",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Norfolk_Island.svg/320px-Flag_of_Norfolk_Island.svg.png "
    },
    {
        "english_name": "Palau",
        "arabic_name": "بالاو",
        "alpha2_code": "PW",
        "alpha3_code": "PLW",
        "phone_code": "+680",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Palau.svg/320px-Flag_of_Palau.svg.png "
    },
    {
        "english_name": "Singapore",
        "arabic_name": "سنغافورة",
        "alpha2_code": "SG",
        "alpha3_code": "SGP",
        "phone_code": "+65",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Singapore.svg/320px-Flag_of_Singapore.svg.png "
    },
    {
        "english_name": "Kenya",
        "arabic_name": "كينيا",
        "alpha2_code": "KE",
        "alpha3_code": "KEN",
        "phone_code": "+254",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Kenya.svg/320px-Flag_of_Kenya.svg.png "
    },
    {
        "english_name": "Ukraine",
        "arabic_name": "أوكرانيا",
        "alpha2_code": "UA",
        "alpha3_code": "UKR",
        "phone_code": "+380",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/320px-Flag_of_Ukraine.svg.png "
    },
    {
        "english_name": "Lesotho",
        "arabic_name": "ليسوتو",
        "alpha2_code": "LS",
        "alpha3_code": "LSO",
        "phone_code": "+266",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Flag_of_Lesotho.svg/320px-Flag_of_Lesotho.svg.png "
    },
    {
        "english_name": "Chad",
        "arabic_name": "تشاد",
        "alpha2_code": "TD",
        "alpha3_code": "TCD",
        "phone_code": "+235",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Flag_of_Chad.svg/320px-Flag_of_Chad.svg.png "
    },
    {
        "english_name": "Mongolia",
        "arabic_name": "منغوليا",
        "alpha2_code": "MN",
        "alpha3_code": "MNG",
        "phone_code": "+976",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Mongolia.svg/320px-Flag_of_Mongolia.svg.png "
    },
    {
        "english_name": "Uganda",
        "arabic_name": "أوغندا",
        "alpha2_code": "UG",
        "alpha3_code": "UGA",
        "phone_code": "+256",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Flag_of_Uganda.svg/320px-Flag_of_Uganda.svg.png "
    },
    {
        "english_name": "Cameroon",
        "arabic_name": "الكاميرون",
        "alpha2_code": "CM",
        "alpha3_code": "CMR",
        "phone_code": "+237",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Flag_of_Cameroon.svg/320px-Flag_of_Cameroon.svg.png "
    },
    {
        "english_name": "São Tomé and Príncipe",
        "arabic_name": "ساو تومي وبرينسيب",
        "alpha2_code": "ST",
        "alpha3_code": "STP",
        "phone_code": "+239",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Flag_of_Sao_Tome_and_Principe.svg/320px-Flag_of_Sao_Tome_and_Principe.svg.png "
    },
    {
        "english_name": "Burundi",
        "arabic_name": "بوروندي",
        "alpha2_code": "BI",
        "alpha3_code": "BDI",
        "phone_code": "+257",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/5/50/Flag_of_Burundi.svg/320px-Flag_of_Burundi.svg.png "
    },
    {
        "english_name": "North Korea",
        "arabic_name": "كوريا الشمالية",
        "alpha2_code": "KP",
        "alpha3_code": "PRK",
        "phone_code": "+850",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/5/51/Flag_of_North_Korea.svg/320px-Flag_of_North_Korea.svg.png "
    },
    {
        "english_name": "Åland Islands",
        "arabic_name": "جزر أولاند",
        "alpha2_code": "AX",
        "alpha3_code": "ALA",
        "phone_code": "+358",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/5/52/Flag_of_%C3%85land.svg/320px-Flag_of_%C3%85land.svg.png "
    },
    {
        "english_name": "Syria",
        "arabic_name": "سوريا",
        "alpha2_code": "SY",
        "alpha3_code": "SYR",
        "phone_code": "+963",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/5/53/Flag_of_Syria.svg/320px-Flag_of_Syria.svg.png "
    },
    {
        "english_name": "Haiti",
        "arabic_name": "هايتي",
        "alpha2_code": "HT",
        "alpha3_code": "HTI",
        "phone_code": "+509",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/5/56/Flag_of_Haiti.svg/320px-Flag_of_Haiti.svg.png "
    },
    {
        "english_name": "Laos",
        "arabic_name": "لاوس",
        "alpha2_code": "LA",
        "alpha3_code": "LAO",
        "phone_code": "+856",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/5/56/Flag_of_Laos.svg/320px-Flag_of_Laos.svg.png "
    },
    {
        "english_name": "Lebanon",
        "arabic_name": "لبنان",
        "alpha2_code": "LB",
        "alpha3_code": "LBN",
        "phone_code": "+961",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/5/59/Flag_of_Lebanon.svg/320px-Flag_of_Lebanon.svg.png "
    },
    {
        "english_name": "Hong Kong",
        "arabic_name": "هونج كونج",
        "alpha2_code": "HK",
        "alpha3_code": "HKG",
        "phone_code": "+852",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Flag_of_Hong_Kong.svg/320px-Flag_of_Hong_Kong.svg.png "
    },
    {
        "english_name": "Greece",
        "arabic_name": "اليونان",
        "alpha2_code": "GR",
        "alpha3_code": "GRC",
        "phone_code": "+30",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/320px-Flag_of_Greece.svg.png "
    },
    {
        "english_name": "Portugal",
        "arabic_name": "البرتغال",
        "alpha2_code": "PT",
        "alpha3_code": "PRT",
        "phone_code": "+351",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/320px-Flag_of_Portugal.svg.png "
    },
    {
        "english_name": "Afghanistan",
        "arabic_name": "أفغانستان",
        "alpha2_code": "AF",
        "alpha3_code": "AFG",
        "phone_code": "+93",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_the_Taliban.svg/320px-Flag_of_the_Taliban.svg.png "
    },
    {
        "english_name": "Suriname",
        "arabic_name": "سورينام",
        "alpha2_code": "SR",
        "alpha3_code": "SUR",
        "phone_code": "+597",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/6/60/Flag_of_Suriname.svg/320px-Flag_of_Suriname.svg.png "
    },
    {
        "english_name": "Macao",
        "arabic_name": "ماكاو",
        "alpha2_code": "MO",
        "alpha3_code": "MAC",
        "phone_code": "+853",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/6/63/Flag_of_Macau.svg/320px-Flag_of_Macau.svg.png "
    },
    {
        "english_name": "Montenegro",
        "arabic_name": "مونتينيغرو",
        "alpha2_code": "ME",
        "alpha3_code": "MNE",
        "phone_code": "+382",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/6/64/Flag_of_Montenegro.svg/320px-Flag_of_Montenegro.svg.png "
    },
    {
        "english_name": "Trinidad and Tobago",
        "arabic_name": "ترينيداد وتوباغو",
        "alpha2_code": "TT",
        "alpha3_code": "TTO",
        "phone_code": "+868",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/6/64/Flag_of_Trinidad_and_Tobago.svg/320px-Flag_of_Trinidad_and_Tobago.svg.png "
    },
    {
        "english_name": "Belgium",
        "arabic_name": "بلجيكا",
        "alpha2_code": "BE",
        "alpha3_code": "BEL",
        "phone_code": "+32",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Belgium.svg/320px-Flag_of_Belgium.svg.png "
    },
    {
        "english_name": "Qatar",
        "arabic_name": "قطر",
        "alpha2_code": "QA",
        "alpha3_code": "QAT",
        "phone_code": "+974",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Qatar.svg/320px-Flag_of_Qatar.svg.png "
    },
    {
        "english_name": "British Indian Ocean Territory",
        "arabic_name": "إقليم المحيط الهندي البريطاني",
        "alpha2_code": "IO",
        "alpha3_code": "IOT",
        "phone_code": "+246",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_the_Commissioner_of_the_British_Indian_Ocean_Territory.svg/320px-Flag_of_the_Commissioner_of_the_British_Indian_Ocean_Territory.svg.png "
    },
    {
        "english_name": "Malaysia",
        "arabic_name": "ماليزيا",
        "alpha2_code": "MY",
        "alpha3_code": "MYS",
        "phone_code": "+60",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/6/66/Flag_of_Malaysia.svg/320px-Flag_of_Malaysia.svg.png "
    },
    {
        "english_name": "Christmas Island",
        "arabic_name": "جزيرة الكريسماس",
        "alpha2_code": "CX",
        "alpha3_code": "CXR",
        "phone_code": "+61",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/6/67/Flag_of_Christmas_Island.svg/320px-Flag_of_Christmas_Island.svg.png "
    },
    {
        "english_name": "Togo",
        "arabic_name": "توجو",
        "alpha2_code": "TG",
        "alpha3_code": "TGO",
        "phone_code": "+228",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/6/68/Flag_of_Togo.svg/320px-Flag_of_Togo.svg.png "
    },
    {
        "english_name": "Zimbabwe",
        "arabic_name": "زيمبابوي",
        "alpha2_code": "ZW",
        "alpha3_code": "ZWE",
        "phone_code": "+263",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Flag_of_Zimbabwe.svg/320px-Flag_of_Zimbabwe.svg.png "
    },
    {
        "english_name": "Saint Vincent and the Grenadines",
        "arabic_name": "سانت فينسنت والغرينادين",
        "alpha2_code": "VC",
        "alpha3_code": "VCT",
        "phone_code": "+784",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Flag_of_Saint_Vincent_and_the_Grenadines.svg/320px-Flag_of_Saint_Vincent_and_the_Grenadines.svg.png "
    },
    {
        "english_name": "Vanuatu",
        "arabic_name": "فانواتو",
        "alpha2_code": "VU",
        "alpha3_code": "VUT",
        "phone_code": "+678",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Flag_of_Vanuatu_%28official%29.svg/320px-Flag_of_Vanuatu_%28official%29.svg.png "
    },
    {
        "english_name": "Central African Republic",
        "arabic_name": "جمهورية أفريقيا الوسطى",
        "alpha2_code": "CF",
        "alpha3_code": "CAF",
        "phone_code": "+236",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Flag_of_the_Central_African_Republic.svg/320px-Flag_of_the_Central_African_Republic.svg.png "
    },
    {
        "english_name": "DR Congo",
        "arabic_name": "جمهورية الكونغو الديمقراطية",
        "alpha2_code": "CD",
        "alpha3_code": "COD",
        "phone_code": "+243",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg/320px-Flag_of_the_Democratic_Republic_of_the_Congo.svg.png "
    },
    {
        "english_name": "Ethiopia",
        "arabic_name": "إثيوبيا",
        "alpha2_code": "ET",
        "alpha3_code": "ETH",
        "phone_code": "+251",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/7/71/Flag_of_Ethiopia.svg/320px-Flag_of_Ethiopia.svg.png "
    },
    {
        "english_name": "Malta",
        "arabic_name": "مالطا",
        "alpha2_code": "MT",
        "alpha3_code": "MLT",
        "phone_code": "+356",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Malta.svg/320px-Flag_of_Malta.svg.png "
    },
    {
        "english_name": "Romania",
        "arabic_name": "رومانيا",
        "alpha2_code": "RO",
        "alpha3_code": "ROU",
        "phone_code": "+40",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Romania.svg/320px-Flag_of_Romania.svg.png "
    },
    {
        "english_name": "Cocos (Keeling) Islands",
        "arabic_name": "جزر كوكوس",
        "alpha2_code": "CC",
        "alpha3_code": "CCK",
        "phone_code": "+61",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/7/74/Flag_of_the_Cocos_%28Keeling%29_Islands.svg/320px-Flag_of_the_Cocos_%28Keeling%29_Islands.svg.png "
    },
    {
        "english_name": "Solomon Islands",
        "arabic_name": "جزر سليمان",
        "alpha2_code": "SB",
        "alpha3_code": "SLB",
        "phone_code": "+677",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/7/74/Flag_of_the_Solomon_Islands.svg/320px-Flag_of_the_Solomon_Islands.svg.png "
    },
    {
        "english_name": "Algeria",
        "arabic_name": "الجزائر",
        "alpha2_code": "DZ",
        "alpha3_code": "DZA",
        "phone_code": "+213",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_Algeria.svg/320px-Flag_of_Algeria.svg.png "
    },
    {
        "english_name": "Mauritius",
        "arabic_name": "موريشيوس",
        "alpha2_code": "MU",
        "alpha3_code": "MUS",
        "phone_code": "+230",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_Mauritius.svg/320px-Flag_of_Mauritius.svg.png "
    },
    {
        "english_name": "Gambia",
        "arabic_name": "غامبيا",
        "alpha2_code": "GM",
        "alpha3_code": "GMB",
        "phone_code": "+220",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_The_Gambia.svg/320px-Flag_of_The_Gambia.svg.png "
    },
    {
        "english_name": "Chile",
        "arabic_name": "تشيلي",
        "alpha2_code": "CL",
        "alpha3_code": "CHL",
        "phone_code": "+56",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/7/78/Flag_of_Chile.svg/320px-Flag_of_Chile.svg.png "
    },
    {
        "english_name": "Nigeria",
        "arabic_name": "نيجيريا",
        "alpha2_code": "NG",
        "alpha3_code": "NGA",
        "phone_code": "+234",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flag_of_Nigeria.svg/320px-Flag_of_Nigeria.svg.png "
    },
    {
        "english_name": "North Macedonia",
        "arabic_name": "مقدونيا الشمالية",
        "alpha2_code": "MK",
        "alpha3_code": "MKD",
        "phone_code": "+389",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flag_of_North_Macedonia.svg/320px-Flag_of_North_Macedonia.svg.png "
    },
    {
        "english_name": "South Sudan",
        "arabic_name": "جنوب السودان",
        "alpha2_code": "SS",
        "alpha3_code": "SSD",
        "phone_code": "+211",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Flag_of_South_Sudan.svg/320px-Flag_of_South_Sudan.svg.png "
    },
    {
        "english_name": "Honduras",
        "arabic_name": "هندوراس",
        "alpha2_code": "HN",
        "alpha3_code": "HND",
        "phone_code": "+504",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/8/82/Flag_of_Honduras.svg/320px-Flag_of_Honduras.svg.png "
    },
    {
        "english_name": "Cambodia",
        "arabic_name": "كمبوديا",
        "alpha2_code": "KH",
        "alpha3_code": "KHM",
        "phone_code": "+855",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Cambodia.svg/320px-Flag_of_Cambodia.svg.png "
    },
    {
        "english_name": "Falkland Islands",
        "arabic_name": "جزر فوكلاند",
        "alpha2_code": "FK",
        "alpha3_code": "FLK",
        "phone_code": "+500",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_Falkland_Islands.svg/320px-Flag_of_the_Falkland_Islands.svg.png "
    },
    {
        "english_name": "Latvia",
        "arabic_name": "لاتفيا",
        "alpha2_code": "LV",
        "alpha3_code": "LVA",
        "phone_code": "+371",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Latvia.svg/320px-Flag_of_Latvia.svg.png "
    },
    {
        "english_name": "Uzbekistan",
        "arabic_name": "أوزبكستان",
        "alpha2_code": "UZ",
        "alpha3_code": "UZB",
        "phone_code": "+998",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Uzbekistan.svg/320px-Flag_of_Uzbekistan.svg.png "
    },
    {
        "english_name": "Belarus",
        "arabic_name": "بيلاروسيا",
        "alpha2_code": "BY",
        "alpha3_code": "BLR",
        "phone_code": "+375",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/8/85/Flag_of_Belarus.svg/320px-Flag_of_Belarus.svg.png "
    },
    {
        "english_name": "American Samoa",
        "arabic_name": "ساموا الأمريكية",
        "alpha2_code": "AS",
        "alpha3_code": "ASM",
        "phone_code": "+684",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/8/87/Flag_of_American_Samoa.svg/320px-Flag_of_American_Samoa.svg.png "
    },
    {
        "english_name": "Australia",
        "arabic_name": "أستراليا",
        "alpha2_code": "AU",
        "alpha3_code": "AUS",
        "phone_code": "+61",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/320px-Flag_of_Australia_%28converted%29.svg.png "
    },
    {
        "english_name": "Pitcairn Islands",
        "arabic_name": "جزر بيتكيرن",
        "alpha2_code": "PN",
        "alpha3_code": "PCN",
        "phone_code": "+672",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_the_Pitcairn_Islands.svg/320px-Flag_of_the_Pitcairn_Islands.svg.png "
    },
    {
        "english_name": "Spain",
        "arabic_name": "إسبانيا",
        "alpha2_code": "ES",
        "alpha3_code": "ESP",
        "phone_code": "+34",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/320px-Bandera_de_Espa%C3%B1a.svg.png "
    },
    {
        "english_name": "Antigua and Barbuda",
        "arabic_name": "أنتيغوا وبربودا",
        "alpha2_code": "AG",
        "alpha3_code": "ATG",
        "phone_code": "+268",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/8/89/Flag_of_Antigua_and_Barbuda.svg/320px-Flag_of_Antigua_and_Barbuda.svg.png "
    },
    {
        "english_name": "Yemen",
        "arabic_name": "اليمن",
        "alpha2_code": "YE",
        "alpha3_code": "YEM",
        "phone_code": "+967",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/8/89/Flag_of_Yemen.svg/320px-Flag_of_Yemen.svg.png "
    },
    {
        "english_name": "Myanmar",
        "arabic_name": "ميانمار",
        "alpha2_code": "MM",
        "alpha3_code": "MMR",
        "phone_code": "+95",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Flag_of_Myanmar.svg/320px-Flag_of_Myanmar.svg.png "
    },
    {
        "english_name": "Tokelau",
        "arabic_name": "توكيلاو",
        "alpha2_code": "TK",
        "alpha3_code": "TKL",
        "phone_code": "+690",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Flag_of_Tokelau.svg/320px-Flag_of_Tokelau.svg.png "
    },
    {
        "english_name": "Estonia",
        "arabic_name": "إستونيا",
        "alpha2_code": "EE",
        "alpha3_code": "EST",
        "phone_code": "+372",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Flag_of_Estonia.svg/320px-Flag_of_Estonia.svg.png "
    },
    {
        "english_name": "Bhutan",
        "arabic_name": "بوتان",
        "alpha2_code": "BT",
        "alpha3_code": "BTN",
        "phone_code": "+975",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/9/91/Flag_of_Bhutan.svg/320px-Flag_of_Bhutan.svg.png "
    },
    {
        "english_name": "Mali",
        "arabic_name": "مالي",
        "alpha2_code": "ML",
        "alpha3_code": "MLI",
        "phone_code": "+223",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/9/92/Flag_of_Mali.svg/320px-Flag_of_Mali.svg.png "
    },
    {
        "english_name": "Congo Republic",
        "arabic_name": "جمهورية الكونغو",
        "alpha2_code": "CG",
        "alpha3_code": "COG",
        "phone_code": "+242",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/9/92/Flag_of_the_Republic_of_the_Congo.svg/320px-Flag_of_the_Republic_of_the_Congo.svg.png "
    },
    {
        "english_name": "Bahamas",
        "arabic_name": "باهاماس",
        "alpha2_code": "BS",
        "alpha3_code": "BHS",
        "phone_code": "+1",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/9/93/Flag_of_the_Bahamas.svg/320px-Flag_of_the_Bahamas.svg.png "
    },
    {
        "english_name": "Comoros",
        "arabic_name": "جزر القمر",
        "alpha2_code": "KM",
        "alpha3_code": "COM",
        "phone_code": "+269",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/9/94/Flag_of_the_Comoros.svg/320px-Flag_of_the_Comoros.svg.png "
    },
    {
        "english_name": "Guyana",
        "arabic_name": "غيانا",
        "alpha2_code": "GY",
        "alpha3_code": "GUY",
        "phone_code": "+592",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/9/99/Flag_of_Guyana.svg/320px-Flag_of_Guyana.svg.png "
    },
    {
        "english_name": "Philippines",
        "arabic_name": "الفلبين",
        "alpha2_code": "PH",
        "alpha3_code": "PHL",
        "phone_code": "+63",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/9/99/Flag_of_the_Philippines.svg/320px-Flag_of_the_Philippines.svg.png "
    },
    {
        "english_name": "Bulgaria",
        "arabic_name": "بلغاريا",
        "alpha2_code": "BG",
        "alpha3_code": "BGR",
        "phone_code": "+359",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Bulgaria.svg/320px-Flag_of_Bulgaria.svg.png "
    },
    {
        "english_name": "Tonga",
        "arabic_name": "تونغا",
        "alpha2_code": "TO",
        "alpha3_code": "TON",
        "phone_code": "+676",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Tonga.svg/320px-Flag_of_Tonga.svg.png "
    },
    {
        "english_name": "Nepal",
        "arabic_name": "نيبال",
        "alpha2_code": "NP",
        "alpha3_code": "NPL",
        "phone_code": "+977",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/320px-Flag_of_Nepal.svg.png "
    },
    {
        "english_name": "Brunei",
        "arabic_name": "بروناي",
        "alpha2_code": "BN",
        "alpha3_code": "BRN",
        "phone_code": "+673",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Brunei.svg/320px-Flag_of_Brunei.svg.png "
    },
    {
        "english_name": "Denmark",
        "arabic_name": "الدنمارك",
        "alpha2_code": "DK",
        "alpha3_code": "DNK",
        "phone_code": "+45",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/320px-Flag_of_Denmark.svg.png "
    },
    {
        "english_name": "Angola",
        "arabic_name": "أنغولا",
        "alpha2_code": "AO",
        "alpha3_code": "AGO",
        "phone_code": "+244",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Flag_of_Angola.svg/320px-Flag_of_Angola.svg.png "
    },
    {
        "english_name": "Indonesia",
        "arabic_name": "أندونيسيا",
        "alpha2_code": "ID",
        "alpha3_code": "IDN",
        "phone_code": "+62",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/320px-Flag_of_Indonesia.svg.png "
    },
    {
        "english_name": "Saint Lucia",
        "arabic_name": "سانت لوسيا",
        "alpha2_code": "LC",
        "alpha3_code": "LCA",
        "phone_code": "+1758",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Saint_Lucia.svg/320px-Flag_of_Saint_Lucia.svg.png "
    },
    {
        "english_name": "Dominican Republic",
        "arabic_name": "جمهورية الدومينيكان",
        "alpha2_code": "DO",
        "alpha3_code": "DOM",
        "phone_code": "+1",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_the_Dominican_Republic.svg/320px-Flag_of_the_Dominican_Republic.svg.png "
    },
    {
        "english_name": "Somalia",
        "arabic_name": "الصومال",
        "alpha2_code": "SO",
        "alpha3_code": "SOM",
        "phone_code": "+252",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Flag_of_Somalia.svg/320px-Flag_of_Somalia.svg.png "
    },
    {
        "english_name": "Turks and Caicos Islands",
        "arabic_name": "جزر توركس وكايكوس",
        "alpha2_code": "TC",
        "alpha3_code": "TCA",
        "phone_code": "+1",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Flag_of_the_Turks_and_Caicos_Islands.svg/320px-Flag_of_the_Turks_and_Caicos_Islands.svg.png "
    },
    {
        "english_name": "French Southern Territories",
        "arabic_name": "أراض فرنسية جنوبية",
        "alpha2_code": "TF",
        "alpha3_code": "ATF",
        "phone_code": "+262",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Flag_of_the_French_Southern_and_Antarctic_Lands.svg/320px-Flag_of_the_French_Southern_and_Antarctic_Lands.svg.png "
    },
    {
        "english_name": "Thailand",
        "arabic_name": "تايلاند",
        "alpha2_code": "TH",
        "alpha3_code": "THA",
        "phone_code": "+66",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_Thailand.svg/320px-Flag_of_Thailand.svg.png "
    },
    {
        "english_name": "Kuwait",
        "arabic_name": "الكويت",
        "alpha2_code": "KW",
        "alpha3_code": "KWT",
        "phone_code": "+965",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Flag_of_Kuwait.svg/320px-Flag_of_Kuwait.svg.png "
    },
    {
        "english_name": "Panama",
        "arabic_name": "بنما",
        "alpha2_code": "PA",
        "alpha3_code": "PAN",
        "phone_code": "+507",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Flag_of_Panama.svg/320px-Flag_of_Panama.svg.png "
    },
    {
        "english_name": "South Africa",
        "arabic_name": "جنوب أفريقيا",
        "alpha2_code": "ZA",
        "alpha3_code": "ZAF",
        "phone_code": "+27",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/a/af/Flag_of_South_Africa.svg/320px-Flag_of_South_Africa.svg.png "
    },
    {
        "english_name": "Curaçao",
        "arabic_name": "كوراساو",
        "alpha2_code": "CW",
        "alpha3_code": "CUW",
        "phone_code": "+599",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Flag_of_Cura%C3%A7ao.svg/320px-Flag_of_Cura%C3%A7ao.svg.png "
    },
    {
        "english_name": "San Marino",
        "arabic_name": "سان مارينو",
        "alpha2_code": "SM",
        "alpha3_code": "SMR",
        "phone_code": "+378",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Flag_of_San_Marino.svg/320px-Flag_of_San_Marino.svg.png "
    },
    {
        "english_name": "Bolivia",
        "arabic_name": "بوليفيا",
        "alpha2_code": "BO",
        "alpha3_code": "BOL",
        "phone_code": "+591",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Bandera_de_Bolivia_%28Estado%29.svg/320px-Bandera_de_Bolivia_%28Estado%29.svg.png "
    },
    {
        "english_name": "Anguilla",
        "arabic_name": "أنغويلا",
        "alpha2_code": "AI",
        "alpha3_code": "AIA",
        "phone_code": "+264",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Anguilla.svg/320px-Flag_of_Anguilla.svg.png "
    },
    {
        "english_name": "Turkey",
        "arabic_name": "تركيا",
        "alpha2_code": "TR",
        "alpha3_code": "TUR",
        "phone_code": "+90",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/320px-Flag_of_Turkey.svg.png "
    },
    {
        "english_name": "Liberia",
        "arabic_name": "ليبيريا",
        "alpha2_code": "LR",
        "alpha3_code": "LBR",
        "phone_code": "+231",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Flag_of_Liberia.svg/320px-Flag_of_Liberia.svg.png "
    },
    {
        "english_name": "Fiji",
        "arabic_name": "فيجي",
        "alpha2_code": "FJ",
        "alpha3_code": "FJI",
        "phone_code": "+679",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Fiji.svg/320px-Flag_of_Fiji.svg.png "
    },
    {
        "english_name": "Heard Island and McDonald Islands",
        "arabic_name": "جزيرة هيرد وجزر ماكدونالد",
        "alpha2_code": "HM",
        "alpha3_code": "HMD",
        "phone_code": "+672",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Proposed_flag_of_Antarctica_%28Graham_Bartram%29.svg/320px-Proposed_flag_of_Antarctica_%28Graham_Bartram%29.svg.png "
    },
    {
        "english_name": "Finland",
        "arabic_name": "فنلندا",
        "alpha2_code": "FI",
        "alpha3_code": "FIN",
        "phone_code": "+358",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Finland.svg/320px-Flag_of_Finland.svg.png "
    },
    {
        "english_name": "Grenada",
        "arabic_name": "غرينادا",
        "alpha2_code": "GD",
        "alpha3_code": "GRD",
        "phone_code": "+473",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Grenada.svg/320px-Flag_of_Grenada.svg.png "
    },
    {
        "english_name": "Madagascar",
        "arabic_name": "مدغشقر",
        "alpha2_code": "MG",
        "alpha3_code": "MDG",
        "phone_code": "+261",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Madagascar.svg/320px-Flag_of_Madagascar.svg.png "
    },
    {
        "english_name": "Isle of Man",
        "arabic_name": "جزيرة مان",
        "alpha2_code": "IM",
        "alpha3_code": "IMN",
        "phone_code": "+44",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_the_Isle_of_Man.svg/320px-Flag_of_the_Isle_of_Man.svg.png "
    },
    {
        "english_name": "Cuba",
        "arabic_name": "كوبا",
        "alpha2_code": "CU",
        "alpha3_code": "CUB",
        "phone_code": "+53",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Flag_of_Cuba.svg/320px-Flag_of_Cuba.svg.png "
    },
    {
        "english_name": "Bermuda",
        "arabic_name": "برمودا",
        "alpha2_code": "BM",
        "alpha3_code": "BMU",
        "phone_code": "+1",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Flag_of_Bermuda.svg/320px-Flag_of_Bermuda.svg.png "
    },
    {
        "english_name": "Bosnia and Herzegovina",
        "arabic_name": "البوسنة والهرسك",
        "alpha2_code": "BA",
        "alpha3_code": "BIH",
        "phone_code": "+387",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Flag_of_Bosnia_and_Herzegovina.svg/320px-Flag_of_Bosnia_and_Herzegovina.svg.png "
    },
    {
        "english_name": "Jordan",
        "arabic_name": "الأردن",
        "alpha2_code": "JO",
        "alpha3_code": "JOR",
        "phone_code": "+962",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Flag_of_Jordan.svg/320px-Flag_of_Jordan.svg.png "
    },
    {
        "english_name": "Hungary",
        "arabic_name": "هنجاريا",
        "alpha2_code": "HU",
        "alpha3_code": "HUN",
        "phone_code": "+36",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Flag_of_Hungary.svg/320px-Flag_of_Hungary.svg.png "
    },
    {
        "english_name": "Dominica",
        "arabic_name": "دومينيكا",
        "alpha2_code": "DM",
        "alpha3_code": "DMA",
        "phone_code": "+767",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Flag_of_Dominica.svg/320px-Flag_of_Dominica.svg.png "
    },
    {
        "english_name": "Kyrgyzstan",
        "arabic_name": "قيرغيزستان",
        "alpha2_code": "KG",
        "alpha3_code": "KGZ",
        "phone_code": "+996",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Flag_of_Kyrgyzstan.svg/320px-Flag_of_Kyrgyzstan.svg.png "
    },
    {
        "english_name": "Iran",
        "arabic_name": "إيران",
        "alpha2_code": "IR",
        "alpha3_code": "IRN",
        "phone_code": "+98",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flag_of_Iran.svg/320px-Flag_of_Iran.svg.png "
    },
    {
        "english_name": "Czechia",
        "arabic_name": "التشيك",
        "alpha2_code": "CZ",
        "alpha3_code": "CZE",
        "phone_code": "+420",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_Czech_Republic.svg/320px-Flag_of_the_Czech_Republic.svg.png "
    },
    {
        "english_name": "United Arab Emirates",
        "arabic_name": "الإمارات العربية المتحدة",
        "alpha2_code": "AE",
        "alpha3_code": "ARE",
        "phone_code": "+971",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/320px-Flag_of_the_United_Arab_Emirates.svg.png "
    },
    {
        "english_name": "Iceland",
        "arabic_name": "آيسلندا",
        "alpha2_code": "IS",
        "alpha3_code": "ISL",
        "phone_code": "+354",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Iceland.svg/320px-Flag_of_Iceland.svg.png "
    },
    {
        "english_name": "Tunisia",
        "arabic_name": "تونس",
        "alpha2_code": "TN",
        "alpha3_code": "TUN",
        "phone_code": "+216",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/320px-Flag_of_Tunisia.svg.png "
    },
    {
        "english_name": "Peru",
        "arabic_name": "بيرو",
        "alpha2_code": "PE",
        "alpha3_code": "PER",
        "phone_code": "+51",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Flag_of_Peru.svg/320px-Flag_of_Peru.svg.png "
    },
    {
        "english_name": "Montserrat",
        "arabic_name": "مونتسرات",
        "alpha2_code": "MS",
        "alpha3_code": "MSR",
        "phone_code": "+1664",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Flag_of_Montserrat.svg/320px-Flag_of_Montserrat.svg.png "
    },
    {
        "english_name": "Mozambique",
        "arabic_name": "موزمبيق",
        "alpha2_code": "MZ",
        "alpha3_code": "MOZ",
        "phone_code": "+258",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Flag_of_Mozambique.svg/320px-Flag_of_Mozambique.svg.png "
    },
    {
        "english_name": "Tajikistan",
        "arabic_name": "طاجيكستان",
        "alpha2_code": "TJ",
        "alpha3_code": "TJK",
        "phone_code": "+992",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Flag_of_Tajikistan.svg/320px-Flag_of_Tajikistan.svg.png "
    },
    {
        "english_name": "Malawi",
        "arabic_name": "مالاوي",
        "alpha2_code": "MW",
        "alpha3_code": "MWI",
        "phone_code": "+265",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Flag_of_Malawi.svg/320px-Flag_of_Malawi.svg.png "
    },
    {
        "english_name": "Kazakhstan",
        "arabic_name": "كازاخستان",
        "alpha2_code": "KZ",
        "alpha3_code": "KAZ",
        "phone_code": "+7",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Flag_of_Kazakhstan.svg/320px-Flag_of_Kazakhstan.svg.png "
    },
    {
        "english_name": "Kiribati",
        "arabic_name": "كيريباتي",
        "alpha2_code": "KI",
        "alpha3_code": "KIR",
        "phone_code": "+686",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Flag_of_Kiribati.svg/320px-Flag_of_Kiribati.svg.png "
    },
    {
        "english_name": "Sint Maarten",
        "arabic_name": "سانت مارتن",
        "alpha2_code": "SX",
        "alpha3_code": "SXM",
        "phone_code": "+599",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Flag_of_Sint_Maarten.svg/320px-Flag_of_Sint_Maarten.svg.png "
    },
    {
        "english_name": "Cyprus",
        "arabic_name": "قبرص",
        "alpha2_code": "CY",
        "alpha3_code": "CYP",
        "phone_code": "+357",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Cyprus.svg/320px-Flag_of_Cyprus.svg.png "
    },
    {
        "english_name": "Canada",
        "arabic_name": "كندا",
        "alpha2_code": "CA",
        "alpha3_code": "CAN",
        "phone_code": "+1",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/320px-Flag_of_Canada_%28Pantone%29.svg.png "
    },
    {
        "english_name": "Norway",
        "arabic_name": "النرويج",
        "alpha2_code": "NO",
        "alpha3_code": "NOR",
        "phone_code": "+47",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Norway.svg/320px-Flag_of_Norway.svg.png "
    },
    {
        "english_name": "Svalbard and Jan Mayen",
        "arabic_name": "سفالبارد ويان ماين",
        "alpha2_code": "SJ",
        "alpha3_code": "SJM",
        "phone_code": "+47",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Norway.svg/320px-Flag_of_Norway.svg.png "
    },
    {
        "english_name": "Luxembourg",
        "arabic_name": "لوكسمبورغ",
        "alpha2_code": "LU",
        "alpha3_code": "LUX",
        "phone_code": "+352",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/d/da/Flag_of_Luxembourg.svg/320px-Flag_of_Luxembourg.svg.png "
    },
    {
        "english_name": "French Polynesia",
        "arabic_name": "بولينزيا الفرنسية",
        "alpha2_code": "PF",
        "alpha3_code": "PYF",
        "phone_code": "+689",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/d/db/Flag_of_French_Polynesia.svg/320px-Flag_of_French_Polynesia.svg.png "
    },
    {
        "english_name": "Azerbaijan",
        "arabic_name": "أذربيجان",
        "alpha2_code": "AZ",
        "alpha3_code": "AZE",
        "phone_code": "+994",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Azerbaijan.svg/320px-Flag_of_Azerbaijan.svg.png "
    },
    {
        "english_name": "Oman",
        "arabic_name": "سلطنة عمان",
        "alpha2_code": "OM",
        "alpha3_code": "OMN",
        "phone_code": "+968",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Oman.svg/320px-Flag_of_Oman.svg.png "
    },
    {
        "english_name": "Northern Mariana Islands",
        "arabic_name": "جزر ماريانا الشمالية",
        "alpha2_code": "MP",
        "alpha3_code": "MNP",
        "phone_code": "+1",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Flag_of_the_Northern_Mariana_Islands.svg/320px-Flag_of_the_Northern_Mariana_Islands.svg.png "
    },
    {
        "english_name": "Papua New Guinea",
        "arabic_name": "بابوا غينيا الجديدة",
        "alpha2_code": "PG",
        "alpha3_code": "PNG",
        "phone_code": "+675",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Flag_of_Papua_New_Guinea.svg/320px-Flag_of_Papua_New_Guinea.svg.png "
    },
    {
        "english_name": "Micronesia",
        "arabic_name": "ولايات ميكرونيسيا المتحدة",
        "alpha2_code": "FM",
        "alpha3_code": "FSM",
        "phone_code": "+691",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Flag_of_the_Federated_States_of_Micronesia.svg/320px-Flag_of_the_Federated_States_of_Micronesia.svg.png "
    },
    {
        "english_name": "Slovakia",
        "arabic_name": "سلوفاكيا",
        "alpha2_code": "SK",
        "alpha3_code": "SVK",
        "phone_code": "+421",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Slovakia.svg/320px-Flag_of_Slovakia.svg.png "
    },
    {
        "english_name": "Belize",
        "arabic_name": "بليز",
        "alpha2_code": "BZ",
        "alpha3_code": "BLZ",
        "phone_code": "+501",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Flag_of_Belize.svg/320px-Flag_of_Belize.svg.png "
    },
    {
        "english_name": "Ecuador",
        "arabic_name": "الاكوادور",
        "alpha2_code": "EC",
        "alpha3_code": "ECU",
        "phone_code": "+593",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Flag_of_Ecuador.svg/320px-Flag_of_Ecuador.svg.png "
    },
    {
        "english_name": "Monaco",
        "arabic_name": "موناكو",
        "alpha2_code": "MC",
        "alpha3_code": "MCO",
        "phone_code": "+377",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Flag_of_Monaco.svg/320px-Flag_of_Monaco.svg.png "
    },
    {
        "english_name": "Guatemala",
        "arabic_name": "غواتيمالا",
        "alpha2_code": "GT",
        "alpha3_code": "GTM",
        "phone_code": "+502",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Flag_of_Guatemala.svg/320px-Flag_of_Guatemala.svg.png "
    },
    {
        "english_name": "Guinea",
        "arabic_name": "غينيا",
        "alpha2_code": "GN",
        "alpha3_code": "GIN",
        "phone_code": "+224",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Flag_of_Guinea.svg/320px-Flag_of_Guinea.svg.png "
    },
    {
        "english_name": "South Georgia and South Sandwich Islands",
        "arabic_name": "جورجيا الجنوبية وجزر ساندويتش الجنوبية",
        "alpha2_code": "GS",
        "alpha3_code": "SGS",
        "phone_code": "+500",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Flag_of_South_Georgia_and_the_South_Sandwich_Islands.svg/320px-Flag_of_South_Georgia_and_the_South_Sandwich_Islands.svg.png "
    },
    {
        "english_name": "Barbados",
        "arabic_name": "بربادوس",
        "alpha2_code": "BB",
        "alpha3_code": "BRB",
        "phone_code": "+246",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Flag_of_Barbados.svg/320px-Flag_of_Barbados.svg.png "
    },
    {
        "english_name": "Slovenia",
        "arabic_name": "سلوفينيا",
        "alpha2_code": "SI",
        "alpha3_code": "SVN",
        "phone_code": "+386",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Flag_of_Slovenia.svg/320px-Flag_of_Slovenia.svg.png "
    },
    {
        "english_name": "Costa Rica",
        "arabic_name": "كوستاريكا",
        "alpha2_code": "CR",
        "alpha3_code": "CRI",
        "phone_code": "+506",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Flag_of_Costa_Rica.svg/320px-Flag_of_Costa_Rica.svg.png "
    },
    {
        "english_name": "Switzerland",
        "arabic_name": "سويسرا",
        "alpha2_code": "CH",
        "alpha3_code": "CHE",
        "phone_code": "+41",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Switzerland.svg/320px-Flag_of_Switzerland.svg.png "
    },
    {
        "english_name": "Niger",
        "arabic_name": "النيجر",
        "alpha2_code": "NE",
        "alpha3_code": "NER",
        "phone_code": "+227",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Flag_of_Niger.svg/320px-Flag_of_Niger.svg.png "
    },
    {
        "english_name": "Aruba",
        "arabic_name": "أروبا",
        "alpha2_code": "AW",
        "alpha3_code": "ABW",
        "phone_code": "+297",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Aruba.svg/320px-Flag_of_Aruba.svg.png "
    },
    {
        "english_name": "Iraq",
        "arabic_name": "العراق",
        "alpha2_code": "IQ",
        "alpha3_code": "IRQ",
        "phone_code": "+964",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Iraq.svg/320px-Flag_of_Iraq.svg.png "
    },
    {
        "english_name": "U.S. Virgin Islands",
        "arabic_name": "جزر العذراء الأمريكية",
        "alpha2_code": "VI",
        "alpha3_code": "VIR",
        "phone_code": "+1",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Flag_of_the_United_States_Virgin_Islands.svg/320px-Flag_of_the_United_States_Virgin_Islands.svg.png "
    },
    {
        "english_name": "Bangladesh",
        "arabic_name": "بنغلاديش",
        "alpha2_code": "BD",
        "alpha3_code": "BGD",
        "phone_code": "+880",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/320px-Flag_of_Bangladesh.svg.png "
    },
    {
        "english_name": "Botswana",
        "arabic_name": "بوتسوانا",
        "alpha2_code": "BW",
        "alpha3_code": "BWA",
        "phone_code": "+267",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_Botswana.svg/320px-Flag_of_Botswana.svg.png "
    },
    {
        "english_name": "Guernsey",
        "arabic_name": "غيرنزي",
        "alpha2_code": "GG",
        "alpha3_code": "GGY",
        "phone_code": "+44",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_Guernsey.svg/320px-Flag_of_Guernsey.svg.png "
    },
    {
        "english_name": "China",
        "arabic_name": "الصين",
        "alpha2_code": "CN",
        "alpha3_code": "CHN",
        "phone_code": "+86",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/320px-Flag_of_the_People%27s_Republic_of_China.svg.png "
    },
    {
        "english_name": "Eswatini",
        "arabic_name": "إسواتيني",
        "alpha2_code": "SZ",
        "alpha3_code": "SWZ",
        "phone_code": "+268",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Flag_of_Eswatini.svg/320px-Flag_of_Eswatini.svg.png "
    },
    {
        "english_name": "Mexico",
        "arabic_name": "المكسيك",
        "alpha2_code": "MX",
        "alpha3_code": "MEX",
        "phone_code": "+52",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/320px-Flag_of_Mexico.svg.png "
    },
    {
        "english_name": "Seychelles",
        "arabic_name": "سيشل",
        "alpha2_code": "SC",
        "alpha3_code": "SYC",
        "phone_code": "+248",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Seychelles.svg/320px-Flag_of_Seychelles.svg.png "
    },
    {
        "english_name": "Senegal",
        "arabic_name": "السنغال",
        "alpha2_code": "SN",
        "alpha3_code": "SEN",
        "phone_code": "+221",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Flag_of_Senegal.svg/320px-Flag_of_Senegal.svg.png "
    },
    {
        "english_name": "Ivory Coast",
        "arabic_name": "ساحل العاج",
        "alpha2_code": "CI",
        "alpha3_code": "CIV",
        "phone_code": "+225",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_C%C3%B4te_d%27Ivoire.svg/320px-Flag_of_C%C3%B4te_d%27Ivoire.svg.png "
    },
    {
        "english_name": "Egypt",
        "arabic_name": "مصر",
        "alpha2_code": "EG",
        "alpha3_code": "EGY",
        "phone_code": "+20",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/320px-Flag_of_Egypt.svg.png "
    },
    {
        "english_name": "Saint Kitts and Nevis",
        "arabic_name": "سانت كيتس ونيفيس",
        "alpha2_code": "KN",
        "alpha3_code": "KNA",
        "phone_code": "+1869",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Saint_Kitts_and_Nevis.svg/320px-Flag_of_Saint_Kitts_and_Nevis.svg.png "
    },
    {
        "english_name": "Uruguay",
        "arabic_name": "أوروغواي",
        "alpha2_code": "UY",
        "alpha3_code": "URY",
        "phone_code": "+598",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Uruguay.svg/320px-Flag_of_Uruguay.svg.png "
    },
    {
        "english_name": "Serbia",
        "arabic_name": "صربيا",
        "alpha2_code": "RS",
        "alpha3_code": "SRB",
        "phone_code": "+381",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Flag_of_Serbia.svg/320px-Flag_of_Serbia.svg.png "
    },
    {
        "english_name": "Brazil",
        "arabic_name": "البرازيل",
        "alpha2_code": "BR",
        "alpha3_code": "BRA",
        "phone_code": "+55",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/320px-Flag_of_Brazil.svg.png "
    },
    {
        "english_name": "Poland",
        "arabic_name": "بولندا",
        "alpha2_code": "PL",
        "alpha3_code": "POL",
        "phone_code": "+48",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/320px-Flag_of_Poland.svg.png "
    },
    {
        "english_name": "India",
        "arabic_name": "الهند",
        "alpha2_code": "IN",
        "alpha3_code": "IND",
        "phone_code": "+91",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/320px-Flag_of_India.svg.png "
    },
    {
        "english_name": "Sweden",
        "arabic_name": "السويد",
        "alpha2_code": "SE",
        "alpha3_code": "SWE",
        "phone_code": "+46",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Sweden.svg/320px-Flag_of_Sweden.svg.png "
    },
    {
        "english_name": "Japan",
        "arabic_name": "اليابان",
        "alpha2_code": "JP",
        "alpha3_code": "JPN",
        "phone_code": "+81",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/320px-Flag_of_Japan.svg.png "
    },
    {
        "english_name": "U.S. Minor Outlying Islands",
        "arabic_name": "جزر الولايات المتحدة الصغيرة النائية",
        "alpha2_code": "UM",
        "alpha3_code": "UMI",
        "phone_code": "+246",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/320px-Flag_of_the_United_States.svg.png "
    },
    {
        "english_name": "United States of America",
        "arabic_name": "الولايات المتحدة الأمريكية",
        "alpha2_code": "US",
        "alpha3_code": "USA",
        "phone_code": "+1",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/320px-Flag_of_the_United_States.svg.png "
    },
    {
        "english_name": "Saint Helena",
        "arabic_name": "سانت هيلينا",
        "alpha2_code": "SH",
        "alpha3_code": "SHN",
        "phone_code": "+290",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/320px-Flag_of_the_United_Kingdom.svg.png "
    },
    {
        "english_name": "Germany",
        "arabic_name": "ألمانيا",
        "alpha2_code": "DE",
        "alpha3_code": "DEU",
        "phone_code": "+49",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/320px-Flag_of_Germany.svg.png "
    },
    {
        "english_name": "France",
        "arabic_name": "فرنسا",
        "alpha2_code": "FR",
        "alpha3_code": "FRA",
        "phone_code": "+33",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/320px-Flag_of_France.svg.png "
    },
    {
        "english_name": "Saint Barthélemy",
        "arabic_name": "سان بارتيلمي",
        "alpha2_code": "BL",
        "alpha3_code": "BLM",
        "phone_code": "+590",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/320px-Flag_of_France.svg.png "
    },
    {
        "english_name": "Saint Martin",
        "arabic_name": "سانت مارتن",
        "alpha2_code": "MF",
        "alpha3_code": "MAF",
        "phone_code": "+590",
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/320px-Flag_of_France.svg.png "
    },
    {
        "english_name": "Italy",
        "arabic_name": "إيطاليا",
        "alpha2_code": "IT",
        "alpha3_code": "ITA",
        "phone_code": "+390",
        "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/320px-Flag_of_Italy.svg.png "
    },
    {
        "english_name": "United Kingdom",
        "arabic_name": "المملكة المتحدة",
        "alpha2_code": "GB",
        "alpha3_code": "GBR",
        "phone_code": "+44",
        "url": "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/320px-Flag_of_the_United_Kingdom.svg.png "
    }
]
}
