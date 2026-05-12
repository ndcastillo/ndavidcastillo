---
title: "Doblaje de videos a otros idiomas - Análisis y Particularidades"
description: "Existen muchas herramientas de doblaje de voz, elevenlabs es la mas popular de ellas, pero en este post lo veremos utilizando una herramienta open source y lograremos obtener un doblaje lo suficientemente eficaz para ser usado en producción."
author: "David Castillo"
pubDate: 2026-05-03
tags: ["Elevenlabs", "Chatterbox", "Youtube", "Clonación de voz", "Doblaje de audio", "Davinci Resolve"]
heroImage: "./cover-.png"
lang: "es"
draft: false
---


Seguramente en algun momento te has preguntado como Mr. Beast o [Johnny Harris](https://www.youtube.com/@johnnyharris) doblan sus videos a multiples idiomas en Youtube, Mr Beast por ejemplo contrata un actor de doblaje y un editor de audio, mientras que Johnny Harris utiliza  un [clonador de voz](https://arxiv.org/html/2604.26136) basado en su timbre de voz para obtener un video homogeneizado en un idioma distinto, luego lo agregan en una pista de audio de configuración en Youtube y logran expandir el alcance de sus videos a otros paises.

<iframe width="100%" height="400" src="https://www.youtube.com/embed/8uoJNv9ufjM" title="Por qué estás tan aburrido" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Los clonadores de voz por lo general utilizan arquitecturas de tipo [CosyVoice](https://arxiv.org/abs/2407.05407) (Modelo Texto-to-Speech) combinando con recursos multimodales, por ejemplo utilizando un audio de referencia se puede tokenizar, realizar un analisis de espectro, usar un transformer, un flow matching y un vocode combinado con el texto y se obtendra la clonación del audio.

![cosyvoice](./cosyvoice-arq.png)


Si bien podria seguir con el aspecto tecnico de como se puede crear un clonador de voz muy superficialmente, la idea de este post es de la aplicabilidad, por lo que realizare un pequeño ensayo de pruebas y experimentación. Por ejemplo utilizare mi ambiente local para replicar una clonación de voz utilizando [**Chatterbox**](https://github.com/resemble-ai/chatterbox).

Instalare las librerias indispensables en el ambiente local, utilizaremps `pip`  ya que `chatterbox` esta escrito en python, y endonde la documentación menciona previamente debo tener instalado `torch`.

```bash
pip install chatterbox-tts
```

Clonare el repositorio de `chatterbox`, y en la que menciona que se debe tener una versión de python superior a la `3.11`.

```bash
git clone https://github.com/resemble-ai/chatterbox.git
cd chatterbox
pip install -e .
```

Para ya empezar a utilizarlo y en su versión mas moderna llamada **Turbo**, se necesita crear un archivo que en este caso sera llamado`clon-voice.py` y dentro de la carperta de `chatterbox`, aqui debes tener preparado un archivo de tu voz con un minimo de 10 segundos llamado `voice-reference.wav`, y un obtendrás de salida un archivo como `output-voice-en.wav`.

```python
import torchaudio as ta
import torch
from chatterbox.tts_turbo import ChatterboxTurboTTS

# Load the Turbo model
model = ChatterboxTurboTTS.from_pretrained(device="cuda")

# Generate with Paralinguistic Tags
text = "There's a guy who, in 2014, opened a laptop in a cafe in Thailand and built Nomad List."

# Generate audio (requires a reference clip for voice cloning)
wav = model.generate(text, audio_prompt_path="voice-reference.wav")

ta.save("output-voice-en.wav", wav, model.sr)
```
Puedes observar que en la variable `wav` llamo al modelo y uso como entrada al audio `voice-reference`, que seguramente sera tokenizado para obtener la clonación de voz.

<div class="audio-spectrum" data-src="/assets/audio/voice-reference.wav" data-title="Voz de referencia">
  <div class="audio-spectrum__header">
    <p class="audio-spectrum__title">Voz de referencia</p>
    <span class="audio-spectrum__time"><span data-current-time>0:00</span> / <span data-duration>0:00</span></span>
  </div>
  <div class="audio-spectrum__spectrogram" data-spectrogram></div>
  <div class="audio-spectrum__waveform" data-waveform></div>
  <div class="audio-spectrum__controls">
    <button class="audio-spectrum__button" type="button" data-play>Reproducir</button>
  </div>
</div>

Para obtener los resultados ejecuto el archivo de python.

```bash
python3 clon-voice.py
```

Como puedes observar en la variable `text` es donde se coloca el texto que quieres que se transforme en un audio, y en este ejemplo el audio dira:

>There's a guy who, in 2014, opened a laptop in a cafe in Thailand and built "Nomad List."


<div class="audio-spectrum" data-src="/assets/audio/output-voice-en.wav" data-title="Voz clonada en inglés">
  <div class="audio-spectrum__header">
    <p class="audio-spectrum__title">Voz clonada en inglés</p>
    <span class="audio-spectrum__time"><span data-current-time>0:00</span> / <span data-duration>0:00</span></span>
  </div>
  <div class="audio-spectrum__spectrogram" data-spectrogram></div>
  <div class="audio-spectrum__waveform" data-waveform></div>
  <div class="audio-spectrum__controls">
    <button class="audio-spectrum__button" type="button" data-play>Reproducir</button>
  </div>
</div>

Pero usaremos como ejemplo tambien al frances y al japones para observar su comportamiento.

>Il y a un type qui, en 2014, a ouvert son ordinateur portable dans un café en Thaïlande et a créé « Nomad List ».

<div class="audio-spectrum" data-src="/assets/audio/output-voice-fr.wav" data-title="Voz clonada en inglés">
  <div class="audio-spectrum__header">
    <p class="audio-spectrum__title">Voz clonada en frances</p>
    <span class="audio-spectrum__time"><span data-current-time>0:00</span> / <span data-duration>0:00</span></span>
  </div>
  <div class="audio-spectrum__spectrogram" data-spectrogram></div>
  <div class="audio-spectrum__waveform" data-waveform></div>
  <div class="audio-spectrum__controls">
    <button class="audio-spectrum__button" type="button" data-play>Reproducir</button>
  </div>
</div>

>2014年、タイのカフェでノートパソコンを開き、「Nomad List」を作った男がいた。

<div class="audio-spectrum" data-src="/assets/audio/output-voice-jp.wav" data-title="Voz clonada en inglés">
  <div class="audio-spectrum__header">
    <p class="audio-spectrum__title">Voz clonada en japones</p>
    <span class="audio-spectrum__time"><span data-current-time>0:00</span> / <span data-duration>0:00</span></span>
  </div>
  <div class="audio-spectrum__spectrogram" data-spectrogram></div>
  <div class="audio-spectrum__waveform" data-waveform></div>
  <div class="audio-spectrum__controls">
    <button class="audio-spectrum__button" type="button" data-play>Reproducir</button>
  </div>
</div>

Al reproducir las voces clonadas en otro idioma, se puede evidenciar la naturaleza del lenjuaje sobre el tiempo de decir una oración, en tanto en español como en ingles duro 6 segundos decir la frase completa, mientras que para el frances y japones tardo 10s y 7s respectivamente. Aunque con un actor de doblaje obviamente se puede ajustar estos tiempos modificando el guión, utilizando sinonimos del idioma.

---

## Uso de archivos `.srt` o `.json`

Ahora como sabras el audio de un video es muy espontaneo, es decir contiene pausas, acentos, y recursos del lenguaje que al utilizar en el script anterior se obtendria una voz demasiada artificial y que exista un desfase con las imagenes del video.

En este caso podemos hacernos de la ayuda de los arhcivos `.srt` o `.json` (de subtitulos), en este formato se guardara el texto que se dice en un audio, puedes usar las herramientas de tu editor de video favorito ya sea capcut, final cut, adobe premiere o davinci resolve. En mi caso usaré una herramienta de licencia libre como lo es [Autosubs](https://tom-moroney.com/auto-subs/) para obtener el archivo `.srt` de un [video propio](https://youtu.be/KQ3MnCnerw8?si=ccZGVUOIvOvlgRLK) publicado días atras.

Este nos proveera los siguiente:
1. El guión del video
2. Los tiempos usados por el guión

Estos archivos tambien pueden o no traer el locutor del guión, y puedes generar una clonación de audio de varias voces para mejorar la calidad del audio. Extraere de una porción del guión del video que mencione anteriormente.

```srt
1
00:00:00,040 --> 00:00:06,009
Hay un tipo que en 2014 se abrió una laptop en un café de taillandia y construyó "Nomad Liz".

2
00:00:06,280 --> 00:00:08,960
Sin equipos, sin inversores, sin oficina,

3
00:00:09,000 --> 00:00:12,150
y hoy factura casi 3 millones de dólares al año.
```

Si observas el `.srt`, se puede rescatar lo siguiente:

1. La segmentación enumeradas de las oraciones del guión
2. Las marcas de tiempo de inicio y fin
3. La oración del guión
4. Y en algunas ocasiones, se puede mostrar el locutor con un número de identificación

Con esta información podemos crear un script que mantenga una fase de acuerdo a los tiempos establecidos, y de esta manera fasar el audio de la pista del doblaje. Pero hay que recordar que lo que se quiere hacer es un doblaje a otro idioma con el mismo timbre de voz, para este caso de español a ingles, y se debe traducir el guion, podemos usar Claude Code, Codex, Gemini o cualquier otro LLM para este proposito:

```srt
1
00:00:00,040 --> 00:00:06,009
There's a guy who, in 2014, opened a laptop in a cafe in Thailand and built "Nomad List."

2
00:00:06,280 --> 00:00:08,960
No team, no investors, no office,

3
00:00:09,000 --> 00:00:12,150
and today it brings in almost 3 million dollars a year.
```


## Lenguajes, acentos y particularidades de agrupación
Por la propia estructura y formación de cada idioma, un lenguaje se puede tardar en decir una misma frase en mas o menos tiempo que en otro lenguaje, por lo que dependera de las ideas que se transmite en un video y la "calibración" del guión para encajar a la perfección. 

Para lograr fasar el doblaje con las imagenes deberemos crear un script de python que realice lo siguiente:

1. Leer el archivo `.json` o `.srt` para formar rangos de tiempos con los segmentos de las palabras
2. Generar la clonación de voz de cada segmento y obtener el archivo `.wav`

Por lo que por cada segmento podremos obtener un numero X de archivos `.wav` que podremos utilizar en un editor de video para colar de acuerdo al locutor.

![Segmentación de audios](./segmentacion.png)

Y que la arquitectura seria:

![](./arquitectura_script.png)

## Unión de segmentos

El resultado final lo puedes evidenciar, mantiene el timbre de voz, un acento en ingles casi neutral, y en la mayoria de los segmentos resguarda y respeta las marcas de tiempo de inicio y final, y las que no logra obtenerla se mantiene un silencio, que curiosamente me he fijado dichos silencios  que existen en los videos de Johnny Harris. Usa la opción de "Cambiar Pista" en el video para revisar los resultados.


<iframe
  width="100%"
  style="aspect-ratio: 9/16; max-width: 400px; display: block; margin: 0 auto;"
  src="https://www.youtube.com/embed/KQ3MnCnerw8"
  title="OpenClaw - Estado del Arte"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
</iframe>


## Ideas de comercialización

Como observas el modelo que acabamos de realizar ya es un producto miniamente viable (MVP) en potencia, con ciertos ajustos y despliegue se puede generar una _lista de espera_ con una prueba gratuita para saber cuanto la gente esta dispuesta a pagar para doblar sus videos a otros idiomas utilizando una IA de clonación de voz.

Aunque para ser sinceros el nicho de mercado en el cuál puede funcionar esto es dentro de los editores de video y creadores de contenido. Un producto final puede ser un plugin para software de edición de video como davinci resolve, adobe premiere y final cut pro, donde para un audio de cualquier pista realice 1. la transcripción de audio a texto, 2. la traducción al idioma a doblar y por ultimo 3. la clonación de voz para el doblaje, tambien puede funcionar como una aplicación web de doblaje de audios en crudo para obtener su contraparte en otros idiomas con su mismo timbre de voz como lo hace [elevenlabs](https://elevenlabs.io/).

## Referencias

- Abebe, A. G., & Moslem, Y. (2026). *One voice, many tongues: Cross-lingual voice cloning for scientific speech*. arXiv. https://arxiv.org/html/2604.26136
- Du, Z., Chen, Q., Zhang, S., Hu, K., Lu, H., Yang, Y., Hu, H., Zheng, S., Gu, Y., Ma, Z., Gao, Z., & Yan, Z. (2024). *CosyVoice: A scalable multilingual zero-shot text-to-speech synthesizer based on supervised semantic tokens*. arXiv. https://arxiv.org/abs/2407.05407
- ElevenLabs. (s. f.). *ElevenLabs*. Recuperado el 12 de mayo de 2026, de https://elevenlabs.io/
- Harris, J. (s. f.). *Johnny Harris* [Canal de YouTube]. YouTube. Recuperado el 12 de mayo de 2026, de https://www.youtube.com/@johnnyharris
- Moroney, T. (s. f.). *AutoSubs*. Recuperado el 12 de mayo de 2026, de https://tom-moroney.com/auto-subs/
- Resemble AI. (2025). *Chatterbox TTS* [Repositorio de GitHub]. GitHub. https://github.com/resemble-ai/chatterbox
- Resemble AI. (s. f.). *Chatterbox: Open source text-to-speech*. Recuperado el 12 de mayo de 2026, de https://www.resemble.ai/learn/models/chatterbox
- Castillo, D. (2026). *OpenClaw - Estado del Arte* [Video]. YouTube. https://youtu.be/KQ3MnCnerw8
