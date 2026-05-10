---
title: "Estado del arte del Prompt Engineering: técnicas para trabajar mejor con modelos de IA"
description: "Una guía práctica sobre las técnicas modernas de prompt engineering: contexto, ejemplos, roles, salida estructurada, razonamiento, evaluación, agentes y buenas prácticas para reducir errores."
author: "David Castillo"
pubDate: 2026-05-09
tags: ["IA", "Prompt Engineering", "LLM", "Productividad", "Agentes"]
lang: "es"
draft: true
---

*El prompt engineering ya no consiste en escribir una frase bonita para que el modelo “entienda”. En 2026 se parece más a diseñar un contrato de trabajo: objetivo, contexto, restricciones, herramientas, ejemplos, formato de salida y criterios de evaluación.*

---

## 1. ¿Qué es realmente el prompt engineering?

Prompt engineering es la práctica de diseñar instrucciones para que un modelo de lenguaje produzca resultados útiles, consistentes y verificables. La definición suena sencilla, pero en la práctica cambia mucho dependiendo de si estás usando un chatbot, una API, un modelo de razonamiento, un agente con herramientas o un flujo automatizado dentro de una aplicación.

La idea central es esta: **un buen prompt reduce ambigüedad**. Le dice al modelo qué debe hacer, con qué información debe trabajar, qué debe ignorar, qué formato debe entregar y cómo debe comportarse cuando no tenga suficiente evidencia.

Un prompt débil delega demasiadas decisiones al modelo:

> Hazme un resumen de este documento.

Un prompt más útil delimita el trabajo:

> Resume este documento para un gerente de producto. Extrae decisiones, riesgos, fechas y responsables. Devuelve una tabla con cuatro columnas: tema, evidencia, impacto y siguiente acción. Si un dato no aparece en el documento, escribe "No especificado".

La diferencia no es cosmética. Es la diferencia entre pedir una opinión y diseñar una operación repetible.

## 2. La regla base: objetivo, contexto y salida

La mayoría de prompts útiles tienen tres piezas:

1. **Objetivo**: qué quieres lograr.
2. **Contexto**: información, audiencia, tono, restricciones y datos de entrada.
3. **Salida**: estructura exacta de la respuesta esperada.

Una plantilla mínima puede verse así:

```txt
Objetivo:
Convierte estas notas de reunión en un plan de acción.

Contexto:
El equipo es de producto y desarrollo. La audiencia es el CTO. Prioriza bloqueos técnicos, decisiones pendientes y tareas con dueño.

Formato:
Devuelve una tabla Markdown con columnas: prioridad, tarea, responsable, fecha límite, riesgo.

Reglas:
- No inventes responsables.
- Si falta una fecha, escribe "Por definir".
- Usa máximo 8 filas.

Notas:
"""
{notas_de_la_reunion}
"""
```

Esto funciona porque el modelo no tiene que adivinar el destino. Tiene un marco de ejecución.

## 3. Claridad antes que teatralidad

Durante mucho tiempo se popularizó el estilo de prompt tipo:

> Actúa como un experto mundial con 20 años de experiencia...

Asignar un rol puede ayudar, pero no reemplaza la claridad. Un modelo no mejora mágicamente porque le digas que es un experto. Mejora cuando le das criterios concretos para decidir.

En lugar de:

```txt
Actúa como el mejor copywriter del mundo y mejora este texto.
```

Prueba:

```txt
Reescribe este texto para una landing B2B.
Audiencia: directores de operaciones.
Objetivo: aumentar solicitudes de demo.
Tono: claro, directo, sin exageraciones.
Mantén el significado original.
Entrega 3 versiones:
1. conservadora
2. más comercial
3. más técnica
```

El rol puede quedarse, pero debe ser secundario. Lo importante es la tarea, la audiencia, los límites y el formato.

## 4. Few-shot prompting: enseñar con ejemplos

Una de las técnicas más efectivas sigue siendo dar ejemplos. En vez de explicar largamente el estilo que quieres, muestras entradas y salidas.

Esto se conoce como **few-shot prompting** o **multishot prompting**. Es útil cuando necesitas consistencia: clasificación, extracción, redacción con tono específico, normalización de datos o respuestas de soporte.

Ejemplo:

```txt
Clasifica mensajes de soporte en una de estas categorías:
- facturacion
- bug
- solicitud_feature
- acceso

Ejemplos:
Mensaje: "No puedo entrar a mi cuenta desde ayer"
Categoría: acceso

Mensaje: "Me cobraron dos veces este mes"
Categoría: facturacion

Mensaje: "Sería bueno exportar reportes a Excel"
Categoría: solicitud_feature

Ahora clasifica:
Mensaje: "{mensaje}"
Categoría:
```

Los ejemplos reducen interpretaciones alternativas. En producción, además, ayudan a que el comportamiento sea más estable entre versiones de modelos.

## 5. Salida estructurada: pedir datos, no prosa

Cuando el resultado será usado por una aplicación, un equipo o una automatización, conviene pedir una salida estructurada.

Markdown sirve para lectura humana. JSON sirve para sistemas. Tablas sirven para comparación. Listas numeradas sirven para procedimientos.

Ejemplo para JSON:

```txt
Extrae los datos del siguiente correo y devuelve solo JSON válido.

Schema:
{
  "cliente": "string | null",
  "empresa": "string | null",
  "problema": "string",
  "urgencia": "baja | media | alta",
  "proxima_accion": "string"
}

Reglas:
- No incluyas texto fuera del JSON.
- Usa null si el dato no aparece.
- No inventes información.
```

La salida estructurada es una de las fronteras más importantes del prompt engineering moderno porque conecta el lenguaje natural con software real.

## 6. Chain-of-thought, razonamiento y una advertencia importante

Otra técnica clásica es pedirle al modelo que piense paso a paso. Esto puede mejorar resultados en tareas complejas: matemáticas, planificación, análisis legal, debugging, arquitectura de software o decisiones con muchas variables.

Pero hay un matiz importante: en modelos modernos, sobre todo modelos de razonamiento, no siempre conviene pedir una cadena de pensamiento larga y visible. Muchas APIs separan el razonamiento interno de la respuesta final. Para el usuario, suele ser mejor pedir **criterios, verificación y conclusión**, no necesariamente todo el razonamiento privado.

Un prompt más seguro sería:

```txt
Analiza el problema paso a paso antes de responder.
En la respuesta final incluye:
1. conclusión
2. supuestos usados
3. riesgos
4. recomendación
```

Así obtienes una respuesta auditable sin forzar una explicación extensa que puede volverse ruido.

## 7. Del prompt engineering al context engineering

La evolución natural del prompt engineering es el **context engineering**. Ya no se trata solo de escribir una buena instrucción, sino de decidir qué información entra al contexto del modelo.

Esto incluye:

- instrucciones del sistema
- memoria del usuario
- documentos recuperados por búsqueda
- ejemplos
- resultados de herramientas
- reglas de negocio
- historial de conversación
- estado actual de una tarea

En un chatbot simple, el prompt es el mensaje. En una aplicación seria, el prompt es una composición de muchas fuentes.

La pregunta clave pasa de "¿qué le escribo al modelo?" a:

> ¿Qué necesita saber el modelo, en qué orden, con qué prioridad y con qué límites?

## 8. Técnicas para prompts largos

Los modelos actuales aceptan contextos cada vez más grandes, pero más contexto no siempre significa mejor resultado. Un prompt enorme puede introducir contradicciones, ruido y costo innecesario.

Buenas prácticas para contexto largo:

- Pon las instrucciones importantes al inicio.
- Separa instrucciones, datos y ejemplos con delimitadores claros.
- Resume contexto antiguo cuando deje de ser necesario.
- Coloca información variable al final si estás optimizando cache.
- Pide al modelo citar fragmentos o ubicaciones cuando trabaje con documentos.
- Divide tareas grandes en pasos verificables.

Ejemplo de delimitadores:

```txt
INSTRUCCIONES
Analiza el contrato y detecta riesgos para una startup SaaS.

CRITERIOS
- privacidad de datos
- propiedad intelectual
- penalidades
- renovación automática

CONTRATO
"""
{texto_del_contrato}
"""

SALIDA
Devuelve una tabla con riesgo, cláusula, severidad y recomendación.
```

Los delimitadores no son decoración. Ayudan a evitar que el modelo confunda instrucciones con contenido.

## 9. Prompting para agentes y herramientas

Cuando el modelo puede usar herramientas, el prompt debe cambiar. Ya no solo pides una respuesta: defines una política de ejecución.

Un agente necesita saber:

- cuándo usar una herramienta
- cuándo no usarla
- cómo validar resultados
- qué permisos tiene
- qué hacer ante errores
- cuándo detenerse y pedir confirmación

Ejemplo:

```txt
Eres un asistente de investigación.

Objetivo:
Encontrar 5 fuentes confiables sobre el tema indicado y producir un resumen comparativo.

Política de herramientas:
- Usa búsqueda web solo para información reciente o verificable.
- Prioriza fuentes primarias.
- No cites una fuente que no hayas abierto.
- Si las fuentes se contradicen, explícitalo.

Salida:
1. resumen ejecutivo
2. tabla de fuentes
3. puntos de desacuerdo
4. recomendación final
```

En agentes de código, esto es todavía más crítico. El prompt debe definir alcance, pruebas, criterios de edición y límites sobre acciones destructivas.

## 10. Reducir alucinaciones: no basta con decir "no inventes"

Decir "no inventes" ayuda, pero no es suficiente. La reducción de errores requiere diseño.

Técnicas útiles:

- Permitir explícitamente respuestas como "no tengo suficiente información".
- Pedir citas o evidencia cuando se trabaja con fuentes.
- Separar hechos, inferencias y opiniones.
- Hacer que el modelo liste supuestos.
- Pedir verificación antes de la conclusión.
- Usar herramientas externas cuando la información cambia con el tiempo.

Ejemplo:

```txt
Responde solo con información respaldada por el texto proporcionado.
Si haces una inferencia, márcala como "Inferencia".
Si falta información, escribe "No se puede determinar con el contexto dado".
```

Esto cambia el comportamiento: el modelo deja de sentirse obligado a completar los huecos.

## 11. Evaluaciones: el prompt no está terminado hasta que se mide

El error más común es tratar el prompt como una pieza de escritura. En realidad, un prompt de producción es más parecido a una función: debe probarse.

Una evaluación simple puede incluir:

- 20 ejemplos reales de entrada
- salida esperada o criterios de aceptación
- errores frecuentes
- comparación entre versiones del prompt
- comparación entre modelos
- medición de costo, latencia y tasa de fallo

Si el prompt clasifica tickets, mide precisión. Si resume documentos, mide cobertura y errores. Si genera SQL, mide si ejecuta y si responde la pregunta correcta.

La iteración seria se ve así:

1. Escribes un prompt base.
2. Lo pruebas contra casos reales.
3. Identificas fallos.
4. Ajustas instrucciones o ejemplos.
5. Vuelves a medir.

Sin evaluación, el prompt engineering se convierte en superstición.

## 12. Prompt caching y costo

En aplicaciones con muchos usuarios, el costo importa. Una técnica moderna es estructurar prompts para aprovechar cache.

La idea práctica es simple:

- contenido estático al inicio: instrucciones, ejemplos, reglas
- contenido variable al final: pregunta del usuario, documento nuevo, datos del caso

Esto permite que partes repetidas del prompt se reutilicen mejor, reduciendo latencia y costo en proveedores que soportan caching.

Ejemplo conceptual:

```txt
[Instrucciones estables]
[Reglas de negocio estables]
[Ejemplos estables]
[Datos variables del usuario]
```

No es solo optimización técnica. También obliga a separar lo que pertenece al sistema de lo que pertenece a cada caso.

## 13. Técnicas principales en una tabla

| Técnica | Cuándo usarla | Riesgo si se usa mal |
|---|---|---|
| Instrucciones claras | Siempre | Prompts largos pero ambiguos |
| Delimitadores | Cuando incluyes documentos o datos | Mezclar instrucciones con contenido |
| Few-shot prompting | Clasificación, estilo, extracción | Ejemplos sesgados o inconsistentes |
| Roles | Tono, perspectiva, dominio | Creer que el rol reemplaza criterios |
| Salida estructurada | Automatización, APIs, análisis | JSON inválido si no se valida |
| Razonamiento paso a paso | Problemas complejos | Respuestas largas y difíciles de auditar |
| Context engineering | Apps con memoria, RAG o agentes | Meter demasiado ruido al contexto |
| Evals | Producción y prompts críticos | Optimizar por intuición |
| Tool prompting | Agentes, búsqueda, código | Acciones innecesarias o peligrosas |
| Prompt caching | Apps repetitivas o de alto volumen | Poner contenido variable al inicio |

## 14. Una plantilla moderna de prompt

```txt
Rol:
Eres un asistente especializado en {dominio}.

Objetivo:
{resultado esperado}

Contexto:
{audiencia, situación, restricciones, datos relevantes}

Criterios de calidad:
- {criterio 1}
- {criterio 2}
- {criterio 3}

Reglas:
- No inventes datos.
- Marca supuestos como "Supuesto".
- Si falta información, dilo explícitamente.

Formato de salida:
{estructura exacta}

Datos de entrada:
"""
{input}
"""
```

Esta plantilla no es universal, pero cubre la mayoría de casos donde necesitas resultados consistentes.

## Conclusión: el prompt como interfaz

El prompt engineering moderno no va de trucos. Va de diseñar una interfaz entre intención humana y ejecución del modelo.

Los buenos prompts convierten una petición ambigua en una tarea operable. Los mejores prompts además son medibles, reutilizables y seguros.

Si estás usando IA para explorar ideas, un prompt casual puede bastar. Pero si la estás usando para trabajar, automatizar, programar, investigar o tomar decisiones, necesitas ingeniería: contexto correcto, formato claro, ejemplos, verificación y evaluación.

La frontera ya no es saber "la frase mágica". La frontera es construir sistemas donde el modelo tenga suficiente contexto para acertar y suficientes límites para no improvisar.

---

## Referencias

- [OpenAI Help Center — Best practices for prompt engineering](https://help.openai.com/en/articles/6654000-what-is-prompt-engineering)
- [OpenAI API Docs — Prompt engineering](https://platform.openai.com/docs/guides/prompt-engineering/best-practices)
- [OpenAI API Docs — Prompt caching](https://platform.openai.com/docs/guides/prompt-caching/overview)
- [Anthropic Docs — Prompt engineering overview](https://docs.anthropic.com/en/docs/prompt-engineering)
- [Claude Blog — Best practices for prompt engineering](https://claude.com/blog/best-practices-for-prompt-engineering)
- [Google AI for Developers — Gemini prompting strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies)
