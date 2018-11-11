// 0. Run Filter on load as relies on change so first change wouldnt register without this onload function
window.onload = function() {
    document.getElementById("navActive").setAttribute('id','navActive');
    document.getElementById("butFilter").value = document.getElementById("navActive").innerHTML;
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

      // Loop through the buttons and add the active class to the current/clicked button
      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
          document.getElementById("myInput").value = "";
          document.getElementById("navActive").setAttribute('id','nav');
          this.setAttribute('id','navActive')
          document.getElementById("butFilter").value = this.innerHTML ;
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
      
    