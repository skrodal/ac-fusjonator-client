# ConnectFusjonator (ac-fusjonator-client)

Web-klient som tar seg av migrering av eksisterende brukere i tjeneste Adobe Connect (levert av UNINETT AS). 

Klienten brukes ifm. fusjonering av læresteder som abonnerer på tjenesten. 


### Spesifikt:

- Klienten bistår med å endre brukernavn for gitte brukerkontoer.
- Brukerkontoer defineres i en komma-separert liste (CSV) med brukere som skal migreres. 
- CSV må ha følgende format `gammelt_brukernavn, nytt_brukernavn`, eks. under på brukere som skal flyttes fra org `hin.no` og `hih.no` til org `uit.no`:

```
    boer@hin.no, boerboer@uit.no
    josefine@hin.no, josefinetors@uit.no
    nils@hin.no, nilstoll@uit.no
    ole@hih.no, oleelve@uit.no
    laura@hih.no, lauraisak@uit.no
```

- Klient sjekker CSV brukerliste for evt. feil før den sender lista over til API (ac-fusjonator-api) for verifisering av brukere. 
- APIet sjekker status for alle brukernavn via Adobe Connect sitt API og svarer klienten med liste over:
   - Brukerkontoer som ikke er i bruk (legges i liste for kontoer som kan ignoreres)
   - Brukerkontoer som er aktive og kan migreres (legges i liste over kandidater)
   - Brukerkontoer der gammel OG ny brukerkonto allerede er i bruk (legges i liste over kontoer som ikke kan migreres) 
- Klient presenterer svar fra API og hvilke kontoer som kan migreres. Bruker kan så sende disse tilbake til API for faktisk migrasjon.

Adobe Connect brukernavn (`login`) for en gitt bruker endres vha. `principal-update` i Adobe Connect API.

### Avhengigheter

Klienten er registrert i UNINETT Connect tjenesteplattform og benytter seg av følgende 3.parts APIer (også registrert i Connect):

- https://github.com/skrodal/ac-fusjonator-api


### UI

![Preview](/app/img/ConnectFusjonator.png)