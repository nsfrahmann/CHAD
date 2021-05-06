
//Current values for page load
let currentMonth = moment().format('MM');
let currentDay = moment().format('DD');
let currentYear = moment().year();

//Input values
let month1;
let day1;
let year1;

//Day option arrays for current month
let dayArray1;

//Date in MM/DD/YYYY format
let date1;

//Result
let result;
let response;

//Miscellaneous for clean console
let i;
let number;

//Input elements
let monthSelect1 = document.getElementById('select-month-1');
let yearSelect1 = document.getElementById('select-year-1');
let daySelect1 = document.getElementById('select-day-1');

//Variable declaration to get and persist time format
if (localStorage.getItem('format') != null) {
    var format = document.querySelector(`#${localStorage.getItem('format')}`);
}
else {
    format = document.getElementById('birth');
}

window.onload = () => {
    getDayOptions1();
    getMonth1();
    getYear1();
    getResult(format);
}

window.onchange = () => {
    // loading();

    //Uncomment if loading is annoying

    getResult(format);
    persistData();
}

//Day option switching
monthSelect1.addEventListener('click', getDayOptions1)

//This is to handle the leap year case
yearSelect1.addEventListener('change', getDayOptions1)

//Regular expression preventing non-numeric input
yearSelect1.addEventListener('keydown', regEx)

function regEx (evt) {
    if (evt.which < 48 && evt.which != 8 || evt.which > 57) {
        evt.preventDefault();
    }
}

//Get current month or last selected month on page load
function getMonth1() {
    let monthArray = monthSelect1.children;

    for (let i = 0; i < monthArray.length; i++) {
        if (localStorage.getItem('first-date') != null) {
            let parts = localStorage.getItem('first-date').split('/');

            if (monthArray[i].value == parts[0]) {
                monthArray[i].setAttribute('selected', 'selected');
                month1 = parts[0];
                break;
            }
        }
        else if (monthArray[i].value == currentMonth) {
            monthArray[i].setAttribute('selected', 'selected');
            month1 = currentMonth;
            break;
        }
    }
}

//Get current year or last selected month on page load
function getYear1() {
    if (localStorage.getItem('first-date') != null) {
        let parts = localStorage.getItem('first-date').split('/');
        yearSelect1.setAttribute('value', parts[2]);
    }
    else {
        yearSelect1.setAttribute('value', currentYear);
    }
}

//Get current day or last selected day on page load
function getDayOptions1() {

    let monthInput1 = monthSelect1.value;
    let yearInput1 = yearSelect1.value;

    dayArray1 = Array.from(Array(moment(`${yearInput1}-${monthInput1}`).daysInMonth()), (_, i) => i + 1);

    daySelect1.innerHTML = '';

    for (let i = 0; i < dayArray1.length; i++) {
        daySelect1.innerHTML += `<option value="${dayArray1[i]}">${dayArray1[i]}</option>`;
    }

    let dayOptionArray1 = daySelect1.children;

    for (let i = 0; i < dayOptionArray1.length; i++) {
        if (localStorage.getItem('first-date') != null) {
            let parts = localStorage.getItem('first-date').split('/');

            if (dayOptionArray1[i].value == parseInt(parts[1], 10)) {
                dayOptionArray1[i].setAttribute('selected', 'selected');
                day2 = dayOptionArray1[i].value;
                break;
            }
        }
        else if (dayOptionArray1[i].value == parseInt(currentDay, 10)) {
            dayOptionArray1[i].setAttribute('selected', 'selected');
            day2 = dayOptionArray1[i].value;
            break;
        }
    }
}

//Spit out result and cache
function getResult(format) {

    month1 = monthSelect1.value;
    day1 = daySelect1.value;
    year1 = yearSelect1.value;
    date1 = moment(`${month1}/${day1}/${year1}`);

    date2 = moment(`02/20/1993`);

    switch (true) {
        case (format.value == 'birth'):
            result = Math.abs(moment(date2).diff(moment(date1), 'y'));
            if (year1 < 1993) {
               var abrv = 'B.C. (Before Chad)'
            }
            else {
                var abrv = 'A.C. (After Chad)'
            }
            break;
        case (format.value == 'chad-time'):
            var chadage = moment().diff(moment(date2), 'years');
            result = ( Math.abs( moment(date1).diff(moment(), 'y') ) / chadage ).toFixed(2);
            break;
    }

    let displayDate1 = moment(date1).format('MM/DD/YYYY');

    switch (true) {
        case (year1 == 1993 && format.value == 'birth'):
            response = `You were born in the same year as Chad, Chad!`;
            document.getElementById('result').innerHTML = response;
            break;
        case (year1 > 1993 && format.value == 'birth'):
            response = `You were born in ${result} ${abrv}. \ <br> \ Compared to Chad, you're probably a Gen-Z Tik Toker, Chad.`;
            document.getElementById('result').innerHTML = response;
            break;
        case (year1 < 1993 && format.value == 'birth'):
            response = `You were born in ${result + 1} ${abrv}. \ <br> \ Compared to Chad, you're practically a boomer, Chad.`;
            document.getElementById('result').innerHTML = response;
            break;
        case (format.value == 'chad-time'):
            if (moment().diff(moment(date1)) < 0) {
                response = `${displayDate1} is ${result} Chads away.`;
            }
            else if (moment().diff(moment(date1)) > 0) {
                response = `${displayDate1} was ${result} Chads ago.`;
            }
            else {
                response = `Make the most of this year, Chad. \ <br> \ Carpe freakin' Yearum!`
            }
            document.getElementById('result').innerHTML = response;
            
    }

    localStorage.setItem('result', result);
    localStorage.setItem('format', format.value);
}

//Cache date for select fields
function persistData() {
    localStorage.clear()
    localStorage.setItem('first-date', moment(date1).format('MM/DD/YYYY'));
    localStorage.setItem('second-date', moment(date2).format('MM/DD/YYYY'));
}
