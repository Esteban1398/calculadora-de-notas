Especificación de Requisitos de Software

1. Introducción

1.1 Propósito

Se describe los requisitos funcionales y no funcionales de la "Calculadora de Nota Final", una aplicación web diseñada para ayudar a los estudiantes a determinar la nota que necesitan obtener en el tercer corte (34%) para alcanzar un promedio final de 3.0 (nota de aprobación). También proporciona los cálculos de las notas finales máxima y mínima posibles.

1.2 Alcance

El sistema toma como entrada las notas obtenidas en los Cortes 1 (33%) y Corte 2 (33%) y calcula la nota requerida en el Corte 3 (34%) para alcanzar la nota de aprobación (3.0). El sistema debe validar que las notas de entrada estén en el rango de 0.0 a 5.0.

2. Requisitos Funcionales (RF)
   
ID

- RF-001

Requisito Funcional

- Ingreso de Notas

Descripción

- El sistema debe permitir al usuario ingresar la nota del Corte 1 (33%) y la nota del Corte 2 (33%).

Fuente (Archivo)

- index.html, script.js

ID

- RF-002

Requisito Funcional

- Cálculo Principal (Nota Necesaria)

Descripción

- Al presionar el botón "Calcular Nota Necesaria para 3.0", el sistema debe calcular la nota necesaria en el Corte 3 para alcanzar un promedio final de 3.0, utilizando la fórmula: $Nota_{C3} = \frac{3.0 - (N1 \times 0.33) - (N2 \times 0.33)}{0.34}$.

Fuente (Archivo)

- script.js

ID

- RF-003

Requisito Funcional

- Validación de Rango de Notas

Descripción

- El sistema debe validar que las notas ingresadas (N1 y N2) sean números positivos dentro del rango de 0.0 a 5.0. Si la nota es inválida, se debe mostrar el mensaje: "Formato inválido (utilice números positivos entre 0.0 y 5.0)".

Fuente (Archivo)

- script.js

ID

- RF-004

Requisito Funcional

- Validación de Campo Vacío

Descripción

- Si un campo de nota está vacío al intentar calcular, se debe mostrar el mensaje: "La casilla no puede estar vacía al calcular.".

Fuente (Archivo)

- script.js

ID

- RF-005

Requisito Funcional

- Mostrar Nota Necesaria

Descripción.

- El resultado del cálculo del Corte 3 se debe mostrar con dos decimales en el elemento con id="notaNecesaria".

Fuente (Archivo)

- script.js

ID

- RF-006

Requisito Funcional

- Mensaje de Aprobación/Imposibilidad

Descripción

- Si $Nota_{C3} > 5.0$, mostrar el mensaje: "¡Imposible! Necesitas una nota superior a 5.0." (Color rojo: --danger-color). Si $Nota_{C3} < 0.0$, mostrar el mensaje: "¡Ya Aprobaste! Tu nota es suficiente para superar el 3.0, incluso con 0.0 en el Corte 3." (Color verde: --secondary-color). De lo contrario, mostrar el mensaje: "Debes obtener [Nota calculada] en el Corte 3." (Color azul: --primary-color).

Fuente (Archivo)

script.js, style.css

ID

- RF-007

Requisito funcional

- Cálculo de Nota Final Máxima

Descripción

- El sistema debe calcular y mostrar la Nota Final Máxima posible (asumiendo 5.0 en el Corte 3): $N_{Máx} = (N1 \times 0.33) + (N2 \times 0.33) + (5.0 \times 0.34)$.

Fuente (Archivo)

- script.js

ID

- RF-008

Requisito Funcional

- Cálculo de Nota Final Mínima

Descripción

- El sistema debe calcular y mostrar la Nota Final Mínima (asumiendo 0.0 en el Corte 3): $N_{Mín} = (N1 \times 0.33) + (N2 \times 0.33) + (0.0 \times 0.34)$.

Fuente (Archivo)

script.js

ID

- RF-009

Requisito Funcional

- Inicialización de Campos

Descripción

- Al cargar la página, los campos de entrada para el Corte 1 y el Corte 2 deben inicializarse con el valor '0.0'.

Fuente (Archivo)

script.js

3. Requisitos No Funcionales (RNF)

3.1 Requisitos de Usabilidad (RNF-U)


- RNF-U1: Interfaz Intuitiva: La interfaz debe ser clara y guiar al usuario a través del proceso de ingreso de datos y cálculo.

- RNF-U2: Feedback de Errores: Los mensajes de error de validación (error-message) deben aparecer inmediatamente debajo de los campos de entrada correspondientes.

3.2 Requisitos de Desempeño (RNF-D)

- RNF-D1: Tiempos de Respuesta: El cálculo debe ejecutarse de manera instantánea (en menos de 1 segundo) al hacer clic en el botón.

3.3 Requisitos de Apariencia (RNF-A)

- RNF-A1: Diseño Responsivo: El diseño (.card-container, width: 100%; max-width: 450px;) está optimizado para una vista de tarjeta centralizada.

- RNF-A2: Tipografía: Se debe utilizar la fuente 'Poppins' importada desde Google Fonts.

- RNF-A3: Colores: Se deben utilizar variables CSS para los colores principales, incluyendo azul (--primary-color: #007bff;), verde (--secondary-color: #28a745;), y rojo para peligro/imposibilidad (--danger-color: #dc3545;).

- RNF-A4: Fondo: La página debe tener un fondo gradiente: background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);.

3.4 Requisitos de Implementación

- RNF-I1: Lenguajes: El sistema debe ser implementado usando HTML5, CSS3 y JavaScript (Vanilla JS).

- RNF-I2: Estructura de Archivos: La aplicación se compone de tres archivos: index.html (estructura), style.css (estilos), y script.js (lógica).

- RNF-I3: Constantes: Los pesos y límites de notas (0.33, 0.34, 3.0, 5.0, 0.0) deben definirse como constantes de JavaScript para facilitar el mantenimiento.


