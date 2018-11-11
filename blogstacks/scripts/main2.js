// 0. Run Filter on load as relies on change so first change wouldnt register without this onload function
window.onload = function() {
    document.getElementById("navActive").setAttribute('id','navActive');
    document.getElementById("butFilter").value = document.getElementById("navActive").innerHTML;
}

// 1. Reflect change in active button on nav bar
      // Get the container element
      var btnContainer = document.getElementById("navigation");

      // Get all buttons with class="btn" inside the container
      var btns = btnContainer.getElementsByClassName("btn");

      // Loop through the buttons and add the active class to the current/clicked button
      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
          document.getElementById("myInput").value = "";
          document.getElementById("navActive").setAttribute('id','nav');
          this.setAttribute('id','navActive')
          document.getElementById("butFilter").value = this.innerHTML ;
        });
      }

// 2. Search - bind tables and input
var $rows = $(Array.prototype.slice.call(table.querySelectorAll('#blog tbody tr')));
$('#navActive, #myInput').on('input', function() {
    var val1 = $.trim($('#navActive').val()).replace(/ +/g, ' ').toLowerCase();
    var val2 = $.trim($('#myInput').val()).replace(/ +/g, ' ').toLowerCase();
    
    $rows.show().filter(function() {
        var text1 = $(this).find('td:nth-child(2)').text().replace(/\s+/g, ' ').toLowerCase();
        var text2 = $(this).find('td:nth-child(2)').text().replace(/\s+/g, ' ').toLowerCase();
        return !~text1.indexOf(val1) || !~text2.indexOf(val2);
    }).hide();
});