const STATUS_MESSAGE_MAP: Record<number, (name?: string) => string> = {
  200: (name = '') => `${name} Successfully`,
  201: (name = '') => `Create ${name} successfully!`,
  204: (name = '') => `${name} Success`,
  400: (name = '') => `${name} Bad Request`,
  401: (name = '') => `${name} Unauthorized`,
  403: (name = '') => `${name} Not Found`,
  404: (name = '') => `${name} Not Found`,
  409: (name = '') => `${name} Not Found`,
  500: (name = '') => `${name} Internal Server Error`,
  503: (name = '') => `${name} Internal Server Error`,
};

const GLOBAL_ERROR_MESSAGE = 'Something went wrong, please contact admin';
