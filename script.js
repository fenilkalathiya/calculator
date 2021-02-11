$(document).ready(function(){
    var stringValue;
    var input_value=''; 
    var operator=[],numbers = [];
    var value_new ,value_new_array=[];
    $('.btn_number').click(function(){
        value_new = $(this).val();
        if( value_new == '.' && ( $('#answer').val()== '' || value_new_array[value_new_array.length] == '+' || value_new_array[value_new_array.length] == '-' || value_new_array[value_new_array.length] == '*' || value_new_array[value_new_array.length] == '/' || value_new_array[value_new_array.length] == '%' || value_new_array[value_new_array.length] == '')){
            input_value = '0'+ value_new;
            value_new_array.push(input_value);
        }
        else{
            input_value = input_value + value_new;
            value_new_array.push(input_value);
        }
        stringValue = $('#answer').val(input_value);
    });
    $('.btn_backSpace').click(function(){
        stringValue = $('#answer').val();
        backSpace(stringValue);
    });
    function backSpace(str){
        var new_string = str.substring(0,str.length-1);
        input_value = new_string;
        $('#answer').val(new_string);
    }
    $('.btn_clear').click(function(){
        $('#answer').val('');
        stringValue='';
        operator=[];
        numbers = [];
        input_value = '';
        keyValue ='';
    });
    $('.btn_square').on('click',function(){
        if(input_value.match(/^[\d.]+$/)){
            $('#answer').val($('#answer').val() * $('#answer').val());
            $('#notice').html('Your output on display.')
        }
        else if($('#answer').val() == 'NaN'){
            $('#notice').html('Please enter number not allowed expression.')
        }
        else{
            $('#notice').html('Please enter number not allowed expression.')
        }
    });
    $('.btn_root').on('click',function(){
        if(input_value.match(/^[\d.]+$/)){
            $('#answer').val(Math.sqrt($('#answer').val()));
            $('#notice').html('Your output on display.')
        }
        else if ($('#answer').val() == 'NaN'){
            $('#notice').html('Please enter number not allowed expression.')
        }
        else{
            $('#notice').html('Please enter number not allowed expression.')
        }
        
    });
    $(document).keyup(function(event){
        var keyValue;
        if(event.keyCode >= 96 && event.keyCode <= 105){ keyValue = event.keyCode - 96;}
        if(event.keyCode == 110){ keyValue='.'; }
        if(event.keyCode == 106){ keyValue='*'; }
        if(event.keyCode == 107){ keyValue='+'; }
        if(event.keyCode == 109){ keyValue='-'; }
        if(event.keyCode == 111){ keyValue='/'; }
        if(event.keyCode == 57 && event.shiftKey){ keyValue = '('};
        if(event.keyCode == 48 && event.shiftKey) { keyValue = ')'};
        if(event.keyCode == 8){ 
            if($('#answer').is(':focus')){
                return false;
            }
            else{
                $('.btn_backSpace').trigger('click');
            }
         }
        if(event.keyCode == 46){ $('.btn_clear').trigger('click'); }
        if(event.keyCode == 13 || event.keyCode == 187){ $('.btn_equal').trigger('click'); }
        $('.btn_number[value="'+keyValue+'"]').trigger('click');
    });
    $('.btn_equal').on('click',function(){
        stringValue = $('#answer').val();
        if(stringValue != ''){
            $('#answer').val(result(stringValue));
            if($('#answer').val() == 'Infinity'){
                $('#notice').html('Cannot divide by Zero.')
                $('#answer').val('');
            }
            else if($('#answer').val() != 'NaN'){
                $('#notice').html('Your expression is rigth and get the output on display.')  
                stringValue = $('#answer').val();
                input_value = stringValue;
            }
            else{
                $('#answer').val('');
                $('#notice').html('Please enter valid expression.')
                stringValue = '';
                input_value = '';
            }
        }
        else{
            $('#notice').html('Enter the correct expression.')
        }
    });
    function result(stringValue){
        
        if(true){
            var addMultiplyarray=[];
            for(var i=0;i<stringValue.length;i++){
                if(stringValue[i] == '('){
                    console.log('index value ',i);
                    if(stringValue[i-1] === '1' || stringValue[i-1] === '2' || stringValue[i-1] === '3' || stringValue[i-1] === '4' || stringValue[i-1] === '5' || stringValue[i-1] === '6' || stringValue[i-1] === '7' || stringValue[i-1] === '8' || stringValue[i-1] === '9' || stringValue[i-1] === '0'){
                        addMultiplyarray = stringValue.split('');
                        addMultiplyarray.splice(i,0,"*");
                        console.log(stringValue);
                        stringValue = addMultiplyarray.join('');
                        i=0;
                        addMultiplyarray = [];
                    }
                }
            }
        }
        if(stringValue[0]=='-'){
            var new_string,new_string_value=[];
            new_string = stringValue.indexOf("+");
            new_string_value[0] = stringValue.substring(0,new_string);
            new_string_value[1] = stringValue.substring(new_string+1,stringValue.length);
            var item;
            item = new_string_value[0];
            new_string_value[0] = new_string_value[1];
            new_string_value[1] = item;
            stringValue = new_string_value.join('');
        }
        for(var i = 0 ;i < stringValue.length ; i++){
            var character = stringValue[i];
            if(character === '0' || character === '1' || character === '2' || character === '3' || character === '4' || character === '5' || character === '6' || character === '7' || character === '8' || character === '9' || character === '.'){
                var newString = '';
                while(i < stringValue.length && stringValue[i].match(/^[\d.]+$/)){
                    newString = newString + stringValue[i];
                    i++;
                }
                i--;
                if(newString.match(/^[0-9]\d*(\.\d+)?$/)){
                    numbers.push(parseFloat(newString));       
                }
                else{
                    $('#notice').html('Please enter valid expression.');
                }
            }
            else if(character == '+' || character == '-' || character == '*' || character == '/' || character == '%'){
                while(operator.length > 0 && precedendeTable(character,operator[operator.length - 1])){
                    numbers.push(operatorOperation(numbers.pop(),numbers.pop(),operator.pop()));
                }
                operator.push(character); 
            }
            else if(character == '('){
                operator.push(character);
            }
            else if(character == ')'){
                while(operator[operator.length - 1] != '('){
                    numbers.push(operatorOperation(numbers.pop(),numbers.pop(),operator.pop()));
                }
                operator.pop();
            }
        }
        while(operator.length > 0){
            numbers.push(operatorOperation(numbers.pop(),numbers.pop(),operator.pop()));          
        }
        return numbers.pop();
    }
    function operatorOperation(firstValue,secondValue,operation){
        if(operation === '+'){ return parseFloat(secondValue + firstValue)}
        else if(operation == '-'){ return parseFloat(secondValue - firstValue)}
        else if(operation == '*'){ return parseFloat(secondValue * firstValue)}
        else if(operation == '/'){ return parseFloat(secondValue / firstValue)}
        else if(operation == '%'){ return parseFloat(secondValue % firstValue)}
    }
    function precedendeTable(firstOperator,secondOperator){
        var operators = {'=':1,'(':2,'+':3,'-':3,'*':4,'/':4,'%':5};    
        return operators[firstOperator] <= operators[secondOperator];
    }
});