

type SuccessResponse<T> = {
  status: 'success';
  data: T;
}

type ErrorResponse<T> = {
  status: 'error';
  message: T;
}

export function success<T>(data: T): SuccessResponse<T> {
  return {
    status: 'success',
    data,
  };
}

export function error<T>(message: T): ErrorResponse<T> {
  return {
    status: 'error',
    message,
  };
}