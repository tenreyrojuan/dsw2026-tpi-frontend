export function parseBackendError(
  error,
  errorMessages = {},
  fallbackMessage = 'Error al conectar con el servicio administrativo'
) {
  const issueMessage = error?.response?.data?.Details?.[0]?.Issue;
  const errorCode = error?.response?.data?.ErrorCode;

  if (issueMessage) return issueMessage;
  if (errorCode && errorMessages[errorCode]) return errorMessages[errorCode];

  return fallbackMessage;
}
