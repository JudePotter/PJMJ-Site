type NetworkInformation = { saveData?: boolean; effectiveType?: string }

/**
 * False when the visitor has Data Saver on or is on a slow connection, so the
 * project loop videos (some are several MB) are not started. They see the
 * cover image instead, which is the same frame as the first one of the loop.
 */
export function canAutoplayVideo() {
  const connection = (
    navigator as Navigator & { connection?: NetworkInformation }
  ).connection
  if (!connection) return true
  return !(
    connection.saveData ||
    ['slow-2g', '2g', '3g'].includes(connection.effectiveType ?? '')
  )
}
