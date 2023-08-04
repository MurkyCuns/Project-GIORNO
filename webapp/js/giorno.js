$(document).ready(function(){

    $('#countdown-container').text("00:00:00");
    $(".workday-begin-time").text("00:00");
    $(".workday-end-time").text("00:00");
    $(".workday-registered-time").text("00:00:00");

    var execution = 0,
        intervalSetup = null,
        startTime = null,
        pauseTime = null,
        pauseDuration = 0;

    $('.begin-button').on('click', function(e){
        e.preventDefault();
        
        start();

        $(this).addClass("d-none");
        $(".resume-button").removeClass("d-none");
        $(".pause-button").removeClass("d-none");
        $(".end-button").removeClass("d-none");

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
            
            if (weekdayName == "Lunes" || weekdayName == "Martes" || weekdayName == "Miercoles" || weekdayName == "Jueves") {   
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

        resumedTime = 0;
        $('.resume-button').children().addClass('disabled-button');

        $('.pause-button').on('click', function(e){
          start();
          $('.pause-button').children().addClass('disabled-button');
          $('.resume-button').children().removeClass('disabled-button');
          $('#countdown-container').countdown("pause");
          $('#countdown-container').addClass('disabled-button');;
          pauseDate = new Date();
          console.log(pauseDate);

        });

        $('.resume-button').on('click', function(e) {
            start();
            $('.pause-button').children().removeClass('disabled-button');
            $('.resume-button').children().addClass('disabled-button');
            timedelta = new Date().getTime() - pauseDate.getTime();
            if (resumedTime == 0) {
              resumedTime = new Date(endWorkday + timedelta);
            } else {
              resumedTime = new Date(resumedTime.getTime() + timedelta);
            }
            
            $('#countdown-container').removeClass('disabled-button');;
            $('#countdown-container').countdown(resumedTime);
            console.log(resumedTime);
            
        }); 

        $('.end-button').on('click', function(e){
            reset();
            $('.pause-button').children().removeClass('disabled-button');
            $('.resume-button').children().removeClass('disabled-button');
            $('.end-button').children().removeClass('disabled-button');

            $('#countdown-container').addClass('disabled-button');

            $('#countdown-container').countdown("stop");
            $('#countdown-container').text("00:00:00");
    
            $(".workday-end-time").text(currentHour + ":" + currentMinute);
        });

  function start() {
    if (execution) {
      // Since there is an execution, user wants to pause the stopwatch.
      // So the first thing to do is to clear interval and save the pause
      // time incase user decides to resume later.
      clearInterval(intervalSetup);
      pauseTime = new Date();
      execution = 0;
      $("#start-pause").text("START");
      $("#start-pause").css("color", "yellowgreen");
    } else {
      // Which means stopwatch is not running. In this case, users click
      // could either starts the stopwatch for the first time, or had already
      // started but paused earlier (so it is currently not running) but wants
      // to resume where it was left off. Therefore, we need to distinguish
      // these cases and act accordingly. (Note that, if user had previously
      // clicked reset, we don't need to take any extra action, since that
      // case has same scenario as user clicks start for the first time.)
      if (pauseTime === null) {
        // If pauseTime is null, we can be sure that user clicked for the first time.
        startTime = new Date();
        intervalSetup = setInterval(count, 10);
        execution = 1;
        $("#start-pause").text("PAUSE");
        $("#start-pause").css("color", "darkorange");
      } else {
        // Since pauseTime is not null, we can be sure that user wants to resume.
        pauseDuration += new Date() - pauseTime;
        intervalSetup = setInterval(count, 10);
        execution = 1;
        $("#start-pause").text("PAUSE");
        $("#start-pause").css("color", "darkorange");
      }
    }
  }

  function reset() {
    clearInterval(intervalSetup);
    pauseDuration = 0;
    startTime = null;
    pauseTime = null;
    execution = 0;
    $(".workday-registered-time").text("00:00:00");
    $("#start-pause").text("START");
    $("#start-pause").css("color", "yellowgreen");
  }

  function count() {
    var elapsedTime = new Date(new Date() - startTime - pauseDuration);
    var hr = elapsedTime.getUTCHours(),
      min = elapsedTime.getUTCMinutes(),
      sec = elapsedTime.getUTCSeconds(),
      ms = elapsedTime.getUTCMilliseconds();

    $(".workday-registered-time").text(
      handleZeros(hr, 2) + ":" + handleZeros(min, 2) + ":" + handleZeros(sec, 2)
    );
    //console.log(handleZeros(ms, 3));
  }

  function handleZeros(value, digit) {
    // This function deals with the proper display of stopwatch.
    // Although it is not a must, it is better to keep UI clean.
    // Our notation for stopwatch is: 00:00:00. However,
    // during counting, digits of time values are changing. To
    // overcome this, we check digits of time values every time
    // count function is called by setInterval method and we fix
    // digits by adding zeros to their beginnings until we achieve
    // the notation.
    var dummyZeros = "";
    for (i = 0; i < digit; i++) {
      dummyZeros += "0";
      return (dummyZeros + value).slice(-digit);
    }
  }
            
    });

});