---
title: "Cómo usar Claude Code (Parte 1): guía práctica para empezar"
description: "Una guía rápida y práctica para instalar, configurar y usar Claude Code en tu día a día de desarrollo sin perder control del proyecto."
pubDate: 2026-05-06
tags: ["Claude Code", "IA", "Productividad", "Desarrollo de software"]
draft: true
---

> **tl;dr**: si dominas los comandos tipo `/skills`, `/agents`, `/usage` y `/doctor`, Claude Code pasa de “chat en terminal” a un flujo serio de ingeniería.


Para comprender como usar Claude Code al 100% podemos tomar el curso libre y gratuito publicado por Anthropic llamado ["Claude Code in Action"](https://anthropic.skilljar.com/claude-code-in-action) el cual explica como funciona Claude Code y en que casos se recomienda utilizar. Adicional a ello existe mucha literatura de como aplicar las herramientas de Claude en su [repositorio general](https://claude.com/resources/use-cases).

Pero puedes obtener nuevo conocimiento y aplicaciones de Claude Code en base a la experimentacion y al empirismo del dia a dia, por cual este post explorara de forma general el uso de Claude Code y brindara ciertos tips que te permitan experimentar, ahorrar tokens, utilizar un modelo de acuerdo a la tarea que vayas a utilizar, y alternativas a Claude Code.

## Como empezar con Claude Code 
Antes que nada tengo que mencionar que Claude Code es un asistente de codificación que no tiene interfaz y que se usa en la linea de terminal, y que puede interactuar con un proyecto completo para brindarte herramientas para expandir el desarrollo, refacturarlo, corregir bugs, generar documentación entre otras aplicaciones. Y si, puedes hacer _vibe coding_ con el, aunque mas adelante te dare consejo y recomendaciones para que no seas _vibe hackeado_ o que puedas identificar deudas técnicas.

Para instalarlo de forma local puedes usar el clasico Get Started de Claude Code, para este caso usare como ejemplo mi computador Mac para la instalación, puedes dirigirte a la linea de terminal favorita (en mi caso Ghostty) e instalarlo con npm (el empaquetador clasico de node).

Imagen Gif 

Una vez ahi debes Iniciar Sesión con tu cuenta, y si debes tener activa la suscripción de pago de Anthropic para usar Claude Code, una vez instalado, puedes ingresar a un proyecto ya creado o puedes crear una carpeta de un nuevo proyecto y empezar a _vibe codear_.

Sea cual sea lo que desees hacer debes dar permisos para usar esa carpeta, mediante la linea de terminal puedes usar `claude` para ingresar al prompt. Aqui la forma mas rapida de subir nivel con Claude Code es aprender como Claude Code interpreta los prompt, aunque desde la "filtracion" del repositorio de Claude se pudo saber como lo hace, [BettaTech explica muy bien como lo hace](https://youtu.be/vsmX5ORoPTQ), aunque tambien otro punto claro para sacarle todo el provecho a claude es conocer sus comandos, el saber usarlos elevara aun mas la productividad y depuracion.

## Manejo de tokens de entrada y salida 

Cuando usas Claude Code, cada turno consume tokens en dos fases: **entrada** (lo que el modelo recibe) y **salida** (lo que el modelo genera). Entender esto te ayuda a bajar costo, latencia y ruido.

```text
Tu prompt + contexto del repo + historial + salidas de tools
                         │
                         ▼
                [ Input tokens ]
                         │
                         ▼
                    Modelo LLM
                         │
                         ▼
Texto final + llamadas a tools + parametros generados
                         │
                         ▼
                [ Output tokens ]
```

| Tipo | Que incluye en Claude Code | Impacto |
|---|---|---|
| Input tokens | Prompt del usuario, instrucciones del sistema, historial de la sesion, fragmentos de archivos leidos, resultados de herramientas (bash/read/web/etc.) que se pasan al modelo | Aumentan cuando metes mucho contexto o pegas logs enormes |
| Output tokens | Respuesta del asistente, planes de accion, diffs propuestos y llamadas a herramientas con sus argumentos | Aumentan cuando pides respuestas largas o tareas muy abiertas |
| Cache read tokens | Tokens reutilizados desde cache (contexto ya visto) | Suelen costar menos y reducen latencia |
| Cache write tokens | Tokens nuevos que quedan cacheados para turnos siguientes | Suben al inicio de tareas largas, pero ayudan en iteraciones posteriores |

### Regla mental rapida

1. **Input alto**: mucho contexto, archivos grandes o historial largo.  
2. **Output alto**: respuestas extensas, multiples propuestas o muchos pasos en una sola salida.  
3. **Costo total**: depende de input/output y de cuanto contexto entra por cache vs tokens nuevos.

Si quieres optimizar, recorta contexto innecesario, pide salidas concretas (formato corto) y divide tareas grandes en iteraciones pequenas.

## Modelos de LLM 

Usare la misma analogia que se dice sobre los artistas "Hay que quitar a la persona del artista", sucede algo similar aqui, Claude Code es un producto que utilizan un modelo de LLM (el corazon del razonamiento), y los productos como Claude Cowork, Claude Design y otros serian "Orquestadores".

En este momento Mayo del 2026, en claude code existe la posibilidad de escoger 3 modules:

1. Haiku 4.5
2. Sonnet 4.6 
3. Opus 4.7 

Cada uno con objetivos distintos, y Claude Code las usara en combinación de herrmientas inherentes de Claude Code y el terminal, para dar una respuesta esperada, que se puede simplificar en:

- Agentes (o subagentes para tareas rutinarias)
- Bash (Para correr script en la linea de terminal)
- Edit (Para editar archivos)
- Glob (Para encontrar archivos basados en un patrón, como un `globbing` clasico)
- Grep (Para buscar un contenido de texto en un archivo, como un `ripgreep`)
- LS (Para listar archivos y directorios)
- MultiEdit (Realizar varias ediciones en un mismo archivos, como `sed`)
- NotebookEdit (Para crear cuadernos en jupiter)
- NotebookRead (Para leer un cuaderno en jupiter)
- Read (Para leer un archivo)
- TodoRead (Para leer una serie de archivos) 
- TodoWrite (Para actualizar una serie de archivos)
- WebFetch (Realizar un fetch o una revisión de una url)
- WebSearch (Realizar una busqueda en la web)
- Write (Para escribir archivos)

Si haz manejado antes una shell como `bash` sabras que Claude Code es una especie de framework para terminal, que de manera implicita usara algunas herramientas (cli de terminal) para explorar y editar archivos en simbiosis con un LLM.

## Prompt Engineering

He visto que aqui pueden existir varios caminos para obtener un mismo resultado, consejos como "Eres un experto en UX/UI con 5 años de experiencia..." funcionara o no dependiendo del modelo. Por lo que de manera personal usaria prompts especificos y/o vagos dependiendo de la tarea que se vaya a realizar, en resumen de acuerdo a estos factores:

1. Complejidad de la tarea o Resultado esperado
2. Modelo de LLM 
3. Especificidad del Prompt 

Por ejemplo para una consulta rapida como si fuera google usare a Haiku 4.5, Sonnet 4.6 y Opus 4.7 para consultar lo siguiente:

> Cuantos stickers necesito para completar el album del mundial del 2026

El resultado de comparación es la siguiente:  

| Métrica          | Haiku 4.5  | Sonnet 4.6 | Opus 4.7   |
|------------------|------------|------------|------------|
| Costo total      | $0.0139    | $0.0390    | $0.0919    |
| Input tokens     | 364        | 3          | 431        |
| Output tokens    | 522        | 673        | 652        |
| Cache read       | 28.2k      | 14.2k      | 46.8k      |
| Cache write      | 6.5k       | 6.5k       | 7.9k       |
| Duración API     | 7s         | 17s        | 15s        |
| Duración wall    | 13m 15s    | 44s        | 3m 33s     |

Aqui se muestra que es mucho mas barato usar Haiku 4.5 que usar los otros dos modelos de LLM, pero Sonnet 4.6 utiliza una cantidad muy pequeña de tokens de input (seguramente porque es una pregunta muy casual). Y total hemos gastado $ 0.1448, es decir 14 centavos para este experimento, y que una busqueda rapida en google o una exploracion en la pagina oficial de Panini ubiera salido en $0. Pero, y la calidad de salida? es mucho mejor el modelo mas costoso, que el mas economico, veamoslo:


*Respuesta de Opus 4.7*
```
No tengo confirmado el número oficial final del álbum Panini del Mundial 2026. Lo que sí se sabe:

  - Es el primer Mundial con 48 selecciones (antes eran 32), así que el álbum es más grande que los anteriores.
  - Para referencia, Qatar 2022 tenía alrededor de 670 stickers en la versión internacional.
  - Las estimaciones y filtraciones para FIFA World Cup 26 apuntan a un álbum de aproximadamente 900+ stickers en la
  edición estándar internacional, debido a las 16 selecciones extra.

  Como el número exacto depende de la edición (estándar, hardcover, edición por país como México, USA, etc.), te
  recomiendo confirmarlo en la web oficial de Panini o en la contraportada del álbum cuando lo compres, porque cada
  versión regional varía.

  ¿Quieres que busque la cifra oficial actualizada en la web?
```

*Respuesta de Haiku 4.5* 
```
Hola! El álbum de stickers del Mundial 2026 típicamente contiene alrededor de 600-680 stickers (dependiendo de la edición de Panini), pero para completar el
  álbum completo necesitarías conseguir todos los stickers únicos.

  Algunos datos útiles:
  - Número total de stickers únicos: Varía entre ediciones, pero generalmente son 600-650
  - Stickers por sobre: Usualmente 5 stickers por sobre
  - Cálculo aproximado: Si necesitas ~650 stickers y cada sobre tiene 5, serían ~130 sobres mínimo (en el mejor caso)

  Sin embargo, por la naturaleza aleatoria de los sobres, en realidad necesitarías más sobres (típicamente 200-250+) para completar el álbum debido a los
  stickers repetidos.
```

Si te fijas desde un principio, la consulta no especifica la region o que el modelo busque en la web, y por ello ambos modelos responden con datos pero con dudas, la respuesta que se buscaba es:

> Se necesitan 980 cromos para llenar el album del 2026.

Pero para obtener esta respeusta se tendria que volver a escribirle al modelo, afirmando que estamos en Ecuador y que buscamos saber cuantos cromos se deben llenar en el album, y seria un costo adicional por un segundo prompt, por ello especificar en un principio se optimizaria el costo de la respuesta y el tiempo de la respuesta. 

### ¿Cuando especificar y cuando no un prompt?

Como estamos usando Claude Code se puede resumir a aplicar la siguiente logica:

1. Mientras más compleja la tarea y más caro el modelo, más específico debe ser el prompt para justificar el costo.
2. Un prompt vago en Opus es dinero desperdiciado.
3. Un prompt específico en Haiku puede sorprenderte con el resultado.

Una combinación de ambos podra hacer que tu inversión en estas herramietnas sea clara.

| Tarea                                        | Dificultad | Modelo         | Tipo de prompt  |
|----------------------------------------------|------------|----------------|-----------------|
| Pregunta general / conocimiento              | Fácil      | Haiku          | Vago            |
| Cálculo / estimación simple                  | Fácil      | Haiku          | Vago            |
| Bug simple                | Fácil      | Haiku          | Específico      |
| Consulta SQL simple                          | Fácil      | Haiku          | Específico      |
| Refactor de codigo            | Fácil      | Haiku          | Específico      |
| Optimización de query MySQL                  | Media      | Haiku / Sonnet | Específico      |
| Integración de API / webhook                 | Media      | Sonnet         | Específico      |
| Módulo o Libreria de Wordpress                   | Media      | Sonnet         | Específico      |
| Diseño de componente React / Astro           | Media      | Sonnet         | Específico      |
| Arquitectura de microservicio    | Compleja   | Sonnet         | Muy específico  |
| Diseño de sistema embebido   | Compleja   | Sonnet         | Muy específico  |
| Auditoría de seguridad para modulo de pagos    | Compleja   | Opus           | Muy específico  |
| Decisión de arquitectura crítica             | Compleja   | Opus           | Muy específico  |
| Revisión de lógica de negocio compleja       | Compleja   | Opus           | Muy específico  |

Con ello puedes optimizar la productividad de las consultas utilizando inclusive los [precios por modelo](https://platform.claude.com/docs/es/about-claude/pricing) tanto de input tokens, cache y output tokens.

## Comandos clave de Claude Code

Cuando uses Claude Code puede utilizar `@` para encontrar un archivo y usarlo dentro de tu contexto de conversacion, por ejemplo el siguiente prompt

Tambien se puede usar `/` para llamar a los comandos de claude, estos comandos no consumira tokens, sino te mostrara un conjunto de herramientas que tiene Claude Code:



### `/skills`

Muestra o ejecuta *skills* disponibles para tareas especializadas. Piensalo como “atajos con contexto experto”.

Cuando usarlo:

1. Cuando quieres resolver algo muy especifico (por ejemplo, configurar entorno cloud-agent o flujos guiados).
2. Cuando no quieres escribir todo el contexto desde cero.

Ejemplo:

```text
/skills
```

## `/agents`

Te ayuda a trabajar con agentes en paralelo para dividir trabajo. Es util cuando una sola conversacion se queda corta para tareas grandes.

Cuando usarlo:

1. Para lanzar investigacion en paralelo (explorar varios modulos al mismo tiempo).
2. Para separar ejecucion de comandos pesados del hilo principal.

Ejemplo:

```text
/agents
```

## `/doctor`

Es tu comando de diagnostico. Revisa el estado del entorno y te ayuda a detectar por que algo no funciona como esperas.

Cuando usarlo:

1. Si notas errores raros en terminal o herramientas.
2. Si una integracion no responde y quieres validar configuracion basica.

Ejemplo:

```text
/doctor
```

## Otros comandos utiles del dia a dia

Ademas de los anteriores, normalmente tendras comandos para limpiar contexto, pedir ayuda o revisar estado de sesion. Si no recuerdas alguno, empieza por:

```text
/help
```

`/help` te da el listado actualizado segun tu version instalada.

## Flujo recomendado (simple y efectivo)

1. Ejecuta `/doctor` al inicio si acabas de instalar o actualizar.
2. Usa `/skills` para descubrir capacidades especializadas.
3. Usa `/agents` cuando la tarea crezca y necesites paralelizar.
4. Vuelve a `/help` cada vez que dudes de sintaxis o comandos disponibles.

## Errores comunes

### 1) Ignorar `/doctor` al inicio
Pierdes tiempo depurando prompts cuando el problema era de entorno.

### 2) No usar `/agents` en tareas grandes
Terminas saturando un solo hilo y trabajando mas lento.

### 3) No revisar `/help` tras actualizar
Algunos comandos o comportamientos pueden cambiar entre versiones.

## Plantilla practica para empezar cada sesion

```text
1) /doctor
2) /skills
3) Definir tarea en 1-2 lineas
4) /agents (si la tarea requiere paralelo)
```

Con esto ya tienes una base solida para usar Claude Code con menos friccion y mejor control operativo.

## Alternativas a Claude Code
En lo peronal te mostrare las que he utilizado y puedo sugerir:

1. Github Copilot CLI: Puede funcionar en VPS de bajos recursos, ademas que tiene la posibilidad de utilizarlo de forma gratuita o en su primer plan con un costo de $10.

2. Codex: La alternativa directa de Claude Code proporcionada por OpenAI, su forma de interpretar las instrucciones no es tan refinada como la de Claude Code, pero contiene un modelo mucho mas veloz, los planes son similares a Claude Code pero te puede beneficiar si generas imagenes con IA, ya que trae OpenAI Images 2.0

3. OpenCode: Una alternativa que puede usar varios modelos LLM de pago o modelos de LLM gratuitos, una interfaz muy pulida, pero que se aleja de la simbiosis natural con la terminal.
