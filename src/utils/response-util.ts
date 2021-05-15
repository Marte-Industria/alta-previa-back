export const responseJSON = (msg : string, data?: any) => {
    return {
      msg,
      data: data || []
    }
  }