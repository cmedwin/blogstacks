// 0. Run Filter on load as relies on change so first change wouldnt register without this onload function
window.onload = function() {

  var bloggerHead = document.getElementById("blogger");
  var blogHead = document.getElementById("blog");
  $( bloggerHead ).load("stacks/blogger2.html", 
  $( blogHead ).load("stacks/blog2.html", function() {
      var input = document.querySelector('#category'),
          table = document.querySelector('#blogger');
          table2 = document.querySelector('#blog');
      searchTableC(table, input);
      searchTableC(table2, input);
  }));

  // Change logo to pre-rescaled 33px height version when using windows
  var mainlogo = document.getElementById("logo");
  var mainlogoWin = document.getElementById("logoWin");
  var headerSpacer = document.getElementById("headerSpacer");
  var headerSpacer2 = document.getElementById("headerSpacer2");
  if (navigator.appVersion.indexOf("Win")!=-1) {
    $(mainlogo).css('display','none');
    $(mainlogoWin).css('display','inline-block');
    $(headerSpacer).css('display','none');
    $(headerSpacer2).css('display','none');
  } 

  //$( bloggerHead ).load("stacks/blogger1.html tbody tr:lt(100)");
  //$( blogHead ).load("stacks/blog1.html tbody tr:lt(100)");


}

  

// 1. Reflect change in active button on nav bar
      // Get the container element
      var btnContainer = document.getElementById("mainMenu");

      // Get all buttons with class="btn" inside the container
      var btns = btnContainer.getElementsByClassName("btn");

      // Loop through the buttons and add the active class to the current/clicked button
      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
          document.getElementById("myInput").value = "";
          //document.getElementById("navActive").setAttribute('id','nav');
          //this.setAttribute('id','navActive')
          //document.getElementById("butFilter").innerHTML = this.value;
          document.getElementById("category").value = this.value;
          document.getElementById("category").innerHTML = this.innerHTML;
          var btnactive = document.getElementsByClassName("btn Active");
          $(btnactive).attr('class','btn');
          this.setAttribute('class','btn Active');
          document.getElementById('menuInputMob').click();
          var input = document.querySelector('#category'),
            //document.querySelector('#nav1'),
            table = document.querySelector('#blogger');
            table2 = document.querySelector('#blog');
            searchTableC(table, input);
            searchTableC(table2, input);
        });
      }

// 2a. Search - category - bind tables and input
        var searchTableC = function searchTableC(table, input) {
          //alert("C");
          // Since we bound the input, we can use input.value to get the current words typed into the input.
          var filter = input.value.toUpperCase(),
            // A table has both a thead and a tbody.
            // By only selecting the tr nodes from the body, we can remove the entire 'check if this is a header tr logic of `tr.classList.contains('header')`
            // Keep in mind that querySelector returns a nodeList, so if we want to use array methods, we need to covnert it into a real array.
            // The original code uses getElementsByTagName, which return a LIVE nodeList, watch out for this difference.
            rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr.rowShow'));
          rows.forEach(function(row) {
            // Since we don't care in which cell the fitler is contained, we can just check the innerHTML of the entire row.
            // This will only fail if the filter typed into the inputs is either 'tr' or 'td'
            var hide = (row.innerHTML.toUpperCase().indexOf(filter) === -1);
            // The alternative is actually checking each cell, but this makes the script take longer:
            // var hide = !Array.prototype.slice.call( row.querySelectorAll('td') ).some(function( cell ) {
            //     return (cell.innerHTML.indexOf( filter ) !== -1);
            // });
            if (hide) {
              row.classList.add('gone'); 
              row.classList.remove('rowShow');
            }
            //else if (row.classList.contains('gone')) {
            //  row.classList.remove('gone');
            //  row.classList.add('rowShow');
            //}
          });
        },
        // helper function that we can use to bind the searchTable function to any table and input we want
        // We add an onchange event listener, passing it a bound version of searchTable.
        bindSearchC = function bindSearchC(tableID, inputID) {
          var input = document.querySelector(inputID),
            table = document.querySelector(tableID);
          if (table && input) input.addEventListener('change', searchTableC.bind(null, table, input));
          else alert('Table or input does not exist.');
        };
        // We can add as many individual inputs / tables as we want by just calling bindSearch with the right ids.
        function searchC() {
        bindSearchC('#blog', '#myInput');
        bindSearchC('#blogger', '#myInput');
        }
        searchC();

// 2c. Search - search box input - bind tables and input
      var searchTableI = function searchTableI(table, input) {
        alert("I");
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
            if (hide) {
              row.classList.add('gone'); 
              row.classList.remove('rowShow');
            }
            else if (row.classList.contains('gone')) {
              row.classList.remove('gone');
              row.classList.add('rowShow');
            }
          });
        },
        // helper function that we can use to bind the searchTable function to any table and input we want
        // We add an onchange event listener, passing it a bound version of searchTable.
        bindSearchI = function bindSearchI(tableID, inputID) {
          var input = document.querySelector(inputID),
            table = document.querySelector(tableID);
          if (table && input) input.addEventListener('change', searchTableI.bind(null, table, input));
          else alert('Table or input does not exist.');
        };
      // We can add as many individual inputs / tables as we want by just calling bindSearch with the right ids.
      function searchI() {
      bindSearchI('#blog', '#myInput');
      bindSearchI('#blogger', '#myInput');
      }
      searchI();





// 3. Main menu animation 

        function menu() {
          var mainMenu = document.getElementById("mainMenu");
          var whiteOut =  document.getElementById("whiteOut");
          var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
          var adjW = (243 - ((Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 914) / 2)) + "px";
          var adjW2 = (243 - ((Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 685) / 2)) + "px";
          if (document.getElementById("mainMenu").getAttribute('class') === 'closed'){
              document.getElementById("mainMenu").setAttribute('class','open');
              document.getElementById('mainMenu').style.width ='243px';
              //document.getElementById("blog").style.position = 'Fixed';
              //document.getElementById("blogger").style.position = 'Fixed';
              //document.getElementById("body").style.position = 'Fixed';
              $(whiteOut).fadeIn(400)
            if (w <= 670) {
              document.getElementById('blogger').style.marginLeft ='250px';
              document.getElementById('blog').style.marginLeft ='250px';
            }
            else if (w > 670 && w < 804){
                document.getElementById('blogger').style.marginLeft = adjW2;
                document.getElementById('blog').style.marginLeft = adjW2;
            }
            else if (w >= 804 && w < 894){
              document.getElementById('blogger').style.marginLeft ='243px';
              document.getElementById('blog').style.marginLeft ='243px';
            }
            else if (w >= 894 && w < 1400){
              document.getElementById('blogger').style.marginLeft = adjW;
              document.getElementById('blog').style.marginLeft = adjW;
            }
          }
          else {
              document.getElementById('mainMenu').style.width ='0';
              document.getElementById("mainMenu").setAttribute('class','closed');
              $(whiteOut).fadeOut(400) 
              if (w <= 580) {
                document.getElementById('blogger').style.marginLeft ='1%';
                document.getElementById('blog').style.marginLeft ='1%';
              }
              else {
                document.getElementById('blogger').style.marginLeft ='11px';
                document.getElementById('blog').style.marginLeft ='11px';
              }  
          }
        }
      
          
// 4. Event on orientation change

window.addEventListener('resize', function(){
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (w <= 580) {
      document.getElementById('blogger').style.marginLeft ='1%';
      document.getElementById('blog').style.marginLeft ='1%';
    }
}, false); 


// 5. Clear menu's before search in web view

  var myInput = document.getElementById("myInput");

  myInput.addEventListener("keyup", function(event) {
    if(event.keyCode === 13){
      preWebSearch();
    }
  });

  function preWebSearch() {
      if (document.getElementById("mainMenu").getAttribute('class') === 'open') {
            document.getElementById('menuInputMob').click();
      }
    }
  
// 6. search input mag icon / cross icon behaviour

function clearSearch() {
    if (document.getElementById("searchIcon").getAttribute('class') === 'searchClose') {
      alert ("test1");
        var mag = document.getElementById("mag");
        var searchClose = document.getElementById("searchClose");
        var myInput = document.getElementById("myInput");
        $(mag).delay(50).fadeIn(50);
        $(searchClose).fadeOut(50);
        document.getElementById("myInput").value = "";
        alert ("test2");
        var input = document.querySelector('#category');
        var table = document.querySelector('#blogger');
        var table2 = document.querySelector('#blog');
        searchTable(table, input);
        searchTable(table2, input);
        alert ("test3");
        document.getElementById("searchIcon").setAttribute('class','searchIcon');
    }
    else {
      if (document.getElementById("searchIcon").getAttribute('class') === 'searchIcon') {
        if (document.getElementById("myInput").value === "") {
          $(myInput).blur();
        }
        else {
        var mag = document.getElementById("mag");
        var searchClose = document.getElementById("searchClose");
        var myInput = document.getElementById("myInput");
        $(mag).fadeOut(50);
        $(searchClose).delay(50).fadeIn(50);
        document.getElementById("searchIcon").setAttribute('class','searchClose');
        $(myInput).blur();
    }}
  }}

$(myInput).on('keyup', function (e) {
  if (e.keyCode == 13) {
    var myInput = document.getElementById("myInput");
    if (document.getElementById("myInput").value === "") {
      $(myInput).blur();
    }
    else {
      clearSearch();
  }
  }
  else {
      var mag = document.getElementById("mag");
      var searchClose = document.getElementById("searchClose");
      $(mag).delay(50).fadeIn(50);
      $(searchClose).fadeOut(50);
      document.getElementById("searchIcon").setAttribute('class','searchIcon');
  }
});

// 7. shuffle 

$("#shuffleMob").click(function(){

  var bloggerHead = document.getElementById("blogger");
  var blogHead = document.getElementById("blog");

  var shuffle = document.getElementById("shuffleIconMob");
  $(shuffle).attr('id','shuffleRotate');

  $(bloggerHead).fadeOut(150,function() {

    $('#blogger').show();
    $('#blogger').scrollTop(0);
    $('#blogger').hide();

  var $firstCells = $("#blogger tbody tr"),
      $copies = $firstCells.clone(true);
  
  [].sort.call($copies, function() { return Math.random() - 0.5; });
  
  $copies.each(function(i){
      $firstCells.eq(i).replaceWith(this);  
  })});

  $(blogHead).fadeOut(150, function() {

    $('#blog').show();
    $('#blog').scrollTop(0);
    $('#blog').hide();

  var $firstCells = $("#blog tbody tr"),
      $copies = $firstCells.clone(true);
  
  [].sort.call($copies, function() { return Math.random() - 0.5; });
  
  $copies.each(function(i){
      $firstCells.eq(i).replaceWith(this);
  })});



  $(blogHead).delay(150).fadeIn(150);
  $(bloggerHead).delay(150).fadeIn(150);

  var shuffle = document.getElementById("shuffleRotate");
  $(shuffle).delay(400).queue(function() {
    $(this).attr('id','shuffleIconMob').dequeue();
  })
});

// 8. WhiteOut close menu

  function whiteOut() {
    document.getElementById('menuInputMob').click();
  }


 