//Iniciando o programa
window.onload = function (){
    imc = 0;

    document.getElementById('bttCalc').addEventListener("click", function () {
        const weight = parseFloat(document.getElementById('weightBox').value);
        const height = parseFloat(document.getElementById('heightBox').value);
        imc = calcIMC(weight,height).toFixed(2);
        if(imc != 0){      //Verificando se o IMC foi calculado corretamente
            document.getElementById('valueIMC').innerHTML = imc;
            document.getElementById('checkIMC').innerHTML = checkIMC(imc);
            setProgressBar(imc);
        }
    });
}

//Função para calcular o valor do IMC e fazer o tratamento dos dados de entrada
function calcIMC(weight, height) {
    imc = weight / (height ** 2);
    if(isNaN(imc)){        //Verificação se os dados de entrada são válidos (se são números).
        document.getElementById('valueIMC').innerHTML = "Ops. Você digitou algum campo errado. Tente novamente";
        return 0;
    }
    else {
        imc = weight / (height ** 2);
        
        return imc;
    }
}

//Função para verificar a classificação do IMC (abaixo do peso, peso normal, etc...);
function checkIMC(imc){
    imcStatus = "";
    if(imc < 18.5){
        imcStatus = "Abaixo do peso";
    }
    else if((imc >= 18.5) && (imc < 24.9) ){
        imcStatus = " No peso normal.";
    }
    else if((imc >= 24.9) && (imc < 29.9) ){
        imcStatus = " Com sobrepeso. ";
    }else{
        imcStatus = " Com obsedidade. ";
    }

    return imcStatus;
}

//Função para construir a barra de progresso referente ao valor de IMC
/**
 * A função em si não é complicada, mas dando uma breve explicação sobre os parametros usados:
 * imcStatus: valor da cor da barra de progresso referente à classficação do ICM:
 *      laranja: Abaixo do peso
 *      verde: Peso normal (Ideal) 
 *      amarelo: Sobrepeso
 *      vermelho: Obesidade
 * 
 * refValue: Valor arbitrário para definir o crescimento da barra de progresso. 60 pareceu um valor bom para que a barra tivesse um crescimento legal,
 * então deixei esse valor mesmo. É o valor de refêrencia para a porcentagem da barra de progresso.
 * 
 * imgPercentage: Valor da porcentagem que a barra deve ficar em relação ao IMC calculado.
 * / */

function setProgressBar(imc) {
    imcstatus=  '';
    const refValue =   60;
    imcPercentage = (imc/refValue) * 100;
    const progressBar = document.getElementById('loader');


    if(imc < 18.5){
        imcStatus = 'rgb(255,125,0)';
    }
    else if((imc >= 18.5) && (imc < 24.9) ){
        imcStatus = 'rgb(0,255,0)';
    }
    else if((imc >= 24.9) && (imc < 29.9) ){
        imcStatus = 'rgb(255,255,0)';
    }else{
        imcStatus = 'rgb(255,0,0)';
    }
    progressBar.style.width = imcPercentage+'%';
    progressBar.style.backgroundColor = imcStatus;
}