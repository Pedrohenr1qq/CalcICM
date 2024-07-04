//Iniciando o programa
window.onload = function (){
    imc = 0;
    weight = 0;
    height = 0;

    testFunc(); //Fazendo testes separados da função e printando os valores no console do navegador.

    document.getElementById('bttCalc').addEventListener("click", function () {

        weight = parseFloat(document.getElementById('weightBox').value);
        height = parseFloat(document.getElementById('heightBox').value);
        imc = calcIMC(weight,height).toFixed(2);
        if(imc != 0){      //Verificando se o IMC foi calculado corretamente
            document.getElementById('valueIMC').innerHTML = imc;
            document.getElementById('checkIMC').innerHTML = checkIMC(imc);
            setProgressBar(imc);
        }
        else{
            document.getElementById('valueIMC').innerHTML = "Ops. Você digitou algum campo errado. Tente novamente";
        }
    });
}

//Função para calcular o valor do IMC e fazer o tratamento dos dados de entrada
function calcIMC(weight, height) {
    imc = weight / (height ** 2);
    if(( isNaN(imc)) || (height == 0) ){        //Verificação se os dados de entrada são válidos (se são números e se a altura é diferente de 0).
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
        imcStatus = 'rgb(255,125,0)'; //abaixo do peso
    }
    else if((imc >= 18.5) && (imc < 24.9) ){
        imcStatus = 'rgb(0,255,0)'; //peso ideal
    }
    else if((imc >= 24.9) && (imc < 29.9) ){
        imcStatus = 'rgb(255,255,0)'; //sobrepeso
    }else{
        imcStatus = 'rgb(255,0,0)'; //obesidade
    }
    progressBar.style.width = imcPercentage+'%';
    progressBar.style.backgroundColor = imcStatus;
}
  

//Função para valores de teste do programa
function testFunc() {


    weight = ['a', 92, 'Hello', 60.5, 86.8, 120.3, 60.0]; //Valores de teste para o peso
    height = [1.20,'b', 'World', 1.73, 1.80, 1.65, 2.05 ]; // Valores de teste para a altura

    //Verificação de IMC. Cada elemento do array 'weight' corresponderá ao elemento de mesmo indice o array 'height';
    for (let i = 0; i < weight.length; i++) {
        imc = calcIMC(weight[i],height[i]).toFixed(2);
        if(imc != 0){
            imcStatus = checkIMC(imc);
            console.log("Para o peso= "+ weight[i]+"Kg e a altura= "+ height[i]+"m, o IMC é: "+ imc + " e a classificação é: "+ imcStatus);
        }
        else{
            console.log("Para o peso= "+ weight[i]+"Kg e a altura= "+ height[i]+ "m ,não é possível calcular o IMC ");
        }
    }
}