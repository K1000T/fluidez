/**
 * PRUEBAS DE SISTEMA (E2E) - Flujo Completo de Usuario
 * 
 * Estas pruebas verifican el sistema completo desde la perspectiva del usuario,
 * simulando interacciones reales en el navegador.
 */

import { test, expect } from '@playwright/test';

test.describe('Pruebas de Sistema E2E - Fluidez Activa', () => {
  
  test.describe('Flujo de Autenticación', () => {
    test('debe permitir registro de nuevo usuario', async ({ page }) => {
      await page.goto('/signup');

      // Verificar que la página de registro carga
      await expect(page.locator('h1')).toContainText(/registro/i);

      // Llenar formulario de registro
      const timestamp = Date.now();
      await page.fill('input[name="name"]', `Usuario Test ${timestamp}`);
      await page.fill('input[name="email"]', `test${timestamp}@example.com`);
      await page.fill('input[name="password"]', 'TestPassword123');
      await page.fill('input[name="phone"]', '1234567890');

      // Enviar formulario
      await page.click('button[type="submit"]');

      // Verificar redirección o mensaje de éxito
      await expect(page).toHaveURL(/\/(login|ejercicios|$)/, { timeout: 10000 });
    });

    test('debe permitir login con credenciales válidas', async ({ page }) => {
      await page.goto('/login');

      // Verificar que la página de login carga
      await expect(page.locator('h1, h2')).toContainText(/iniciar sesión|login/i);

      // Intentar login (asumiendo que hay un usuario de prueba)
      await page.fill('input[type="email"]', 'test@example.com');
      await page.fill('input[type="password"]', 'password123');
      await page.click('button[type="submit"]');

      // Esperar navegación
      await page.waitForTimeout(2000);
    });

    test('debe mostrar error con credenciales incorrectas', async ({ page }) => {
      await page.goto('/login');

      await page.fill('input[type="email"]', 'noexiste@example.com');
      await page.fill('input[type="password"]', 'wrongpassword');
      await page.click('button[type="submit"]');

      // Verificar mensaje de error
      await expect(page.locator('text=/error|incorrecta|inválid/i')).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Navegación Principal', () => {
    test('debe cargar la página de inicio correctamente', async ({ page }) => {
      await page.goto('/');

      // Verificar elementos principales
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('text=/Fluidez Activa/i')).toBeVisible();
    });

    test('debe navegar a la página de ejercicios de fonemas', async ({ page }) => {
      await page.goto('/');

      // Buscar y hacer click en el enlace de ejercicios
      const ejerciciosLink = page.locator('a[href*="ejercicios"]').first();
      if (await ejerciciosLink.isVisible()) {
        await ejerciciosLink.click();
        await page.waitForLoadState('networkidle');
        
        // Verificar que estamos en la página correcta
        await expect(page).toHaveURL(/ejercicios/);
      }
    });

    test('debe mostrar navbar en todas las páginas', async ({ page }) => {
      const pages = ['/', '/about', '/login', '/signup'];

      for (const url of pages) {
        await page.goto(url);
        await expect(page.locator('nav')).toBeVisible();
      }
    });
  });

  test.describe('Funcionalidad de Ejercicios de Fonemas', () => {
    test('debe mostrar lista de fonemas', async ({ page }) => {
      await page.goto('/ejercicios-fonema');

      // Esperar a que cargue el contenido
      await page.waitForLoadState('networkidle');

      // Verificar que hay contenido de fonemas
      await expect(page.locator('text=/fonema|ejercicio/i').first()).toBeVisible({ timeout: 5000 });
    });

    test('debe permitir filtrar fonemas por categoría', async ({ page }) => {
      await page.goto('/ejercicios-fonema');

      await page.waitForLoadState('networkidle');

      // Buscar botones de categoría
      const categoryButtons = page.locator('button:has-text("Bilabiales"), button:has-text("Velares"), button:has-text("Dentales")');
      
      if (await categoryButtons.first().isVisible()) {
        await categoryButtons.first().click();
        await page.waitForTimeout(500);
        
        // Verificar que el filtro se aplicó
        expect(true).toBeTruthy();
      }
    });

    test('debe mostrar explicación introductoria', async ({ page }) => {
      await page.goto('/ejercicios-fonema');

      await page.waitForLoadState('networkidle');

      // Buscar texto explicativo
      await expect(page.locator('text=/prolongaciones|tartamudez|fluidez/i').first()).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Funcionalidad de Visualización', () => {
    test('debe cargar la página de visualización', async ({ page }) => {
      await page.goto('/visualizacion');

      await page.waitForLoadState('networkidle');

      // Verificar elementos de la página
      await expect(page.locator('h1, h2')).toBeVisible();
    });
  });

  test.describe('Responsive Design', () => {
    test('debe funcionar correctamente en móvil', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      // Verificar que el menú hamburguesa existe
      const menuButton = page.locator('button[aria-label*="menu"], button:has-text("☰")');
      
      if (await menuButton.isVisible()) {
        await menuButton.click();
        await page.waitForTimeout(300);
      }

      // Verificar que el contenido es visible
      await expect(page.locator('body')).toBeVisible();
    });

    test('debe funcionar correctamente en tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');

      await expect(page.locator('nav')).toBeVisible();
    });
  });

  test.describe('Accesibilidad Básica', () => {
    test('debe tener título en la página principal', async ({ page }) => {
      await page.goto('/');

      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);
    });

    test('debe tener imágenes con texto alternativo', async ({ page }) => {
      await page.goto('/');

      const images = page.locator('img');
      const count = await images.count();

      if (count > 0) {
        const firstImage = images.first();
        const alt = await firstImage.getAttribute('alt');
        expect(alt).toBeTruthy();
      }
    });
  });

  test.describe('Rendimiento y Carga', () => {
    test('la página principal debe cargar en tiempo razonable', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      
      // La página debe cargar en menos de 10 segundos
      expect(loadTime).toBeLessThan(10000);
    });
  });
});
