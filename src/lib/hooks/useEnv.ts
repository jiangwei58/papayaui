export default (count = 8) => {
  const accountInfo = uni.getAccountInfoSync()
  const envVersion = accountInfo.miniProgram.envVersion
  let _tapCount = count

  const toEnv = () => {
    if (envVersion === 'release') return
    _tapCount++
    if (_tapCount >= 8) {
      _tapCount = 0
      uni.navigateTo({
        url: '/pages/env/index',
      })
    }
  }

  return {
    toEnv,
  }
}
