// 0. Run Filter on load as relies on change so first change wouldnt register without this onload function
window.onload = function() {
  
  // extract params from URL
    var url_string = window.location.href;
    var url = new URL(url_string);
    //category
    var catURL_ = url.searchParams.get("cat");
    if (catURL_ === null){
      var cookieCat = getCookie("cat");
      //alert("cookieCat");
      if (cookieCat === "" || cookieCat === null){
        document.getElementById("category").innerHTML = "Choose Stack";
        document.getElementById("category").value = "";
      }
      else {
        document.getElementById("category").innerHTML = cookieCat;
        document.getElementById("category").value = cookieCat;
      }
      
    }
    else { 
      catURL = catURL_.replace(/_/g," ");
      if (catURL === ""){
        document.getElementById("category").innerHTML = "Choose Stack";
        document.getElementById("category").value = "";
      }
      else {
      document.getElementById("category").innerHTML = catURL;
      document.getElementById("category").value = catURL;
      }
      
    }
    
    //Filter variables - blogger
    var bloggerURL_ = url.searchParams.get("blogger");
    var cookieBlogger = getCookie("blogger");
    //Filter variables - search
    var searchURL_ = url.searchParams.get("search");
    var cookieSearch = getCookie("search");
    //Scroll variables
    var bloggerScroll = localStorage.getItem('bloggerScroll');
    var blogScroll = localStorage.getItem('blogScroll'); 


  // blogger stack 
    //load stack
          var bloggerHead = document.getElementById("blogger");
          //load new stack as time limit expired
          var URLgroup = catURL_ + bloggerURL_ + searchURL_;
          console.log("urlgroup:" + URLgroup);
          var scrollCheck = parseInt(bloggerScroll) + parseInt(blogScroll);
          console.log("scrollcheck:" + scrollCheck);
          var bloggerRefresh = 60*60*1000; //time in ms before a refresh reloads new stack
          //if ((URLgroup != "" && URLgroup != 0 && URLgroup != 'null') || scrollCheck < 565 || (new Date().getTime() - localStorage.getItem("bloggerStackTime")) > bloggerRefresh ){
          if ((URLgroup != "" && URLgroup != 0 && URLgroup != 'null') || (new Date().getTime() - localStorage.getItem("bloggerStackTime")) > bloggerRefresh ){
                console.log("time: " + (new Date().getTime() - localStorage.getItem("bloggerStackTime")));
                $( bloggerHead ).load("stacks/bloggerc.html", function(){
                  configBlogger(true);
                });
                console.log("fresh");
          }
          //load stored stack to retain app position on refresh
          else {
            console.log("time: " + (new Date().getTime() - localStorage.getItem("bloggerStackTime")));
            var bloggerScroll = localStorage.getItem('bloggerScroll'); //record scroll position before next line resets value
            bloggerHead.innerHTML = localStorage.getItem("bloggerStack"); //load stored stack
            configBlogger(false); //run function to manage filters ets
            setTimeout(function(){ //scroll to correct location
              bloggerHead.scrollTop = parseInt(bloggerScroll) + 0;
            }, 0);
            console.log("stored");
          }
    //filter stack
     function configBlogger(flagShuffle) {
    //filter - cat
      var input = document.querySelector('#category'),
          table = document.querySelector('#blogger');
      searchTableC(table, input);
      //update selected cat in main menu
      if (input.value === "" || input.value === "null") {}
      else {
        var btnactive = document.getElementsByClassName("btn Active");
            $(btnactive).attr('class','btn');
        var cat = input.innerHTML;
        var headings = document.evaluate("//button[@class='btn' and contains(., '" + cat + "')]", document, null, XPathResult.ANY_TYPE, null );
        var thisHeading = headings.iterateNext();
        thisHeading.setAttribute('class','btn Active');
      }
    //filter - blogger
      //blogger cookie
    if (bloggerURL_ === null){
      if (cookieBlogger != null) {
      bloggerArray = cookieBlogger;
      //fade all tiles when array changed
      table = document.querySelector('#blogger');
      bloggerClear(table);
      //filter by variable for any matching bloggers/blogs
        var input = bloggerArray,
                table = document.querySelector('#blogger');
                searchTableB(table, input);
      }
    }
      //blogger URL
    else { 
      bloggerURL = bloggerURL_.replace(/_/g," ");
      bloggerArray = bloggerURL;
      //fade all tiles when array changed
      table = document.querySelector('#blogger');
      bloggerClear(table);
      //filter by variable for any matching bloggers/blogs
        var input = bloggerArray,
                table = document.querySelector('#blogger');
                searchTableB(table, input);
      }

    //shuffle
    if (flagShuffle === true) {
    var $firstCells = $("#blogger tbody tr"),
            $copies = $firstCells.clone(true);

            var counter = $copies.length, temp, index;
            while (counter > 0) {
              index = Math.floor(Math.random() * counter);
              counter--;
              temp = $copies[counter];
              $copies[counter] = $copies[index];
              $copies[index] = temp;
            };
            
            
            //console.log($copies);
        $copies.each(function(i){
            $firstCells.eq(i).replaceWith(this);  
        })
        localStorage.setItem('bloggerStack', $('#blogger')[0].innerHTML);
      }
        localStorage.setItem('bloggerStackTime', new Date().getTime());
    //make visible
    $(bloggerHead).animate({opacity: 1}, 30);
    $("#blogger tbody").fadeIn(50);
    //show blogger description
    if (bloggerURL_ === null && cookieBlogger === ""){}
    else { 
    bloggerDescriptionShow(bloggerArray);
    }
    //lazy-load
    bloggerDivs = [...document.getElementById('blogger').querySelectorAll('.lazy-image')];
    lazyLoadBlogger();
  };

  // blog stack
    //load stack
            var blogHead = document.getElementById("blog");
            //load new stack as time limit expired
            var blogRefresh = 60*60*1000; //time in ms before a refresh reloads new stack
            //if ((URLgroup != "" && URLgroup != 0 && URLgroup != "null") || scrollCheck < 565 || (new Date().getTime() - localStorage.getItem("blogStackTime")) > blogRefresh ){
            if ((URLgroup != "" && URLgroup != 0 && URLgroup != 'null') || (new Date().getTime() - localStorage.getItem("blogStackTime")) > blogRefresh ){
              $( blogHead ).load("stacks/blogc.html", function(){
                configBlog(true);
              });
              
            }
            //load stored stack to retain app position on refresh
            else {
              var blogScroll = localStorage.getItem('blogScroll'); //record scroll position before next line resets value
              blogHead.innerHTML = localStorage.getItem("blogStack"); //load stored stack
              configBlog(false); //run function to manage filters ets
              setTimeout(function(){ //scroll to correct location
                blogHead.scrollTop = parseInt(blogScroll) + 0;
              }, 0);
            }
    //filter stack
    function configBlog(flagShuffle) {
    //filter - Cat
      var input = document.querySelector('#category'),
          table = document.querySelector('#blog');
      searchTableC(table, input);
    //filter - blogger
    if (bloggerURL_ === null){
      if (cookieBlogger != null) {
      bloggerArray = cookieBlogger;
      //fade all tiles when array changed
      table2 = document.querySelector('#blog');
      bloggerClear(table2);
      //filter by variable for any matching bloggers/blogs
        var input = bloggerArray,
                table2 = document.querySelector('#blog');
                searchTableB(table2, input);
      }
    }
    else { 
      bloggerURL = bloggerURL_.replace(/_/g," ");
      bloggerArray = bloggerURL;
      //fade all tiles when array changed
      table2 = document.querySelector('#blog');
      bloggerClear(table2);
      //filter by variable for any matching bloggers/blogs
        var input = bloggerArray,
                table2 = document.querySelector('#blog');
                searchTableB(table2, input);
    }
    //filter - search
    if (searchURL_ === null){
      document.getElementById("myInput").value = cookieSearch;
      Search();
      var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      if (w <= 660 && cookieSearch != "") {
        //searchBar();
      }
    }
    else { 
      searchURL = searchURL_.replace(/_/g," ");
      document.getElementById("myInput").value = searchURL;
      Search();
      var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      if (w <= 660 && searchURL != "") {
        //searchBar();
      }
    }
    //shuffle
    if (flagShuffle === true) {
    var $firstCells = $("#blog tbody tr"),
            $copies = $firstCells.clone(true);

            var counter = $copies.length, temp, index;
            while (counter > 0) {
              index = Math.floor(Math.random() * counter);
              counter--;
              temp = $copies[counter];
              $copies[counter] = $copies[index];
              $copies[index] = temp;
            };

        $copies.each(function(i){
            $firstCells.eq(i).replaceWith(this);
        })
        localStorage.setItem('blogStack', $('#blog')[0].innerHTML);
      }
        localStorage.setItem('blogStackTime', new Date().getTime());
    //make visible
    $(blogHead).animate({opacity: 1}, 30);
    $("#blog tbody").fadeIn(50);
    //lazy-load
    blogDivs = [...document.getElementById("blog").querySelectorAll('.lazy-image')];
    lazyLoadBlog();
    };



    setTimeout(function() {
      var stackMenuRefresh = 60*60*1000; //time in ms before a refresh reloads new stack
      if((URLgroup == "" || URLgroup == 0 || URLgroup == 'null') && (new Date().getTime() - localStorage.getItem("stackMenuTime")) > stackMenuRefresh) {
      document.getElementById('category').click();
      localStorage.setItem('stackMenuTime', new Date().getTime());
      }
    },150)
  
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
  //$( blogHead ).append($("#blog").load("stacks/blogb.html tbody tr:gt(50)"));


}

  

// 1. Reflect change in active button on nav bar
      // Get the container element
      var btnContainer = document.getElementById("stackMenu");

      // Get all buttons with class="btn" inside the container
      var btns = btnContainer.getElementsByClassName("btn");

      // Loop through the buttons and add the active class to the current/clicked button
      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function(){
          document.getElementById("myInput").value = "";
          Search();
          bloggerShowHead();
          bloggerDescriptionHide();
          //document.getElementById("navActive").setAttribute('id','nav');
          //this.setAttribute('id','navActive')
          //document.getElementById("butFilter").innerHTML = this.value;
          document.getElementById("category").value = this.value;
          document.getElementById("category").innerHTML = this.innerHTML;
          var btnactive = document.getElementsByClassName("btn Active");
          $(btnactive).attr('class','btn');
          this.setAttribute('class','btn Active');
        if (document.getElementById("stackMenu").getAttribute('class') === 'openStackMenu'){
          document.getElementById('category').click();
        }
          var input = document.querySelector('#category'),
            //document.querySelector('#nav1'),
            table = document.querySelector('#blogger');
            table2 = document.querySelector('#blog');
            searchTableC(table2, input);
            searchTableC(table, input);
        console.log('al1');
        
        $('#blogger').scrollTop(0);
        $('#blog').scrollTop(0);
        console.log('al2');
        //lazy-loading
        blogDivs = [...document.getElementById("blog").querySelectorAll('.lazy-image')];
          lazyLoadBlog();
        bloggerDivs = [...document.getElementById("blogger").querySelectorAll('.lazy-image')];
          lazyLoadBlogger();
        });

        var whiteOut =  document.getElementById("whiteOut");
        $(whiteOut).fadeOut(200);
      }

// 2.1. Search - category - bind tables and input
        function searchTableC(table, input) {
          //alert("Cat");
          if (input.value === "" || input.value === "null"){
            setQueryStringParameter("cat", "");
            setCookie("cat", "", 1);
          }
          else {
            setQueryStringParameter("cat", input.innerHTML);
            setCookie("cat", input.innerHTML, 1);
          }
          var filter = input.value.toUpperCase(),
            rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr'));
          rows.forEach(function(row) {
            var hide = (row.innerHTML.toUpperCase().indexOf(filter) === -1);
            if (hide) {
              row.classList.add('gone'); 
              row.classList.remove('catShow');
            }
            else if (row.classList.contains('gone')) {
              row.classList.remove('gone');
              row.classList.add('catShow');
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
              row.classList.remove('bloggerFade');
              row.classList.remove('bloggerShow');
            });
          }
          bloggerArray = "";
          setQueryStringParameter("blogger", "");
          setCookie("blogger", "", 1);
          //$("#shuffleMob").click();
          $('#blog').scrollTop(0);
          
        }

        //fade all tiles when array changed
        function bloggerClear(table) {
          //if (array === undefined || array.length == 0) {
            //bloggerShowHead();
          //}
          //else {
            var rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr.catShow'));
            rows.forEach(function(row) {
              row.classList.add('bloggerFade');
              row.classList.remove('bloggerShow');
            });
          //}
        };

        // un-fade any matching bloggers/blogs in this loop
        function searchTableB(table, input) {
          setQueryStringParameter("blogger", input);
          setCookie("blogger", input, 1);
            var filter = input.toUpperCase(),
              rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr.catShow'));
            rows.forEach(function(row) {
              var hide = (row.innerHTML.toUpperCase().indexOf(filter) === -1);
              if (hide) {}
              else {
                row.classList.remove('bloggerFade'); 
                row.classList.add('bloggerShow');
              }
            });
            //$("#shuffleMob").click();
            $('#blog').scrollTop(0);
          };
        


// 2.3.a. Search - search box input - bind tables and input for blog stack
      function searchTableI(table, input) {
          setQueryStringParameter("search", input.value);
          setCookie("search", input.value, 1);
          var filter = input.value.toUpperCase(),
            rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr.catShow'));
          rows.forEach(function(row) {
            var hide = (row.innerHTML.toUpperCase().indexOf(filter) === -1);
            if (hide) {
              row.classList.add('searchGone'); 
              row.classList.remove('searchShow');
            }
            else {
              row.classList.remove('searchGone'); 
              if (input.value === '') {}
              else {
                row.classList.add('searchShow');
              }
            }
          });
          //lazy-loading
            blogDivs = [...document.getElementById("blog").querySelectorAll('.lazy-image')];
            lazyLoadBlog();

          var whiteOut =  document.getElementById("whiteOut");
          $(whiteOut).fadeOut(200);
          var searchHead = document.getElementById('searchhead');
          searchHead.classList.remove('searchheadShow');
          searchHead.classList.add('searchheadFade');
        };

  //2.3.b. Search - search box input - filter blogger stack based on blog stack results

      function searchTableIR(table, input) {
        var filter = input.innerHTML.toUpperCase(),
          rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr.catShow'));
        rows.forEach(function(row) {
          var hide = (row.innerHTML.toUpperCase().indexOf(filter) === -1);
          if (hide) {}
          else {
            row.classList.remove('searchGoneR');
            row.classList.add('searchShowR');
          }
        });
        //lazy-loading  
          bloggerDivs = [...document.getElementById("blogger").querySelectorAll('.lazy-image')];
          lazyLoadBlogger();
      };



// 3. Main menu animation 

        function mainMenu() {
          var mainMenuWindow = document.getElementById("mainMenuWindow");
          var whiteOut =  document.getElementById("whiteOut");
          
          if (mainMenuWindow.classList.contains('closed')) {
            $(mainMenuWindow).fadeIn(100);
            $(whiteOut).fadeIn(150);
            $(whiteOut).css('z-index', '1900');
            mainMenuWindow.classList.add('open');
            mainMenuWindow.classList.remove('closed');
            document.getElementById('blogger').className = 'noscroll';
            document.getElementById('blog').className = 'noscroll';
          }
          else {
            $(mainMenuWindow).fadeOut(100);
            $(whiteOut).fadeOut(100);
            $(whiteOut).css('z-index', '900');
            mainMenuWindow.classList.add('closed');
            mainMenuWindow.classList.remove('open');
            document.getElementById('blogger').className = 'scroll';
            document.getElementById('blog').className = 'scroll';
            }
        }
        

        /*function menu() {
          if (searchWeb.classList.contains('openSearch')) {
            //searchBar();     
          }
          var mainMenu = document.getElementById("mainMenu");
          var searchhead = document.getElementById("searchhead");
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

            if (w <= 660) {
              if (w <= 670) {
                $(searchhead).animate({ marginLeft: '250px'}, 400);
              }
              else {
                $(searchhead).animate({ marginLeft: adjW2}, 400);
              }
            }


          }
          else {
              //document.getElementById('mainMenu').style.width ='0';
              $(mainMenu).animate({ width: '0px'}, 300);
              $(searchhead).animate({ marginLeft: '1.5%'}, 300);
              document.getElementById("mainMenu").setAttribute('class','closed');
              $(whiteOut).fadeOut(300) 
              if (w <= 580) {
                //document.getElementById('blogger').style.marginLeft ='1%';
                //document.getElementById('blog').style.marginLeft ='1%';
                $(blogger).animate({ marginLeft: '1%'}, 300);
                $(blog).animate({ marginLeft: '1%'}, 300);
                
              }
              else {
                //document.getElementById('blogger').style.marginLeft ='11px';
                //document.getElementById('blog').style.marginLeft ='11px';
                $(blogger).animate({ marginLeft: '11px'}, 300);
                $(blog).animate({ marginLeft: '11px'}, 300);
                
              }  

          }


        }*/
      
          
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

    if (stackMenu.classList.contains('openStackMenu')) {
        document.getElementById('category').click();
    }
    
    /*var blogger =  document.getElementById("startSpacerR");
    var blog =  document.getElementById("startSpacerG");
    var searchWeb = document.getElementById('searchWeb');
    var searchHead = document.getElementById('searchhead');

    if (w <= 660) {
      if (searchWeb.classList.contains('closedSearch')) {
        $(searchHead).fadeOut(0);
      }
    }
    else {
      searchWeb.classList.add('closedSearch');
      searchWeb.classList.remove('openSearch');
      $(blogger).animate({ height: '0px'}, 20);
      $(blog).animate({ height: '0px'}, 20);
      $(searchHead).fadeIn(50);
    }*/
}, false); 


// 5. Clear menu's before search in web view

  function preWebSearch() {
      if (document.getElementById("mainMenu").getAttribute('class') === 'open') {
            document.getElementById('menuInputMob').click();
      }
    }
  
// 6a. search input mag icon / cross icon behaviour

function Search() {
    if (document.getElementById("searchIcon").getAttribute('class') === 'searchClose') {
        var mag = document.getElementById("mag");
        var searchClose = document.getElementById("searchClose");
        var myInput = document.getElementById("myInput");
        $(mag).delay(50).fadeIn(50);
        $(searchClose).fadeOut(50);
        document.getElementById("myInput").value = "";
        var input = document.querySelector('#myInput');
        var table2 = document.querySelector('#blog');
        searchTableI(table2, input);
        document.getElementById("searchIcon").setAttribute('class','searchIcon');
        searchBloggerClear();
        bloggerFilterPos();
        $('#blog').scrollTop(0);
        $('#searchFlag').fadeOut(10);
    }
    else {
      if (document.getElementById("searchIcon").getAttribute('class') === 'searchIcon') {
        if (document.getElementById("myInput").value === "") {
          var input = document.querySelector('#myInput');
          var table2 = document.querySelector('#blog');
          searchTableI(table2, input);
          $(myInput).blur();
          searchBloggerClear();
          bloggerFilterPos();
          $('#blog').scrollTop(0);
          $('#searchFlag').fadeOut(10);
        }
        else {
        var mag = document.getElementById("mag");
        var searchClose = document.getElementById("searchClose");
        var myInput = document.getElementById("myInput");
        console.log(myInput.value);
        $(mag).fadeOut(50);
        $(searchClose).delay(50).fadeIn(50);
        document.getElementById("searchIcon").setAttribute('class','searchClose');
        $(myInput).blur();
        var input = document.querySelector('#myInput');
        var table2 = document.querySelector('#blog');
        searchTableI(table2, input);
        searchBlogger();
        bloggerFilterPos();
        $('#blog').scrollTop(0);
        $('#searchFlag').fadeIn(10).css("display","inline-block");
    }}
  }}

$(myInput).on('keyup', function (e) {
  if (e.keyCode == 13) {
    /*var myInput = document.getElementById("myInput");
    if (document.getElementById("myInput").value === "") {
      var input = document.querySelector('#myInput');
      var table2 = document.querySelector('#blog');
      searchTableI(table2, input);
      $(myInput).blur();
    }
    else {
      Search();
  }*/
  Search();
  }
  else {
      var mag = document.getElementById("mag");
      var searchClose = document.getElementById("searchClose");
      $(mag).delay(50).fadeIn(50);
      $(searchClose).fadeOut(50);
      document.getElementById("searchIcon").setAttribute('class','searchIcon');
  }
});

//6b. Reflect blog search results in blogger stack

    function searchBlogger() {
      //hide all blogger tiles
      var table = document.querySelector('#blogger');
      var rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr.catShow'));
              rows.forEach(function(row) {
                row.classList.add('searchGoneR');
              });
      //unhide blogger tiles where blog stack contains authors posts
          //create array
          var bloggersSearch = []
          //find blog tiles that are results from search
          var elements = document.getElementsByClassName('searchShow');
          //loop through results find blog author and add to array if not already
          //then search blogger stack and show blogger tile when found
          for(var i=0; i<elements.length; i++) {
            var blogger = elements[i].getElementsByClassName('acc')[0];
            var index = bloggersSearch.indexOf(blogger.innerHTML);
            if (index > -1){}
            else { 
              bloggersSearch.push(blogger.innerHTML);
              var input = blogger,
              table = document.querySelector('#blogger');
              searchTableIR(table,input);
            }
      }
    }

    function searchBloggerClear() {
      var table = document.querySelector('#blogger');
      var rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr.catShow'));
              rows.forEach(function(row) {
                row.classList.remove('searchGoneR');
                row.classList.remove('searchShowR');
              });
    }

// 7. shuffle 

$("#shuffleMob").click(function(){

  var shuffle = document.getElementById("shuffleIconMob");
  $(shuffle).attr('id','shuffleRotate');
  
  function bloggerShuffle(){
  if (bloggerArray === "") {
    $("#blogger tbody").fadeOut(150,function() {

      $('#blogger tbody').show();
      $('#blogger').scrollTop(0);
      $('#blogger tbody').hide();

    var $firstCells = $("#blogger tbody tr"),
        $copies = $firstCells.clone(true);
    
    /*[].sort.call($copies, function() { return Math.random() - 0.5; });
    */
    var counter = $copies.length, temp, index;
    while (counter > 0) {
      index = Math.floor(Math.random() * counter);
      counter--;
      temp = $copies[counter];
      $copies[counter] = $copies[index];
      $copies[index] = temp;
    };
    $copies.each(function(i){
      $firstCells.eq(i).replaceWith(this);  
    });
    localStorage.setItem('bloggerStack', $('#blogger')[0].innerHTML);
    localStorage.setItem('bloggerStackTime', new Date().getTime());
    //lazy-load
    bloggerDivs = [...document.getElementById('blogger').querySelectorAll('.lazy-image')];
    lazyLoadBlogger();
  });
    
    $("#blogger tbody").delay(150).fadeIn(150);
  }
  }
  bloggerShuffle();

  function blogShuffle() {
  $("#blog tbody").fadeOut(150, function() {

    $('#blog tbody').show();
    $('#blog').scrollTop(0);
    $('#blog tbody').hide();

  var $firstCells = $("#blog tbody tr"),
      $copies = $firstCells.clone(true);
  
  /*[].sort.call($copies, function() { return Math.random() - 0.5; });
    */
   var counter = $copies.length, temp, index;
   while (counter > 0) {
     index = Math.floor(Math.random() * counter);
     counter--;
     temp = $copies[counter];
     $copies[counter] = $copies[index];
     $copies[index] = temp;
   };
    $copies.each(function(i){
        $firstCells.eq(i).replaceWith(this);
    });
    localStorage.setItem('blogStack', $('#blog')[0].innerHTML);
    localStorage.setItem('blogStackTime', new Date().getTime());
    //lazy-load
    blogDivs = [...document.getElementById("blog").querySelectorAll('.lazy-image')];
    lazyLoadBlog();
  });

  $("#blog tbody").delay(150).fadeIn(150);
}
blogShuffle();

  var shuffle = document.getElementById("shuffleRotate");
  $(shuffle).delay(400).queue(function() {
    $(this).attr('id','shuffleIconMob').dequeue();
  })
});


// 8. WhiteOut close menu

  function clearWO() {
    var shareWindow = document.getElementById("shareWindow");
    var stackMenu = document.getElementById("stackMenu");
    var searchHead = document.getElementById("searchhead");
    if (shareWindow.classList.contains('open')) {
      document.getElementById('shareWeb').click();
    }
    if (stackMenu.classList.contains('openStackMenu')) {
      document.getElementById('category').click();
      
      //document.getElementById('menuInputMob').click();
    }
    if (mainMenuWindow.classList.contains('open')) {
      document.getElementById('mainMenu').click();
    }
    else {
      $(whiteOut).fadeOut(200);
      searchHead.classList.remove('searchheadShow');
      searchHead.classList.add('searchheadFade');
    }
  }

// 9. Menu open/close for 'Choose Stack' button

  function menuCat() {
    var searchHead = document.getElementById('searchhead');
    var search = document.getElementById('search');
    var stackMenu = document.getElementById('stackMenu');
    var whiteOut =  document.getElementById("whiteOut");
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    if(stackMenu.classList.contains('closedStackMenu')) {
      
      $(stackMenu).slideDown(200);
      stackMenu.classList.add('openStackMenu');
      stackMenu.classList.remove('closedStackMenu');
      $(searchHead).css('border-bottom-left-radius','0px');
      $(searchHead).css('border-bottom-right-radius','0px');
      $(search).css('border-bottom-left-radius','0px');
      $(search).css('border-bottom-right-radius','0px');
      document.getElementById('blogger').className = 'noscroll';
      document.getElementById('blog').className = 'noscroll';


      if (w <= 6600) {
        $(whiteOut).fadeIn(200);
        //$(searchHead).animate({opacity: 1}, 30);
        searchHead.classList.add('searchheadShow');
        searchHead.classList.remove('searchheadFade');
      }
      
    }
    else if(stackMenu.classList.contains('openStackMenu')) {
      //$(searchHead).animate({opacity: 1}, 30);
      $(stackMenu).slideUp(200);
      stackMenu.classList.add('closedStackMenu');
      stackMenu.classList.remove('openStackMenu');
      $(stackMenu).css('border-top-left-radius','0px');
      $(stackMenu).css('border-top-right-radius','0px');
      setTimeout( function(){
      $(searchHead).css('border-bottom-left-radius','4px');
      $(searchHead).css('border-bottom-right-radius','4px');
      $(search).css('border-bottom-left-radius','4px');
      $(search).css('border-bottom-right-radius','4px');
      
      },200);
      document.getElementById('blogger').className = 'scroll';
      document.getElementById('blog').className = 'scroll';
      $(whiteOut).fadeOut(200);
      if (w <= 6600) {
        searchHead.classList.remove('searchheadShow');
        searchHead.classList.add('searchheadFade');
      }
    }
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
        bloggerDescriptionHide();
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
        bloggerDescriptionShow(innerHTML);
        //lazy-loading
        blogDivs = [...document.getElementById("blog").querySelectorAll('.lazy-image')];
          lazyLoadBlog();
        bloggerDivs = [...document.getElementById("blogger").querySelectorAll('.lazy-image')];
          lazyLoadBlogger();
      }
    }

    function bloggerFilterG(innerHTML) {
      if (bloggerArray === innerHTML){}
      else {
        bloggerFilter(innerHTML);
      }
    }


// 12. Share button - currently displays variables for search
  

      function shareBut() {
        //alert(window.location.href);
        //var shareLinkAdd = document.getElementById("shareLinkAdd");
        var shareWindow = document.getElementById("shareWindow");
        var whiteOut =  document.getElementById("whiteOut");
        var shareMailLink = document.getElementById("shareMailLink");
        var shareWALink = document.getElementById("shareWALink");
        var shareFBLink = document.getElementById("shareFBLink");
        var shareTWLink = document.getElementById("shareTWLink");
        var shareLinkText = document.getElementById("shareLinkText");
        if (shareWindow.classList.contains('closed')) {
          $(shareWindow).fadeIn(100);
          $(whiteOut).fadeIn(150);
          $(whiteOut).css('z-index', '1900');
          document.getElementById('blogger').className = 'noscroll';
          document.getElementById('blog').className = 'noscroll';
          shareWindow.classList.add('open');
          shareWindow.classList.remove('closed');
          $('#shareLinkAdd').html(window.location.href);
          $('#shareLinkText').val(window.location.href);
          var currURL = window.location.href;
          shareWALink.href = "whatsapp://send?text=Check out these blogs! " + currURL.replace(/&/g,'%26').replace("+","+%2B");
          shareMailLink.href = "mailto:?subject=Check out these blogs!&body=Hi,I found these blogs and thought you might like them. %0D%0A" +  currURL.replace(/&/g,'%26').replace("+","+%2B");
          shareFBLink.href = "https://www.facebook.com/sharer.php?u=" + currURL.replace(/&/g,'%26').replace("+","+%2B");
          shareTWLink.href =  "https://twitter.com/intent/tweet?url=" + currURL.replace(/&/g,'%26').replace("+","+%2B");
        }
        else {
          $(shareWindow).fadeOut(100);
          $(whiteOut).fadeOut(100);
          $(whiteOut).css('z-index', '900');
          document.getElementById('blogger').className = 'scroll';
          document.getElementById('blog').className = 'scroll';
          shareWindow.classList.add('closed');
          shareWindow.classList.remove('open');
          //reset link copied notification
          var copyTitle = document.getElementById("shareLinkHeader");
          copyTitle.innerHTML = "Share Link";
          copyTitle.style.color = "rgba(0, 0, 0, 0.541176)";
        }
      }
      //copy URL link when clicked
      function shareCopy() {
        //copy link
        var copyText = document.getElementById("shareLinkText");
        copyText.select();
        document.execCommand("copy");
        iosCopyToClipboard(copyText);
        $(copyText).blur();
        //alert("Copied the text: " + copyText.value);
        //add copy notification
        var copyTitle = document.getElementById("shareLinkHeader");
        copyTitle.innerHTML = "Link Copied";
        copyTitle.style.color = "var(--bs-turq)";
       
      }
      //allow copy on iOS devices
                function iosCopyToClipboard(el) {
                  var oldContentEditable = el.contentEditable,
                      oldReadOnly = el.readOnly,
                      range = document.createRange();
              
                  el.contentEditable = true;
                  el.readOnly = false;
                  range.selectNodeContents(el);
              
                  var s = window.getSelection();
                  s.removeAllRanges();
                  s.addRange(range);
              
                  el.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.
              
                  el.contentEditable = oldContentEditable;
                  el.readOnly = oldReadOnly;
              
                  document.execCommand('copy');
              }
      
      //share twitter
      /*var twitterShare = document.querySelector('[data-js="twitter-share"]');

      twitterShare.onclick = function(e) {
        e.preventDefault();
        var twitterWindow = window.open('https://twitter.com/intent/tweet?url=' + window.location.href.replace(/&/g,'%26'));
        if(twitterWindow.focus) { twitterWindow.focus(); }
          return false;
        }*/
      
      //facebook share
        /*var facebookShare = document.querySelector('[data-js="facebook-share"]');

        facebookShare.onclick = function(e) {
          e.preventDefault();
          var facebookWindow = window.open('https://www.facebook.com/sharer.php?u=' + window.location.href.replace(/&/g,'%26'));
          if(facebookWindow.focus) { facebookWindow.focus(); }
            return false;
        }*/

 //13. Function used to scroll to position in stack - Finds y value of given object - called from elsewhere above

    function bloggerFilterPos() {
      

      if (bloggerArray === '') {
        $('#blogger').scrollTop(0);
      }
      else {
      var element = document.getElementById("blogger");
      var searchWeb = document.getElementById('searchWeb');
      var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      if (w <= 660) {
        var adjust = 152;
      }
      else {
        var adjust = 98;
      }
      var location = findPos(document.getElementsByClassName("bloggerShow")[0]) - adjust;
      //element.scroll(0, location) ;
      $('#blogger').animate({
        scrollTop: location
      },500)
      }
    }

    function findPos(obj) {
      var curtop = 0;
      if (obj.offsetParent) {
          do {
              curtop += obj.offsetTop;
          } while (obj = obj.offsetParent);
      return [curtop];
      }
    }

//14. Show/hide searchbar in mobile view using search button

    /*function searchBar() {
      var blogger =  document.getElementById("startSpacerR");
      var blog =  document.getElementById("startSpacerG");
      var searchWeb = document.getElementById('searchWeb');
      var searchHead = document.getElementById('searchhead');
      var input = document.getElementById('myInput');
      var searchSpacer = document.getElementById('searchSpacer');
      if (searchWeb.classList.contains('closedSearch')) {
        preWebSearch();
        searchWeb.classList.add('openSearch');
        searchWeb.classList.remove('closedSearch');
        $(blogger).animate({ height: '54px'}, 200);
        $(blog).animate({ height: '54px'}, 200);
        //$(searchSpacer).slideDown(200);
        $(searchHead).fadeIn(400);
        input.focus();
      }
      else if (searchWeb.classList.contains('openSearch'))  {
        searchWeb.classList.add('closedSearch');
        searchWeb.classList.remove('openSearch');
        $(blogger).delay(0).animate({ height: '0px'}, 150);
        $(blog).delay(0).animate({ height: '0px'}, 150);
        //$(searchSpacer).delay(50).slideUp(200);
        $(searchHead).fadeOut(100)
        
      }
    }*/

    //search input onfocus/onblur events
        function searchFocus() {
          var searchHead = document.getElementById('searchhead');
          var whiteOut =  document.getElementById("whiteOut");
          var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
          if (w <= 660) {
            $(whiteOut).fadeIn(200);
            searchHead.classList.add('searchheadShow');
            searchHead.classList.remove('searchheadFade');
          }
        }

      // sticky hover fix in iOS
      (function(l){var i,s={touchend:function(){}};for(i in s)l.addEventListener(i,s)})(document); 
    
    /*function searchBlur() {
      var searchHead = document.getElementById('searchhead');
        $(searchHead).animate({opacity: 0.6}, 30);
    }*/

  


//15. Adds variable values to URL

    function setQueryStringParameter(name, value) {
      const params = new URLSearchParams(location.search);
      var adjValue = value.replace(/ /g,"_");
      params.set(name, adjValue);
      window.history.replaceState({}, "", decodeURIComponent(`${location.pathname}?${params}`));
    }
    
    
//16. Shw blog images on load

    function showBlogImages() {
      //$("#blog .imageG:lt(10)").removeClass('loading');
      $("#blog .imageG").slice(0,10).removeClass('loading');
      setTimeout(showBlogImages2(), 2000);
    }
    function showBlogImages2() {
      $("#blog .imageG").slice(10,30).removeClass('loading');
      setTimeout(showBlogImages3(), 2000);
    }
    function showBlogImages3() {
      $("#blog .imageG").slice(30,80).removeClass('loading');
      setTimeout(showBlogImages4(), 2000);
    }
    function showBlogImages4() {
      $("#blog .imageG").slice(80,150).removeClass('loading');
      setTimeout(showBlogImages5(), 2000);
    }
    function showBlogImages5() {
      $("#blog .imageG").slice(150,300).removeClass('loading');
      //showBlogImages6()
    }


//17. Show/hide description in blogger tile when clicked
    function bloggerDescriptionShow(innerHTML) {
      var openBlogger = innerHTML;
      //var headings = document.evaluate("//table[@id='blogger']/tbody/tr[td/div[@class='imageR']/div/p[@class='desc_r']='" + openBlogger + "']/td/div[@class='imageR']/div/div/ul/li[@class='description'] ", document, null, XPathResult.ANY_TYPE, null );
      var headings = document.evaluate("//table[@id='blogger']/tbody/tr[td/div[@class='imageR lazy-image']/div/p[@class='desc_r']='" + openBlogger + "']/td/div[@class='description']", document, null, XPathResult.ANY_TYPE, null );
      var thisHeading = headings.iterateNext();
      //var oldHeadings = document.evaluate("//table[@id='blogger']/tbody/tr/td/div[@class='imageR']/div/div/ul/li[@class='description openBlogger']", document, null, XPathResult.ANY_TYPE, null );
      var oldHeadings = document.evaluate("//table[@id='blogger']/tbody/tr/td/div[@class='description openBlogger']", document, null, XPathResult.ANY_TYPE, null );
      var oldHeading = oldHeadings.iterateNext();
      var imageHeadings = document.evaluate("//table[@id='blogger']/tbody/tr[td/div[@class='imageR lazy-image']/div/p[@class='desc_r']='" + openBlogger + "']/td/div[@class='imageR lazy-image']", document, null, XPathResult.ANY_TYPE, null );
      var imageHeading = imageHeadings.iterateNext();
      var oldImageHeadings = document.evaluate("//table[@id='blogger']/tbody/tr[td/div[@class='description openBlogger']]/td/div[@class='imageR lazy-image']", document, null, XPathResult.ANY_TYPE, null );
      var oldImageHeading = oldImageHeadings.iterateNext();
      var titleHeadings = document.evaluate("//table[@id='blogger']/tbody/tr[td/div[@class='imageR lazy-image']/div/p[@class='desc_r']='" + openBlogger + "']/td/div[@class='imageR lazy-image']/div[@class='titler']", document, null, XPathResult.ANY_TYPE, null );
      var titleHeading = titleHeadings.iterateNext();
      var oldTitleHeadings = document.evaluate("//table[@id='blogger']/tbody/tr[td/div[@class='description openBlogger']]/td/div[@class='imageR lazy-image']/div[@class='titler']", document, null, XPathResult.ANY_TYPE, null );
      var oldTitleHeading = oldTitleHeadings.iterateNext();
      if (thisHeading === null){
      }
      else{
      //$(thisHeading).css('display','block');
      $(thisHeading).slideDown(200);
      thisHeading.classList.add('openBlogger');
      $(imageHeading).css('border-bottom-left-radius','0px');
      $(imageHeading).css('border-bottom-right-radius','0px');
      $(titleHeading).css('border-bottom-left-radius','0px');
      $(titleHeading).css('border-bottom-right-radius','0px');
      setTimeout(bloggerFilterPos, 100);
      }

      if (oldHeading === null){}
      else{
        $(oldHeading).slideUp(100);
        oldHeading.classList.remove('openBlogger');
        $(oldImageHeading).animate({"border-bottom-left-radius":"4px","border-bottom-right-radius":"4px"},300);
        $(oldTitleHeading).animate({"border-bottom-left-radius":"4px","border-bottom-right-radius":"4px"},300);
      }
    }

    function bloggerDescriptionHide() {
      var oldHeadings = document.evaluate("//table[@id='blogger']/tbody/tr/td/div[@class='description openBlogger']", document, null, XPathResult.ANY_TYPE, null );
      var oldHeading = oldHeadings.iterateNext();
      var oldImageHeadings = document.evaluate("//table[@id='blogger']/tbody/tr[td/div[@class='description openBlogger']]/td/div[@class='imageR lazy-image']", document, null, XPathResult.ANY_TYPE, null );
      var oldImageHeading = oldImageHeadings.iterateNext();
      var oldTitleHeadings = document.evaluate("//table[@id='blogger']/tbody/tr[td/div[@class='description openBlogger']]/td/div[@class='imageR lazy-image']/div[@class='titler']", document, null, XPathResult.ANY_TYPE, null );
      var oldTitleHeading = oldTitleHeadings.iterateNext();

      if (oldHeading === null){}
      else{
      $(oldHeading).slideUp(100);
      oldHeading.classList.remove('openBlogger');
      $(oldImageHeading).animate({"border-bottom-left-radius":"4px","border-bottom-right-radius":"4px"},300);
      $(oldTitleHeading).animate({"border-bottom-left-radius":"4px","border-bottom-right-radius":"4px"},300);
      }
    }
    
//18. Set/get coookies

function setCookie(name, value, hours) {
  var expires = "";
  if (hours) {
    var date = new Date();
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}


//19. lazy loading images
inAdvance = 200;

function lazyLoadBlogger() {
//console.log(bloggerDivs);
var blogger = document.getElementById('blogger');
  bloggerDivs.forEach(div => {
    if (div.offsetTop < window.innerHeight + blogger.scrollTop + inAdvance) {
      //console.log(div.offsetTop + '<' + window.innerHeight + '+' + blogger.scrollTop + '+' + inAdvance);
      var attr = div.getAttribute('data-background-image');
      div.setAttribute('style', attr);
    }
  });
  localStorage.setItem('bloggerScroll', blogger.scrollTop);
}

function lazyLoadBlog() {
  
  //console.log(blogDivs);
  var blog = document.getElementById('blog');
  blogDivs.forEach(div => {
    if (div.offsetTop < window.innerHeight + blog.scrollTop + inAdvance) {
      //console.log(div.offsetTop + '<' + window.innerHeight + '+' + blogger.scrollTop + '+' + inAdvance);
      var attr = div.getAttribute('data-background-image');
      div.setAttribute('style', attr);
      }
    });
    localStorage.setItem('blogScroll', blog.scrollTop);
  }

  //Lazy-load - Scroll
    document.getElementById("blogger").addEventListener('scroll', throttle(lazyLoadBlogger, 100));
    document.getElementById("blog").addEventListener('scroll', throttle(lazyLoadBlog, 100));
  //Lazy-load - resize
    window.addEventListener('resize', throttle(lazyLoadBlogger, 150));
    window.addEventListener('resize', throttle(lazyLoadBlog, 150));

  //Throttler for scroll and resize event listeners
  function throttle(fn, wait) {
    var time = Date.now();
    return function() {
      if ((time + wait - Date.now()) < 0) {
        fn();
        time = Date.now();
      }
    }
  }
