// 0. Run Filter on load as relies on change so first change wouldnt register without this onload function
window.onload = function() {
    document.getElementById("navActive").setAttribute('id','navActive');
    document.getElementById("butFilter").innerHTML = document.getElementById("navActive").innerHTML;
      var input = document.querySelector('#navActive'),
          table = document.querySelector('#blogger');
          table2 = document.querySelector('#blog');
      searchTable(table, input);
      searchTable(table2, input);
}

// 1. Reflect change in active button on nav bar
      // Get the container element
      var btnContainer = document.getElementById("navigation");

      // Get all buttons with class="btn" inside the container
      var btns = btnContainer.getElementsByClassName("btn");

      var navhead = document.getElementById("navhead")

      // Loop through the buttons and add the active class to the current/clicked button
      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
          document.getElementById("myInput").value = "";
          document.getElementById("navActive").setAttribute('id','nav');
          this.setAttribute('id','navActive')
          document.getElementById("butFilter").innerHTML = this.innerHTML ;
          if( $(window).width() < 481) {
          $(navhead).attr('class','closed-nocss');
          $(navhead).slideUp(250);
          }
          var input = document.querySelector('#navActive'),
            table = document.querySelector('#blogger');
            table2 = document.querySelector('#blog');
            searchTable(table, input);
            searchTable(table2, input);
        });
      }

// 2. Search - bind tables and input
      var searchTable = function searchTable(table, input) {
          // Since we bound the input, we can use input.value to get the current words typed into the input.
          var filter = input.value.toUpperCase(),
            // A table has both a thead and a tbody.
            // By only selecting the tr nodes from the body, we can remove the entire 'check if this is a header tr logic of `tr.classList.contains('header')`
            // Keep in mind that querySelector returns a nodeList, so if we want to use array methods, we need to covnert it into a real array.
            // The original code uses getElementsByTagName, which return a LIVE nodeList, watch out for this difference.
            rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr'));
          rows.forEach(function(row) {
            // Since we don't care in which cell the fitler is contained, we can just check the innerHTML of the entire row.
            // This will only fail if the filter typed into the inputs is either 'tr' or 'td'
            var hide = (row.innerHTML.toUpperCase().indexOf(filter) === -1);
            // The alternative is actually checking each cell, but this makes the script take longer:
            // var hide = !Array.prototype.slice.call( row.querySelectorAll('td') ).some(function( cell ) {
            //     return (cell.innerHTML.indexOf( filter ) !== -1);
            // });
            if (hide) row.classList.add('gone');
            else if (row.classList.contains('gone')) row.classList.remove('gone');
          });
        },
        // helper function that we can use to bind the searchTable function to any table and input we want
        // We add an onchange event listener, passing it a bound version of searchTable.
        bindSearch = function bindSearch(tableID, inputID) {
          var input = document.querySelector(inputID),
            table = document.querySelector(tableID);
          if (table && input) input.addEventListener('change', searchTable.bind(null, table, input));
          else alert('Table or input does not exist.');
        };
      // We can add as many individual inputs / tables as we want by just calling bindSearch with the right ids.
      bindSearch('#blog', '#myInput');
      bindSearch('#blogger', '#myInput');
      
// 3. Show NavBar when hit butfilter button
      function butFilter() {
        if( $(window).width() < 481)
        {
        var navhead = document.getElementById("navhead");
        
        if ($(navhead).attr('class') === 'closed-nocss') {
          $(navhead).attr('class','open');
          $(navhead).slideDown(250);
        }
        else {
          $(navhead).attr('class','closed-nocss');
          $(navhead).slideUp(250);
        }
        //if (document.getElementById("navhead").getAttribute('class') === 'gone') document.getElementById("navhead").setAttribute('class','show');
        //else document.getElementById("navhead").setAttribute('class','gone');
        }
      }

// 4. Main menu animation - mobile

        function menuMob() {
          var search =  document.getElementById("search");
          var mainList = document.getElementById("mainList");
          var navhead = document.getElementById("navhead");

          if (document.getElementById("mainMenu").getAttribute('class') === 'closed'){
              $(navhead).slideUp(250); 
              $(navhead).attr('class','closed-nocss'); 
              $(search).fadeOut(200);
              $(mainList).fadeIn(500);
              //$(search).animate({opacity: 0}, 200);
              document.getElementById("mainMenu").setAttribute('class','open');
              document.getElementById("mainMenu").style.backgroundColor = "#000000";
              document.getElementById("myHeader").style.backgroundColor = "#000000";
          }
          else {
              //$(search).animate({opacity: 1}, 750); 
              $(search).delay(100).fadeIn(250);
              $(mainList).fadeOut(300);
              document.getElementById("mainMenu").setAttribute('class','closed');
              document.getElementById("mainMenu").style.backgroundColor = "#0c3c58";
              document.getElementById("myHeader").style.backgroundColor = "#0c3c58";   
          }
        }

// 5. Main menu animation - web

function menuWeb() {
  var search =  document.getElementById("search");
  var whiteOut =  document.getElementById("whiteOut");
  var btn =  document.getElementsByClassName("btn");
  var blog =  document.getElementById("blog");
  var mmC =  document.getElementById("mmContact");
  var mmI =  document.getElementById("mmIG");
  var blogger =  document.getElementById("blogger");

  if (document.getElementById("mainMenu").getAttribute('class') === 'closed'){
      //$(search).animate({opacity: 0.25}, 400);
      //$(blog).animate({opacity: 0.25}, 400);
      //$(blogger).animate({opacity: 0.25}, 400);
      $(whiteOut).fadeIn(400)
      $(btn).fadeOut(200);
      $(search).fadeOut(200);
      $(mmC).delay(150).fadeIn(200);
      $(mmI).delay(150).fadeIn(200);
      document.getElementById("mainMenu").setAttribute('class','open');
      document.getElementById("mainList").setAttribute('class','show');
      document.getElementById("blog").setAttribute('class','noscroll');
      document.getElementById("blogger").setAttribute('class','noscroll');
      document.getElementById("body").setAttribute('class','noscroll');
      //document.getElementById("navigation").style.backgroundColor = "#000000";
      document.getElementById("navhead").style.backgroundColor = "#000000";
      document.getElementById("myHeader").style.backgroundColor = "#000000";
  }
  else {
      //$(search).animate({opacity: 1}, 400);
      //$(blog).animate({opacity: 1}, 400);
      //$(blogger).animate({opacity: 1}, 400);
      $(whiteOut).fadeOut(400)
      $(btn).delay(150).fadeIn(200);
      $(search).delay(150).fadeIn(200);
      $(mmC).fadeOut(200);
      $(mmI).fadeOut(200);
      document.getElementById("mainMenu").setAttribute('class','closed');
      document.getElementById("mainList").setAttribute('class','hide');
      document.getElementById("blog").setAttribute('class','scroll');
      document.getElementById("blogger").setAttribute('class','scroll');
      document.getElementById("body").setAttribute('class','scroll');
      //document.getElementById("navigation").style.backgroundColor = "#082a3e";
      document.getElementById("navhead").style.backgroundColor = "#082a3e";
      document.getElementById("myHeader").style.backgroundColor = "#0c3c58";   
  }
}       
          
// 6. Show nav / close main menu on orientation change

window.addEventListener('resize', function(){
  if (document.getElementById("menuInputWeb").checked === true){
    document.getElementById('menuInputWeb').click();
  }
  if (document.getElementById("menuInputMob").checked === true){
    document.getElementById('menuInputMob').click();
  }
  var navhead = document.getElementById("navhead");
      if( $(window).width() < 481) {
        $(navhead).slideUp(50);
        $(navhead).attr('class','closed-nocss');
      }
      else {
        $(navhead).slideDown(50);
        $(navhead).attr('class','open');
      }
}, false);


// 7. Close Menu when whiteout area is active

  function closeMenu() {
    document.getElementById('menuInputWeb').click();
  } 



              
      