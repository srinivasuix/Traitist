/**
 * Indian Postal PIN Code lookup utility.
 * Uses the Indian postal pincode API to auto-suggest City and State.
 * Includes local in-memory caching and graceful non-blocking failure.
 */

interface PincodeResult {
  city: string;
  state: string;
  district?: string;
}

const pincodeCache = new Map<string, PincodeResult>();

export async function lookupIndianPincode(pincode: string): Promise<PincodeResult | null> {
  const cleanPin = pincode.trim().replace(/\D/g, '');
  if (cleanPin.length !== 6) return null;

  if (pincodeCache.has(cleanPin)) {
    return pincodeCache.get(cleanPin)!;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(`https://api.postalpincode.in/pincode/${cleanPin}`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) return null;

    const data = await response.json();
    if (Array.isArray(data) && data[0]?.Status === 'Success' && Array.isArray(data[0]?.PostOffice) && data[0].PostOffice.length > 0) {
      const office = data[0].PostOffice[0];
      const result: PincodeResult = {
        city: office.District || office.Block || office.Name || '',
        state: office.State || '',
        district: office.District || '',
      };

      pincodeCache.set(cleanPin, result);
      return result;
    }
  } catch (err) {
    // Non-blocking fallback on network interruption or timeout
    console.debug('Pincode lookup fallback:', err);
  }

  return null;
}
