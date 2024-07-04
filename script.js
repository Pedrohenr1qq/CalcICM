window.onload = function (){

    document.getElementById('bttCalc').addEventListener("click", function () {
        const weight = parseFloat(document.getElementById('weightBox').value);
        const height = parseFloat(document.getElementById('heightBox').value);
        imc = calcIMC(weight,height);
        if(imc != 0){
            document.getElementById('valueIMC').innerHTML = imc;
            checkIMC(imc);
        }
    });
}

function calcIMC(weight, height) {
    imc = weight / (height ** 2);
    if(isNaN(imc)){        
        document.getElementById('valueIMC').innerHTML = "Ops. Você digitou algum campo errado. Tente novamente";
        return 0;
    }
    else {
        imc = weight / (height ** 2);
        
        return imc;
    }
}

function checkIMC(imc){
    imcStatus = "";
    if(imc < 18.5){
        imcStatus = "Abaixo do peso";
    }
    else if((imc >= 18.5) && (imc < 24.9) ){
        imcStatus = " No peso normal. Parabéns! ";
    }
    else if((imc >= 24.9) && (imc < 29.9) ){
        imcStatus = " Com sobrepeso. ";
    }else{
        imcStatus = " Com obsedidade. ";
    }

    document.getElementById('checkIMC').innerHTML = imcStatus;

}