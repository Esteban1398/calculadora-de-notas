/**
 * Constantes de los pesos de los cortes
 */
const PESO_CORTE_1 = 0.33;
const PESO_CORTE_2 = 0.33;
const PESO_CORTE_3 = 0.34;
const NOTA_APROBACION = 3.0;
const NOTA_MAXIMA = 5.0;
const NOTA_MINIMA = 0.0;
const ERROR_MENSAJE = "Formato inválido (ej: 0.00 a 5.00)";
const ERROR_VACIO = "La casilla no puede estar vacía.";

/**
 * Función que obtiene el valor de una variable CSS definida en :root
 * @param {string} variableName Nombre de la variable CSS (ej: '--primary-green')
 * @returns {string} El valor de la variable.
 */
function getCssVariable(variableName) {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}

/**
 * Función que se ejecuta al escribir en los inputs.
 * Valida el valor y limpia el mensaje de error si es válido.
 * @param {HTMLInputElement} inputElement El elemento input que se está modificando.
 */
function validarYLimpiar(inputElement) {
    const errorElement = document.getElementById(`error-${inputElement.id}`);
    const rawValue = inputElement.value.trim();
    const value = parseFloat(rawValue);

    if (rawValue === "") {
        errorElement.textContent = "";
        return;
    }

    if (isNaN(value) || value < NOTA_MINIMA || value > NOTA_MAXIMA) {
        errorElement.textContent = ERROR_MENSAJE;
        errorElement.style.color = getCssVariable('--danger-color');
    } else {
        errorElement.textContent = "";
    }
}


// -------------------------------------------------------------------------------- //

/**
 * Función principal para calcular la nota necesaria para el 3.0 y los promedios generales.
 */
function calcularTodo() {
    // Resetear mensajes de error
    document.getElementById('error-corte1').textContent = '';
    document.getElementById('error-corte2').textContent = '';

    // Elementos del resultado
    const requiredLabel = document.getElementById('required-label'); // NUEVO
    const notaNecesariaSpan = document.getElementById('notaNecesaria');
    const mensajeNecesariaP = document.getElementById('mensajeNecesaria');
    const notaFinalMaximaSpan = document.getElementById('notaFinalMaxima');
    const notaFinalMinimaSpan = document.getElementById('notaFinalMinima');
    const notaActualSpan = document.getElementById('notaActual');

    // Elementos del texto de resultado complejo (lado derecho)
    // Se ajusta el query para reflejar la nueva estructura de 2 líneas
    const resultLine2 = document.querySelector('.result-text-group p:nth-child(1) span:nth-child(1)');
    const resultLine3 = document.querySelector('.result-text-group p:nth-child(1) span:nth-child(2)');
    const resultLine4 = document.querySelector('.result-text-group p:nth-child(2) span:nth-child(1)');
    const imposibleSpan = document.getElementById('imposible-text');

    // Resetear resultados
    requiredLabel.textContent = ''; // Se oculta en el reset
    notaNecesariaSpan.textContent = '0.00';
    mensajeNecesariaP.textContent = 'Ingresa tus notas para calcular.';
    notaFinalMaximaSpan.textContent = '0.00';
    notaFinalMinimaSpan.textContent = '0.00';
    notaActualSpan.textContent = '0.00';
    resultLine2.textContent = '';
    resultLine3.textContent = '';
    resultLine4.textContent = '';
    imposibleSpan.textContent = '';


    // 1. Obtener los valores crudos del DOM
    const rawN1 = document.getElementById('corte1').value.trim();
    const rawN2 = document.getElementById('corte2').value.trim();

    // 2. Intentar parsear a número.
    let n1 = parseFloat(rawN1);
    let n2 = parseFloat(rawN2);

    let hayError = false;

    // 3. Validación estricta antes de calcular (para el botón)
    if (rawN1 === "" || isNaN(n1) || n1 < NOTA_MINIMA || n1 > NOTA_MAXIMA) {
        document.getElementById('error-corte1').textContent = (rawN1 === "") ? ERROR_VACIO : ERROR_MENSAJE;
        hayError = true;
    }
    
    if (rawN2 === "" || isNaN(n2) || n2 < NOTA_MINIMA || n2 > NOTA_MAXIMA) {
        document.getElementById('error-corte2').textContent = (rawN2 === "") ? ERROR_VACIO : ERROR_MENSAJE;
        hayError = true;
    }
    
    if (hayError) {
        document.getElementById('error-corte1').style.color = getCssVariable('--danger-color');
        document.getElementById('error-corte2').style.color = getCssVariable('--danger-color');
        return;
    }
    
    // 4. Los valores numéricos son válidos, procedemos con el cálculo

    // 5. CÁLCULO PRINCIPAL: Nota Necesaria para 3.0
    const pesoAcumulado = (n1 * PESO_CORTE_1) + (n2 * PESO_CORTE_2);
    const notaRequeridaPara3 = NOTA_APROBACION - pesoAcumulado;
    let notaNecesaria = notaRequeridaPara3 / PESO_CORTE_3;

    // 7. CÁLCULOS ADICIONALES (Siempre se calculan si no hay error)
    let notaFinalMaxima = pesoAcumulado + (NOTA_MAXIMA * PESO_CORTE_3);
    notaFinalMaximaSpan.textContent = notaFinalMaxima.toFixed(2);

    let notaFinalMinima = pesoAcumulado + (NOTA_MINIMA * PESO_CORTE_3);
    notaFinalMinimaSpan.textContent = notaFinalMinima.toFixed(2);
    notaActualSpan.textContent = pesoAcumulado.toFixed(2);


    // 6. Mostrar y manejar límites de la Nota Necesaria
    if (notaNecesaria > NOTA_MAXIMA) {
        // IMPOSIBLE
        const notaExcesiva = notaNecesaria.toFixed(2);
        notaNecesariaSpan.textContent = '5.00'; 
        mensajeNecesariaP.textContent = `¡Imposible! Necesitas una nota superior a 5.0.`;
        
        // Estilos y mensajes
        requiredLabel.textContent = 'Requiere:';
        notaNecesariaSpan.style.color = getCssVariable('--danger-color');
        mensajeNecesariaP.style.color = getCssVariable('--danger-color');
        mensajeNecesariaP.style.textShadow = getCssVariable('--shadow-neon-red');
        
        // Texto de resultado complejo
        resultLine2.textContent = `Se requiere una nota de ${notaExcesiva}`;
        resultLine3.textContent = ``;
        resultLine4.textContent = `Nota requerida > 5.00`;
        imposibleSpan.textContent = 'Imposible';
        imposibleSpan.style.color = getCssVariable('--danger-color');
        imposibleSpan.style.textShadow = getCssVariable('--shadow-neon-red');
        
    } else if (notaNecesaria < NOTA_MINIMA) {
        // YA APROBADO
        notaNecesariaSpan.textContent = `0.00`;
        mensajeNecesariaP.textContent = `¡Ya Aprobaste! Tu nota es suficiente.`;
        
        // Estilos y mensajes
        requiredLabel.textContent = ''; // Se oculta en este estado
        notaNecesariaSpan.style.color = getCssVariable('--primary-green');
        mensajeNecesariaP.style.color = getCssVariable('--primary-green');
        mensajeNecesariaP.style.textShadow = getCssVariable('--shadow-neon-green');
        
        // Texto de resultado complejo
        resultLine2.textContent = `¡Aprobación asegurada!`;
        resultLine3.textContent = ``;
        resultLine4.textContent = `Nota requerida: 0.00`;
        imposibleSpan.textContent = '¡Éxito!';
        imposibleSpan.style.color = getCssVariable('--secondary-yellow');
        imposibleSpan.style.textShadow = getCssVariable('--shadow-neon-yellow');
    }
    else {
        // NOTA REQUERIDA NORMAL
        const notaRequeridaFixed = notaNecesaria.toFixed(2);
        notaNecesariaSpan.textContent = notaRequeridaFixed;
        mensajeNecesariaP.textContent = `¡Lo lograste en the último corte! (${notaRequeridaFixed})`;
        
        // Estilos y mensajes
        requiredLabel.textContent = 'Necesitas:'; // Se muestra en estado normal
        notaNecesariaSpan.style.color = getCssVariable('--primary-green');
        mensajeNecesariaP.style.color = getCssVariable('--primary-green');
        mensajeNecesariaP.style.textShadow = getCssVariable('--shadow-neon-green');

        // Texto de resultado complejo
        resultLine2.textContent = `Necesitas el ${notaRequeridaFixed} en el Corte 3.`;
        resultLine3.textContent = ``;
        resultLine4.textContent = `Máximo posible: ${notaFinalMaxima.toFixed(2)}`;
        imposibleSpan.textContent = 'A calcular';
        imposibleSpan.style.color = getCssVariable('--secondary-yellow');
        imposibleSpan.style.textShadow = getCssVariable('--shadow-neon-yellow');
    }
}

// Inicializar los campos con 0.0 al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('corte1').value = '0.0'; 
    document.getElementById('corte2').value = '0.0';
    // Inicializa el texto de error y la etiqueta necesarios
    document.getElementById('error-corte1').textContent = ''; 
    document.getElementById('error-corte2').textContent = '';
    document.getElementById('required-label').textContent = '';
});
