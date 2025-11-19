// Importar el archivo JSON de ciudades
import citiesJson from '../ciudad-y-paises/cities.json';

export interface City {
  name: string;
  country: string;
  subcountry: string;
  geonameid: number;
}

// Cargar todas las ciudades
export const allCities: City[] = citiesJson as City[];

// Obtener lista única de países ordenada alfabéticamente
export function getCountries(): string[] {
  const countriesSet = new Set<string>();
  allCities.forEach(city => {
    if (city.country) {
      countriesSet.add(city.country);
    }
  });
  return Array.from(countriesSet).sort();
}

// Obtener ciudades de un país específico
export function getCitiesByCountry(country: string): string[] {
  if (!country) return [];
  
  const cities = allCities
    .filter(city => city.country === country)
    .map(city => city.name)
    .filter((name, index, self) => self.indexOf(name) === index) // Eliminar duplicados
    .sort();
  
  return cities;
}

// Buscar ciudades por nombre (útil para autocompletado)
export function searchCities(searchTerm: string, limit: number = 50): City[] {
  if (!searchTerm) return [];
  
  const term = searchTerm.toLowerCase();
  return allCities
    .filter(city => city.name.toLowerCase().includes(term))
    .slice(0, limit);
}
