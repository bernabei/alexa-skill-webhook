# alexa-skill-webhook
Skill Alexa per interagire con servizio WebHookGatewaySystem per pilotare (push) azioni su macchine client

Questa skill permette di comandare ed avviare tramite Alexa operazioni su un PC locale.
Per farlo si appoggia ad un client da avviare su una o più macchine: https://github.com/maiorfi/WebHookGatewaySystem

La skill definisce i seguenti intent:
- OpenWebPageIntent, per chiedere ad Alexa di aprire una pagina web sul browser locale, attivabili con i seguenti comandi vocali:
  - Alexa, chiedi a Vetrina Intelligente di aprire la pagina web [indirizzo_web] 
  - Alexa, apri vetrina Intelligente -> Apri pagina web [indirizzo_web]