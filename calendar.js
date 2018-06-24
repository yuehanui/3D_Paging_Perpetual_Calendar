var preYearButton = document.getElementById("preYear"), //action of bottons
                nextYearButton = document.getElementById("nextYear"),
                preMonthButton = document.getElementById("preMonth"),   
                nextMonthButton = document.getElementById("nextMonth"),
                preDayButton = document.getElementById("preDay"),
                nextDayButton = document.getElementById("nextDay"),

                currentIndex = 3,
                currentYear=2018,
                currentMonth=6,
                currentDay=16,
                currentWeek=6,   //values of default date
                monthList = ["JAN", "FEB", "MAR", "APR", "MAY","JUN","JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
                weekList = ["MON","TUE","WED","THU","FRI","SAT","SUN"],
                M31day =[1,3,5,7,8,10,12], //months with 31 days
                M30day =[4,6,9,11]         //months with 30 days

            preDayButton.addEventListener("click", function() {
                Year=currentYear;
                Month=currentMonth;
                Day=currentDay-1;
                
                var x = LeapYearOrNot(Year);
                if (Day == 0) {
                    Month=currentMonth-1;
                    if (Month == 0){
                        Day=31;
                        Month=12;
                        Year= currentYear-1;
                        x = LeapYearOrNot(Year);
                    } else if (M31day.includes(Month)){
                        Day =31;
                    } else if (M30day.includes(Month)){
                        Day = 30;
                    } else {
                        if (x) {
                            Day= 29;
                        } else {
                            Day=28;
                        }
                    }
                }
                var Week = caculateWeek(Year,Month,Day);
                Holiday="";
                if (x){
                    leapText = '<div class="window" id="YearWindow" style="color:#FF7559;">';
                } else {
                    leapText = '<div class="window" id="YearWindow">';
                }

                var ins = getPreIndex(currentIndex);
                preIndex = ins[0];
                flipIndex = ins[1];
                var nex =getNextIndex(currentIndex);
                nextIndex = nex[0];
                str=leapText + Year 
                + '</div><div class="window" id="WeekWindow">' + weekList[Week-1] + 
                '</div><div class="window" id="DayWindow">' + Day + 
                '</div><div class="window" id="HolidayWindow">' + Holiday +
                '</div>';
                document.getElementById("page"+preIndex).innerHTML = str;
                document.getElementById("MonthWindow").innerHTML = "";
                document.getElementById("MonthWindow").innerHTML = monthList[Month-1];
                document.getElementById("page"+nextIndex).style.zIndex = "0";
                document.getElementById("page"+currentIndex).style.zIndex = "1";
                document.getElementById("page"+preIndex).style.zIndex = "2";
                document.getElementById("page" + flipIndex).style.visibility = "hidden";
                document.getElementById("page" + flipIndex).style.transform = "rotateX(90deg)";
                document.getElementById("page" + preIndex).style.visibility = "visible";
                document.getElementById("page" + preIndex).style.transform = "rotateX(0deg)";
                if (currentIndex == 1){
                    currentIndex = 5;
                } else {
                    currentIndex -= 1;
                }
                currentYear=Year;
                currentMonth=Month;
                currentDay=Day;
            }, false);

            preMonthButton.addEventListener("click", function() {
                Year=currentYear;
                Month=currentMonth-1;
                Day=currentDay;
                var x = LeapYearOrNot(Year);
                if (Month==0) {
                    Year -=1;
                    x = LeapYearOrNot(Year);
                    Month = 12;
                } else if (Month == 2 ){
                    if (x && Day > 29) {
                        Day = 29;
                    } else if (!x && Day > 28) {
                        Day = 28;
                    }
                } else if (M30day.includes(Month) && Day==31){
                    Day = 30;
                }
                var Week = caculateWeek(Year,Month,Day);
                Holiday="";
                if (x){
                    leapText = '<div class="window" id="YearWindow" style="color:#FF7559;">';
                } else {
                    leapText = '<div class="window" id="YearWindow">';
                }
                str=leapText + Year 
                + '</div><div class="window" id="WeekWindow">' + weekList[Week-1] + 
                '</div><div class="window" id="DayWindow">' + Day + 
                '</div><div class="window" id="HolidayWindow">' + Holiday +
                '</div>';
                document.getElementById("page"+currentIndex).innerHTML = str;
                document.getElementById("MonthWindow").innerHTML = "";
                document.getElementById("MonthWindow").innerHTML = monthList[Month-1];
                currentYear=Year;
                currentMonth=Month;
                currentDay=Day;
            }, false);

             preYearButton.addEventListener("click", function() {
                Year=currentYear-1;
                Month=currentMonth;
                Day=currentDay;
                var x = LeapYearOrNot(Year);
                if (!x && Month==2 && Day == 29) {
                    Day=28;
                }
                var Week = caculateWeek(Year,Month,Day);
                Holiday="";
                if (x){
                    leapText = '<div class="window" id="YearWindow" style="color:#FF7559;">';
                } else {
                    leapText = '<div class="window" id="YearWindow">';
                }
                str=leapText + Year 
                + '</div><div class="window" id="WeekWindow">' + weekList[Week-1] + 
                '</div><div class="window" id="DayWindow">' + Day + 
                '</div><div class="window" id="HolidayWindow">' + Holiday +
                '</div>';
                document.getElementById("page"+currentIndex).innerHTML = str;
                currentYear=Year;
                currentMonth=Month;
                currentDay=Day;
            }, false);

            nextDayButton.addEventListener("click", function() {
                Year=currentYear;
                Month=currentMonth;
                Day=currentDay+1;
                Week = currentWeek + 1;
                if (Week == 8) {
                    Week = 1;
                }
                var x = LeapYearOrNot(Year);
                if (Day==32 && Month ==12) {
                    Year +=1;
                    x = LeapYearOrNot(Year);
                    Month =1 ;
                    Day = 1;
                } else if (Day==29 && Month==2 && x==false) {
                    Month+=1;
                    Day = 1;
                } else if (Day==30 && Month==2 && x ==true) {
                    Month +=1;
                    Day = 1
                } else if (Day == 31 && M30day.includes(Month)) {
                    Month +=1;
                    Day = 1
                } else if (Day == 32 && M31day.includes(Month)) {
                    Month +=1;
                    Day = 1
                }
                var Week = caculateWeek(Year,Month,Day);
                Holiday="";
                if (x){
                    leapText = '<div class="window" id="YearWindow" style="color:#FF7559;">';
                } else {
                    leapText = '<div class="window" id="YearWindow">';
                }
                var ins = getNextIndex(currentIndex);
                nextIndex = ins[0];
                flipIndex = ins[1];
                var pre =getPreIndex(currentIndex);
                preIndex = pre[0];
                str=leapText + Year 
                + '</div><div class="window" id="WeekWindow">' + weekList[Week-1] + 
                '</div><div class="window" id="DayWindow">' + Day + 
                '</div><div class="window" id="HolidayWindow">' + Holiday +
                '</div>';

                document.getElementById("page"+nextIndex).innerHTML = str;
                document.getElementById("MonthWindow").innerHTML = "";
                document.getElementById("MonthWindow").innerHTML = ""+monthList[Month-1];
                document.getElementById("page"+preIndex).style.zIndex = "0";
                document.getElementById("page"+flipIndex).style.zIndex = "0";
                document.getElementById("page"+currentIndex).style.zIndex = "2";
                document.getElementById("page"+nextIndex).style.zIndex = "1";
                document.getElementById("page" + nextIndex).style.visibility = "visible";
                document.getElementById("page" + flipIndex).style.visibility = "hidden";
                document.getElementById("page" + nextIndex).style.transform = "rotateX(1deg)";
                document.getElementById("page" + currentIndex).style.transform = "rotateX(90deg)";
                document.getElementById("page" + flipIndex).style.transform = "rotateX(-1deg)";
       
                if (currentIndex == 5){
                    currentIndex = 1;
                } else {
                    currentIndex += 1;
                }
                currentYear=Year;
                currentMonth=Month;
                currentDay=Day;
            }, false);

            nextMonthButton.addEventListener("click", function() {
                Year=currentYear;
                Month=currentMonth+1;
                Day=currentDay;
                var x = LeapYearOrNot(Year);
                if (Month==13) {
                    Year +=1;
                    x = LeapYearOrNot(Year);
                    Month = 1;
                } else if (Month == 2 ){
                    if (x && Day > 29) {
                        Day = 29;
                    } else if (!x && Day > 28) {
                        Day = 28;
                    }
                } else if (M30day.includes(Month) && Day==31){
                    Day = 30;
                }
                var Week = caculateWeek(Year,Month,Day);
                Holiday="";
                if (x){
                    leapText = '<div class="window" id="YearWindow" style="color:#FF7559;">';
                } else {
                    leapText = '<div class="window" id="YearWindow">';
                }

                str=leapText + Year 
                + '</div><div class="window" id="WeekWindow">' + weekList[Week-1] + 
                '</div><div class="window" id="DayWindow">' + Day + 
                '</div><div class="window" id="HolidayWindow">' + Holiday +
                '</div>';
                document.getElementById("page"+currentIndex).innerHTML = str;
                document.getElementById("MonthWindow").innerHTML = "";
                document.getElementById("MonthWindow").innerHTML = monthList[Month-1];
                currentYear=Year;
                currentMonth=Month;
                currentDay=Day;
            }, false);

            nextYearButton.addEventListener("click", function() {
                Year=currentYear+1;
                Month=currentMonth;
                Day=currentDay;
                var x = LeapYearOrNot(Year);
                if (!x && Month==2 && Day == 29) {
                    Day=28;
                }
                var Week = caculateWeek(Year,Month,Day);
                Holiday="";
                if (x){
                    leapText = '<div class="window" id="YearWindow" style="color:#FF7559;">';
                } else {
                    leapText = '<div class="window" id="YearWindow">';
                }

                str=leapText + Year 
                + '</div><div class="window" id="WeekWindow">' + weekList[Week-1] + 
                '</div><div class="window" id="DayWindow">' + Day + 
                '</div><div class="window" id="HolidayWindow">' + Holiday +
                '</div>';
                document.getElementById("page"+currentIndex).innerHTML = str;
                currentYear=Year;
                currentMonth=Month;
                currentDay=Day;
            }, false);
            
            // This function decide if the input year is a 
            // leap year and return a boolean
            function LeapYearOrNot(Year) {
                if(Year%4==0){
                    if(Year % 100 ==0){
                        if (Year % 400 ==0){
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return true;
                    }
                } else {
                    return false;
                } 
            }
            // This is a helper function for fliping page effect.
            function getPreIndex(index) {
                if (index==1) {
                    preIndex=5;
                    flipIndex=3;
                } else if (index==4) {
                    preIndex=3;
                    flipIndex=1;
                } else if (index==5) {
                    preIndex = 4;
                    flipIndex = 2;
                } else {
                    preIndex = index - 1;
                    flipIndex = index + 2;
                }
                return [preIndex, flipIndex];
            }

            // This is a helper function for fliping page effect.
            function getNextIndex(index) {
                if (index==1) {
                    nextIndex=2;
                    flipIndex=4;
                } else if (index==2) {
                    nextIndex=3;
                    flipIndex=5;
                } else if (index==5) {
                    nextIndex = 1;
                    flipIndex = 3;
                } else {
                    nextIndex = index + 1;
                    flipIndex= index - 2;
                }
                return [nextIndex, flipIndex];
            }
            // This function takes a date and return what day of the week is the day.
            function caculateWeek(year,month,day){
                if (month==1){
                    month=13;
                    year -=1;
                } else if (month==2) {
                    month=14;
                    year-=1;
                }
                C = Math.floor(year/100)+1;
                y = year%100;
                W = Math.floor(C/4) - (2 * C) + y + Math.floor(y/4) + Math.floor(13 * (month+1)/5) + day +1;
                ans = W % 7;
                if (ans==0) {
                    ans=7;
                } else if (ans<0){
                    ans = 7+ans;
                }
                return ans;
            }