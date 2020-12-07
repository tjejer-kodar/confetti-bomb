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
  var colors=["pink", "green", "blue", "orange", "purple"]
  return  colors[Math.floor(Math.random() * colors.length)];}


// Denna funktion anropas för att skjuta ut konfetti. Funktionen
// som kommer in som parameter addConfettiParticles kan anropas en
// eller flera gånger för att skjuta konfetti åt olika håll och
// från olika platser på skärmen

function bang(addConfettiParticles) {
  // Funktionen addConfettiParticles tar in ett antal parametrar
  // för att styra hur en konfettiexplosion ser ut. Antalet partiklar,
  // var på skärmen som partiklarna kommer ifrån, vilken riktning
  // (och med vilken hastighet) de flyger, hur mycket partiklarna
  // sprider ut sig från varandra samt ett gruppnamn som skickas in i
  // chooseParticleColor. Ändra på dessa värden och se vad som händer!
  addConfettiParticles({
    groupName: 'lonely sad confetti',
    particleAmount: 55,
    xPosition: 50,
    yPosition: 50,
    xVelocity: 0,
    yVelocity: 2,
    xSpread: 80,
    ySpread: 50 // Slumpmässig spridning på partikelns hastighet i höjdled
  });
  setTimeout(function(){ bang(addConfettiParticles); }, 3000);
}

// Här exporterar vi funktionerna så att de kan användas i
// confetti-creator-filen som du inte behöver bry dig om

// Den här filen behöver du inte bry dig om.
// Men tjuvkika gärna!



const addConfettiParticles = ({ groupName, particleAmount, xPosition, yPosition, xVelocity, yVelocity, xSpread, ySpread }) => {
  let i = 0
  while (i < particleAmount) {
    const r = _.random(5, 10)
    const d = _.random(13, 15)

    const color = chooseParticleColor(groupName)

    const tilt = _.random(-10, 10)
    const tiltAngleIncremental = _.random(5, 15) / 100
    const tiltAngle = 10
    const angle = _.random(180)
    const velocityX = _.random(xVelocity - xSpread / 100, xVelocity + xSpread / 100) / 100
    const velocityY = _.random(yVelocity - ySpread / 100, yVelocity + ySpread / 100) / 100
    const gravity = CONSTANTS.baseGravity
    const airFrictionX = window.innerWidth * CONSTANTS.baseAirFrictionX
    const airFrictionY = Math.min(window.innerWidth, window.innerHeight) * CONSTANTS.baseAirFrictionY

    const id = _.uniqueId()
    const sprite = {
      angle,
      velocityX: velocityX * window.innerWidth,
      velocityY: -velocityY * window.innerHeight,
      x: xPosition / 100 * window.innerWidth,
      y: (1 - yPosition / 100) * window.innerHeight,
      gravity,
      airFrictionX,
      airFrictionY,
      r,
      d,
      color,
      tilt,
      tiltAngleIncremental,
      tiltAngle
    }
    confettiSprites[id] = sprite
    confettiSpriteIds.push(id)
    setTimeout(() => {
      confettiSpriteIds.splice(confettiSpriteIds.indexOf(id), 1)
    }, 10000)
    i++
  }
}

const CONSTANTS = {
  baseGravity: Math.min(window.innerWidth, window.innerHeight) * 0.0006,
  baseAirFrictionX: 0.0005,
  baseAirFrictionY: 0.00054,
}

const confettiSpriteIds = []
const confettiSprites = {}
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)

const setCanvasSize = () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  canvas.style.width = `${window.innerWidth}px`
  canvas.style.height = `${window.innerHeight}px`
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style['z-index'] = '1000000'
  canvas.style['pointer-events'] = 'none'
  canvas.className = 'confetti-canvas'
}
window.addEventListener('resize', setCanvasSize)

const updateConfettiParticle = (id) => {
  const sprite = confettiSprites[id]
  const tiltAngle = 0.0005 * sprite.d

  sprite.angle += 0.01
  sprite.tiltAngle += tiltAngle
  sprite.tiltAngle += sprite.tiltAngleIncremental
  sprite.tilt = Math.sin(sprite.tiltAngle - sprite.r / 2) * sprite.r * 0.5
  sprite.x += Math.cos(sprite.angle - sprite.velocityY)
  sprite.x -= sprite.velocityX
  sprite.y += sprite.velocityY
  sprite.velocityX += sprite.velocityX < 0 ? sprite.airFrictionX : -sprite.airFrictionX
  sprite.velocityY += sprite.gravity
  sprite.velocityY += sprite.velocityY < 0 ? sprite.airFrictionY : -(sprite.airFrictionY + sprite.tilt / 1000)
  sprite.y += Math.sin(sprite.angle + sprite.r / 2) * 2
  sprite.r = Math.abs(sprite.r - 0.01)
}

const drawConfetti = () => {
  confettiSpriteIds.forEach((id) => {
    const sprite = confettiSprites[id]

    ctx.beginPath()
    ctx.lineWidth = sprite.d / 2
    ctx.strokeStyle = sprite.color
    ctx.moveTo(sprite.x + sprite.tilt + sprite.r, sprite.y)
    ctx.lineTo(sprite.x + sprite.tilt, sprite.y + sprite.tilt + sprite.r)
    ctx.stroke()

    updateConfettiParticle(id)
  })
}

const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawConfetti()
  requestAnimationFrame(() => {
    render()
  })
}

setCanvasSize()
render()


document.querySelector('#confettiButton').addEventListener('click', () => {
  bang(addConfettiParticles)
})

//Styling
document.querySelectorAll('button').forEach((btn) => btn.addEventListener('mousedown', (e) => {
  gsap.to(btn, { duration: 0.1, scale: 0.9 })
}))
document.querySelectorAll('button').forEach((btn) => btn.addEventListener('mouseup', (e) => {
  gsap.to(btn, { duration: 0.5, scale: 1, ease: Elastic.easeOut.config(1, 0.2) })
}))
