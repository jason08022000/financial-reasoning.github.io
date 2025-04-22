function generateTable() {
    var data = score_table; // The variable from model_scores.js
  
    var table = '<table class="js-sort-table" id="results">';
    table += `<tr>
            <td class="js-sort-number"><strong>#</strong></td>
            <td class="js-sort"><strong>Model</strong></td>
            <td class="js-sort"><strong>Method</strong></td>
            <td class="js-sort-number"><strong><u>Overall</u></strong></td>
            <td class="js-sort-number"><strong>Expertise</strong></td>
            <td class="js-sort-number"><strong>Math</strong></td>
            <td class="js-sort-number"><strong>Inv</strong></td>
            <td class="js-sort-number"><strong>QM</strong></td>
            <td class="js-sort-number"><strong>VRM</strong></td>
            <td class="js-sort-number"><strong>FMP</strong></td>
            <td class="js-sort-number"><strong>FRA</strong></td>
            <td class="js-sort-number"><strong>PM</strong></td>
            <td class="js-sort-number"><strong>FI</strong></td>
            <td class="js-sort-number"><strong>FRM</strong></td>
            <td class="js-sort-number"><strong>CR</strong></td>
            <td class="js-sort-number"><strong>ECO</strong></td>
            <td class="js-sort-number"><strong>OR</strong></td>
            <td class="js-sort-number"><strong>Der</strong></td>
            <td class="js-sort-number"><strong>MR</strong></td>
            <td class="js-sort-number"><strong>CF</strong></td>
            <td class="js-sort-number"><strong>LTR</strong></td>
        </tr>`;
  
        // sort data to make sure the best model is on top
        first_row = '1' 
        console.log(data);
  
        // get all keys in data
        var keys = Object.keys(data);
  
        // for (var key in data) {
        for (var i=0; i<keys.length; i++) {
          var key = keys[i];
          console.log(key);
          var entry = data[key];
  
          table += '<tr>';
          table += `<td>${key}</td>`
  
          // for key = "1", "2", "3"
          top_ranks = ["1", "2", "3"]
          if (top_ranks.includes(key)) {
            table += `<td><b>${entry.Model}</b></td>`;
            table += `<td>${entry.Method}</td>`;
            table += `<td><b>${entry.Overall.toFixed(2).toString()}</b></td>`; // .toFixed(2): round to 2 decimal place
          }
          else {
            table += `<td><b>${entry.Model}</b></td>`;
            table += `<td>${entry.Method}</td>`;
            table += `<td><b>${entry.Overall.toFixed(2).toString()}</b></td>`; // .toFixed(2): round to 2 decimal place
          }          
  
          // if entry.Math is a number
          if (!isNaN(entry.Math)) {
            table += `<td>${entry.Expertise.toFixed(2).toString()}</td>`;
            table += `<td>${entry.Math.toFixed(2).toString()}</td>`;
            table += `<td>${entry.Inv.toFixed(2).toString()}</td>`;
            table += `<td>${entry.QM.toFixed(2).toString()}</td>`;
            table += `<td>${entry.VRM.toFixed(2).toString()}</td>`;
            table += `<td>${entry.FMP.toFixed(2).toString()}</td>`;
            table += `<td>${entry.FRA.toFixed(2).toString()}</td>`;
            table += `<td>${entry.PM.toFixed(2).toString()}</td>`;
            table += `<td>${entry.FI.toFixed(2).toString()}</td>`;
            table += `<td>${entry.FRM.toFixed(2).toString()}</td>`;
            table += `<td>${entry.CR.toFixed(2).toString()}</td>`;
            table += `<td>${entry.ECO.toFixed(2).toString()}</td>`;
            table += `<td>${entry.OR.toFixed(2).toString()}</td>`;
            table += `<td>${entry.Der.toFixed(2).toString()}</td>`;
            table += `<td>${entry.MR.toFixed(2).toString()}</td>`;
            table += `<td>${entry.CF.toFixed(2).toString()}</td>`;
            table += `<td>${entry.LTR.toFixed(2).toString()}</td>`;
          }
          else {
            table += `<td>${entry.Expertise.toString()}</td>`;
            table += `<td>${entry.Math.toString()}</td>`;
            table += `<td>${entry.Inv.toString()}</td>`;
            table += `<td>${entry.QM.toString()}</td>`;
            table += `<td>${entry.VRM.toString()}</td>`;
            table += `<td>${entry.FMP.toString()}</td>`;
            table += `<td>${entry.FRA.toString()}</td>`;
            table += `<td>${entry.PM.toString()}</td>`;
            table += `<td>${entry.FI.toString()}</td>`;
            table += `<td>${entry.FRM.toString()}</td>`;
            table += `<td>${entry.CR.toString()}</td>`;
            table += `<td>${entry.ECO.toString()}</td>`;
            table += `<td>${entry.OR.toString()}</td>`;
            table += `<td>${entry.Der.toString()}</td>`;
            table += `<td>${entry.MR.toString()}</td>`;
            table += `<td>${entry.CF.toString()}</td>`;
            table += `<td>${entry.LTR.toString()}</td>`;
          }
          table += '</tr>';
      }
  
    table += '</table>';
    document.getElementById('leaderboard').innerHTML = table; // Assuming you have a div with id 'container' where the table will be placed
  }
  
  // Call the function when the window loads
  window.onload = generateTable;
  