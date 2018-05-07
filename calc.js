$(function() {

  var expression = '';
  var expressionArray = [];
  var displayArray = [];
  var resultArray = [];
  var ansOnDisplay = false;
  var ans = null;
  var error = false;

  if (resultArray.length > 0) {
    resultArray = JSON.parse(localStorage.getItem("results"));
  }

  function defaults() {
    expression = '';
    expressionArray = [];
    displayArray = [];
    ansOnDisplay = false;
    ans = null;
    error = false;
    $('.result').html('');
    $('.calc-display').html('');
    document.getElementById('list-wrapper').appendChild(buildResultList());
  }

  function writeToDisplay(mode, text) {

    if (mode == 'append') {
      if (error) {
        displayArray = [];
      }
      error = false;
      displayArray.push(text);
    } else if (mode == 'write') {
      displayArray = [text];
    }

    $('.calc-display').html(displayArray.join(''));
  }

  function addToExpression(text) {
    expressionArray.push(text);
    expression += text;
  }

  function removeFromExpression() {
    var count = expressionArray.pop().length;
    expression = expression.slice(0, -count);
  }

  function addToResult(text) {
    if (resultArray.length == 10) {
      removeFromResult();
    }
    resultArray.unshift(text);
    localStorage.setItem("results", JSON.stringify(resultArray));
  }

  function removeFromResult() {
    resultArray.pop();
  }

  function buildResultList() {
    // Create the list element:
    var wrapper = document.getElementById("list-wrapper");
    while (wrapper.firstChild) {
      wrapper.removeChild(wrapper.firstChild);
    }

    var list = document.createElement("ul");
    list.setAttribute("id", "calculation-list");


    for(var i = 0; i < resultArray.length; i++) {
      // Create the list item:
      var item = document.createElement('li');

      // Set its contents:
      item.appendChild(document.createTextNode(resultArray[i]));

      // Add it to the list:
      list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
  }

  // ask for a result
  $('#equals').click(
    function() {

      if (ansOnDisplay) {
        expressionArray = [ans];
      } else {
        addToResult(expressionArray.join(''))
      }

      try {
        math.eval(expressionArray.join('')).toPrecision(8);
      } catch (e) {
        error = true;
      }

      if (error) {
        defaults();
        error = true;
        writeToDisplay('write', 'Syntax Error');
      } else {
        $('.result').html($('.calc-display').html().replace(/Ans/, ans) + ' =');
        ans = math.eval(expressionArray.join('')).toPrecision(8);
        writeToDisplay('write', ans.toString().replace(/(\.0+$)|(0+$)/g, ''));

        ansOnDisplay = true;
        document.getElementById('list-wrapper').appendChild(buildResultList());
      }
      expression = '';
      expressionArray = [];
    }
  );

  // clear the screen
  $('#clear').click(
    function() {
      defaults();
    }
  );

  // add a number to the screen
  $('.num').click(
    function() {
      var key = $(this).attr('key');

      if (ansOnDisplay) {
        $('.result').html('Ans = ' + $('.calc-display').html());
        writeToDisplay('write', '');
        ansOnDisplay = false;
      }

      addToExpression(key);
      writeToDisplay('append', $(this).html());
    }
  );

  // add an operator to the screen if there's no other operator
  $('.operator').click(
    function() {
      var key = $(this).attr('key');
      var char = $(this).attr('char');

      if (ansOnDisplay) {
        $('.result').html('Ans = ' + $('.calc-display').html());
        expression = ans;
        expressionArray = [ans];
        ansOnDisplay = false;
      }

      if ((/[/]$|[*]$/g.test(expression) && (key == '/' || key == '*'))) {
        writeToDisplay('write', $('.calc-display').html().replace(/[÷]$|[×]$/g, char));
        removeFromExpression();
        addToExpression(key);
      } else if (/[+]$|[-]$/g.test(expression) && (key == '+' || key == '-')) {
        writeToDisplay('write', $('.calc-display').html().replace(/[+]$|[-]$/g, char));
        removeFromExpression();
        addToExpression(key);
      } else {
        writeToDisplay('append', char);
        addToExpression(key);
      }

      ansOnDisplay = false;
    }
  );

  // add a function, change parentheses
  $('.sqrt').click(
    function() {
      var num = $('.calc-display').html();

      if (num) {
        if (ansOnDisplay) {
          var num = ans
          $('.result').html('Ans = ' + $('.calc-display').html());
          writeToDisplay('write', '');
          ansOnDisplay = false;
        }

        if (expressionArray.length > 0) {
          removeFromExpression();
        }

        addToExpression('sqrt(' + num + ')');
        writeToDisplay('append', $(this).html());
      }

    }
  );

});
