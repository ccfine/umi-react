const addZero = num => {
  if (parseInt(num) < 10) {
    num = "0" + num
  }
  return num
}

Date.prototype.toLocaleDateString = function () {
  return this.getFullYear() + "-" + addZero(this.getMonth() + 1) + "-" + addZero(this.getDate()) 
}

export const getDate = time => {
  const dateTime = new Date(time)
  const date = dateTime.toLocaleDateString()
  return date
}