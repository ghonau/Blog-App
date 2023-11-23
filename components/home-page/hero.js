//we are using different images for different devices so we are using nextjs Image

import Image from 'next/image'
import classes from './hero.module.css'

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src='/images/site/reza.jpg'
          alt='An Image of Reza'
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I am Reza</h1>
      <p>I blog about React</p>
    </section>
  )
}
export default Hero
