import fs from 'node:fs/promises'
import sharp from 'sharp'

const jobs = [
  ['src/assets/Images/logo_hero.webp', 'src/assets/Images/logo_hero.webp', { quality: 88 }],
  ['public/logo_hero.webp', 'public/logo_hero.webp', { quality: 88 }],
  ['src/assets/Images/logo_onac.webp', 'src/assets/Images/logo_onac.webp', { quality: 88 }],
  ['src/assets/Images/hero_tanque_rbg.png', 'src/assets/Images/hero_tanque_rbg.webp', { quality: 82 }],
]

for (const [input, output, options] of jobs) {
  const temporaryOutput = `${output}.tmp`

  await sharp(input)
    .webp(options)
    .toFile(temporaryOutput)

  await fs.rename(temporaryOutput, output)
  console.log(`Optimized ${output}`)
}
