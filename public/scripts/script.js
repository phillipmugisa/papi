const themeChangeSwitch = document.querySelector('.theme-change-switch')
const themeChangeSwitchBall = document.querySelector('.theme-change-switch-ball')
themeChangeSwitch.addEventListener('click', () => {
    if (themeChangeSwitchBall.classList.contains('light')) {
        themeChangeSwitchBall.classList.replace('light', 'dark')
        document.body.classList.replace('light', 'dark')
    } else {
        themeChangeSwitchBall.classList.replace('dark', 'light')
        document.body.classList.replace('dark', 'light')
    }    
})