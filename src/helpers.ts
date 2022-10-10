const jsonRes = (res: any, data = {}, message = "success") => {
  return {
    success: res,
    data: data,
    message: message,
  };
};

export const successJson = (data: any) => jsonRes(true, data);
export const errorJson = (error: any) => jsonRes(false, {}, error);
