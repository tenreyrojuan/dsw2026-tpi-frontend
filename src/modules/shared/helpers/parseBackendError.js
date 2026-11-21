export function parseBackendError(
  error,
  errorMessages = {},
  fallbackMessage = 'Error al conectar con el servicio administrativo'
) {
  const data = error?.response?.data;
  const details = data?.Details ?? data?.details;
  const issueMessage = details?.[0]?.Issue ?? details?.[0]?.issue;
  const errorCode = data?.ErrorCode ?? data?.errorCode;

  if (issueMessage) return issueMessage;
  if (errorCode && errorMessages[errorCode]) return errorMessages[errorCode];

  return fallbackMessage;
}