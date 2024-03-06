export default {
  mounted() {
    this.$nextTick(function () {
      const aniViewElements = document.querySelectorAll('.animate__animated')
      window.addEventListener('scroll', function () {
        const windowTop = window.scrollY
        const windowBottom = windowTop + window.innerHeight
        aniViewElements.forEach(function (element) {
          const elementTop = element.offsetTop
          // const elementBottom = element.offsetTop + element.offsetHeight

          if (elementTop >= windowTop && elementTop <= windowBottom) {
            console.log('show')
            console.log(element.classList)
            if (element.classList.contains('fadeIn')) element.classList.add('animate__fadeIn')
            if (element.classList.contains('fadeInUp')) element.classList.add('animate__fadeInUp')
            if (element.classList.contains('fadeInDown'))
              element.classList.add('animate__fadeInDown')
            if (element.classList.contains('fadeInLeft'))
              element.classList.add('animate__fadeInLeft')
            if (element.classList.contains('fadeInRight'))
              element.classList.add('animate__fadeInRight')
            if (element.classList.contains('fadeInTopLeft'))
              element.classList.add('animate__fadeInTopLeft')
            if (element.classList.contains('fadeInTopRight'))
              element.classList.add('animate__fadeInTopRight')
          }
          // else {
          //   if (element.classList.contains('animate__fadeInUp'))
          //     element.classList.remove('animate__fadeInUp')
          // }
        })
      })
    })
  }
}
