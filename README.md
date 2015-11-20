# ConnectFusjonator (ac-fusjonator)

Dette er en klient (front-end) som tar seg av fusjonering av eksisterende brukere i Adobe Connect.

Trenger komma-separert (to kolonner) liste over brukere:

```

    gammelt@brukernavn.no, nytt@brukernavn.no
    ..., ...

```

Spesifikt:

- Endrer brukernavn (`login`) i `principal-info` for gitt bruker vha. `principal-update`

Klienten er registrert i UNINETT Connect tjenesteplattform og benytter seg av følgende 3.parts APIer (også registrert i Connect):

- https://github.com/skrodal/ac-fusjonator-api
  - Proxy mellom klient og Adobe Connect


![Preview](/app/img/ConnectFusjonator.png)