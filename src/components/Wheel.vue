<template>
  <div class="wheels-container">
    <div class="wheels">
      <div class="wheel-container">
        <canvas class="wheel-main" ref="mainCanvas" />
      </div>
      <div class="wheel-container">
        <canvas class="wheel-sub" ref="subCanvas" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { DEFAULT_FREQUENCY, DEFAULT_TEXT_COLOR, getTotalFrequency } from '@/data'
import { getRandomInt } from '../util'
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { useStore } from '@/store'

// Calculate the resulting prize index given the final angle and list of prizes.
// Рассчитайте итоговый индекс приза с учетом окончательного угла и списка призов.
function calculateResult (angle, prizes) {
  // console.log(prizes)
  const totalFreqs = getTotalFrequency(prizes) // частота выпадала всех результатов
  let cumulative = 0 // совокупность 1 варинта, шанс выпадения
  let winner = -1
  console.log(angle)
  for (let i = 0; i < prizes.length; ++i) {
    const freq = prizes[i].freq || DEFAULT_FREQUENCY // шанс выпадения из массива или стандарный шанс выпадения
    cumulative += freq

    const arcAngle1 = angle + (2 * Math.PI * (cumulative - freq)) / totalFreqs // высчитывание угла
    const arcAngle2 = angle + (2 * Math.PI * cumulative) / totalFreqs// высчитывание угла
    if (isAngleBetween((3 / 2) * Math.PI, arcAngle1, arcAngle2)) { // сравнение угла
      winner = i
    }
  }

  return winner
}

// Returns true if the given angle is between the specified bounds.
// Возвращает истину, если заданный угол находится между указанными границами.
function isAngleBetween (angle, lower, upper) {
  lower %= 2 * Math.PI
  upper %= 2 * Math.PI
  if (lower <= upper) {
    return lower < angle && upper >= angle
  } else {
    return lower < angle || upper >= angle
  }
}

// Redraw the wheel onto the given canvas, with the given offset angle and list of prizes.
// Рисует колесо на заданном холсте с заданным углом смещения и списком призов.
function redrawWheel (canvas, angle, prizes) {
  const r = Math.min(canvas.width, canvas.height) / 3.35
  const cx = canvas.width / 2
  const cy = canvas.height / 2
  const ctx = canvas.getContext('2d')
  // console.log(cx, canvas, ctx)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // let g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  // g.addColorStop(0, 'rgba(0,0,0,0)'); // цвет когда колесо двигается
  // g.addColorStop(1, 'rgba(0,0,0,0.1)'); // цвет когда колесо стоит

  const totalFreqs = getTotalFrequency(prizes) // частота выпадала всех результатов
  // console.log(angle)
  let cumulative = 0 // совокупность 1 варинта, шанс выпадения
  for (let i = 0; i < prizes.length; ++i) {
    const prize = prizes[i]
    // console.log(prize.freq)
    const freq = prize.freq || DEFAULT_FREQUENCY // шанс выпадения из массива или стандарный шанс выпадения
    cumulative += freq

    // calculate arc and text angles
    // вычисляем углы дуги и текста
    const arcAngle1 = angle + (2 * Math.PI * (cumulative - freq)) / totalFreqs
    const arcAngle2 = angle + (2 * Math.PI * cumulative) / totalFreqs
    const textAngle = angle + (2 * Math.PI * (cumulative - freq / 2)) / totalFreqs // угол для текста
    const highlight = isAngleBetween((3 / 2) * Math.PI, arcAngle1, arcAngle2)

    // draw arc
    // рисуем дугу
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.arc(cx, cy, r, arcAngle1, arcAngle2, false)
    ctx.fillStyle = prize.bg
    ctx.fill()
    // ctx.fillStyle = g;
    ctx.fill()
    ctx.save()

    // calculate font size
    // вычисляем размер шрифта
    const angleMod = Math.min(arcAngle2 - arcAngle1, 0.15) // размер шрифта текста
    const lengthMod = 1 - Math.round(prize.name.length / 3) * 0.07
    const fontMod = prize.fontMod || 1
    const fontSize = Math.max(10, 0.4 * r * angleMod * lengthMod * fontMod)

    // draw text
    // рисуем текст
    ctx.fillStyle = prize.text || DEFAULT_TEXT_COLOR
    if (highlight) {
      ctx.shadowColor = prize.text || DEFAULT_TEXT_COLOR
      ctx.shadowBlur = r / 30
    }
    ctx.font = fontSize + "px 'Muli', sans-serif"
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'
    ctx.translate(cx, cy)
    ctx.rotate(textAngle) // поворачивания для отрисовки
    ctx.fillText(prize.name, r * 0.61, 0) // текст и куда рисоватьть текст
    ctx.restore() // восстанавливает предварительно сохраненное состояние канваса из стека
  }
}

// Redraw the wheel frame onto the given canvas.
// Перерисовываем рамку колеса на заданном холсте.
function redrawFrame (canvas) {
  const r = Math.min(canvas.width, canvas.height) / 3.35
  const cx = canvas.width / 2
  const cy = canvas.height / 2
  const ctx = canvas.getContext('2d')

  // outer ring
  ctx.save()
  // ctx.shadowOffsetX = r / 100;
  // ctx.shadowOffsetY = r / 100;
  // ctx.shadowBlur = r / 40;
  // ctx.shadowColor = 'rgba(0,0,0,0.1)'; //тень
  ctx.beginPath()
  ctx.arc(cx, cy, r * 1.010, 0, 2 * Math.PI, true) // ширина дуги снаружи
  ctx.arc(cx, cy, r * 0.985, 0, 2 * Math.PI, false) // ширина дуги внутри
  ctx.fillStyle = '#424242' // цвет дуги
  ctx.fill()

  // center ring
  // ctx.shadowOffsetX = r / 200;
  // ctx.shadowOffsetY = r / 200;
  ctx.fillStyle = '#ffffff' // точка в центре
  ctx.beginPath()
  ctx.arc(cx, cy, r / 10, 0, 2 * Math.PI, false)
  ctx.fill()

  // prize pointer
  // указатель приза
  ctx.translate(cx, cy)
  ctx.rotate(Math.PI / 2)
  ctx.beginPath()
  // рисуем треугольник
  ctx.moveTo(-r * 1.01, -r * 0.05)
  ctx.lineTo(-r * 0.935, 0)
  ctx.lineTo(-r * 1.01, r * 0.05)
  ctx.fillStyle = '#f44336'
  ctx.fill()
  ctx.restore()
}

export default defineComponent({
  name: 'Wheel',
  emits: ['result'],
  setup (_, { emit }) {
    const store = useStore()
    const prizesStore = computed(() => store.state.main.available)
    const removeWinning = computed(() => store.state.main.data.resizeIntervalId || false)
    const angle = ref(0)
    let resizeIntervalId: any = ref(null)
    const mainCanvas: any = ref(null)
    const subCanvas: any = ref(null)
    // dfgdfg
    const resize = () => {
      const pixelRatio = window.devicePixelRatio || 1 // отношение разрешения дисплея текущего устройства в физических пикселях к разрешению в логических (CSS) пикселях.
      const desiredWidth = mainCanvas.value.offsetWidth * pixelRatio // ширина исходя из-за устройства
      const desiredHeight = mainCanvas.value.offsetHeight * pixelRatio
      // console.log(mainCanvas.value.offsetHeight, desiredHeight)
      // высота исходя из-за устройства
      // console.log(mainCanvas.value.width, desiredWidth)
      if (mainCanvas.value.width !== desiredWidth || mainCanvas.value.height !== desiredHeight) {
        mainCanvas.value.width = desiredWidth
        mainCanvas.value.height = desiredHeight
        subCanvas.value.width = desiredWidth
        subCanvas.value.height = desiredHeight
        window.requestAnimationFrame(() => {
          redrawWheel(mainCanvas.value, angle.value, prizesStore.value)
          redrawFrame(subCanvas.value)
        }) // указывает браузеру на то, что вы хотите произвести анимацию, и просит его запланировать перерисовку на следующем кадре анимации.
      }
    }

    const spinCompleted = () => {
      const winner = calculateResult(angle.value, prizesStore.value)
      console.log(prizesStore.value)
      emit('result', winner)
    }

    const startSpin = () => {
      const prizes = prizesStore.value

      const totalTicks = getRandomInt(400, 530) // всего тиков
      const speed = 0.22 + getRandomInt(0, 80) * 0.001 // скорость
      let ticks = 0
      const start = +new Date()

      function mainLoop () {
        const now = +new Date()
        const targetTicks = Math.min(totalTicks, (now - start) / 10)
        for (; ticks <= targetTicks; ++ticks) {
          angle.value += (speed * (totalTicks - ticks)) / totalTicks
        }

        redrawWheel(mainCanvas.value, angle, prizes)

        if (ticks < totalTicks) {
          window.requestAnimationFrame(mainLoop)
        } else {
          spinCompleted()
        }
      }
      window.requestAnimationFrame(mainLoop)
    }

    onMounted(() => {
      // console.log(mainCanvas.value.width)
      resizeIntervalId = setInterval(resize, 10)
    })

    onUnmounted(() => {
      clearInterval(resizeIntervalId)
    })

    return {
      prizesStore,
      removeWinning,
      angle,
      resizeIntervalId,
      resize,
      spinCompleted,
      startSpin,
      mainCanvas,
      subCanvas
    }
  }
})
</script>

<style>
.wheels-container {
  position: relative;
  flex: 1 1 auto;
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  overflow: hidden;
}
.wheels {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  max-height: 100%;
  max-width: 100%;
  overflow: hidden;
}
.wheel-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.wheel-main,
.wheel-sub {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  max-height: 100%;
  max-width: 100%;
  overflow: hidden;
}
.wheel-sub {
  z-index: 2;
}
</style>
