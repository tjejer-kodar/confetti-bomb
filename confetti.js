const colors = ['blue', 'red', 'green', 'purple', 'yellow', 'pink']
const maxColorIndex = colors.length - 1
console.log(maxColorIndex)
const chooseParticleColor = (groupName) => {
  const randomIndex = Math.round(Math.random() * 5)
  return colors[randomIndex]
}
const randomNumberGenerator = (min, max) => Math.random() * (max - min) + min;

const bang = (addConfettiParticles) => {

  for (let i = 1; i < 6; i++) {
    addConfettiParticles({
      groupName: i,
      particleAmount: randomNumberGenerator(20, 100),
      xPosition: randomNumberGenerator(0, 100),
      yPosition: randomNumberGenerator(0, 100),
      xVelocity: randomNumberGenerator(-4, 4),
      yVelocity: randomNumberGenerator(-4, 4),
      xSpread: randomNumberGenerator(10, 150),
      ySpread: randomNumberGenerator(10, 150)
    })
  }
}

export {
  chooseParticleColor,
  bang
}