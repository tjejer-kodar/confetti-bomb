// Hur ändra färger baserat på inparametern groupName?

const chooseParticleColor = (groupName) => {
  const colors = ['#00b9ae', '#037171', '#02c3bd', '#009f93']
  return colors[Math.floor(Math.random(groupName) * colors.length)]
}


const bang = (addConfettiParticles) => {

  // Hur ändra färg med ett gruppnamn som skickas in i
  // chooseParticleColor?
  setTimeout(function () {
    addConfettiParticles({
      groupName: 'color sync confetti',
      particleAmount: 300,
      xPosition: 50,      // Position i procent av skärmens bredd, 0 är längst till vänster och 100 längst till höger
      yPosition: 50,      // Position i procent av skärmens höjd, 0 är längst ner och 100 högst upp
      xVelocity: 0,       // Hastighet i sidled, positiva värden åker åt höger och negativa åt vänster
      yVelocity: 2,       // Hastighet i höjdled, positiva värden åker uppåt och negativa värden nedåt
      xSpread: 95,        // Slumpmässig spridning på partikelns hastighet i sidled
      ySpread: 40         // Slumpmässig spridning på partikelns hastighet i höjdled
    })
  }, 1000)

  setTimeout(function () {
    addConfettiParticles({
      groupName: 'color sync confetti',
      particleAmount: 400,
      xPosition: 25,
      yPosition: 50,
      xVelocity: 0,
      yVelocity: 2,
      xSpread: 95,
      ySpread: 40
    })
  }, 3000)

  setTimeout(function () {
    addConfettiParticles({
      groupName: 'color sync confetti',
      particleAmount: 500,
      xPosition: 75,
      yPosition: 50,
      xVelocity: 0,
      yVelocity: 2,
      xSpread: 95,
      ySpread: 40
    })
  }, 5000)
}

export {
  chooseParticleColor,
  bang
}