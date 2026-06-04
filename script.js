const roll = document.getElementById("roll")
const results = document.getElementById("results")
const firstRoll = document.getElementById("first-roll")
const rerollBtn = document.getElementById("reroll")
const rerolls = document.getElementById("rerolls")
const firstInput = document.getElementById("first-input")
const secondInput = document.getElementById("second-input")
const thirdInput = document.getElementById("third-input")
const resultNumbers = document.getElementById("result-numbers")
const noRepeat = document.getElementById("no-repeat")

firstInput.oninput = () => {
  let firstValue = firstInput.value.replace(/\D/g, "")

  firstInput.value = firstValue
}

secondInput.oninput = () => {
  let secondValue = secondInput.value.replace(/\D/g, "")

  secondInput.value = secondValue
}

thirdInput.oninput = () => {
  let thirdValue = thirdInput.value.replace(/\D/g, "")

  thirdInput.value = thirdValue
}

roll.onclick = (event) => {
  event.preventDefault()

  const quantity = Number(firstInput.value)
  const min = Number(secondInput.value)
  const max = Number(thirdInput.value)
  const numbersDrawn = []
  const animationDuration = 4150
  const numbersAvailable = max - min + 1

  console.log(quantity)
  console.log(min)
  console.log(max)
  console.log(noRepeat.checked)

  if (
    firstInput.value === "" ||
    secondInput.value === "" ||
    thirdInput.value === ""
  ) {
    alert("Preencha todos os campos")
    return
  }

  if (firstInput.value <= 0 || thirdInput.value <= 0) {
    alert("Favor inserir valor válido")
    return
  }

  if (noRepeat.checked) {
    if (quantity > numbersAvailable) {
      alert("Quantidade inválida")

      return
    }
  }

  for (let i = 0; i < quantity; i++) {
    let randomNumbers
    if (noRepeat.checked) {
      do {
        randomNumbers = Math.floor(Math.random() * (max - min + 1)) + min
      } while (numbersDrawn.includes(randomNumbers))
    } else {
      randomNumbers = Math.floor(Math.random() * (max - min + 1)) + min
    }

    numbersDrawn.push(randomNumbers)
  }

  console.log(numbersDrawn)

  for (let i = 0; i < numbersDrawn.length; i++) {
    setTimeout(() => {
      const showResult = document.createElement("h1")
      showResult.innerHTML = `<span>${numbersDrawn[i]}</span>`

      resultNumbers.append(showResult)
    }, i * animationDuration)
  }

  setTimeout(
    () => {
      rerollBtn.classList.remove("reroll-button")
      rerollBtn.classList.add("opacity")
    },
    (numbersDrawn.length - 1) * animationDuration,
  )

  firstRoll.classList.add("hidden")
  rerolls.classList.remove("hidden")
}
