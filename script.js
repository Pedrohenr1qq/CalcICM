// ============================================= Função MAIN ==========================================================
window.onload = function (){
    imc = 0;
    weight = 0;
    height = 0;

    testFunc(); //Fazendo testes separados da função e printando os valores no console do navegador.

    clearInputs(); //Limpar os campos de entrada na hora de iniciar

//Recebendo e tratando visualmente os dados recebidos
    weightBox = document.getElementById('weightBox');
    heightBox = document.getElementById('heightBox');

    debug("Hi there");

    //Validando o valor do peso
    weightBox.addEventListener('focusout', function () {
        weight = getWeight(); //Recebendo o valor do peso
        validateWeight(weight);
    });

    //Validando o valor da altura
    heightBox.addEventListener('focusout', function () {
        height = getHeight();
        validateHeight(height);
    });

//Calculando e validando o valor do IMC
    document.getElementById('bttCalc').addEventListener("click", function () {

        imc = validateIMC(weight,height).toFixed(2); //Calculando IMC
        //Validando IMC
        if(imc == 0){                                                       //Verificação para caso o peso tenha sido colocado incorretamente
            document.getElementById('valueIMC').innerHTML = "Ops. Você digitou o peso errado. Vamos corrigir isso? ";
        }
        else if(imc == -1){                                                 //Verificação para caso a altura tenha sido colocada incorretamente
            document.getElementById('valueIMC').innerHTML = "Ops. Você digitou a altura errada. Vamos corrigir isso? ";      
        }
        else if(imc == -2){                                                 //Verificação para caso a altura tenha sido colocada em cm
            document.getElementById('valueIMC').innerHTML = "Ops. Você digitou a altura em cm. Vamos corrigir isso? ";      
        }
        else{                                                               //Caso o IMC tenha sido calculado corretamente
            document.getElementById('valueIMC').innerHTML = imc;
            document.getElementById('checkIMC').innerHTML = classifyIMC(imc);
            setProgressBar(imc);}
    });
}

// ====================================================================

// =================================== Funções Principais =======================================================

function getWeight(){
    return parseFloat(document.getElementById('weightBox').value);
}

function getHeight(){
    return parseFloat(document.getElementById('heightBox').value);
}

//Função para calcular o valor do IMC e fazer o tratamento dos dados de entrada
function calcIMC(weight, height) {
    imc = weight / (height ** 2);
    return imc;
}


//Função para verificar a classificação do IMC (abaixo do peso, peso normal, etc...);
function classifyIMC(imc){
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
    if(imcPercentage > 100){
        imcPercentage = 100;
    }
    
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
// ===========================================================================================================================================


// ====================================== Funções DE Validação ===============================================================================
function validateWeight(value){
    weightBox = document.getElementById('weightBox');
    if(value != ""){
        if((isNumber(value)) && (isPositive(value)) ) {
            weightBox.style.borderColor = 'green';
        }
        else{
        weightBox.style.borderColor = 'red';
        }
    }
    else{
        weightBox.style.borderColor = 'none';
    }
}

function validateHeight(value){
    heightBox = document.getElementById('heightBox');
        if(value != ""){
            if((isNumber(value)) && (isPositive(value)) ) {
                heightBox.style.borderColor = 'green';
            }
            else{
                heightBox.style.borderColor = 'red';
            }
        }
        else{
            heightBox.style.borderColor = 'none';
        }
}


//Função para validar o IMC
function validateIMC(weight, height){
    imc = calcIMC(weight, height); //Calcula o valor do IMC para validação

    if((!isNumber(weight)) || !isPositive(weight) ){          //Verificando se o valor do peso é inválido (Se não é numéro ou um valor não negativo)
        return 0;
    }
    else if ((!isNumber(height)) || !isPositive(height) ){    //Verificando se o valor da altura é inválido (Se não é numéro ou um valor não negativo)
        return -1;
    }
    
    //O valor 3 foi escolhido arbitrariamente, pois dificilmente alguém (acho que nem existe) teria 3 metros de altura.
    else if(height >= 3){ //Validando se a altura foi colocada em metros ou cm (No caso, ela deve ser colocada em m para o calculo ser valido)
        return -2;
    }

    else {   
        return imc;
    }   
}
// ===========================================================================================================================================

// ====================================== Funções Auxiliares =================================================================================

//Função para limpar os campos de entrada
function clearInputs() {
    document.getElementById('weightBox').value = "";
    document.getElementById('heightBox').value = "";
}

//Função para verficar se um valor é um número ou não
function isNumber(number){
    return (!isNaN(number));
}

//Função para verificar se um valor é positivo
function isPositive(number){
    return (number > 0);
}
// ============================================================================================================================================

// ====================================== Função para Testes ==================================================================================

//Função para testar o calculo do ICM com valores de peso e altura diferentes.
function testFunc() {

    weight = ['a', 92, 'Hello', 60.5, 86.8, 120.3, 60.0]; //Valores de teste para o peso
    height = [1.20,'b', 'World', 1.73, 1.80, 1.65, 2.05 ]; // Valores de teste para a altura

    //Verificação de IMC. Cada elemento do array 'weight' corresponderá ao elemento de mesmo indice o array 'height';
    for (let i = 0; i < weight.length; i++) {
        imc = calcIMC(weight[i],height[i]).toFixed(2);
        if(imc > 0){
            imcStatus = classifyIMC(imc);
            console.log("Para o peso= "+ weight[i]+"Kg e a altura= "+ height[i]+"m, o IMC é: "+ imc + " e a classificação é: "+ imcStatus);
        }
        else{
            console.log("Para o peso= "+ weight[i]+"Kg e a altura= "+ height[i]+ "m ,não é possível calcular o IMC ");
        }
    }
}


//função para validar o fluxo do códifo 
function debug(msg){
    console.log(msg);
}
// ===========================================================================================================================================