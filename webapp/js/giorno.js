$(document).ready(function(){

    $('#countdown-container').text("00:00:00");
    $(".workday-begin-time").text("00:00");
    $(".workday-end-time").text("00:00");

    $('.begin-button').on('click', function(e){
        var currentDay = new Date();
        var currentDate = currentDay.getDate();
        var currentHour = currentDay.getHours();
        var currentMinute = (currentDay.getMinutes()<10?'0':'') + currentDay.getMinutes();
    
        var months = new Array(7);
        months[0] = "Enero";
        months[1] = "Febrero";
        months[2] = "Marzo";
        months[3] = "Abril";
        months[4] = "Mayo";
        months[5] = "Junio";
        months[6] = "Julio";
        months[7] = "Agosto";
        months[8] = "Septiembre";
        months[9] = "Octubre";
        months[10] = "Noviembre";
        months[11] = "Diciembre";
    
        var monthsName = months[currentDay.getMonth()];
    
        var weekday = new Array(7);
        weekday[0] = "Domingo";
        weekday[1] = "Lunes";
        weekday[2] = "Martes";
        weekday[3] = "Miercoles";
        weekday[4] = "Jueves";
        weekday[5] = "Viernes";
        weekday[6] = "Sábado";
    
        var weekdayName = weekday[currentDay.getDay()];
    
        var workdayDuration;
    
        if (monthsName == "Enero" || monthsName == "Febrero" || monthsName == "Marzo" || monthsName == "Abril" || monthsName == "Mayo" || monthsName == "Junio" || monthsName == "Octubre" || monthsName == "Noviembre" || monthsName == "Diciembre") {  
            
            if (weekdayName == "Lunes" || weekdayName == "Martes" || weekdayName == "Miércoles" || weekdayName == "Jueves") {   
                workdayDuration = 9;
            }  else if (weekdayName == "Domingo") {
                workdayDuration = 7;
            } else {
                workdayDuration = 0;
            }
    
        } else if (monthsName == "Septiembre") {
            
            if (currentDate <= 15) {
                workdayDuration = 7;
            } else {
                workdayDuration = 9;
            }
            
        } else {
            workdayDuration = 7;
        }
        
        var endWorkday = currentDay.setHours(currentDay.getHours() + workdayDuration);
    
        $('#countdown-container').countdown(endWorkday, function(event) {
            $(this).text(event.strftime('%H:%M:%S'));
        });
        
        $(".workday-end-time").text("00:00");
        $(".workday-begin-time").text(currentHour + ":" + currentMinute);

    });

    $('.end-button').on('click', function(e){
        var currentDay = new Date();
        var currentDate = currentDay.getDate();
        var currentHour = currentDay.getHours();
        var currentMinute = (currentDay.getMinutes()<10?'0':'') + currentDay.getMinutes();

        $('#countdown-container').countdown(currentDay, function(event) {
            $(this).text(event.strftime('%H:%M:%S'));
        });

        $(".workday-end-time").text(currentHour + ":" + currentMinute);
    });

});