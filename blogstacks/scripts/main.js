// 0. Run Filter on load as relies on change so first change wouldnt register without this onload function
window.onload = function() {

  // blogger stack 
    //load
    var bloggerHead = document.getElementById("blogger");
    $( bloggerHead ).load("stacks/blogger2.html", function() {
    //filter - cat
    var input = document.querySelector('#category'),
        table = document.querySelector('#blogger');
    searchTableC(table, input);
    //shuffle
    var $firstCells = $("#blogger tbody tr"),
            $copies = $firstCells.clone(true);
        
        [].sort.call($copies, function() { return Math.random() - 0.5; });
        
        $copies.each(function(i){
            $firstCells.eq(i).replaceWith(this);  
        })
    //make visible
    $(bloggerHead).animate({opacity: 1}, 30);
  });

  // blog stack
    //load
    var blogHead = document.getElementById("blog");
    $( blogHead ).load("stacks/blogb.html", function() {
    //filter - Cat
    var input = document.querySelector('#category'),
        table2 = document.querySelector('#blog');
    searchTableC(table2, input);
    //shuffle
    var $firstCells = $("#blog tbody tr"),
            $copies = $firstCells.clone(true);
        
        [].sort.call($copies, function() { return Math.random() - 0.5; });
        
        $copies.each(function(i){
            $firstCells.eq(i).replaceWith(this);
        })
    //make visible
    $(blogHead).animate({opacity: 1}, 30);
    });

  
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
        btns[i].addEventListener("click", function(){
          document.getElementById("myInput").value = "";
          bloggerShowHead();
          //document.getElementById("navActive").setAttribute('id','nav');
          //this.setAttribute('id','navActive')
          //document.getElementById("butFilter").innerHTML = this.value;
          document.getElementById("category").value = this.value;
          document.getElementById("category").innerHTML = this.innerHTML;
          var btnactive = document.getElementsByClassName("btn Active");
          $(btnactive).attr('class','btn');
          this.setAttribute('class','btn Active');
        if (document.getElementById("mainMenu").getAttribute('class') === 'open'){
          document.getElementById('menuInputMob').click();
        }
          var input = document.querySelector('#category'),
            //document.querySelector('#nav1'),
            table = document.querySelector('#blogger');
            table2 = document.querySelector('#blog');
            searchTableC(table2, input);
            searchTableC(table, input);
            
        $('#blog').scrollTop(0);
        $('#blogger').scrollTop(0);
        });
      }

// 2.1. Search - category - bind tables and input
        function searchTableC(table, input) {
          //alert("Cat");
          var filter = input.value.toUpperCase(),
            rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr'));
          rows.forEach(function(row) {
            var hide = (row.innerHTML.toUpperCase().indexOf(filter) === -1);
            if (hide) {
              row.classList.add('gone'); 
              row.classList.remove('rowShow');
            }
            else if (row.classList.contains('gone')) {
              row.classList.remove('gone');
              row.classList.add('rowShow');
            }
          });
        };


// 2.2. Search - blogger - bind tables and input
        
        //show all tiles on catgory change
        function bloggerShowHead() {
          table = document.querySelector('#blogger');
          table2 = document.querySelector('#blog');
          bloggerShow(table);
          bloggerShow(table2);
          function bloggerShow(table) {
            var rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr'));
            rows.forEach(function(row) {
              row.classList.remove('fade');
            });
          }
          bloggerArray = "";
          $('#blog').scrollTop(0);
        }

        //fade all tiles when array changed
        function bloggerClear(table) {
          //if (array === undefined || array.length == 0) {
            //bloggerShowHead();
          //}
          //else {
          var rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr.rowShow'));
            rows.forEach(function(row) {
              row.classList.add('fade');
            });
          //}
        };

        // un-fade any matching bloggers/blogs in this loop
        function searchTableB(table, input) {
            var filter = input.toUpperCase(),
              rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr.rowShow'));
            rows.forEach(function(row) {
              var hide = (row.innerHTML.toUpperCase().indexOf(filter) === -1);
              if (hide) {}
              else {
                row.classList.remove('fade'); 
              }
            });
            $('#blog').scrollTop(0);
          };
        


// 2.3. Search - search box input - bind tables and input
      function searchTableI(table, input) {
        alert("Input");
          var filter = input.value.toUpperCase(),
            rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr.rowShow'));
          rows.forEach(function(row) {
            var hide = (row.innerHTML.toUpperCase().indexOf(filter) === -1);
            if (hide) {
              row.classList.add('gone'); 
              row.classList.remove('rowShow');
            }
            //else if (row.classList.contains('gone')) {
              //row.classList.remove('gone');
              //row.classList.add('rowShow');
            //}
          });
        };





// 3. Main menu animation 

        function menu() {
          var mainMenu = document.getElementById("mainMenu");
          var whiteOut =  document.getElementById("whiteOut");
          var blogger =  document.getElementById("blogger");
          var blog =  document.getElementById("blog");
          var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
          var adjW = (243 - ((Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 914) / 2)) + "px";
          var adjW2 = (243 - ((Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 685) / 2)) + "px";
          if (document.getElementById("mainMenu").getAttribute('class') === 'closed'){
              document.getElementById("mainMenu").setAttribute('class','open');
              //document.getElementById('mainMenu').style.width ='243px';
              $(mainMenu).animate({ width: '243px'}, 400);
              $(whiteOut).fadeIn(400)
            if (w <= 670) {
              //document.getElementById('blogger').style.marginLeft ='250px';
              //document.getElementById('blog').style.marginLeft ='250px';
              $(blogger).animate({ marginLeft: '250px'}, 400);
              $(blog).animate({ marginLeft: '250px'}, 400);
            }
            else if (w > 670 && w < 804){
              //document.getElementById('blogger').style.marginLeft = adjW2;
              //document.getElementById('blog').style.marginLeft = adjW2;
              $(blogger).animate({ marginLeft: adjW2}, 400);
              $(blog).animate({ marginLeft: adjW2}, 400);
            }
            else if (w >= 804 && w < 894){
              //document.getElementById('blogger').style.marginLeft ='243px';
              //document.getElementById('blog').style.marginLeft ='243px';
              $(blogger).animate({ marginLeft: '243px'}, 400);
              $(blog).animate({ marginLeft: '243px'}, 400);
            }
            else if (w >= 894 && w < 1400){
              //document.getElementById('blogger').style.marginLeft = adjW;
              //document.getElementById('blog').style.marginLeft = adjW;
              $(blogger).animate({ marginLeft: adjW}, 400);
              $(blog).animate({ marginLeft: adjW}, 400);
            }
          }
          else {
              //document.getElementById('mainMenu').style.width ='0';
              $(mainMenu).animate({ width: '0px'}, 400);
              document.getElementById("mainMenu").setAttribute('class','closed');
              $(whiteOut).fadeOut(400) 
              if (w <= 580) {
                //document.getElementById('blogger').style.marginLeft ='1%';
                //document.getElementById('blog').style.marginLeft ='1%';
                $(blogger).animate({ marginLeft: '1%'}, 400);
                $(blog).animate({ marginLeft: '1%'}, 400);
              }
              else {
                //document.getElementById('blogger').style.marginLeft ='11px';
                //document.getElementById('blog').style.marginLeft ='11px';
                $(blogger).animate({ marginLeft: '11px'}, 400);
                $(blog).animate({ marginLeft: '11px'}, 400);
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
    else {
      document.getElementById('blogger').style.marginLeft ='11px';
      document.getElementById('blog').style.marginLeft ='11px';
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
  
  for (var i = 0; i < $copies.length; i++) {
    if ($copies[i].classList.contains('fade')) {
      var ranVar = 0.5;
    }
    else {
      var ranVar = -0.5;
    }
  }
  
  //[].sort.call($copies, function() { return Math.random() - 0.5; });
  [].sort.call($copies, function() { return Math.random() - ranVar; });

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

// 9. Menu open/close for 'Choose Stack' button

  function menuCat() {
    document.getElementById('menuInputMob').click();
  }

// 10. Filter on category in blogger stack tiles

function bloggerCatFilter(innerHTML) {
  var cat = innerHTML;
  var headings = document.evaluate("//button[@class='btn' and contains(., '" + cat + "')]", document, null, XPathResult.ANY_TYPE, null );
  var thisHeading = headings.iterateNext();
  thisHeading.click();
}


// 11. Filter on blogger in blogger stack tiles & blog author tiles
    //define variable
    var bloggerArray = "";
    //add or remove from variable when blogger tile clicked
    function bloggerFilter(innerHTML) {
      
      if (bloggerArray === innerHTML) {
        
        bloggerShowHead();
        
      }
      else {
        bloggerArray = innerHTML;
        //fade all tiles when array changed
        table = document.querySelector('#blogger');
        table2 = document.querySelector('#blog');
        bloggerClear(table);
        bloggerClear(table2);
        
        //filter by variable for any matching bloggers/blogs
          var input = bloggerArray,
                  table = document.querySelector('#blogger');
                  table2 = document.querySelector('#blog');
                  searchTableB(table2, input);
                  searchTableB(table, input);
      }
    }


// XX. Share button - currently displays variables for search

  function shareBut() {
    var category = document.getElementById("category").value;
    var bloggers = bloggerArray;
    var myInput = document.getElementById("myInput").value;
    alert (category);
    alert (bloggers);
    alert (myInput);
  }
   

 