// Om du tittar på projektet i browsern ser du en ensam grå
// och lite sorglig konfettipartikel. Din uppgift blir att
// fylla konfettianimationen med färger och liv!

// Funktionen chooseParticleColor styr färgen på varje enskild
// partikel. Den ska returnera en text-sträng som innehåller en
// CSS-färg. Returnerar den samma färg varje gång så kommer alla
// partiklar ha samma färg men om den returnerar olika färger
// t.ex. baserat på slump eller baserat på inparametern groupName
// så kan det istället bli en blandning av färger.
const chooseParticleColor = (groupName) => {
    let letters = '0123456789ABCDEF'; //Symbolerna som kan användas i en hexcode
    let color = '#'; //En hexcode måste börjas med # 
    for (let i = 0; i < 6; i++) { 
      color += letters[Math.floor(Math.random() * 16)]; //Loopar igenom letters och väljer 6 slumpmässiga symboler. kör sedan # + symbolerna för att bilda en hexcode
    }
  return color; //Variabeln color returneras, som är en slumpmässig hexcode (slumpmässig färg)
}

// Denna funktion anropas för att skjuta ut konfetti. Funktionen
// som kommer in som parameter addConfettiParticles kan anropas en
// eller flera gånger för att skjuta konfetti åt olika håll och
// från olika platser på skärmen
const bang = (addConfettiParticles) => {
  // Funktionen addConfettiParticles tar in ett antal parametrar
  // för att styra hur en konfettiexplosion ser ut. Antalet partiklar,
  // var på skärmen som partiklarna kommer ifrån, vilken riktning
  // (och med vilken hastighet) de flyger, hur mycket partiklarna
  // sprider ut sig från varandra samt ett gruppnamn som skickas in i
  // chooseParticleColor. Ändra på dessa värden och se vad som händer!
  addConfettiParticles({
    groupName: 'random-confetti',  // Valfritt namn på gruppen
    particleAmount: 250,  // Antal konfettipartiklar
    xPosition: 50,      // Position i procent av skärmens bredd, 0 är längst till vänster och 100 längst till höger
    yPosition: 50,      // Position i procent av skärmens höjd, 0 är längst ner och 100 högst upp
    xVelocity: 0,       // Hastighet i sidled, positiva värden åker åt höger och negativa åt vänster
    yVelocity: 3,       // Hastighet i höjdled, positiva värden åker uppåt och negativa värden nedåt
    xSpread: 80,        // Slumpmässig spridning på partikelns hastighet i sidled
    ySpread: 20,         // Slumpmässig spridning på partikelns hastighet i höjdled
  })
  setTimeout(function(){ bang(addConfettiParticles); }, 4000); //skjuter ut mera konfetti var fjärde sekund
}

// Här exporterar vi funktionerna så att de kan användas i
// confetti-creator-filen som du inte behöver bry dig om
export {
  chooseParticleColor,
  bang
}