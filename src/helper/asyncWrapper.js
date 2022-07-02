export default function asyncWrapper(param) {
  if (Array.isArray(param)) {
    param.forEach((controller, i) => {
      Object.keys(controller).forEach((key) => {
        const fn = controller[key]
        if (fn?.constructor?.name === 'AsyncFunction') {
          Object.assign(controller, {
            [key]: function (req, res, next) {
              fn(req, res, next).catch(next)
            },
          })
        }
      })
    })
  } else {
    if (param.constructor?.name === 'AsyncFunction') {
      return function (req, res, next) {
        param(req, res, next).catch(next)
      }
    }
    return param
  }
}
