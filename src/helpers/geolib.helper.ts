import { getDistance } from 'geolib';

export function calulateDistance(persona: { lat: number, long: number }, jornada: { lat: number, long: number }) {
    const distancia = getDistance(
        { latitude: persona.lat, longitude: persona.long },
        { latitude: jornada.lat, longitude: jornada.long }
    );

    return distancia; 
}