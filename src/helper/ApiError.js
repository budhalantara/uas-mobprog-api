class ApiError extends Error {
  constructor(payload) {
    super(
      payload.message || 'Sedang terjadi kesalahan. Silahkan coba lagi nanti.'
    )
    Object.keys(payload).forEach((key) => {
      if (key !== 'message') {
        this[key] = payload[key]
      }
    })
  }
}

ApiError.NOT_FOUND = (name = 'Sesuatu', payload) => {
  return new ApiError({
    ...(name instanceof Object
      ? name
      : {
          message: `${name} yang kamu cari tidak ditemukan.`,
          ...payload,
        }),
    code: 404,
  })
}

ApiError.BAD_REQUEST = (payload) => {
  return new ApiError({
    ...payload,
    code: 400,
  })
}

ApiError.UNAUTHORIZED = (payload) => {
  return new ApiError({
    ...payload,
    code: 401,
  })
}

ApiError.FORBIDDEN = (payload) => {
  return new ApiError({
    ...payload,
    code: 403,
  })
}

ApiError.UNPROCESSABLE_ENTITY = (payload) => {
  return new ApiError({
    ...payload,
    code: 422,
  })
}

export default ApiError
