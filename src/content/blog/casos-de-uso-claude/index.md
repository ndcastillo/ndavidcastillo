---
title: "¿Cuando usar las herramientas de Claude?"
description: "Hoy en día existen un centenar de aplicaciones, y Claude ha sobresalido sobre todas ellas, pero ¿por qué?, hoy veremos los casos de uso en los cuales ha destacado."
author: "David Castillo"
pubDate: 2026-04-06
tags: ["Claude","Claude Code","Claude Cowork","OpenClaw","Anthropic","Peter Steimberger","educacion"]
lang: "es"
draft: true 
---

> **tl;dr** Claude para una exploración rápida, Claude Code para codificación y generación de subagentes, Claude Cowork para integrar herramientas de ofimática (hojas de cálculo y dashboards sencillos), y OpenClaw para generar asistentes autómatas que trabajen 24/7.

**Manifiesto de ética**
*Es importante mencionar que estas son herramientas de [LLM](https://arstechnica.com/ai/2024/12/why-ai-language-models-choke-on-too-much-text/), y se deben pensar siempre como una reconstrucción de colecciones de razonamientos aleatorios, o también pueden verse como una configuración de sistemas [estocásticos](https://dle.rae.es/estoc%C3%A1stico), las cuales pueden confluir en razonamientos muy bien estructurados o también pueden llegar a encontrarse con ruido que les llevará a respuestas erróneas y con alucinaciones (que no quedes como un alucín).*

*Por cuanto debes tener una responsabilidad perentoria en la revisión de cada una de sus afirmaciones, corroborando con fuentes de rigor (fuentes indexadas, estándares internacionales, etc).*

Es muy probable que te encuentres atosigado por la gran cantidad de información sobre herramientas de IA, y la "infoxicación" en redes sociales pueden llegar a confundirte y terminar gastando en una suscripción que nunca le darás uso. 

De entre toda esa nube de marketing de patito, nos podemos encontrar con joyas como Claude, que destaca por su filosofía, y [por oponerse al gobierno del señor naranja](https://arstechnica.com/tech-policy/2026/03/anthropic-sues-us-over-blacklisting-white-house-calls-firm-radical-left-woke/) en pro de la protección de la privacidad de sus clientes (valido solo para compradores americanos).

Pero que nos ofrece Claude, podemos simplificarlo así:

1. Herramientas para personas no técnicas y 
2. Herramientas para personas técnicas. 

Pero dicha clasificación pierde interés y desaprovecha la potencialidad que tienen muchas de sus herramientas, otra manera de poder clasificar a los productos Claude puede ser por sus [modelos de LLM](https://platform.claude.com/docs/es/about-claude/models/overview), como los actualmente desarrollados o en ambiente de "calidad" a dia de hoy (Abril del 2025) como lo son:

1. **Opus 4.6** — Su modelo más inteligente, orientado a la construcción de agentes y al uso en la codificación.

2. **Sonnet 4.5** — Un modelo enfocado en la velocidad e inteligencia, ideal para tareas que requieren equilibrio entre rendimiento y latencia.

3. **Haiku 4.5** — Su modelo más rápido con inteligencia casi de frontera, usado para aplicaciones que tienen un enfoque en la velocidad.

Y también se debe mencionar a uno de sus modelos que esta tendencia "tendencia generada por los mismos de anthropic" llamado ["Mythos"](https://red.anthropic.com/2026/mythos-preview/), enfocado en identificar y explotar vulnerabilidades de seguridad en sistemas tan críticos como OpenBSD, FFmpeg, el kernel de Linux o navegadores web.

Aunque se debe ser esceptico, ya que se sabe muy bien que el marketing puede engañarte al momento de venderte un producto, entonces hasta que un cliente directo lo pruebe [dichas afirmaciones deben tomarse como exageradas y de especulación](https://www.cnbc.com/2026/04/07/anthropic-claude-mythos-ai-hackers-cyberattacks.html).

Pero para no desviarnos del tema principal, yo clasificaria a los productos de claude de la siguiente manera:

1. Claude (a secas)
2. Claude Code
3. Claude Cowork

Que son los productos finales con los que la gente trabaja diariamente y que es mas importante saber como utilizar la herramienta dia a dia, que saber cual es el modelo de frontera mas "inteligente" o que espero que "me hable de una forma convincente a mis ideas".

![Mapa de Anthropic](./anthropic_claude_map.gif)

## 1. Claude (a secas)
Todos lo conocen como el clásico chat donde tú preguntas y él responde, y en el cual alimentas un contexto y de acuerdo con él puedes obtener cierta información o formatos de salida.

### ¿Para qué usarlo?
Lo ideal sería para tareas específicas y bien definidas, una investigación rápida, una exploración de información, o diseños de mapas y esquemas iniciales, petición de cálculos rápidos y elasticidad de contextos.


Por ejemplo en la [propia documentación de Claude](https://claude.com/resources/use-cases) sugiere utilizarlo para: revisar y redlinear contratos legales, convertir investigaciones en presentaciones, planificar revisiones de literatura científica, analizar datos financieros bajo distintos escenarios, o simplemente como asistente personal para organizar ideas y tareas cotidianas.

![Caso de uso común](./case_use_1.png)


### Claude Embedido
Estas son extensiones de Claude para un software en especifico como Excel o Chrome, por ejemplo [la extensión de Claude para Excel](https://claude.com/resources/use-cases/update-your-financial-model-after-earnings) puede ayudar a realizar un proceso de limpieza de datos, un análisis exploratorio o paneles (dashboard) de estadísticas completos.

Mientras que la extensión para Chrome ayuda a interactuar con el navegador directamente: puede leer tu calendario y prepararte para reuniones, limpiar correos promocionales del inbox, extraer métricas de dashboards de analítica sin exportar nada, comparar productos entre pestañas abiertas, organizar archivos en Google Drive, o registrar llamadas de ventas en tu CRM.


Por ejemplo, utilizando la extensión se puede realizar una exploración y/o investigación sobre un tema en especifico (que es una aplicación sugerible).

![Extensión de Claude en Google Chrome](./extension_claude.png)

## 2. Claude Code
En este punto pasas de ser un noob de los prompts a utilizar configuraciones donde puedes contornear de mejor forma el contexto de lo que quieres realizar, y ademas afinar los formatos de salida que requieres.

> "Por favor no es necesario que hagas un diplomado, con leer la documentación oficial es suficiente :)"

Antes que nada debes tener en cuenta las [mejores prácticas](https://code.claude.com/docs/es/best-practices) para utilizar esta herramienta, pero antes es importante conocer el bucle agentico, el cual sigue los siguientes pasos:

1. Tomar un contexto (archivos, prompts y conversaciones pasadas)
2. Tomar un accion
3. Verificar los Resultados

![Bucle Agentico](./agentic-loop.svg)

Este bucle te permitira interrumpir la veces que quieras para guiar al modelo hacia otros contexto (otras ideas) de acuerdo a lo que estes buscando.

Con ello las mejores practicas y patrones a seguir tratar de mantener una ventana del contexto, puedes hacerte ayuda de los subagentes o mcp para este cometido.

<iframe style="border:none" width="100%" height="450" src="https://whimsical.com/embed/Fc8srTJQsux3R56o59Z7Wi"></iframe>

Otra buena practica es definir muy bien la entrada y el formato de salida para reducir el uso de los tokens, y se que no es una regla general, pero en ningun caso debes darle acceso a credenciales, api keys, ws keys u otro acceso que se encuentre en producción (puedes usar variables de entorno o bien usar accesos en ambiente de prueba).

Pero me extendi un poco de como usarlo, y en realidad la pregunta es cuando usarlo, y la verdad la respuesta es sencilla, cuando necesites crear un desarrollo mas elaborado.

Puedes usar la línea de terminal para escribir cientos de lineas de codigo, arquitecturas, patrones de diseno, estructuras de datos, y de una forma rapida.
 
### ¿Para qué usarlo?
Cuando necesites crear un desarrollo más elaborado que una simple consulta en el chat. A diferencia de Claude (chat), aquí el modelo tiene acceso completo a tu proyecto y puede leer, crear y modificar archivos directamente. Algunos casos concretos:

- **Generación de código**: escribir cientos de líneas, estructuras de datos, patrones de diseño y arquitecturas completas desde cero.
- **Bases de datos**: diseñar esquemas, generar migraciones y poblar datos de prueba.
- **Automatización con subagentes**: delegar tareas mecánicas a agentes independientes que trabajan en paralelo con microcontextos propios, sin saturar el contexto principal.
- **Integración con herramientas externas vía MCP**: conectarse a servicios, APIs y fuentes de datos para que el modelo actúe sobre ellos directamente.
- **Revisión y refactorización**: analizar un codebase existente, detectar errores, aplicar mejoras y mantener consistencia en el estilo.

## 3. Claude Cowork
Cowork es la misma arquitectura de Claude Code, pero empaquetada en una interfaz gráfica dentro de la app de escritorio de Claude. Útil para personas sin conocimiento técnico necesario.

Un caso rapido podria ser el ordenar los archivos de una carpeta, por ejemplo:

![Carpeta Inicial](./cowork_1.png)

![Ejecución del prompt](./cowork_2.png)

![Trabajo de Cowork](./cowork_3.gif)

![Resultado Final](./cowork_4.png)

En el resultado final se observa que lo ordeno por extensión a cada uno de los archivo, y ademas los ha numerado.

### ¿Para qué usarlo?
Para tareas que cruzan varias herramientas y archivos a la vez, sin necesidad de escribir código. Por ejemplo:

- **Organización de archivos**: ordenar el escritorio o carpetas de documentos en subcarpetas con nombres claros.
- **Análisis financiero**: tomar exportaciones bancarias y archivos de contabilidad, cruzarlos y generar un reporte de conciliación con discrepancias marcadas.
- **Preparación para auditorías**: reorganizar contratos, políticas y registros dispersos en una colección lista para revisión regulatoria.
- **Briefings diarios**: consolidar información de Slack, Notion y dashboards de equipo en un resumen de prioridades del día.
- **Investigación de mercado**: a partir de una pregunta, Claude investiga, calcula y genera un PowerPoint, un Excel con metodología y un documento con citas.
- **Procesamiento de proveedores**: leer una carpeta de archivos de múltiples proveedores, agregarlos a un tracker, generar contratos y llenar formularios en el navegador en una sola sesión.

## 4. OpenClaw (Bonus)
Convierte un LLM en un agente autónomo que vive en tu computadora y se comunica contigo por Telegram, Discord o WhatsApp.

### ¿Para qué usarlo?
Para generar flujos de trabajo y ecosistemas entre varios agentes, uno investiga, otro escribe y otro revisa.


## Retroalimentación

| | **Claude (chat)** | **Claude Code** | **Cowork** | **OpenClaw** |
|---|---|---|---|---|
| **Interfaz** | Web / móvil / desktop | Terminal / IDE | Desktop app (pestaña Cowork) | Terminal + mensajería (Telegram, Discord, WhatsApp) |
| **Quién lo usa** | Todos | Desarrolladores | Profesionales no técnicos | Devs y power users |
| **Modo de trabajo** | Conversacional, un mensaje a la vez | Agéntico: lee tu codebase, edita archivos, ejecuta comandos | Agéntico: accede a tus carpetas, coordina sub-agentes | Agéntico autónomo: ejecuta tareas en tu sistema con skills |
| **Acceso a archivos** | Solo los que subes | Tu proyecto completo | Carpetas que autorices | Acceso al sistema (configurable) |

<iframe style="border:none" width="100%" height="450" src="https://whimsical.com/embed/CZ945pa5Wij8LAdpsnn7Qd"></iframe>

## Recursos de Aprendizaje
Ahora, existen herramientas gratuitas para aprender cualquiera de estas herramientas, y para ser honesto es preferible aprender en estas los propios cursos que emite Anthropic (empresa creadora de Claude), y puedes complementar ese conocimiento con habilidades compartidas en Reddit y con tu propia experimentación.

- [Anthropic Academy - Claude 101](https://anthropic.skilljar.com/claude-101)
- [Anthropic Academy - Framework & Foundations](https://anthropic.skilljar.com/ai-fluency-framework-foundations)
- [Anthropic Academy - Introducción a los subagentes](https://anthropic.skilljar.com/introduction-to-subagents)
- [Anthropic Academy - Introducción a Claude Cowork](https://anthropic.skilljar.com/introduction-to-claude-cowork)
- [Docs OpenClaw - Personal Assistant Setup](https://docs.openclaw.ai/start/openclaw)

## Referencias
- [Anthropic sues US over blacklisting; White House calls firm “radical left, woke”](https://arstechnica.com/tech-policy/2026/03/anthropic-sues-us-over-blacklisting-white-house-calls-firm-radical-left-woke/)
Posdata: Este artículo fue investigado y escrito por un humano, y haciendo uso de un subagente para corregir errores gramaticales y de semántica.
