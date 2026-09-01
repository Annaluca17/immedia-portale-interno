// Registro degli strumenti.
//
// Ogni voce ha un `id` univoco fra i suoi pari e puo avere `children`: la
// sidebar e il routing sono ricorsivi, quindi un gruppo nuovo non richiede
// modifiche al codice.
//
// `tipo` decide come si apre la voce:
//   'iframe'   (predefinito) — incorniciata nel portale
//   'esterno'  — si apre in una nuova scheda
//   'desktop'  — non e una pagina web: il portale mostra le istruzioni d'avvio
//   'gruppo'   — solo contenitore, non apribile
//
// `alias` alimenta la ricerca e non compare mai a schermo.

export const apps = [
  {
    id: 'adempimenti',
    label: 'Adempimenti e scadenze',
    icon: 'calendar-check',
    tipo: 'gruppo',
    children: [
      {
        id: 'ravvedimento',
        label: 'Ravvedimento Operoso F24EP',
        description: 'Calcolo ravvedimento operoso e sanzioni per tardivo invio. Gestione tributi con interessi legali pro-rata temporis.',
        icon: 'receipt',
        url: 'https://f24ep-ravvedimento.vercel.app',
        alias: ['sanzioni', 'tardivo invio', 'interessi legali', 'f24'],
      },
      {
        id: 'f24ep-editor',
        label: 'Generatore F24 EP',
        description: 'Produce il tracciato telematico F24 EP leggendo i flussi UniEmens: un rigo di versamento per periodo di riferimento. Si ferma al file, non invia.',
        icon: 'file-spreadsheet',
        url: 'https://f24epeditor.vercel.app',
        alias: ['tracciato telematico', 'versamento', 'ravvedimento contributivo'],
      },
      {
        id: 'quadratura-f24ep',
        label: 'Quadratura F24EP',
        description: 'Confronto fra scritture contabili, mandati e quietanze F24EP, con mappa dei creditori e diagnostica. Gira sul PC, non nel browser.',
        icon: 'terminal',
        tipo: 'desktop',
        alias: ['immedia-tools', 'mandati', 'creditori', 'scritture', 'quietanze'],
        avvio: {
          cartella: 'C:\\Users\\<utente>\\Desktop\\Progetti Immedia\\immedia-tools',
          comandi: [
            { file: 'QUADRATURA F24EP.bat', cosa: 'Esegue la quadratura completa del periodo.' },
            { file: 'mappa-creditori.bat', cosa: 'Costruisce e aggiorna la mappa dei creditori dell\u2019ente.' },
            { file: 'diagnostica.bat', cosa: 'Verifica prerequisiti e riconoscimento dei documenti caricati.' },
          ],
          prerequisiti: 'Python 3.12 e le dipendenze in requirements.txt. I campioni reali vanno in fixtures/reali/, esclusi dal repository.',
          repo: 'https://github.com/Annaluca17/immedia-tools',
        },
      },
      {
        id: 'adempimenti-pa',
        label: 'Portale Adempimenti PA',
        description: 'Stato di avanzamento delle lavorazioni mensili per ente: cosa e stato fatto, cosa manca, cosa scade. E il posto da cui si controlla il mese, non da cui si calcola.',
        icon: 'clipboard-list',
        tipo: 'desktop',
        alias: ['adempimenti', 'lavorazioni', 'andamento', 'scadenzario', 'mensile', 'stato avanzamento'],
        avvio: {
          // Dalla 1.2 in poi la persistenza passa da api/api.php con percorso
          // relativo: serve un server con PHP, non basta pubblicare l'HTML.
          // Quando l'indirizzo interno e noto, questa voce diventa `tipo: 'esterno'`
          // con la sua `url` e si apre come tutte le altre.
          cartella: 'C:\\Users\\<utente>\\Desktop\\Progetti Immedia\\Secondari\\Progetto andamento lavorazioni\\3.2',
          comandi: [
            { file: 'portale_adempimenti.html', cosa: 'Versione corrente, la 3.2. Va servita da un host con PHP.' },
            { file: 'api/api.php', cosa: 'Servizio di persistenza: senza, il portale si ferma su «Server non raggiungibile».' },
          ],
          prerequisiti: 'Un server interno con PHP che serva la pagina e la cartella api/ allo stesso livello. In attesa dell\u2019indirizzo interno la voce resta qui come scheda.',
        },
      },
    ],
  },

  {
    id: 'inps',
    label: 'Denunce e flussi INPS',
    icon: 'database',
    tipo: 'gruppo',
    children: [
      {
        id: 'uniemens-dma2',
        label: 'UniEmens Variazione Builder — DMA2',
        description: 'Costruzione e variazione denunce UniEmens per enti pubblici: quadri E0/V1, controlli di congruita, generazione XML e rendiconto PDF.',
        icon: 'file-cog',
        url: 'https://uniemens-builder.vercel.app',
        alias: ['dma2', 'e0', 'v1', 'denuncia', 'xml', 'variazione'],
      },
      {
        id: 'uniemens-privati',
        label: 'UniEmens Privatistico Builder',
        description: 'Denunce individuali del settore privato: dati retributivi, settimane, TipoLavStat, calendario giornaliero.',
        icon: 'file-cog',
        url: 'https://uniemens-private.vercel.app',
        alias: ['privato', 'cantieri', 'co.co.co', 'ivs', 'regolarizzazioni'],
      },
      {
        id: 'inps-extractor',
        label: 'INPS Extractor — Quadri E0/V1',
        description: 'Estrazione selettiva colonne da file INPS PASSWEB, con export JSON verso UniEmens Builder.',
        icon: 'table',
        url: 'https://inps-extractor-e0-v1.vercel.app',
        alias: ['passweb', 'pav', 'estrazione', 'colonne'],
      },
      {
        id: 'eca-parser',
        label: 'ECA Parser — GDP INPS',
        description: 'Lettura degli estratti conto e degli avvisi bonari GDP INPS da PDF, con analisi interamente locale.',
        icon: 'file-search',
        url: 'https://eca-omega.vercel.app',
        alias: ['estratto conto', 'avviso bonario', 'gdp', 'nota di debito'],
      },
    ],
  },

  {
    id: 'dipendente',
    label: 'Calcoli sul dipendente',
    icon: 'users',
    tipo: 'gruppo',
    children: [
      {
        id: 'cedolino',
        label: 'Cedolino Enti Locali',
        description: 'Anteprima e calcolo del cedolino stipendiale: voci retributive, trattenute e netto in busta.',
        icon: 'file-text',
        url: 'https://cedolino-enti-locali.vercel.app',
        alias: ['stipendio', 'busta paga', 'netto', 'irpef', 'simulatore'],
      },
      {
        id: 'costo-dipendente',
        label: 'Costo Dipendente Enti Locali',
        description: 'Costo annuo a carico dell\u2019ente per il trattamento fondamentale: oneri riflessi, TFS/TFR e IRAP. Matrice posizione economica per percentuale di part-time.',
        icon: 'coins',
        url: 'https://costo-dipendente-chi.vercel.app',
        alias: ['oneri riflessi', 'cpdel', 'irap', 'part-time', 'assunzione'],
      },
      {
        id: 'cessazione',
        label: 'Calcolatore Cessazione — Ferie e Preavviso',
        description: 'Ferie residue, indennita sostitutiva e preavviso alla cessazione del rapporto, con dettaglio delle voci retributive per annualita.',
        icon: 'calendar-days',
        url: 'https://ferie-e-preavviso.vercel.app',
        alias: ['ferie', 'preavviso', 'dimissioni', 'indennita sostitutiva', 'fine rapporto'],
      },
      {
        id: 'rivalutazione',
        label: 'Rivalutazione e Interessi Legali',
        description: 'Calcolo interessi legali e rivalutazione ISTAT, con aggiornamento automatico degli indici.',
        icon: 'trending-up',
        url: 'https://rivaluta-facile.vercel.app',
        alias: ['istat', 'interessi', 'arretrati', 'indici'],
      },
      {
        id: 'pignoramento',
        label: 'Tristo Pignoratore',
        description: 'Gestione e calcolo dei pignoramenti: verifica dei limiti e trattamento delle trattenute.',
        icon: 'gavel',
        url: 'https://tristo-pignoratore.vercel.app',
        alias: ['pignoramento', 'cessione del quinto', 'trattenute', 'quinto'],
      },
      {
        id: 'segretario',
        label: 'Retribuzione Segretario in Convenzione',
        description: 'Maggiorazione e sviluppo mensile del segretario comunale in convenzione, con quota gia corrisposta da altri enti.',
        icon: 'user-cog',
        url: 'https://calcolatore-convenzione.vercel.app',
        alias: ['segretario comunale', 'convenzione', 'maggiorazione', 'fascia'],
      },
    ],
  },

  {
    id: 'previdenza',
    label: 'Previdenza e fine servizio',
    icon: 'landmark',
    tipo: 'gruppo',
    // L'hub e apribile anche come contenitore: mostra la sua griglia di moduli.
    url: 'https://pensione-2-0.vercel.app',
    children: [
      {
        id: 'ultimo-miglio',
        label: 'Calcolo Ultimo Miglio Pensione',
        description: 'Analisi e calcolo per il trattamento pensionistico.',
        icon: 'landmark',
        url: 'https://pensione-2-0.vercel.app/?modulo=pensione',
        alias: ['pensione', 'ultimo miglio', 'trattamento pensionistico'],
      },
      {
        id: 'tfs-servizio',
        label: 'Ultimo miglio TFS — personale in servizio',
        description: 'Gestione TFS per il personale attualmente in servizio.',
        icon: 'user-check',
        url: 'https://pensione-2-0.vercel.app/?modulo=tfs_servizio',
        alias: ['tfs', 'in servizio'],
      },
      {
        id: 'tfs-pensione',
        label: 'Ultimo miglio TFS — personale in quiescenza',
        description: 'Gestione TFS per il personale gia in pensione.',
        icon: 'user-minus',
        url: 'https://pensione-2-0.vercel.app/?modulo=tfs_pensione',
        alias: ['tfs', 'quiescenza', 'pensionati'],
      },
      {
        id: 'tfr',
        label: 'Calcolo Ultimo Miglio TFR',
        description: 'Calcolo dell\u2019ultimo miglio TFR: pensione, mobilita, fine T.D., per progetti per comune.',
        icon: 'banknote',
        url: 'https://pensione-2-0.vercel.app/?modulo=tfr',
        alias: ['tfr', 'fine rapporto', 'mobilita'],
      },
      {
        id: 'unificato',
        label: 'Calcolo Unificato Ultimo Miglio',
        description: 'Gestione progetti per ente. Conteggi PASSWEB con export lettera INPS art. 57 c. 2 CCNL 2022/2024.',
        icon: 'layers',
        url: 'https://pensione-2-0.vercel.app/?modulo=unificato',
        alias: ['passweb', 'progetti', 'art. 57', 'lettera inps'],
      },
      {
        id: 'anticipo-dma',
        label: 'Anticipo DMA',
        description: 'Anticipo DMA per dipendente a tempo pieno e part-time, con trattamento TFR.',
        icon: 'clock',
        url: 'https://pensione-2-0.vercel.app/?modulo=anticipo_dma',
        alias: ['dma', 'anticipo', 'part-time'],
      },
      {
        id: 'lettere',
        label: 'Modelli Lettere',
        description: 'Generazione e gestione della modulistica previdenziale.',
        icon: 'mail',
        url: 'https://pensione-2-0.vercel.app/?modulo=lettere',
        alias: ['modulistica', 'lettere', 'modelli'],
      },
    ],
  },

  {
    id: 'commerciale',
    label: 'Commerciale',
    icon: 'calculator',
    tipo: 'gruppo',
    url: 'https://preventivatore-inky.vercel.app',
    children: [
      {
        id: 'service',
        label: 'Preventivo Service (Standard)',
        description: 'Listino standard per elaborazione ricorrente.',
        icon: 'calculator',
        url: 'https://preventivatore-inky.vercel.app/?modulo=service',
        alias: ['preventivo', 'listino', 'service', 'standard'],
      },
      {
        id: 'plus',
        label: 'Preventivo Plus (Supporto)',
        description: 'Listino supporto HR e consulenza.',
        icon: 'calculator',
        url: 'https://preventivatore-inky.vercel.app/?modulo=plus',
        alias: ['preventivo', 'plus', 'consulenza', 'supporto'],
      },
      {
        id: 'spot',
        label: 'Preventivo Spot (Ad-hoc)',
        description: 'Singoli adempimenti a listino.',
        icon: 'calculator',
        url: 'https://preventivatore-inky.vercel.app/?modulo=spot',
        alias: ['preventivo', 'spot', 'ad-hoc'],
      },
      {
        id: 'spot-ore',
        label: 'Preventivo Spot Ore',
        description: 'Servizi a tariffa oraria.',
        icon: 'calculator',
        url: 'https://preventivatore-inky.vercel.app/?modulo=spot_ore',
        alias: ['preventivo', 'ore', 'tariffa oraria'],
      },
      {
        id: 'cantieri',
        label: 'Preventivo Cantieri',
        description: 'Gestione cantieri lavoro.',
        icon: 'calculator',
        url: 'https://preventivatore-inky.vercel.app/?modulo=cantieri',
        alias: ['preventivo', 'cantieri'],
      },
      {
        id: 'offerte-inps',
        label: 'Offerte INPS',
        description: 'Servizi INPS analitici.',
        icon: 'calculator',
        url: 'https://preventivatore-inky.vercel.app/?modulo=offerte_inps',
        alias: ['preventivo', 'offerte', 'inps'],
      },
      {
        id: 'startup',
        label: 'Preventivo Start-up',
        description: 'Una tantum di configurazione.',
        icon: 'calculator',
        url: 'https://preventivatore-inky.vercel.app/?modulo=startup',
        alias: ['preventivo', 'start-up', 'avvio', 'una tantum'],
      },
    ],
  },
];

export const aiAssistants = [
  {
    id: 'ross',
    label: 'Chiedi a Ross',
    description: 'Assistente AI interno basato su NotebookLM. Supporto su procedure operative e normative.',
    icon: 'bot',
    url: 'https://notebooklm.google.com/notebook/42e45a28-020f-4d39-9160-51d5d7f7a75a',
    tipo: 'esterno',
    alias: ['ross', 'notebooklm', 'assistente'],
  },
  {
    id: 'lino',
    label: 'Super Lino',
    description: 'Chatbot AI per l\u2019assistenza ultimo miglio. Supporto operativo avanzato.',
    icon: 'zap',
    url: 'https://notebooklm.google.com/notebook/87d378d4-84c6-4840-85bc-1cbe4e207662/preview',
    tipo: 'esterno',
    alias: ['lino', 'notebooklm', 'ultimo miglio'],
  },
];
