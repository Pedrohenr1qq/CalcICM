// ============================================= Função MAIN ==========================================================
window.onload =  () => {
    let weight = 0;
    let height = 0;

    testFunc(); //Fazendo testes separados da função e printando os valores no console do navegador.

    clearInputs(); //Limpar os campos de entrada na hora de iniciar

//Recebendo e tratando visualmente os dados recebidos
    let weightBox = document.getElementById('weightBox');
    let heightBox = document.getElementById('heightBox');

    //Validando o valor do peso
    weightBox.addEventListener('focusout', () => {
        weight = getWeight(); //Recebendo o valor do peso
        weight = isNaN(weight) ? 0 : weight; //Verficando se o valor é valido
        validateBox(weight, "weightBox");
    });

    //Validando o valor da altura
    heightBox.addEventListener('focusout', () => {
        height = getHeight();
        height = isNaN(height) ? 0 : height;   // Verificando se o valor é valido
        validateBox(height, "heightBox");
    });

//Calculando e validando o valor do IMC
    document.getElementById('bttCalc').addEventListener("click", () => {
        showIMC(weight, height);
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
    return ( weight / (height ** 2));
}


//Função para verificar a classificação do IMC (abaixo do peso, peso normal, etc...);
function classifyIMC(imc){
    let imcStatus = "";
    if(imc < 18.5){
        imcStatus = "Abaixo do peso";
    }
    else if((imc >= 18.5) && (imc < 24.9) ){
        imcStatus = " No peso normal.";
    }
    else if((imc >= 24.9) && (imc < 29.9) ){
        imcStatus = " Com sobrepeso. ";
    }else{
        imcStatus = " Com obesidade. ";
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
    let imcStatus =  '';
    const refValue = 60;
    imcPercentage = (imc/refValue) * 100;

    imcPercentage = (imcPercentage > 100) ? 100 : imcPercentage;
    
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
    progressBar.style.width = `${imcPercentage}+%`;
    progressBar.style.backgroundColor = imcStatus;
}

//Função para mostrar os resultados do calculo de IMC
function showIMC(weight, height){
    let imc = validateIMC(weight,height).toFixed(2); //Calculando IMC
    //Validando IMC
    if(imc == 0){                                                       //Caso ambos os valores estejam em branco
        document.getElementById('valueIMC').innerHTML = "Ops! Você esqueceu de por os valores. Vamos corrigir isso? ";
    }
    else if(imc == -1){                                                 //Verificação para caso o peso tenha sido colocado incorretamente
        document.getElementById('valueIMC').innerHTML = "Ops! Você digitou o peso errado. Vamos corrigir isso? ";
    }
    else if(imc == -2){                                                 //Verificação para caso a altura tenha sido colocada incorretamente
        document.getElementById('valueIMC').innerHTML = "Ops! Você digitou a altura errada. Vamos corrigir isso? ";      
    }
    else if(imc == -3){                                                 //Verificação para caso a altura tenha sido colocada em cm
        document.getElementById('valueIMC').innerHTML = "Ops! Você digitou a altura em cm. Vamos corrigir isso? ";      
    }
    else{                                                               //Caso o IMC tenha sido calculado corretamente
        document.getElementById('valueIMC').innerHTML = `Seu IMC é: ${imc} kg/m²`;
        document.getElementById('checkIMC').innerHTML = `Você está: ${classifyIMC(imc)}`;
        setProgressBar(imc);
    }
}

// ===========================================================================================================================================


// ====================================== Funções De Validação ===============================================================================
//Função para validar visualmente os valores inseridos nas box de peso (weightBox) e altura (heightBox).
var validateBox = (value, boxType) => {
    let box = document.getElementById(boxType);
    if(value != ""){
        if((isNumber(value)) && (isPositive(value)) ) {
            box.style.borderColor = 'green';
        }
        else{
        box.style.borderColor = 'red';
        }
    }
    else{
        box.style.borderColor = 'none';
    }
}

//Função para validar o IMC
function validateIMC(weight, height){
    let imc = calcIMC(weight, height); //Calcula o valor do IMC para validação

    if((weight == "") && (height == "")){
        return 0;
    }
    else if((!isNumber(weight)) || !isPositive(weight) ){          //Verificando se o valor do peso é inválido (Se não é número ou um valor não negativo)
        return -1;
    }
    else if ((!isNumber(height)) || !isPositive(height) ){    //Verificando se o valor da altura é inválido (Se não é número ou um valor não negativo)
        return -2;
    }
    //O valor 3 foi escolhido arbitrariamente, pois dificilmente alguém (acho que nem existe) teria 3 metros de altura.
    else if(height >= 3){ //Validando se a altura foi colocada em metros ou cm (No caso, ela deve ser colocada em m para o calculo ser valido)
        return -3;
    }


    else {   
        return imc;
    }   
}
// ===========================================================================================================================================

// ====================================== Funções Auxiliares =================================================================================

//Função para limpar os campos de entrada
var clearInputs = () => {
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
var testFunc = () => {

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