// 0. Run Filter on load as relies on change so first change wouldnt register without this onload function
var vInput = document.querySelector('#navTopstack'); 
var myInput  = document.querySelector('#myInput');
window.onload = function() {

  var bloggerHead = document.getElementById("blogger");
  var blogHead = document.getElementById("blog");
  $( bloggerHead ).load("stacks/blogger1.html", 
  $( blogHead ).load("stacks/blog1.html", function() {
   document.getElementById("navTopstack").setAttribute('id','navTopstack');
   document.getElementById("butFilter").innerHTML = document.getElementById("navTopstack").innerHTML;
      var input1 = vInput;
          input2 = myInput;
          table = document.querySelector('#blogger');
          table2 = document.querySelector('#blog');
          alert("onload()")
      searchTable(table, input1, input2);
      searchTable(table2, input1, input2);
  }));

  // Change logo to pre-rescaled 33px height version when using windows
  var mainlogo = document.getElementById("logo");
  var mainlogoWin = document.getElementById("logoWin");
  if (navigator.appVersion.indexOf("Win")!=-1) {
    $(mainlogo).css('display','none');
    $(mainlogoWin).css('display','inline-block');
  } 

  $( bloggerHead ).load("stacks/blogger1.html tbody tr:lt(100)");
  $( blogHead ).load("stacks/blog1.html tbody tr:lt(100)");


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
          //document.getElementById("navActive").setAttribute('id','nav');
          //this.setAttribute('id','navActive')
          document.getElementById("butFilter").innerHTML = this.innerHTML ;
            var nav1val = document.getElementById("nav1").value;
            var nav1html = document.getElementById("nav1").innerHTML;
            var nav2val = document.getElementById("nav2").value;
            var nav2html = document.getElementById("nav2").innerHTML;
            var nav3val = document.getElementById("nav3").value;
            var nav3html = document.getElementById("nav3").innerHTML;
            var btnactive = document.getElementsByClassName("btn Active");
          if (this.innerHTML === "<p>Topstack</p>") {
            var vInput = document.querySelector('#navTopstack');
            $(btnactive).attr('class','btn');
            document.getElementById("navTopstack").setAttribute('class','btn Active');
            
          }
          else { if (this.value === nav1val) {
            var vInput = document.querySelector('#nav1');
            $(btnactive).attr('class','btn');
            document.getElementById("nav1").setAttribute('class','btn Active');
          }
          else { if (this.value === nav2val) {
            var vInput = document.querySelector('#nav2');
            $(btnactive).attr('class','btn');
            document.getElementById("nav2").setAttribute('class','btn Active');
          }
          else { if (this.value === nav3val) {
            var vInput = document.querySelector('#nav3');
            $(btnactive).attr('class','btn');
            document.getElementById("nav3").setAttribute('class','btn Active');
          }
          else {
            document.getElementById("nav1").innerHTML = this.innerHTML;
            document.getElementById("nav1").setAttribute('value',this.value);
            document.getElementById("nav2").innerHTML = nav1html;
            document.getElementById("nav2").setAttribute('value',nav1val);
            document.getElementById("nav3").innerHTML = nav2html;
            document.getElementById("nav3").setAttribute('value',nav2val);
            $(btnactive).attr('class','btn');
            document.getElementById("nav1").setAttribute('class','btn Active');
            var vInput = document.querySelector('#nav1');
          }}}}

          if( $(window).width() < 481) {
            if ($(navhead).attr('class') === 'open') {
              document.getElementById('butFilter').click();
            }
          }
          else {
            if ($(navAll).attr('class') === 'open') {
              document.getElementById('allStacks').click();
            }
          }
            var input1 = vInput;
            var input2 = document.getElementById("myInput");
            //document.querySelector('#nav1'),
            table = document.querySelector('#blogger');
            table2 = document.querySelector('#blog');
            searchTable(table, input1, input2);
            searchTable(table2, input1, input2);
        });
        
      }

// 2. Search - bind tables and input
      var searchTable = function searchTable(table, input1, input2) {
          // Since we bound the input, we can use input.value to get the current words typed into the input.
          var filter1 = input1.value.toUpperCase();
          var filter2 = input2.value.toUpperCase();
            // A table has both a thead and a tbody.
            // By only selecting the tr nodes from the body, we can remove the entire 'check if this is a header tr logic of `tr.classList.contains('header')`
            // Keep in mind that querySelector returns a nodeList, so if we want to use array methods, we need to covnert it into a real array.
            // The original code uses getElementsByTagName, which return a LIVE nodeList, watch out for this difference.
          var rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr'));
          rows.forEach(function(row) {
            // Since we don't care in which cell the fitler is contained, we can just check the innerHTML of the entire row.
            // This will only fail if the filter typed into the inputs is either 'tr' or 'td'
            var hide1 = (row.innerHTML.toUpperCase().indexOf(filter1) === -1);
            var hide2 = (row.innerHTML.toUpperCase().indexOf(filter2) === -1);
            // The alternative is actually checking each cell, but this makes the script take longer:
            // var hide = !Array.prototype.slice.call( row.querySelectorAll('td') ).some(function( cell ) {
            //     return (cell.innerHTML.indexOf( filter ) !== -1);
            // });
            if (hide1 === true && hide2 === true) row.classList.add('gone');
            else if (row.classList.contains('gone')) row.classList.remove('gone');
          });
        },
        // helper function that we can use to bind the searchTable function to any table and input we want
        // We add an onchange event listener, passing it a bound version of searchTable.
        bindSearch = function bindSearch(tableID, inputID1, inputID2) {
          var input1 = document.querySelector(inputID1);
              input2 = document.querySelector(inputID2);
              alert ("bindsearch");
              table = document.querySelector(tableID);
          if (table && input1) input1.addEventListener('change', searchTable.bind(null, table, input1, input2));
          else if (table && input2) input2.addEventListener('change', searchTable.bind(null, table, input1, input2));
          else alert('Table or input does not exist.');
        };
      // We can add as many individual inputs / tables as we want by just calling bindSearch with the right ids.
      function search() {
        alert("search()")
      bindSearch('#blog', vInput, '#myInput');
      bindSearch('#blogger', vInput, '#myInput');
      }
      search();
      
// 3. Show NavBar when hit butfilter button
      function butFilter() {
        if( $(window).width() < 481)
        {
        var navhead = document.getElementById("navhead");
        var navAll = document.getElementById("navAll");
        var whiteOut =  document.getElementById("whiteOut");
        
        if ($(navhead).attr('class') === 'closed-nocss') {
          $(navhead).attr('class','open');
          $(navAll).attr('class','open');
          $(navhead).slideDown(250);
          $(whiteOut).fadeIn(400)
          document.getElementById("blog").setAttribute('class','noscroll');
          document.getElementById("blogger").setAttribute('class','noscroll');
        }
        else {
          $(navhead).attr('class','closed-nocss');
          //$(navAll).attr('class','gone');
          $(navhead).slideUp(250);
          $(whiteOut).fadeOut(400)
          document.getElementById("blog").setAttribute('class','scroll');
          document.getElementById("blogger").setAttribute('class','scroll');
        }
        //if (document.getElementById("navhead").getAttribute('class') === 'gone') document.getElementById("navhead").setAttribute('class','show');
        //else document.getElementById("navhead").setAttribute('class','gone');
        }
        else {
          openAllStacksWeb();
        }
      }

// 4. Main menu animation - mobile

        function menuMob() {
          var search =  document.getElementById("search");
          var mainList = document.getElementById("mainList");
          var navRightMob = document.getElementById("navRightMob");

          if (document.getElementById("mainMenu").getAttribute('class') === 'closed'){
              if (document.getElementById("navhead").getAttribute('class') === 'open'){
               butFilter ()
              }
              $(search).fadeOut(200);
              $(mainList).fadeIn(500);
              $(navRightMob).fadeOut(200);
              //$(search).animate({opacity: 0}, 200);
              document.getElementById("mainMenu").setAttribute('class','open');
              document.getElementById("mainMenu").style.backgroundColor = "#000000";
              document.getElementById("myHeader").style.backgroundColor = "#000000";
          }
          else {
              //$(search).animate({opacity: 1}, 750); 
              $(search).delay(100).fadeIn(250);
              $(mainList).fadeOut(150);
              $(navRightMob).delay(100).fadeIn(250);
              document.getElementById("mainMenu").setAttribute('class','closed');
              document.getElementById("mainMenu").style.backgroundColor = "#0c3c58";
              document.getElementById("myHeader").style.backgroundColor = "#0c3c58";   
          }
        }

// 5. Main menu animation - web

function menuWeb() {
  var search =  document.getElementById("search");
  var navRight =  document.getElementById("navRight");
  var whiteOut =  document.getElementById("whiteOut");
  var btn =  document.getElementsByClassName("btn");
  var blog =  document.getElementById("blog");
  var mmC =  document.getElementById("mmContact");
  var mmI =  document.getElementById("mmIG");
  var blogger =  document.getElementById("blogger");

  if (document.getElementById("mainMenu").getAttribute('class') === 'closed'){
      $(search).animate({opacity: 0.5}, 400);
      //$(blog).animate({opacity: 0.25}, 400);
      //$(blogger).animate({opacity: 0.25}, 400);
      if ($(navAll).attr('class') === 'open') {
        document.getElementById('allStacks').click();
      }
      $(whiteOut).fadeIn(400)
      $(btn).fadeOut(200);
      $(navRight).fadeOut(200);
      //$(search).fadeOut(200);
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
      $(search).animate({opacity: 1}, 400);
      //$(blog).animate({opacity: 1}, 400);
      //$(blogger).animate({opacity: 1}, 400);
      $(whiteOut).fadeOut(400)
      $(btn).delay(150).fadeIn(200);
      $(navRight).delay(150).fadeIn(200);
      //$(search).delay(150).fadeIn(200);
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
  //if (document.getElementById("navAll").getAttribute('class') === 'open'){
    //butFilter ()
  //}
  var navhead = document.getElementById("navhead");
  var navAll = document.getElementById("navAll");
  var whiteOut =  document.getElementById("whiteOut");
      if( $(window).width() < 481) {
        $(navhead).slideUp(50);
        $(navhead).attr('class','closed-nocss');
        $(navAll).attr('class','open');
        $(navAll).fadeIn(20);
      }
      else {
        $(navhead).slideDown(50);
        $(navhead).attr('class','open');
        $(navAll).attr('class','gone');
        $(navAll).fadeOut(20);
        $(whiteOut).fadeOut(20)
        document.getElementById("blog").setAttribute('class','scroll');
        document.getElementById("blogger").setAttribute('class','scroll');
      }

}, false);


// 7. Close Menu when whiteout area is active

  function closeMenu() {
    if (document.getElementById("navAll").getAttribute('class') === 'open'){
      butFilter ()
    }
    if (document.getElementById("mainMenu").getAttribute('class') === 'open'){
    document.getElementById('menuInputWeb').click();
    }
  } 

// 8. Open All Stacks menu when in web mode

  function openAllStacksWeb() {
    var navAll = document.getElementById("navAll");
    if ($(navAll).attr('class') === 'gone') {
      $(navAll).fadeIn(40);
      $(navAll).attr('class','open');
    }
    else {
      $(navAll).fadeOut(40);
      $(navAll).attr('class','gone');
    }
  }

// 9. Clear menu's before search in web view

  var myInput = document.getElementById("myInput");

  myInput.addEventListener("keyup", function(event) {
    if(event.keyCode === 13){
      preWebSearch();
    }
  });

  function preWebSearch() {
    if( $(window).width() < 481) {
      if (document.getElementById("navhead").getAttribute('class') === 'closed-nocss') {}
      else {
           closeMenu();
      }
    }
    else {
          closeMenu();
          var navAll = document.getElementById("navAll");
          if ($(navAll).attr('class') === 'open') {
           $(navAll).fadeOut(20);
           $(navAll).attr('class','gone');
    }
    }
  }
  
// 10. search input mag icon / cross icon behaviour

function clearSearch() {
    if (document.getElementById("searchIcon").getAttribute('class') === 'searchClose') {
        var mag = document.getElementById("mag");
        var searchClose = document.getElementById("searchClose");
        var myInput = document.getElementById("myInput");
        $(mag).delay(50).fadeIn(50);
        $(searchClose).fadeOut(50);
        document.getElementById("myInput").value = "";
        document.getElementById("searchIcon").setAttribute('class','searchIcon');
        document.getElementsByClassName("btn Active")[0].click();
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

// 11a. shuffle for mobile - note: isolating the function and calling same one for each button didnt work so for now have just copied function twice until time to review.

$("#shuffleMob").click(function(){

  var bloggerHead = document.getElementById("blogger");
  var blogHead = document.getElementById("blog");

  var shuffle = document.getElementById("shuffleIconMob");
  $(shuffle).attr('id','shuffleRotate');

  $(bloggerHead).fadeOut(150,function() {

  var $firstCells = $("#blogger tr"),
      $copies = $firstCells.clone(true);
  
  [].sort.call($copies, function() { return Math.random() - 0.5; });
  
  $copies.each(function(i){
      $firstCells.eq(i).replaceWith(this);
  })});

  $(blogHead).fadeOut(150, function() {
  var $firstCells = $("#blog tr"),
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

// 11b. shuffle for web - note: isolating the function and calling same one for each button didnt work so for now have just copied function twice until time to review.

$("#shuffleWeb").click(function(){

  var bloggerHead = document.getElementById("blogger");
  var blogHead = document.getElementById("blog");

  var shuffle = document.getElementById("shuffleIconWeb");
  $(shuffle).attr('id','shuffleRotate');

  $(bloggerHead).fadeOut(150,function() {

  var $firstCells = $("#blogger tr"),
      $copies = $firstCells.clone(true);
  
  [].sort.call($copies, function() { return Math.random() - 0.5; });
  
  $copies.each(function(i){
      $firstCells.eq(i).replaceWith(this);
  })});

  $(blogHead).fadeOut(150, function() {
  var $firstCells = $("#blog tr"),
      $copies = $firstCells.clone(true);
  
  [].sort.call($copies, function() { return Math.random() - 0.5; });
  
  $copies.each(function(i){
      $firstCells.eq(i).replaceWith(this);
  })});

  $(blogHead).delay(150).fadeIn(150);
  $(bloggerHead).delay(150).fadeIn(150);

  var shuffle = document.getElementById("shuffleRotate");
  $(shuffle).delay(400).queue(function() {
    $(this).attr('id','shuffleIconWeb').dequeue();
  })
});

// 12. blogger filter
//window.addEventListener("load", function(){
  //document.getElementsByClassName("titler").onclick = function(){alert("test")};
//});
