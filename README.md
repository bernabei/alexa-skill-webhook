# alexa-skill-webhook
Skill Alexa per interagire con servizio WebHookGatewaySystem per pilotare (push) azioni su macchine client

Questa skill permette di comandare ed avviare tramite Alexa operazioni su un PC locale.
Per farlo si appoggia ad un client da avviare su una o più macchine: https://github.com/maiorfi/WebHookGatewaySystem.

La skill definisce i seguenti intent:
- **OpenWebPageIntent**, per chiedere ad Alexa di aprire una pagina web sul browser locale, attivabili con i seguenti comandi vocali:
  - Alexa, chiedi a Vetrina Digitale di aprire la pagina web [indirizzo_web] 
  - Alexa, apri Vetrina Digitale -> Apri pagina web [indirizzo_web]
- **OpenBookmarkIntent**, per chiedere ad Alexa di eseguire un'azione disponibile fra quelle preferite, attivabile con i seguenti comandi vocali:
  - Alexa, chiedi a Vetrina Digitale di aprire [bookmark] tra i miei preferiti 
  - Alexa, apri Vetrina Digitale -> Apri [bookmark] dai preferiti

La lista completa delle _utterance_ per gli _intent_ definiti è visibile nel file **skill-definition.json**.

I bookmark sono risolti cercando all'interno del file json [bookmarks.json](https://github.com/bernabei/alexa-skill-webhook/raw/master/skill/bookmarks.json) presente in questo repository.