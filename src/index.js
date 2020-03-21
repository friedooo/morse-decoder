const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
    expr = expr.split('**********');
    //console.log(expr);

   let codeWordElem = '';
   let codeWord = '';
   let codeLetterBin = [];
   let buffer = '';
   let dot = 10;
   let dash = 11;
   let previosArrLength = 1000;

   for (let elem of expr)
       {
           for (let k = 1, i = -1; k <= elem.length; k++)
           { 
               
               buffer += elem[k-1];
             // console.log(buffer);
               if (k%10 == 0 && k != 0)
               {
                   
                   i++;
                   codeLetterBin[i] = [];
                   codeLetterBin[i].push(buffer);
                   buffer = '';  
               }        
           }
           
           
           for (let i = 0; i < codeLetterBin.length; i++)
           {
               //console.log(codeLetterBin[i]);

               for (let elem1 of codeLetterBin[i])
               {
                   elem1 = elem1.replace(/^0+/, '');
                  // console.log(elem1);
                   codeWordElem += '!';
                   for (let i = 0; i < elem1.length; i = i + 2)
                   {
                       if (elem1[i] + elem1[i+1] == dot)
                       codeWordElem += '.';
                       if (elem1[i] + elem1[i+1] == dash)
                       codeWordElem += '-';
                   } 
                   codeWord += codeWordElem;
                   codeWordElem = '';                
               }
           }
           codeWord += '  ';   
           codeLetterBin.length = [];
       }
   
       codeWord = codeWord.replace(/!/g, ' ');
       console.log(codeWord);
   
       let phrase = codeWord.split('  ');
       phrase.pop();
       console.log(phrase);

       let answer = '';

       for (let elem of phrase)
       {
           for (let letter of elem.split(' '))
           {
               for (let code in MORSE_TABLE)
                   {
                       if (letter == code)
                       {
                           answer += MORSE_TABLE[code];
                       }
                   }
           }
           answer += ' ';
       }

       
   console.log(answer);
       return answer.trim();
}

module.exports = {
    decode
}